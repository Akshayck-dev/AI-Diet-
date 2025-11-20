import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MainMenu from "@/components/MainMenu";
import PlanDisplay from "@/components/PlanDisplay";
import StartAgain from "@/components/StartAgain";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  isMainMenu?: boolean;
  isPlan?: boolean;
  planData?: any;
}

interface ChatState {
  currentFlow: string | null;
  slots: Record<string, string | number>;
  collectedSlots: string[];
  user_language: string | null;
}

const INITIAL_GREETING = {
  id: "initial",
  role: "assistant" as const,
  content: "Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
  timestamp: new Date(),
  quickReplies: ["English 🇬🇧", "Malayalam 🇮🇳"],
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    currentFlow: null,
    slots: {},
    collectedSlots: [],
    user_language: null,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickReply = async (reply: string) => {
    await sendMessage(reply);
  };

  const handleStartAgain = () => {
    // Reset flow but keep language
    setChatState({
      currentFlow: null,
      slots: {},
      collectedSlots: [],
      user_language: chatState.user_language,
    });

    // Add a bot message showing the menu again
    const menuMessage: Message = {
      id: (Date.now() + Math.random()).toString(),
      role: "assistant",
      content: "Ready for another plan? Choose an option below! 💚",
      timestamp: new Date(),
      isMainMenu: true,
    };

    setMessages((prev) => [...prev, menuMessage]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input);
  };

  const sendMessage = async (userInput: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userInput,
          chatState: chatState,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Update chat state based on response
      if (data.newChatState) {
        setChatState(data.newChatState);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
        quickReplies: data.quickReplies,
        isMainMenu: data.isMainMenu,
        isPlan: data.isPlan,
        planData: data.planData,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary shadow-lg px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2 shadow-md">
              <span className="text-2xl sm:text-3xl">💪</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                FitCoach
              </h1>
              <p className="text-white/90 text-xs sm:text-sm">
                Your personal fitness & wellness assistant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-3">
              <div
                className={cn("flex gap-3 animate-slide-in-up", {
                  "justify-end": message.role === "user",
                })}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                      <span className="text-lg sm:text-xl">💚</span>
                    </div>
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow-sm",
                    {
                      "bg-white text-foreground rounded-bl-none":
                        message.role === "assistant",
                      "bg-gradient-to-r from-primary to-secondary text-white rounded-br-none":
                        message.role === "user",
                    },
                  )}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent flex items-center justify-center shadow-md">
                      <span className="text-lg sm:text-xl">😊</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Plan Display with Start Again Button */}
              {message.role === "assistant" &&
                message.isPlan &&
                message.planData && (
                  <div className="ml-0 sm:ml-12 mt-4 space-y-4">
                    <PlanDisplay
                      title={message.planData.title}
                      emoji={message.planData.emoji}
                      dailyCalories={message.planData.dailyCalories}
                      dailyProtein={message.planData.dailyProtein}
                      mealPlan={message.planData.mealPlan}
                      workoutPlan={message.planData.workoutPlan}
                      groceryList={message.planData.groceryList}
                      tips={message.planData.tips}
                      closing={message.planData.closing}
                    />
                    <StartAgain onRestart={handleStartAgain} />
                  </div>
                )}

              {/* Main Menu Cards */}
              {message.role === "assistant" &&
                message.isMainMenu &&
                !message.isPlan && (
                  <div className="ml-0 sm:ml-12 mt-4">
                    <MainMenu
                      lang={chatState.user_language as "en" | "ml"}
                      onSelect={handleQuickReply}
                    />
                  </div>
                )}

              {/* Quick Replies */}
              {message.role === "assistant" &&
                message.quickReplies &&
                !message.isMainMenu && (
                  <div className="flex flex-wrap gap-2 ml-0 sm:ml-12">
                    {message.quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        disabled={isLoading}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border-2 border-primary text-primary rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-white transition-all disabled:opacity-50 shadow-sm"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                  <span className="text-lg sm:text-xl">💚</span>
                </div>
              </div>
              <div className="bg-white text-foreground px-4 py-3 rounded-lg rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-border px-4 sm:px-6 py-4 sm:py-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 sm:py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-background text-foreground placeholder-muted-foreground disabled:opacity-50 text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 disabled:from-muted disabled:to-muted disabled:cursor-not-allowed text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:shadow-none"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
