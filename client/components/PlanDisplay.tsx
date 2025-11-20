import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface DayMeal {
  day: string;
  meals: {
    name: string;
    items: string[];
    calories: number;
  }[];
}

interface PlanDisplayProps {
  title: string;
  emoji: string;
  dailyCalories: number;
  dailyProtein: number;
  mealPlan: DayMeal[];
  workoutPlan: string;
  groceryList: {
    item: string;
    amount: string;
    price: string;
  }[];
  tips: string[];
  closing: string;
}

export default function PlanDisplay({
  title,
  emoji,
  dailyCalories,
  dailyProtein,
  mealPlan,
  workoutPlan,
  groceryList,
  tips,
  closing,
}: PlanDisplayProps) {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(
    new Set(["Day 1"]),
  );

  const toggleDay = (day: string) => {
    const updated = new Set(expandedDays);
    if (updated.has(day)) {
      updated.delete(day);
    } else {
      updated.add(day);
    }
    setExpandedDays(updated);
  };

  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-5xl">{emoji}</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {title}
        </h2>
        <p className="text-gray-600">
          Your personalized 4-week transformation plan
        </p>
      </div>

      {/* Daily Targets */}
      <div className="bg-white rounded-xl p-6 border-2 border-primary">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📊</span> Daily Targets
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">Daily Calories</p>
            <p className="text-2xl font-bold text-red-600">
              {dailyCalories} kcal
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">Protein Target</p>
            <p className="text-2xl font-bold text-green-600">{dailyProtein}g</p>
          </div>
          <div className="col-span-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-4">
            <p className="text-sm text-gray-600">Daily Hydration</p>
            <p className="text-2xl font-bold text-blue-600">3 Liters Water</p>
          </div>
        </div>
      </div>

      {/* 7-Day Meal Plan */}
      <div className="bg-white rounded-xl p-6 border-2 border-secondary">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🍽️</span> 7-Day Meal Plan
        </h3>
        <div className="space-y-3">
          {mealPlan.map((dayPlan) => (
            <div
              key={dayPlan.day}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleDay(dayPlan.day)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-colors"
              >
                <span className="font-semibold text-gray-800">
                  {dayPlan.day}
                </span>
                {expandedDays.has(dayPlan.day) ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {expandedDays.has(dayPlan.day) && (
                <div className="p-4 space-y-3 bg-white border-t border-gray-200">
                  {dayPlan.meals.map((meal, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-700">
                          {meal.name}
                        </h4>
                        <span className="text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                          {meal.calories} cal
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1 ml-2">
                        {meal.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200 mt-3">
                    <p className="text-sm font-semibold text-gray-700">
                      💡 Tip: Eat slowly, drink water with meals, enjoy every
                      bite!
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Workout Plan */}
      <div className="bg-white rounded-xl p-6 border-2 border-accent">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>💪</span> 4-Week Workout Plan
        </h3>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 space-y-3">
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {workoutPlan}
          </p>
          <div className="text-xs text-gray-600 bg-white rounded px-3 py-2 mt-3">
            ✨ No gym needed! All exercises can be done at home with your
            bodyweight.
          </div>
        </div>
      </div>

      {/* Grocery List */}
      <div className="bg-white rounded-xl p-6 border-2 border-primary/50">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🛒</span> 1-Week Grocery List
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {groceryList.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-800">{item.item}</p>
                <p className="text-xs text-gray-600">{item.amount}</p>
              </div>
              <span className="text-primary font-bold">{item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-xl p-6 border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>⚡</span> Safety & Habit Tips
        </h3>
        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-primary">
                {idx + 1}
              </div>
              <p className="text-gray-700 pt-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Message */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white text-center space-y-3">
        <p className="text-lg font-bold">{closing}</p>
        <div className="flex justify-center gap-2">
          <span>🎯</span>
          <span>💚</span>
          <span>🔥</span>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-xl p-4 text-center border-2 border-blue-200">
        <p className="text-sm text-gray-700">
          ✨ <strong>Pro Tip:</strong> Save this plan! You can take a screenshot
          or download it for reference.
        </p>
      </div>
    </div>
  );
}
