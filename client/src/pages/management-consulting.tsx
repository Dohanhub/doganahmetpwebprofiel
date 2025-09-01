import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Building, Users, BarChart3 } from "lucide-react";

export default function ManagementConsulting() {
  const benefits = [
    "Align strategy and operational execution",
    "Improve organizational effectiveness and efficiency",
    "Develop leadership team cohesion and capability",
    "Create sustainable change management processes",
    "Enhance mission delivery and impact measurement",
    "Build resilient organizational culture"
  ];

  const approach = [
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
      title: "Organizational Assessment",
      description: "Comprehensive analysis of your current state, challenges, and opportunities for improvement across all organizational functions."
    },
    {
      icon: <Building className="w-8 h-8 text-primary-600" />,
      title: "Strategic Alignment",
      description: "Develop and implement strategies that align your leadership team, operations, and culture with your mission and goals."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Change Implementation",
      description: "Guide your organization through transformation with proven change management methodologies and ongoing support."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 leading-tight" data-testid="text-hero-title">
                Management Consulting for Organizational Excellence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                Devise and lead change in response to intractable organizational challenges, aligning strategy and function for mission delivery. Transform your leadership team's effectiveness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" data-testid="button-start-consulting">
                  <Button className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold">
                    Start Your Transformation
                  </Button>
                </Link>
                <Link href="/testimonials" data-testid="button-view-case-studies">
                  <Button variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 text-lg font-semibold">
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Management consulting team meeting" 
                className="w-full rounded-2xl shadow-2xl"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-for-whom-title">
              Designed for Nonprofit Leadership Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-for-whom-subtitle">
              Perfect for nonprofit organizations facing complex challenges that require strategic thinking, organizational change, and leadership team development.
            </p>
          </div>
          
          <div className="bg-accent/10 rounded-2xl p-8 text-center">
            <div className="text-sm font-semibold text-accent mb-4 italic" data-testid="text-target-audience">
              Specifically for nonprofit leadership teams
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-target-description">
              Whether you're scaling operations, navigating organizational transitions, improving team effectiveness, or facing strategic challenges, management consulting provides the external perspective and proven methodologies needed to drive sustainable change.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-benefits-title">
              Organizational Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-benefits-subtitle">
              Through our consulting partnership, your organization will develop the systems, processes, and capabilities needed for sustained excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                <span className="text-lg text-gray-700" data-testid={`text-benefit-${index}`}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-approach-title">
              My Consulting Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-approach-subtitle">
              A systematic methodology that combines assessment, strategic planning, and implementation support to create lasting organizational transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {approach.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4" data-testid={`text-approach-step-${index}-title`}>
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" data-testid={`text-approach-step-${index}-description`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-challenges-title">
              Common Challenge Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12" data-testid="text-challenges-subtitle">
              Organizations typically seek management consulting support when facing these critical challenges:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-1-title">
                Strategic Misalignment
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-1-description">
                When organizational structure, processes, and culture don't support strategic goals and mission delivery.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-2-title">
                Leadership Team Dysfunction
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-2-description">
                When leadership teams struggle with communication, decision-making, or collaborative effectiveness.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-3-title">
                Organizational Change
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-3-description">
                When facing major transitions, restructuring, or scaling that requires systematic change management.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-4-title">
                Performance Issues
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-4-description">
                When organizational performance, efficiency, or impact measurement systems need improvement.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-5-title">
                Cultural Challenges
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-5-description">
                When organizational culture doesn't support mission, values, or desired performance outcomes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-challenge-6-title">
                Resource Optimization
              </h3>
              <p className="text-gray-600" data-testid="text-challenge-6-description">
                When organizations need to maximize impact with limited resources and improve operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8" data-testid="text-cta-subtitle">
            Let's discuss how management consulting can help your leadership team navigate challenges and achieve your mission more effectively.
          </p>
          <Link href="/contact" data-testid="button-schedule-consultation-cta">
            <Button className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold">
              Schedule Your Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
