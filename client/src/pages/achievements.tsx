import { Trophy, Star, Target, TrendingUp, Building2, CheckCircle } from 'lucide-react';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Achievements() {
  const keyAchievements = [
    {
      icon: <Trophy className="w-12 h-12 text-yellow-600" />,
      title: "NEOM Tier III Data Center",
      subtitle: "Vision 2030 Smart City",
      description: "Led on-time delivery of SAR 21.9M Tier III Data Center for NEOM Telco Park, certified by Uptime Institute. This flagship Vision 2030 project provides critical infrastructure for Saudi Arabia's premier smart city initiative.",
      metrics: ["SAR 21.9M Project Value", "Uptime Institute Certified", "On-Time Delivery"],
      testId: "achievement-neom"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: "Regional Business Transformation",
      subtitle: "Turnaround Excellence",
      description: "Transformed underperforming Western Region to #1 nationwide position. Achieved market leadership and exceptional team performance within one year, establishing dominance across multiple provinces.",
      metrics: ["Regional Market Leadership", "Team Performance Excellence", "#1 National Ranking", "5× Profit Increase"],
      testId: "achievement-transformation"
    },
    {
      icon: <Building2 className="w-12 h-12 text-blue-600" />,
      title: "ICT Division from Ground Up",
      subtitle: "Startup to Scale Success",
      description: "Founded and built Gulf Group's ICT division into a major enterprise business. Established market presence in Kuwait and KSA, achieved ~30% annual growth, and delivered 50+ projects spanning data centers, cybersecurity, and telecommunications.",
      metrics: ["Major Enterprise Revenue", "130+ Team Members", "50+ Projects Delivered", "30% Annual Growth"],
      testId: "achievement-ict-division"
    },
    {
      icon: <Target className="w-12 h-12 text-indigo-600" />,
      title: "Oracle Market Leadership",
      subtitle: "Channel Excellence",
      description: "Maintained Ingram Micro as Oracle's #1 distributor in KSA by expanding channel partner network and increasing sales pipeline by 25%. Led nationwide go-to-market strategies and partner enablement programs.",
      metrics: ["#1 Oracle Distributor", "25% Pipeline Growth", "Channel Leadership", "Partner Enablement"],
      testId: "achievement-oracle"
    }
  ];

  const careerProgression = [
    {
      period: "Dec 2024 - Present",
      role: "Sales Director",
      company: "Abdullah Fouad Group - InfoTech Division",
      location: "Saudi Arabia",
      highlights: [
        "Leading nationwide ICT sales and operations across all regions",
        "Full P&L accountability and strategic oversight",
        "Vision 2030 initiatives alignment",
        "Government, telecom, and enterprise sector engagements"
      ],
      testId: "career-sales-director"
    },
    {
      period: "Jan 2024 - Dec 2024",
      role: "Regional Manager, Western Region",
      company: "Abdullah Fouad Group - InfoTech Division",
      location: "Jeddah, Makkah, Saudi Arabia",
      highlights: [
        "Regional Market Leadership (2024)",
        "SAR 110M Collections Achieved",
        "#1 National Ranking",
        "5× Profit Increase"
      ],
      testId: "career-regional-manager"
    },
    {
      period: "Sep 2022 - Dec 2023",
      role: "Senior Product Manager",
      company: "Ingram Micro",
      location: "Riyadh, Saudi Arabia",
      highlights: [
        "Oracle solutions portfolio management across Saudi Arabia",
        "Market leadership position maintenance",
        "25% sales pipeline growth",
        "Partner network expansion"
      ],
      testId: "career-product-manager"
    },
    {
      period: "Jan 2021 - Sep 2022",
      role: "ICT Business Unit Manager / PMO Head",
      company: "Gulf Group Co",
      location: "Riyadh, Saudi Arabia",
      highlights: [
        "Direct reports to Gulf Group Holding CEO",
        "ICT business development leadership",
        "Annual business revenue and financial strategies",
        "130 employees management"
      ],
      testId: "career-unit-manager"
    },
    {
      period: "Apr 2016 - Dec 2020",
      role: "ICT Business Unit Business Development Leader",
      company: "Gulf Group Co",
      location: "Kuwait/Saudi Arabia",
      highlights: [
        "Major Enterprise Revenue (built from startup)",
        "130+ Team Members",
        "50+ Projects Delivered",
        "30% Annual Growth"
      ],
      testId: "career-business-leader"
    }
  ];

  const globalStanding = [
    {
      category: "Certification Portfolio",
      achievement: "Global Top 0.001%",
      description: "One of the rarest global certification portfolios in the industry. Benchmarking studies show may be the only professional in Saudi Arabia and Turkey with this exact set of qualifications.",
      testId: "standing-certifications"
    },
    {
      category: "Vision 2030 Alignment",
      achievement: "Project Leadership",
      description: "Leading delivery of flagship Vision 2030 projects including NEOM smart city infrastructure, demonstrating alignment with Saudi Arabia's national transformation goals.",
      testId: "standing-vision"
    },
    {
      category: "Multi-Country Expertise",
      achievement: "Regional Leadership",
      description: "Successfully led operations across Saudi Arabia, Kuwait, Turkey, and Egypt with proven track record of business transformation and growth acceleration.",
      testId: "standing-regional"
    },
    {
      category: "Business Impact",
      achievement: "Transformation Results",
      description: "Delivered measurable business impact including 5× profit increases, major contract wins, and successful turnarounds of underperforming operations.",
      testId: "standing-impact"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-6" data-testid="badge-achievements">
              <Trophy className="w-4 h-4" />
              Executive Achievement Portfolio
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight" data-testid="text-hero-title">
              Key Achievements & 
              <span className="block text-accent mt-2">Global Standing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed" data-testid="text-hero-subtitle">
              Comprehensive track record of transformation leadership, Vision 2030 project delivery, 
              and business growth across the Middle East. Global top 0.001% certification portfolio 
              with measurable impact and sustainable results.
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-700">50+ Projects</div>
                <div className="text-sm text-gray-600">Contracts Secured</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">Major Enterprise</div>
                <div className="text-sm text-gray-600">Revenue Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">130+</div>
                <div className="text-sm text-gray-600">Teams Led</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">5×</div>
                <div className="text-sm text-gray-600">Profit Increase</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-key-achievements-title">
              Flagship Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transformational leadership delivering measurable impact across digital infrastructure, 
              business development, and organizational excellence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {keyAchievements.map((achievement) => (
              <div key={achievement.testId} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all" data-testid={achievement.testId}>
                <div className="flex items-start gap-6 mb-6">
                  <div className="flex-shrink-0 bg-white shadow-lg rounded-xl p-4">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-lg font-semibold text-primary-600 mb-4">{achievement.subtitle}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">{achievement.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {achievement.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-800">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Standing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-global-standing-title">
              Global Standing & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rare combination of global certifications, regional leadership, and measurable business impact 
              positioning Ahmet in the top tier of ICT executives worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {globalStanding.map((standing) => (
              <div key={standing.testId} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow" data-testid={standing.testId}>
                <div className="flex items-center gap-4 mb-4">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{standing.category}</h3>
                    <p className="text-lg font-semibold text-primary-600">{standing.achievement}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{standing.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Progression Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-career-title">
              Executive Career Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive 20+ year progression from technical specialist to C-suite executive 
              across multiple countries and industries with consistent growth and transformation results.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-600"></div>

            <div className="space-y-12">
              {careerProgression.map((position, index) => (
                <div key={position.testId} className="relative flex gap-8" data-testid={position.testId}>
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 shadow-lg">
                    <div className="mb-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{position.role}</h3>
                        <span className="text-sm font-semibold text-primary-600 bg-primary-100 px-3 py-1 rounded-full w-fit">
                          {position.period}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-700">{position.company}</p>
                      <p className="text-gray-600">{position.location}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      {position.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Ready to Drive Transformation at Your Organization?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" data-testid="text-cta-description">
            Leverage proven expertise in digital transformation, infrastructure development, and business growth 
            to achieve your Vision 2030 objectives and organizational excellence goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-cta-contact">
              <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Discuss Leadership Opportunities
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold transition-all duration-300" data-testid="button-cta-cv">
              Download Detailed CV
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}