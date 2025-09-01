import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Shield, Target, Users } from "lucide-react";

export default function BoardConsulting() {
  const benefits = [
    "Clarify board roles and responsibilities",
    "Improve governance structures and processes",
    "Enhance strategic oversight and decision-making",
    "Strengthen board-staff relationships",
    "Optimize meeting effectiveness and engagement",
    "Develop sustainable succession planning"
  ];

  const approach = [
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Governance Assessment",
      description: "Comprehensive evaluation of current board structure, processes, and effectiveness to identify improvement opportunities."
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: "Strategic Focus",
      description: "Help boards concentrate on high-value activities that provide maximum organizational benefit and strategic oversight."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Board Development",
      description: "Ongoing training and support to enhance board member skills, engagement, and collective effectiveness."
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
                Board Consulting for Governance Excellence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                Sharpen focus on those activities and areas that deliver the absolute highest value to management of the organization. Maximize board effectiveness and governance impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" data-testid="button-enhance-governance">
                  <Button className="bg-success hover:bg-success/90 text-success-foreground px-8 py-4 text-lg font-semibold">
                    Enhance Your Governance
                  </Button>
                </Link>
                <Link href="/testimonials" data-testid="button-view-board-success">
                  <Button variant="outline" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-8 py-4 text-lg font-semibold">
                    View Board Success Stories
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Board of directors meeting" 
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
              Designed for Nonprofit Boards of Directors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-for-whom-subtitle">
              Perfect for nonprofit boards seeking to maximize their governance effectiveness, strategic impact, and organizational value.
            </p>
          </div>
          
          <div className="bg-accent/10 rounded-2xl p-8 text-center">
            <div className="text-sm font-semibold text-accent mb-4 italic" data-testid="text-target-audience">
              Specifically for nonprofit boards of directors
            </div>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="text-target-description">
              Whether you're a new board looking to establish strong governance practices, an established board seeking to improve effectiveness, or a board facing specific challenges, our consulting provides the expertise and tools needed for governance excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-benefits-title">
              Governance Outcomes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-benefits-subtitle">
              Through our board consulting partnership, your board will develop the clarity, focus, and effectiveness needed for exceptional governance.
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
              My Board Consulting Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-approach-subtitle">
              A focused methodology that enhances board effectiveness through assessment, strategic alignment, and ongoing development.
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

      {/* Common Issues Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-issues-title">
              Common Board Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12" data-testid="text-issues-subtitle">
              Boards typically seek consulting support when experiencing these governance challenges:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-1-title">
                Role Confusion
              </h3>
              <p className="text-gray-600" data-testid="text-issue-1-description">
                Unclear boundaries between board governance responsibilities and staff operational duties.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-2-title">
                Ineffective Meetings
              </h3>
              <p className="text-gray-600" data-testid="text-issue-2-description">
                Board meetings that lack focus, strategic discussion, or meaningful decision-making processes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-3-title">
                Strategic Drift
              </h3>
              <p className="text-gray-600" data-testid="text-issue-3-description">
                Boards that get caught up in operational details rather than providing strategic oversight.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-4-title">
                Low Engagement
              </h3>
              <p className="text-gray-600" data-testid="text-issue-4-description">
                Board members who are disengaged, unprepared, or unclear about their contribution.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-5-title">
                Succession Planning
              </h3>
              <p className="text-gray-600" data-testid="text-issue-5-description">
                Lack of systematic approach to board recruitment, development, and leadership transition.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-3" data-testid="text-issue-6-title">
                Performance Measurement
              </h3>
              <p className="text-gray-600" data-testid="text-issue-6-description">
                Inadequate systems for measuring organizational performance and board effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-value-title">
              Focus on Highest-Value Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12" data-testid="text-value-subtitle">
              Effective boards concentrate their time and energy on activities that provide the greatest organizational benefit:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-4" data-testid="text-value-strategic-title">
                Strategic Oversight
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li data-testid="text-value-strategic-1">• Strategic planning and direction setting</li>
                <li data-testid="text-value-strategic-2">• Performance monitoring and evaluation</li>
                <li data-testid="text-value-strategic-3">• Risk assessment and management</li>
                <li data-testid="text-value-strategic-4">• Resource allocation decisions</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-primary-900 mb-4" data-testid="text-value-governance-title">
                Governance Excellence
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li data-testid="text-value-governance-1">• Executive leadership oversight</li>
                <li data-testid="text-value-governance-2">• Policy development and compliance</li>
                <li data-testid="text-value-governance-3">• Stakeholder accountability</li>
                <li data-testid="text-value-governance-4">• Organizational sustainability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Elevate Your Board's Impact?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8" data-testid="text-cta-subtitle">
            Let's discuss how board consulting can help your board focus on high-value activities and maximize organizational impact.
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
