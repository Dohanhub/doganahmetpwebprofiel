import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Target, TrendingUp } from "lucide-react";

export default function ExecutiveCoaching() {
  const benefits = [
    "Develop authentic leadership presence and impact",
    "Master strategic thinking and decision-making",
    "Build high-performing, aligned teams",
    "Navigate complex organizational challenges",
    "Create sustainable change that drives results",
    "Enhance emotional intelligence and communication"
  ];

  const approach = [
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "360-Degree Assessment",
      description: "Comprehensive evaluation of your leadership style, strengths, and growth opportunities through stakeholder feedback."
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: "Personalized Development Plan",
      description: "Custom coaching program designed around your specific challenges, goals, and organizational context."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
      title: "Ongoing Support & Accountability",
      description: "Regular coaching sessions with practical tools, frameworks, and accountability to ensure lasting transformation."
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
                Digital Transformation & Strategy
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                IT modernization, Smart Cities, IoT/Cloud Solutions, aligning tech initiatives with business goals and Vision 2030 objectives. Transform your organization's digital landscape with proven methodologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" data-testid="button-start-coaching">
                  <Button className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold">
                    Begin Your Digital Transformation
                  </Button>
                </Link>
                <Link href="/testimonials" data-testid="button-view-success-stories">
                  <Button variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 text-lg font-semibold">
                    View Success Stories
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Executive coaching session in modern office" 
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
              Designed for C-Suite & Senior Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-for-whom-subtitle">
              Perfect for CEOs, COOs, VPs, and other senior executives who want to elevate their leadership impact and drive meaningful organizational change.
            </p>
          </div>
          
          <div className="bg-accent/10 rounded-2xl p-8 text-center">
            <div className="text-sm font-semibold text-accent mb-4 italic" data-testid="text-target-audience">
              Specifically for C-suites and senior managers
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-target-description">
              Whether you're a newly promoted executive, a seasoned leader facing new challenges, or someone preparing for the next level of responsibility, executive coaching provides the personalized support and strategic insights you need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-benefits-title">
              What You'll Achieve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-benefits-subtitle">
              Through our coaching partnership, you'll develop the skills, mindsets, and strategies needed to excel as an executive leader.
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
              My Coaching Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-approach-subtitle">
              A proven methodology that combines assessment, planning, and ongoing support to create lasting leadership transformation.
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Transform Your Leadership?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8" data-testid="text-cta-subtitle">
            Take the first step toward becoming the executive leader your organization needs. Schedule a consultation to discuss your goals and challenges.
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
