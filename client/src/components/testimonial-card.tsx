import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  testId: string;
}

export default function TestimonialCard({ quote, name, title, testId }: TestimonialCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-6 sm:p-8 border-l-4 border-accent fade-in hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-500 transform hover:rotate-1 hover:shadow-blue-200/30">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="text-accent mr-2">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
          </svg>
        </div>
        <div className="flex text-accent">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 italic" data-testid={`text-${testId}-quote`}>
        "{quote}"
      </p>
      <div className="font-semibold text-primary-900 text-sm sm:text-base" data-testid={`text-${testId}-name`}>
        {name}
      </div>
      <div className="text-xs sm:text-sm text-gray-500" data-testid={`text-${testId}-title`}>
        {title}
      </div>
    </div>
  );
}
