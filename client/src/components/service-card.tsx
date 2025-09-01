interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  testId: string;
}

export default function ServiceCard({ title, subtitle, description, image, testId }: ServiceCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-500 transform hover:rotate-1 hover:shadow-blue-200/30 group fade-in">
      {image && (
        <div className="mb-4 sm:mb-6">
          <img 
            src={image} 
            alt={`${title} service`} 
            className="w-full h-32 sm:h-48 object-cover rounded-lg sm:rounded-xl shadow-md" 
          />
        </div>
      )}
      <h3 className="text-xl sm:text-2xl font-bold text-primary-900 mb-3 sm:mb-4" data-testid={`text-${testId}-title`}>
        {title}
      </h3>
      <div className="text-xs sm:text-sm font-semibold text-accent mb-3 sm:mb-4 italic" data-testid={`text-${testId}-subtitle`}>
        {subtitle}
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed" data-testid={`text-${testId}-description`}>
        {description}
      </p>
      {/* The Learn More button was removed, so this section is now empty */}
    </div>
  );
}
