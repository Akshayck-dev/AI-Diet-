import { RequestHandler } from "express";
import { getTranslation, isValidLanguage, getLanguageFromInput } from "../translations";

interface ChatState {
  currentFlow: string | null;
  slots: Record<string, string | number>;
  collectedSlots: string[];
  user_language: string | null;
}

interface ChatRequest {
  message: string;
  chatState: ChatState;
}

interface ChatResponse {
  message: string;
  quickReplies?: string[];
  newChatState?: ChatState;
  isMainMenu?: boolean;
  isPlan?: boolean;
  planData?: any;
}

const WEIGHT_LOSS_SLOTS = [
  "current_weight_kg",
  "target_weight_kg",
  "height_cm",
  "wrist_cm",
  "age",
  "gender",
  "activity_level",
  "food_pref",
  "allergies",
];

const MEDICAL_KEYWORDS = [
  "pregnant",
  "diabetes",
  "medication",
  "heart",
  "surgery",
  "medical",
  "disease",
  "cancer",
  "hypertension",
  "asthma",
  "ഗർഭിണി",
  "പ്രമേഹം",
  "മരുന്നുകൾ",
  "ഹൃദയം",
  "ശസ്ത്രക്രിയ",
];

const checkMedicalContext = (message: string): boolean => {
  const lower = message.toLowerCase();
  return MEDICAL_KEYWORDS.some((keyword) => lower.includes(keyword));
};

const getSlotPrompt = (slot: string, lang: string): string => {
  const prompts: Record<string, Record<string, string>> = {
    current_weight_kg: { en: "ask_current_weight", ml: "ask_current_weight" },
    target_weight_kg: { en: "ask_target_weight", ml: "ask_target_weight" },
    height_cm: { en: "ask_height", ml: "ask_height" },
    wrist_cm: { en: "ask_wrist", ml: "ask_wrist" },
    age: { en: "ask_age", ml: "ask_age" },
    gender: { en: "ask_gender", ml: "ask_gender" },
    activity_level: { en: "ask_activity_level", ml: "ask_activity_level" },
    food_pref: { en: "ask_food_pref", ml: "ask_food_pref" },
    allergies: { en: "ask_allergies", ml: "ask_allergies" },
  };

  const key = prompts[slot]?.[lang] || "ask_" + slot;
  return getTranslation(lang, key);
};

const validateSlot = (slot: string, value: string): boolean => {
  if (slot.endsWith("_kg") || slot.endsWith("_cm")) {
    if (value.toLowerCase() === "skip" || value.toLowerCase() === "ഒഴിവാക്കുക") {
      return true;
    }
    const num = parseFloat(value);
    return !isNaN(num) && num > 0 ? true : false;
  }
  if (slot === "age") {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num < 150 ? true : false;
  }
  return true;
};

const generateWeightLossPlan = (slots: Record<string, string | number>): any => {
  const weight = slots.current_weight_kg as number;
  const height = slots.height_cm as number;
  const age = slots.age as number;
  const activity = (slots.activity_level as string).toLowerCase();

  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    നിശ്ചലത: 1.2,
    ഹൽകാ: 1.375,
    മധ്യമ: 1.55,
    സ��ീവ: 1.725,
  };

  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const tdee = bmr * (activityMultipliers[activity] || 1.55);
  const dailyCalories = Math.floor(tdee - 500);
  const proteinTarget = Math.floor(weight * 1.2);

  const mealPlan = [
    {
      day: "Day 1 (Monday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Oats (50g) with milk", "Sliced banana", "Almonds (10)", "Green tea"],
          calories: 400,
        },
        {
          name: "☀️ Lunch",
          items: ["Dal rice (1 cup cooked)", "Mixed green salad", "Cucumber raita", "Roti (1)"],
          calories: 600,
        },
        {
          name: "🌙 Dinner",
          items: ["Paneer curry (light oil)", "Brown rice (½ cup)", "Steamed broccoli"],
          calories: 500,
        },
        {
          name: "🍎 Snacks",
          items: ["Greek yogurt (1 cup)", "Apple (1 medium)"],
          calories: 150,
        },
      ],
    },
    {
      day: "Day 2 (Tuesday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Whole wheat bread (2 slices)", "Boiled eggs (2)", "Tomato slices", "Lemon tea"],
          calories: 380,
        },
        {
          name: "☀️ Lunch",
          items: ["Grilled chicken (150g)", "Quinoa (½ cup)", "Carrot & beans salad"],
          calories: 620,
        },
        {
          name: "🌙 Dinner",
          items: ["Fish curry (light)", "Basmati rice (½ cup)", "Cucumber salad"],
          calories: 480,
        },
        {
          name: "🍎 Snacks",
          items: ["Almonds (15)", "Orange (1)"],
          calories: 140,
        },
      ],
    },
    {
      day: "Day 3 (Wednesday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Idli (2) with sambar", "Coconut chutney (light)", "Black coffee"],
          calories: 350,
        },
        {
          name: "☀️ Lunch",
          items: ["Dal fry (1 cup)", "Brown rice", "Mixed vegetables", "Buttermilk"],
          calories: 590,
        },
        {
          name: "🌙 Dinner",
          items: ["Grilled paneer tikka", "Roti (2)", "Arhar dal curry (light)"],
          calories: 520,
        },
        {
          name: "🍎 Snacks",
          items: ["Moong sprouts (handful)", "Mango (½)"],
          calories: 120,
        },
      ],
    },
    {
      day: "Day 4 (Thursday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Poha (1 cup)", "Peanuts (small handful)", "Green chilli", "Lemon water"],
          calories: 370,
        },
        {
          name: "☀️ Lunch",
          items: ["Chicken pulao (light oil)", "Cucumber raita", "Green salad"],
          calories: 610,
        },
        {
          name: "🌙 Dinner",
          items: ["Tomato soup (with veggies)", "Multigrain roti (2)", "Steamed cauliflower"],
          calories: 500,
        },
        {
          name: "🍎 Snacks",
          items: ["Curd (1 cup)", "Pomegranate (handful)"],
          calories: 130,
        },
      ],
    },
    {
      day: "Day 5 (Friday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Dosa with fill (minimal oil)", "Coconut chutney", "Sambar"],
          calories: 390,
        },
        {
          name: "☀️ Lunch",
          items: ["Boiled fish (150g)", "Jasmine rice", "Vegetable curry", "Lemon juice"],
          calories: 600,
        },
        {
          name: "🌙 Dinner",
          items: ["Paneer vegetable roll", "Roti (2)", "Mixed greens salad"],
          calories: 510,
        },
        {
          name: "🍎 Snacks",
          items: ["Almonds (15)", "Papaya (1 cup)"],
          calories: 150,
        },
      ],
    },
    {
      day: "Day 6 (Saturday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Upma (semolina) with veggies", "Green tea", "Dry fruits (10g)"],
          calories: 360,
        },
        {
          name: "☀️ Lunch",
          items: ["Mutton curry (light, 100g)", "Brown rice", "Arugula salad"],
          calories: 630,
        },
        {
          name: "🌙 Dinner",
          items: ["Spinach paneer", "Roti (2)", "Mung sprout salad"],
          calories: 490,
        },
        {
          name: "🍎 Snacks",
          items: ["Cashews (10)", "Guava (1)"],
          calories: 140,
        },
      ],
    },
    {
      day: "Day 7 (Sunday)",
      meals: [
        {
          name: "🌅 Breakfast",
          items: ["Masala oats", "Honey (1 tsp)", "Berries (handful)"],
          calories: 380,
        },
        {
          name: "☀️ Lunch",
          items: ["Tandoori chicken (150g)", "Jeera rice", "Raita", "Salad"],
          calories: 620,
        },
        {
          name: "🌙 Dinner",
          items: ["Lentil soup (thick)", "Multigrain bread (2 slices)", "Steamed veggies"],
          calories: 500,
        },
        {
          name: "🍎 Snacks",
          items: ["Walnuts (8)", "Kiwi (2)"],
          calories: 160,
        },
      ],
    },
  ];

  const workoutPlan = `**Week 1-2:** 3 days/week (Mon, Wed, Fri)\n• 5 min warmup (walking in place, arm circles)\n• Bodyweight exercises: 10 push-ups, 15 squats, 15 lunges → 3 sets each\n• 10 min brisk walking or jogging in place\n• 5 min cooldown (stretching all major muscle groups)\n\n**Week 3-4:** 4 days/week, increase reps by 20-30%\n• Add planks (20-30 sec), mountain climbers (15 reps)\n• Increase walking to 15 min\n• Add burpees (8 reps) for extra cardio`;

  const groceryList = [
    { item: "Rice/Wheat", amount: "3 kg", price: "₹150" },
    { item: "Lentils/Pulses", amount: "2 kg", price: "₹200" },
    { item: "Chicken/Fish", amount: "1.5 kg", price: "₹700" },
    { item: "Eggs", amount: "30 pieces", price: "₹150" },
    { item: "Paneer", amount: "500g", price: "₹250" },
    { item: "Vegetables (Seasonal)", amount: "Various", price: "₹400" },
    { item: "Milk & Yogurt", amount: "3 L milk, 2 cups curd", price: "₹300" },
    { item: "Nuts & Seeds", amount: "Mixed (200g)", price: "₹200" },
    { item: "Oil & Spices", amount: "Various", price: "₹300" },
  ];

  const tips = [
    "🍽️ Eat slowly and chew 25+ times per bite. This helps with digestion and makes you feel full faster!",
    "💧 Never skip meals! Instead of 3 large meals, have 5 smaller ones. It keeps your metabolism active.",
    "😴 Sleep 7-8 hours daily. Your body repairs and burns fat while you sleep. Recovery is EVERYTHING!",
  ];

  return {
    title: "Your Personalized Weight Loss Plan",
    emoji: "🔥",
    dailyCalories,
    dailyProtein: proteinTarget,
    mealPlan,
    workoutPlan,
    groceryList,
    tips,
    closing: "You've got this! 💪 Start today, see results in 4 weeks. Small steps = big changes!",
  };
};

export const handleChat: RequestHandler<{}, ChatResponse, ChatRequest> = (req, res) => {
  try {
    const { message, chatState } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Please send a valid message!" });
    }

    const userInput = message.trim().toLowerCase();
    let newChatState = { ...chatState };

    // Step 1: Ask for language if not set
    if (!newChatState.user_language) {
      const detectedLang = getLanguageFromInput(userInput);
      if (detectedLang) {
        newChatState.user_language = detectedLang;
        const greeting =
          detectedLang === "en"
            ? getTranslation(detectedLang, "language_selected_en")
            : getTranslation(detectedLang, "language_selected_ml");
        return res.json({
          message: greeting,
          
          newChatState,
        });
      } else {
        return res.json({
          message: getTranslation(null, "choose_language"),
          quickReplies: ["English 🇬🇧", "Malayalam 🇮🇳"],
        });
      }
    }

    const lang = newChatState.user_language;

    // Check for medical keywords and escalate if found
    if (checkMedicalContext(userInput)) {
      return res.json({
        message: getTranslation(lang, "medical_warning"),
        quickReplies: [
          getTranslation(lang, "yes_handoff"),
          getTranslation(lang, "no_handoff"),
        ],
      });
    }

    // Check for human handoff requests
    const handoffKeywords = [
      "talk to human",
      "human expert",
      "talk to agent",
      "മനുഷ്യനോട് സംസാരിക്കണം",
      "എഡ്മിൻ",
      "വ്യക്തിയോട് സംസാരിക്കണം",
    ];
    if (handoffKeywords.some((kw) => userInput.includes(kw))) {
      return res.json({
        message: getTranslation(lang, "handoff_message"),
      });
    }

    // Start new flow
    if (!newChatState.currentFlow) {
      const flowMap: Record<string, string> = {
        "weight loss": "weight_loss",
        "weight gain": "weight_gain",
        workouts: "workouts",
        "diet questions": "diet",
        "ഭാരം കുറയ്ക്കൽ": "weight_loss",
        "ഭാരം വർദ്ധിപ്പിക്കൽ": "weight_gain",
        വ്യായാമം: "workouts",
        "ഭക്ഷണ ചോദ്യങ്ങൾ": "diet",
      };

      const selectedFlow = Object.entries(flowMap).find(([key]) =>
        userInput.includes(key.toLowerCase())
      );

      if (selectedFlow) {
        newChatState.currentFlow = selectedFlow[1];
        newChatState.slots = {};
        newChatState.collectedSlots = [];

        const flowGreetings: Record<string, string> = {
          weight_loss: "weight_loss_intro",
          weight_gain: "weight_gain_intro",
          workouts: "workouts_intro",
          diet: "diet_intro",
        };

        const slots = WEIGHT_LOSS_SLOTS;
        const nextSlot = slots[0];
        const greeting = getTranslation(lang, flowGreetings[newChatState.currentFlow]);
        const slotPrompt = getSlotPrompt(nextSlot, lang);

        return res.json({
          message: `${greeting}\n\n${slotPrompt}`,
          newChatState,
        });
      }

      // No flow selected, show menu again
      return res.json({
        message: getTranslation(lang, "invalid_flow"),
        
      });
    }

    // Collect slots
    const slots = WEIGHT_LOSS_SLOTS;
    const currentSlotIndex = newChatState.collectedSlots.length;
    const currentSlot = slots[currentSlotIndex];

    if (!currentSlot) {
      // All slots collected, generate plan
      const planData = generateWeightLossPlan(newChatState.slots);

      newChatState.currentFlow = null;
      newChatState.slots = {};
      newChatState.collectedSlots = [];

      return res.json({
        message: "Here's your personalized plan:",
        isPlan: true,
        planData,
        
        newChatState,
      });
    }

    // Validate current slot
    const validation = validateSlot(currentSlot, userInput);
    if (validation !== true) {
      return res.json({
        message: getTranslation(
          lang,
          currentSlot.includes("_cm") || currentSlot.includes("_kg")
            ? "invalid_number"
            : "invalid_input"
        ),
      });
    }

    // Store slot value
    if (userInput === "skip" || userInput === "ഒഴിവാക്കുക") {
      newChatState.slots[currentSlot] = "N/A";
    } else if (
      currentSlot.includes("_kg") ||
      currentSlot.includes("_cm") ||
      currentSlot === "age"
    ) {
      newChatState.slots[currentSlot] = parseFloat(userInput);
    } else {
      newChatState.slots[currentSlot] = userInput;
    }

    newChatState.collectedSlots.push(currentSlot);

    // Check if all slots are collected
    if (newChatState.collectedSlots.length === slots.length) {
      // Generate plan
      const planData = generateWeightLossPlan(newChatState.slots);

      newChatState.currentFlow = null;
      newChatState.slots = {};
      newChatState.collectedSlots = [];

      return res.json({
        message: "Here's your personalized plan:",
        isPlan: true,
        planData,
        
        newChatState,
      });
    }

    // Ask next slot
    const nextSlot = slots[newChatState.collectedSlots.length];
    const nextPrompt = getSlotPrompt(nextSlot, lang);

    return res.json({
      message: nextPrompt,
      newChatState,
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      message: "Something went wrong. Please try again!",
    });
  }
};
