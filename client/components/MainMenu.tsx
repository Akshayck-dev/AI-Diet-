interface MenuOption {
  id: string;
  emoji: string;
  title: string;
  description: string;
  benefits: string[];
  color: string;
  lang: "en" | "ml";
}

interface MainMenuProps {
  lang: "en" | "ml";
  onSelect: (option: string) => void;
}

const getMenuOptions = (lang: "en" | "ml"): MenuOption[] => {
  if (lang === "ml") {
    return [
      {
        id: "weight_loss",
        emoji: "🔥",
        title: "ഭാരം കുറയ്ക്കൽ",
        description: "ആരോഗ്യകരമായി നിങ്ങള��ടെ ലക്ഷ്യ ഭാരത്തിലേക്ക് എത്തുക",
        benefits: [
          "✓ ഡൈലി കലോരി ടാർഗെറ്റ്",
          "✓ ഇന്ത്യൻ ഭക്ഷണ പദ്ധതി",
          "✓ 4 ആഴ്ച വ്യായാമം",
        ],
        color: "from-red-400 to-orange-400",
        lang: "ml",
      },
      {
        id: "weight_gain",
        emoji: "💪",
        title: "ഭാരം വർദ്ധിപ്പിക്കൽ",
        description: "സ്വാസ്ഥ്യകരമായി പേശി വളർത്തുക ശക്തി നിർമാണം",
        benefits: [
          "✓ പ്രോട്ടീൻ ലക്ഷ്യം",
          "✓ പേശി വളർച്ച പദ്ധതി",
          "✓ ഭക്ഷണ സൂത്രവാക്യം",
        ],
        color: "from-green-400 to-teal-400",
        lang: "ml",
      },
      {
        id: "workouts",
        emoji: "🏋️",
        title: "വ്യായാമം",
        description: "നിങ്ങളുടെ ഫിറ്റനെസ് ലക്ഷ്യത്തിനായി വ്യായാമ പദ്ധതി",
        benefits: [
          "��� വീട്ടിൽ സുരക്ഷിത വ്യായാമം",
          "✓ ജിം ബികൾപ്പ്",
          "✓ ആരോഗ്യകരമായ നിരാകരണം",
        ],
        color: "from-purple-400 to-pink-400",
        lang: "ml",
      },
      {
        id: "diet",
        emoji: "🍽️",
        title: "ഭക്ഷണ ചോദ്യങ്ങൾ",
        description: "നിങ്ങളുടെ ലക്ഷ്യങ്ങൾക്കായി ഭക്ഷണ ആരോഗ്യ പദ്ധതി",
        benefits: [
          "✓ ഭക്ഷണ ചട്ടക്കൂട്",
          "✓ സകലവസ്തു പട്ടിക",
          "✓ ബജറ്റ് നിയോജന",
        ],
        color: "from-amber-400 to-yellow-400",
        lang: "ml",
      },
    ];
  }

  return [
    {
      id: "weight_loss",
      emoji: "🔥",
      title: "Weight Loss",
      description: "Reach your target weight safely and healthily",
      benefits: [
        "✓ Daily calorie target",
        "✓ Personalized meal plan",
        "✓ 4-week workout plan",
      ],
      color: "from-red-400 to-orange-400",
      lang: "en",
    },
    {
      id: "weight_gain",
      emoji: "💪",
      title: "Weight Gain",
      description: "Build healthy muscle and strength",
      benefits: [
        "✓ Protein target",
        "✓ Muscle-building plan",
        "✓ Meal formula",
      ],
      color: "from-green-400 to-teal-400",
      lang: "en",
    },
    {
      id: "workouts",
      emoji: "🏋️",
      title: "Workouts",
      description: "Get fit with a plan that works for you",
      benefits: [
        "✓ Home-safe exercises",
        "✓ Gym option available",
        "✓ Weekly schedule",
      ],
      color: "from-purple-400 to-pink-400",
      lang: "en",
    },
    {
      id: "diet",
      emoji: "🍽️",
      title: "Diet Questions",
      description: "Smart eating plan for your health goals",
      benefits: [
        "✓ Meal framework",
        "✓ Grocery list",
        "✓ Budget-friendly tips",
      ],
      color: "from-amber-400 to-yellow-400",
      lang: "en",
    },
  ];
};

export default function MainMenu({ lang, onSelect }: MainMenuProps) {
  const options = getMenuOptions(lang as "en" | "ml");

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.title)}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-90 group-hover:opacity-100 transition-opacity`}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-3">
              {/* Icon */}
              <div className="text-5xl md:text-6xl">{option.emoji}</div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {option.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-white/95 leading-relaxed">
                {option.description}
              </p>

              {/* Benefits */}
              <div className="pt-2 space-y-1">
                {option.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="text-xs md:text-sm text-white/90 font-medium"
                  >
                    {benefit}
                  </div>
                ))}
              </div>

              {/* CTA Arrow */}
              <div className="pt-2 flex items-center gap-2 text-white font-semibold text-sm md:text-base">
                <span>Get Started</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        ))}
      </div>
    </div>
  );
}
