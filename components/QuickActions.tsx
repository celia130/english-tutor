"use client";

const ACTIONS = [
  {
    label: "语法纠错",
    icon: "✓",
    example: "He go to school yesterday.",
  },
  {
    label: "词汇解释",
    icon: "📖",
    example: "challenge 是什么意思？",
  },
  {
    label: "作文批改",
    icon: "✏️",
    example: "I think study English is important. It can help us get good job. Many people learn English every day.",
  },
];

interface QuickActionsProps {
  onSelect: (text: string) => void;
  disabled: boolean;
}

export default function QuickActions({ onSelect, disabled }: QuickActionsProps) {
  return (
    <div className="flex gap-2 px-4 pb-3 flex-wrap justify-center">
      {ACTIONS.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.example)}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
}
