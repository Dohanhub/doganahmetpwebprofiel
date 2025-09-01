import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
// Unused imports - keeping for future use
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import { Award, Building2, Globe, Shield, TrendingUp, Zap, ChevronRight, GraduationCap, Clock, Users, Target } from "lucide-react";

export default function About() {
  const credentials = [
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Global Top 0.001% ICT Executive",
      description: "One of the rarest global certification portfolios in the industry - may be the only professional in Saudi Arabia and Turkey with this exact set of qualifications."
    },
    {
      icon: <Building2 className="w-8 h-8 text-green-600" />,
      title: "Vision 2030 Project Leader",
      description: "Led delivery of NEOM Tier III Data Center (SAR 21.9M) - flagship Vision 2030 project providing critical infrastructure for Saudi Arabia's premier smart city."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-indigo-600" />,
      title: "Business Transformation Expert",
      description: "Transformed underperforming Western Region to #1 nationwide position with exceptional market leadership and 5× profit increase within one year."
    },
    {
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      title: "Multi-Country Leadership",
      description: "Successfully led operations across Saudi Arabia, Kuwait, Turkey, and Egypt with comprehensive P&L accountability and strategic oversight."
    }
  ];

  const education = [
    {
      degree: "Doctor of Business Administration (DBA)",
      institution: "University of Northampton, UK",
      period: "2022-2026",
      status: "ongoing",
      focus: "Research focus on cybersecurity integration in business strategy"
    },
    {
      degree: "Master of Business Administration (MBA)",
      institution: "University of Leicester, UK",
      period: "2019-2021",
      status: "completed",
      focus: "Business Administration and Management, Marketing"
    },
    {
      degree: "Diploma in Strategic Management and Leadership Practice",
      institution: "Chartered Management Institute",
      period: "2019-2021",
      status: "completed",
      focus: "Business Administration and Management"
    },
    {
      degree: "Stanford Advanced Computer Security",
      institution: "Stanford University School of Engineering",
      period: "2019-2020",
      status: "completed",
      focus: "Comprehensive cybersecurity curriculum"
    },
    {
      degree: "Bachelor of Engineering",
      institution: "Faculty of Electronic Engineering, Menoufia University",
      period: "1999-2004",
      status: "completed",
      focus: "Electronic and Electrical Communication, Electronics and Communications Engineering"
    }
  ];

  const globalStanding = [
    {
      metric: "0.001%",
      description: "Global ICT Professional Ranking among ~62 million ICT professionals worldwide",
      analysis: "Exceptionally rare credential combination"
    },
    {
      metric: "354,000",
      description: "Total ICT Workers in Saudi Arabia (2023)",
      analysis: "Likely the only professional in KSA holding complete PgMP + CISA/CISM/CRISC + RCDD + ATD/AOS combination"
    },
    {
      metric: "<100",
      description: "Estimated similar profiles globally",
      analysis: "Within 62 million global ICT professionals, fewer than 100 hold comparable qualifications"
    }
  ];

  const expertise = [
    {
      title: "Digital Transformation & Strategy",
      description: "IT modernization, Smart Cities, IoT/Cloud Solutions, aligning tech initiatives with business goals and Vision 2030 objectives.",
      icon: <Zap className="w-6 h-6 text-blue-600" />
    },
    {
      title: "ICT Infrastructure",
      description: "Data Center design (Tier III+), Telecom Networks, Cybersecurity & Risk Management, IT Service Management expertise.",
      icon: <Shield className="w-6 h-6 text-green-600" />
    },
    {
      title: "Leadership & Management",
      description: "P&L management, Program/Project Management, PMO establishment, cross-functional team leadership across 130+ members.",
      icon: <Users className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Business Development",
      description: "Sales Leadership, Key Account Management, Go-to-Market Strategy, Vendor & Stakeholder Management excellence.",
      icon: <Target className="w-6 h-6 text-orange-600" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ongoing':
        return <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">Ongoing</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Completed</span>;
      default:
        return <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Accredited</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* 1. Hero Section - About Intro */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Prestige Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg" data-testid="badge-global-executive">
                <Award className="w-5 h-5" />
                Global Top 0.001% ICT Executive
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6 leading-tight" data-testid="text-hero-title">
                About Ahmet Doğan
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                Visionary ICT leader with 20+ years of experience driving large-scale digital transformation 
                and infrastructure projects across the Middle East. Proven track record of turning around 
                underperforming operations and accelerating growth.
              </p>
              

            </div>
            
            {/* Executive Summary Box */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Executive Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Elite ICT Executive & Digital Transformation Leader</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Global Top 0.001% Professional Portfolio</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>20+ Years Progressive Leadership Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Vision 2030 Strategic Alignment Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Credentials & Achievements - 2x2 Card Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-achievements-title">
              Key Credentials & Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rare combination of global certifications, Vision 2030 project leadership, and proven business transformation results.
            </p>
          </div>

          {/* Subtle Section Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {credentials.map((credential, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 bg-gray-50 rounded-xl p-4">
                    {credential.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{credential.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{credential.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Advanced Academic Credentials - Timeline Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-education-title">
              Advanced Academic Credentials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive academic foundation spanning business administration, cybersecurity, strategic management, 
              and engineering from prestigious international institutions.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-300"></div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-primary-900">{edu.degree}</h3>
                      </div>
                      <p className="text-blue-600 font-semibold mb-2">{edu.institution}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{edu.period}</span>
                      </div>
                      <div className="mb-3">
                        {getStatusBadge(edu.status)}
                      </div>
                      <p className="text-gray-700 text-sm">{edu.focus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Standing & Benchmarking Analysis */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-global-standing-title">
              Where Ahmet Stands Globally
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional benchmarking study positioning Ahmet Doğan among the most exceptional ICT professionals globally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {globalStanding.map((stat, index) => (
              <div key={index} className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
                <div className="text-4xl font-bold text-primary-700 mb-4">{stat.metric}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{stat.description}</h3>
                <p className="text-sm text-gray-600">{stat.analysis}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl text-center shadow-xl">
            <Award className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Exceptionally Rare Combination</h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              The probability of any one person holding Ahmet's complete credential portfolio is astronomically low. 
              Most ICT practitioners pursue one or two certification tracks at most, but it's exceedingly uncommon 
              for one person to attain advanced certifications across project management, security, service management, 
              and infrastructure design.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Core Expertise Areas - 2x2 Grid with Hover Effects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-expertise-title">
              Core Expertise Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep technical expertise combined with strategic business acumen across multiple domains and geographies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((area, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white shadow-lg rounded-lg p-3 group-hover:shadow-xl transition-all duration-300">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{area.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing Call-to-Action */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-8 lg:p-12 shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Professional Excellence</h3>
              <p className="text-lg leading-relaxed mb-6">
                Distinguished track record of leading transformational initiatives across multiple countries and industries. 
                Experienced in delivering complex digital transformation projects aligned with strategic objectives and 
                international best practices.
              </p>
              <a href="mailto:info@doganahmet.com?subject=Discuss%20Collaboration%20with%20Ahmet%20Doğan" data-testid="button-discuss-collaboration">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Discuss Collaboration
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}