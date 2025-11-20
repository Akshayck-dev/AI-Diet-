type LanguageCode = "en" | "ml";

type TranslationKey = string;

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  en: {
    // Language selection
    choose_language: "Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
    language_selected_en: "Great! I'll help you in English. 💚",
    language_selected_ml: "Great! I'll help you in Malayalam. 💚",
    language_switched_en: "Switched to English! What can I help you with?",
    language_switched_ml:
      "Malayalam-ലേക്ക് മാറി! എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയുമോ?",

    // Main menu
    main_menu: "What would you like help with today?",
    weight_loss_btn: "Weight loss",
    weight_gain_btn: "Weight gain",
    workouts_btn: "Workouts",
    diet_btn: "Diet questions",

    // Weight loss/gain prompts
    weight_loss_intro:
      "Great! Let's create your weight loss plan. I'll ask a few quick questions to personalize it for you. 💚",
    weight_gain_intro:
      "Awesome! Let's build a healthy weight gain plan. I'll ask a few questions to customize it. 💪",
    ask_current_weight: "What's your current weight (in kg)? E.g., 75",
    ask_target_weight: "What's your target weight (in kg)? E.g., 65",
    ask_height: "What's your height (in cm)? E.g., 170",
    ask_wrist:
      "What's your wrist circumference (in cm)? Or type 'skip' to skip.",
    ask_age: "How old are you?",
    ask_gender: "What's your gender? (Reply: male, female, or other)",
    ask_activity_level:
      "Activity level? (Reply: sedentary, light, moderate, or active)",
    ask_food_pref:
      "Food preference? (Reply: vegetarian, non-vegetarian, or mixed)",
    ask_allergies:
      "Any food allergies? (E.g., peanuts, gluten) or 'none' if no allergies.",

    // Workouts prompts
    workouts_intro:
      "Perfect! Let's design a workout routine for you. A few questions coming up... 🔥",
    ask_fitness_goal:
      "What's your fitness goal? (E.g., build muscle, lose fat, improve stamina)",
    ask_gym_access: "Do you have gym access? (Reply: yes or no)",
    ask_health_issues:
      "Any injuries or health concerns? (E.g., knee pain, back issues) or 'none'.",

    // Diet prompts
    diet_intro:
      "Excellent! Let's create a diet plan that fits your lifestyle. Quick questions incoming... 🍽️",
    ask_main_goal:
      "What's your main goal? (E.g., lose weight, gain muscle, eat healthy, manage energy)",
    ask_budget: "Budget per month? (E.g., ₹3000, ₹5000) or 'flexible'.",

    // Validation
    invalid_number: "Please enter a number only.",
    invalid_input: "I didn't understand that. Please try again.",

    // Medical
    medical_warning:
      "I can give general healthy-lifestyle tips but not medical advice. Please consult a doctor. Would you like me to connect you to a human expert?",
    yes_handoff: "Yes, connect me",
    no_handoff: "No thanks",

    // Handoff
    handoff_message:
      "📞 An expert will contact you soon. We've noted your request. Meanwhile, feel free to ask any other questions!",

    // Language switch
    language_switch_prompt:
      "I didn't catch that. Please choose English or Malayalam.",
    invalid_flow: "I didn't catch that. What would you like help with?",

    // Final plan options
    plan_ready: "Is there anything else I can help you with?",
    ask_format: "Would you like this as a PDF or WhatsApp-friendly version?",
    pdf_option: "PDF please",
    whatsapp_option: "WhatsApp version",

    // Plan headers
    daily_targets: "📊 Daily Targets:",
    meal_plan: "🍽️ 7-Day Sample Meal Plan (Day 1):",
    workout_plan: "💪 4-Week Workout Plan (Home-First):",
    grocery_list: "🛒 1-Week Grocery List:",
    safety_tips: "⚡ Safety & Habit Tips:",
    closing:
      "💚 You've got this! Start today, see results in 4 weeks. Small steps = big changes!",
  },

  ml: {
    // Language selection
    choose_language: "Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
    language_selected_en: "മികച്ചത്! ഞാൻ ഇംഗ്ലീഷിൽ നിങ്ങളെ സഹായിക്കും. 💚",
    language_selected_ml: "മികച്ചത്! ഞാൻ മലയാളത്ത���ൽ നിങ്ങളെ സഹായിക്കും. 💚",
    language_switched_en:
      "ഇംഗ്ലീഷിലേക്ക് മാറി! എനിക്ക് എന്തെങ്കിലും സഹായിക്കാൻ കഴിയുമോ?",
    language_switched_ml:
      "മലയാളത്തിലേക്ക് മാറി! എനിക്ക് നിങ്ങളെ സഹായിക്കാൻ കഴിയുമോ?",

    // Main menu
    main_menu: "ഇന്ന് നിങ്ങൾക്ക് എന്ത് സഹായം വേണ്ടി ഉണ്ട്?",
    weight_loss_btn: "ഭാരം കുറയ്ക്കൽ",
    weight_gain_btn: "ഭാരം വർദ്ധിപ്പിക്കൽ",
    workouts_btn: "വ്യായാമം",
    diet_btn: "ഭക്ഷണ ചോദ്യങ്ങൾ",

    // Weight loss/gain prompts
    weight_loss_intro:
      "മികച്ചത്! നിങ്ങളുടെ ഭാരം കുറയ്ക്കൽ പദ്ധതി സൃഷ്ടിക്കാം. നിങ്ങൾക്കായി ഇത് കാസ്റ്റമൈസ് ചെയ്യാൻ ഞാൻ കുറച്ച് ചോദ്യങ്ങൾ ചോദിക്കും. 💚",
    weight_gain_intro:
      "അടുത്തത്! നിങ്ങളുടെ ഭാരം വർദ്ധിപ്പിക്കാൻ ഒരു ആരോഗ്യകരമായ പദ്ധതി നിർമ്മിക്കാം. കുറച്ച് ചോദ്യങ്ങൾ ഉണ്ട്. 💪",
    ask_current_weight: "നിങ്ങളുടെ നിലവിലെ ഭാരം എത്ര കിലോ ഗ്രാമാണ്? ഉദാ: 75",
    ask_target_weight: "നിങ്ങളുടെ ലക്ഷ്യ ഭാരം എത്ര കിലോ ഗ്രാമാണ്? ഉദാ: 65",
    ask_height: "നിങ്ങളുടെ ഉയരം എത്ര സെന്റിമീറ്ററാണ്? ഉദാ: 170",
    ask_wrist:
      "നിങ്ങളുടെ കൈത്തണ്ടയുടെ ചുറ്റളവ് എത്ര സെന്റിമീറ്ററാണ്? അല്ലെങ്കിൽ 'ഒഴിവാക്കുക' എന്ന് ടൈപ്പ് ചെയ്യുക.",
    ask_age: "നിങ്ങളുടെ പ്രായം എത്ര?",
    ask_gender:
      "നിങ്ങളുടെ ലിംഗം എന്ത്? (ഉത്തരം: പുരുഷൻ, സ്ത്രീ അല്ലെങ്കിൽ മറ്റ്)",
    ask_activity_level:
      "പ്രവർത്തന നിലവാരം? (ഉത്തരം: നിശ്ചലത, ഹൽകാ, മധ്യമ അല്ലെങ്കിൽ സജീവ)",
    ask_food_pref:
      "ഭക്ഷണ മുൻഗണന? (ഉത്തരം: ശാകാഹാരി, നോൺ-വെജ്, അല്ലെങ്കിൽ മിശ്രിതം)",
    ask_allergies:
      "ഭക്ഷണ ജനിതകതകൾ ഉണ്ടോ? (ഉദാ: കടലാ, ഗ്ലൂറ്റൻ) അല്ലെങ്കിൽ 'ഒന്നുമില്ല'.",

    // Workouts prompts
    workouts_intro:
      "അനുയോജ്യം! നിങ്ങൾക്കായി ഒരു വ്യായാമ പരിപാടി ഡിസൈൻ ചെയ്യാം. കുറച്ച് ചോദ്യങ്ങൾ വരുന്നു... 🔥",
    ask_fitness_goal:
      "നിങ്ങളുടെ ഫിറ്റനെസ് ലക്ഷ്യം എന്താണ്? (ഉദാ: പേശി വളർത്തുക, കൊഴുപ്പ് കുറയ്ക്കുക, സഹന ശേഷി മെച്ചപ്പെടുത്തുക)",
    ask_gym_access:
      "നിങ്ങൾക്ക��� ജിം ആക്സസ്സ് ഉണ്ടോ? (ഉത്തരം: അതെ അല്ലെങ്കിൽ നിരാകരണം)",
    ask_health_issues:
      "പരിക്കുകൾ അല്ലെങ്കിൽ ആരോഗ്യ ചിന്താഗണങ്ങൾ ഉണ്ടോ? (ഉദാ: നട്ടെല്ലിന്റെ വേദന, പിന്നിലെ പ്രശ്നങ്ങൾ) അല്ലെങ്കിൽ 'ഒന്നുമില്ല'.",

    // Diet prompts
    diet_intro:
      "മികച്ചത്! നിങ്ങളുടെ ജീവനാഡിക്കേ അനുയോജ്യമായ ഭക്ഷണ പദ്ധതി സൃഷ്ടിക്കാം. കുറച്ച് ചോദ്യങ്ങൾ വരുന്നു... 🍽️",
    ask_main_goal:
      "നിങ്ങളുടെ പ്രധാന ലക്ഷ്യം എന്താണ്? (ഉദാ: ഭാരം കുറയ്ക്കുക, പേശി വളർത്തുക, ആരോഗ്യകരമായി കഴിയുക, ഊർജ്ജ നിലവാരം നിയന്ത്രിക്കുക)",
    ask_budget: "പ്രതിമാസ ബജറ്റ്? (ഉദാ: ₹3000, ₹5000) അല്ലെങ്കിൽ 'വഴക്കമാണ്'.",

    // Validation
    invalid_number: "ദയവായി നമ്പർ മാത്രം നൽകൂ.",
    invalid_input: "എനിക്കത് മനസ്സിലായില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക.",

    // Medical
    medical_warning:
      "ഞാൻ പൊതുവായ ആരോഗ്യ നിർദ്ദേശങ്ങൾ മാത്രം നൽകും. മെഡിക്കൽ ഉപദേശം വേണ്ടെങ്കിൽ ഡോക്ടറെ സമീപിക്കുക. എനിക്ക് നിങ്ങളെ മനുഷ്യ വിദഗ്ധനോട് ബന്ധിപ്പിക്കാൻ കഴിയുമോ?",
    yes_handoff: "അതെ, ബന്ധിപ്പിക്കുക",
    no_handoff: "നന്ദി, വേണ്ട",

    // Handoff
    handoff_message:
      "📞 ഒരു വിദഗ്ധൻ ഉടനെ നിങ്ങളെ ബന്ധപ്പെടും. നിങ്ങളുടെ അഭ്യർത്ഥന രേഖപ്പെടുത്തിയിരിക്കുന്നു. അതിനിടയിൽ, നിങ്ങൾക്കായി മറ്റ് ചോദ്യങ്ങൾ ചോദിക്��ാൻ സ്വാഗതമാണ്!",

    // Language switch
    language_switch_prompt:
      "എനിക്കത് മനസ്സിലായില്ല. ദയവായി ഇംഗ്ലീഷ് അല്ലെങ്കിൽ മലയാളം തിരഞ്ഞെടുക്കുക.",
    invalid_flow:
      "എനിക്കത് മനസ്സിലായില്ല. നിങ്ങൾക്ക് എന്ത് സഹായം വേണ്ടി ഉണ്ട്?",

    // Final plan options
    plan_ready: "കൂടുതൽ എന്തെങ്കിലും സഹായിക്കാൻ ഞാൻ കഴിയുമോ?",
    ask_format:
      "നിങ്ങൾ ഇത് PDF അല്ലെങ്കിൽ വാട്സാപ്പ് സ്കരണമായി ആഗ്രഹിക്കുന്നോ?",
    pdf_option: "PDF ദയവായി",
    whatsapp_option: "വാട്സാപ്പ് ചെരിയുക",

    // Plan headers
    daily_targets: "📊 ദൈനിക ലക്ഷ്യങ്ങൾ:",
    meal_plan: "🍽️ 7-ദിന സാധാരണ ഭക്ഷണ പദ്ധതി (ദിനം 1):",
    workout_plan: "💪 4-ആഴ്ച വ്യായാമ പദ്ധതി (പ്ര��ഥമികമായി വീട്ടിൽ):",
    grocery_list: "🛒 1-ആഴ്ച സകലവസ്തു പട്ടിക:",
    safety_tips: "⚡ സുരക്ഷ & ശീലം നിർദ്ദേശങ്ങൾ:",
    closing:
      "💚 നിങ്ങൾക്ക് ഇത് കഴിയും! ഇന്ന് തുടങ്ങുക, 4 ആഴ്ചയിൽ ഫലങ്ങൾ കാണുക. ചെറിയ ഘട്ടങ്ങൾ = വലിയ മാറ്റങ്ങൾ!",
  },
};

export const getTranslation = (
  lang: string | null,
  key: TranslationKey,
): string => {
  const language = (
    lang === "en" || lang === "ml" ? lang : "en"
  ) as LanguageCode;
  return translations[language]?.[key] || key;
};

export const isValidLanguage = (lang: string): boolean => {
  return lang === "en" || lang === "ml";
};

export const getLanguageFromInput = (input: string): string | null => {
  const lower = input.toLowerCase();
  if (lower.includes("english") || lower.includes("🇬🇧") || lower === "en") {
    return "en";
  }
  if (
    lower.includes("malayalam") ||
    lower.includes("മലയാളം") ||
    lower.includes("🇮🇳") ||
    lower === "ml"
  ) {
    return "ml";
  }
  return null;
};
