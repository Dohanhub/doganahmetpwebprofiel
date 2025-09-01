import { Mail } from 'lucide-react';
import ContactForm from '@/components/contact-form';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-hero-title">
              Ready to Transform Your Digital Future?
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8" data-testid="text-hero-subtitle">
              Let's discuss how we can drive your digital transformation initiatives and accelerate your Vision 2030 alignment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8" data-testid="text-contact-info-title">Get in Touch</h2>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm text-primary-200" data-testid="text-email-label">Email</div>
                    <div className="text-lg" data-testid="text-email-value">info@doganahmet.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-consultation-title">
              What to Expect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-consultation-subtitle">
              Every engagement begins with understanding your unique challenges and goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600" data-testid="text-step-1-number">1</span>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-step-1-title">
                Initial Consultation
              </h3>
              <p className="text-gray-600" data-testid="text-step-1-description">
                We'll discuss your digital transformation challenges, strategic goals, and explore how my expertise can best support your organization's needs.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600" data-testid="text-step-2-number">2</span>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-step-2-title">
                Customized Proposal
              </h3>
              <p className="text-gray-600" data-testid="text-step-2-description">
                Receive a detailed proposal outlining my recommended digital transformation approach, implementation timeline, and expected strategic outcomes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600" data-testid="text-step-3-number">3</span>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-step-3-title">
                Engagement Begins
              </h3>
              <p className="text-gray-600" data-testid="text-step-3-description">
                Begin your digital transformation journey with expert strategic guidance, implementation oversight, and ongoing executive support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600" data-testid="text-faq-subtitle">
              Common questions about working together
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-faq-1-question">
                How long do typical engagements last?
              </h3>
              <p className="text-gray-600" data-testid="text-faq-1-answer">
                Engagement length varies based on your specific needs. Executive coaching typically runs 6-12 months, while consulting projects range from 3-18 months depending on scope and complexity.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-faq-2-question">
                Do you work with organizations outside the nonprofit sector?
              </h3>
              <p className="text-gray-600" data-testid="text-faq-2-answer">
                While I specialize in nonprofit and mission-driven organizations, I also work with for-profit companies whose leaders are committed to principled, values-based leadership.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-faq-3-question">
                What makes your approach different?
              </h3>
              <p className="text-gray-600" data-testid="text-faq-3-answer">
                My approach combines strategic rigor with deep respect for the human dimension of leadership. I focus on sustainable transformation that honors both business objectives and organizational values.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary-900 mb-4" data-testid="text-faq-4-question">
                How do you measure success?
              </h3>
              <p className="text-gray-600" data-testid="text-faq-4-answer">
                Success is measured through a combination of quantitative metrics (performance improvements, goal achievement) and qualitative outcomes (leadership effectiveness, organizational culture, stakeholder satisfaction).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
