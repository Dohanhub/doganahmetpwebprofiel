import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Award, Shield, Building2, Crown, Gem, Medal, Target, Trophy, Star } from "lucide-react";

export default function Certifications() {
  const certificationStats = [
    {
      number: "25+",
      label: "Active Certifications",
      description: "Across multiple domains",
      icon: <Award className="w-8 h-8 text-blue-600" />,
      testId: "stat-certifications"
    },
    {
      number: "7",
      label: "Certification Categories",
      description: "Complete expertise coverage",
      icon: <Target className="w-8 h-8 text-green-600" />,
      testId: "stat-categories"
    },
    {
      number: "15+",
      label: "Certifying Organizations",
      description: "Global recognition",
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      testId: "stat-organizations"
    },
    {
      number: "0.001%",
      label: "Global Rarity Ranking",
      description: "Ultra-rare combination",
      icon: <Crown className="w-8 h-8 text-orange-600" />,
      testId: "stat-rarity"
    }
  ];

  const projectManagementCerts = [
    {
      name: "Program Management Professional (PgMP)®",
      issuer: "Project Management Institute",
      rarity: "Top 0.009% Globally (~5,350 holders)",
      period: "Issued Jan 2023 • Expires Jan 2026",
      skills: ["Program Management", "Team Management", "C-Level Presentations", "Management Consulting", "Critical Thinking"],
      testId: "cert-pgmp"
    },
    {
      name: "Project Management Professional (PMP)®",
      issuer: "Project Management Institute",
      period: "Issued Sep 2020 • Expired Sep 2023",
      credentialId: "2800506",
      skills: ["Project Management", "Team Management", "Presentations", "Critical Thinking"],
      testId: "cert-pmp"
    },
    {
      name: "PMI Agile Certified Practitioner (PMI-ACP)",
      issuer: "Project Management Institute",
      period: "Issued Sep 2020 • Expired Sep 2023",
      credentialId: "2803746",
      skills: ["Project Management", "Team Management", "Presentations", "Management Consulting"],
      testId: "cert-pmi-acp"
    },
    {
      name: "PRINCE2® Practitioner CPD",
      issuer: "AXELOS Global Best Practice",
      period: "Issued Oct 2020 • Expired Oct 2023",
      credentialId: "GR657076252AE",
      skills: ["Project Management", "Team Management", "Project Planning"],
      testId: "cert-prince2"
    }
  ];

  const securityCerts = [
    {
      name: "Certified Information Security Manager® (CISM)",
      issuer: "ISACA",
      rarity: "Top 0.07% Globally (~46,000 holders)",
      period: "Issued Oct 2020 • Expired Jan 2024",
      credentialId: "2054760",
      skills: ["Security Management", "Risk Assessment", "Information Security", "Compliance"],
      testId: "cert-cism"
    },
    {
      name: "Certified Information Systems Auditor® (CISA)",
      issuer: "ISACA",
      rarity: "Top 0.24% Globally (~151,000 holders)",
      period: "Issued Oct 2020 • Expired Jan 2024",
      credentialId: "2054760",
      skills: ["IT Audit", "Systems Control", "Compliance", "Risk Management"],
      testId: "cert-cisa"
    },
    {
      name: "Certified in Risk and Information Systems Control™ (CRISC)",
      issuer: "ISACA",
      rarity: "Top 0.05% Globally (~30,000 holders)",
      period: "Issued Oct 2020 • Expired Jan 2024",
      credentialId: "2029307",
      skills: ["IT Risk Management", "Control Design", "Risk Assessment"],
      testId: "cert-crisc"
    }
  ];

  const infrastructureCerts = [
    {
      name: "Registered Communications Distribution Designer (RCDD)",
      issuer: "BICSI",
      rarity: "Ultra Rare: Top 0.024% Globally (~15,000 holders)",
      period: "Issued Nov 2021 • Expired Dec 2024",
      skills: ["Data Center Design", "Telecommunications", "Network Infrastructure", "Low Voltage"],
      testId: "cert-rcdd"
    },
    {
      name: "ATD Accredited Tier Designer",
      issuer: "Uptime Institute",
      rarity: "Ultra Rare: <0.002% Globally (Hundreds worldwide)",
      period: "Issued Nov 2019 • Expired Nov 2021",
      credentialId: "3121",
      skills: ["Data Center Tier Design", "Infrastructure Planning", "Critical Facilities"],
      testId: "cert-atd"
    },
    {
      name: "Accredited Operation Specialist (AOS)",
      issuer: "Uptime Institute",
      rarity: "Ultra Rare: <0.002% Globally",
      period: "Issued Apr 2020",
      skills: ["Data Center Operations", "Infrastructure Management", "Critical Systems"],
      testId: "cert-aos"
    },
    {
      name: "HCIP-Data Center Facility",
      issuer: "Huawei Consumer Egypt",
      period: "Issued Dec 2018 • Expired Dec 2021",
      credentialId: "HCIP - Data Center Facility",
      skills: ["Data Center Infrastructure", "Facility Management"],
      testId: "cert-hcip"
    }
  ];

  const managementCerts = [
    {
      name: "Chartered Manager",
      issuer: "Chartered Management Institute",
      period: "Issued Apr 2022",
      skills: ["Strategic Leadership", "Management Consulting", "Executive Leadership"],
      testId: "cert-chartered-manager"
    },
    {
      name: "Telecommunications Consultant",
      issuer: "Saudi Council of Engineers",
      period: "Issued Jul 2020 • Expired Jul 2023",
      skills: ["Telecommunications Consulting", "Engineering Leadership"],
      testId: "cert-telecom-consultant"
    }
  ];

  const rarityAnalysis = [
    {
      category: "Ultra-Rare (<0.01%)",
      icon: <Crown className="w-8 h-8 text-yellow-600" />,
      color: "from-yellow-500 to-orange-500",
      certifications: [
        { name: "PgMP", count: "~5,350 globally (0.009%)" },
        { name: "ATD/AOS", count: "Hundreds globally (<0.002%)" },
        { name: "RCDD", count: "~15,000 globally (0.024%)" }
      ]
    },
    {
      category: "Rare (<0.3%)",
      icon: <Gem className="w-8 h-8 text-purple-600" />,
      color: "from-purple-500 to-indigo-500",
      certifications: [
        { name: "CRISC", count: "~30,000 globally (0.05%)" },
        { name: "CISM", count: "~46,000 globally (0.07%)" },
        { name: "CISA", count: "~151,000 globally (0.24%)" }
      ]
    },
    {
      category: "Specialized (1-3%)",
      icon: <Medal className="w-8 h-8 text-blue-600" />,
      color: "from-blue-500 to-cyan-500",
      certifications: [
        { name: "PMP", count: "~1.45M globally (2.3%)" },
        { name: "PRINCE2", count: "~1M globally (1.6%)" },
        { name: "ITIL", count: "~2M globally (3.2%)" }
      ]
    }
  ];

  const getRarityBadge = (rarity: string) => {
    if (rarity.includes("<0.002%")) {
      return <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">Ultra-Rare</span>;
    } else if (rarity.includes("Ultra Rare") || rarity.includes("<0.01%")) {
      return <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">Ultra-Rare</span>;
    } else if (rarity.includes("<0.3%")) {
      return <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold">Rare</span>;
    } else {
      return <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">Specialized</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* 1. Hero Section - Intro with Pattern */}
      <section className="relative py-16 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Complete Global Certification Portfolio Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg" data-testid="badge-certifications">
              <Award className="w-5 h-5" />
              Complete Global Certification Portfolio
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight" data-testid="text-hero-title">
              Elite Professional Certifications
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 leading-tight">
              Global Top 0.001% Credential Portfolio
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="text-hero-subtitle">
              Comprehensive credential portfolio spanning technical excellence, strategic leadership, and academic achievement.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Portfolio Statistics - Uniform Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certificationStats.map((stat) => (
              <div key={stat.testId} className="text-center bg-white border border-gray-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full" data-testid={stat.testId}>
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary-700 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Certification Categories - Thematic Blocks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Program & Project Management Excellence */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-project-management-title">
                🏆 Program & Project Management Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Elite certifications in program and project management from globally recognized institutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projectManagementCerts.map((cert) => (
                <div key={cert.testId} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300" data-testid={cert.testId}>
                  <div className="flex items-start gap-4 mb-4">
                    <Trophy className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                      <p className="text-blue-600 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>
                  {cert.rarity && (
                    <div className="mb-3">
                      {getRarityBadge(cert.rarity)}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-3">{cert.period}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mb-3">Credential ID: {cert.credentialId}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Information Security Excellence */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-security-title">
                🔐 Information Security & Risk Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced cybersecurity and risk management certifications from ISACA, the global authority in IT governance.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {securityCerts.map((cert) => (
                <div key={cert.testId} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300" data-testid={cert.testId}>
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                      <p className="text-red-600 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {getRarityBadge(cert.rarity)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{cert.period}</p>
                  <p className="text-xs text-gray-500 mb-3">Credential ID: {cert.credentialId}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Data Center Infrastructure Excellence */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-infrastructure-title">
                🏗️ Data Center Infrastructure & Design Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ultra-rare certifications in data center design and telecommunications infrastructure from industry leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {infrastructureCerts.map((cert) => (
                <div key={cert.testId} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300" data-testid={cert.testId}>
                  <div className="flex items-start gap-4 mb-4">
                    <Building2 className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                      <p className="text-green-600 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>
                  {cert.rarity && (
                    <div className="mb-3">
                      {getRarityBadge(cert.rarity)}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mb-3">{cert.period}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mb-3">Credential ID: {cert.credentialId}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Leadership Excellence */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                👑 Strategic Leadership Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Executive leadership and management certifications from prestigious international institutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {managementCerts.map((cert) => (
                <div key={cert.testId} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300" data-testid={cert.testId}>
                  <div className="flex items-start gap-4 mb-4">
                    <Crown className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{cert.name}</h3>
                      <p className="text-purple-600 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{cert.period}</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certification Rarity Analysis - 3-Column Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6" data-testid="text-rarity-title">
              📊 Certification Rarity Analysis
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Statistical analysis of global certification rarity. The probability of holding this complete combination 
              is astronomically low, placing Ahmet among fewer than 620 individuals worldwide with comparable qualifications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {rarityAnalysis.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.certifications.map((cert, certIndex) => (
                    <div key={certIndex} className="border-l-4 border-blue-500 pl-4">
                      <p className="font-semibold text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Global Standing Analysis - Blue Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              Global Standing Analysis
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              <strong>&lt; 620 professionals globally</strong> hold this combination of certifications.
            </p>
            
            {/* Comparison Progress Bar */}
            <div className="bg-white rounded-full h-4 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full" style={{ width: '0.001%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mb-8">
              Visual representation: The blue bar represents Ahmet's position among 62 million global ICT professionals
            </p>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-xl">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Exceptionally Rare Combination</h3>
              <p className="text-lg leading-relaxed">
                Conservative estimates place this certification combination within the top 0.001% of global ICT professionals, 
                representing fewer than 620 individuals worldwide with comparable qualifications among 62 million ICT professionals globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing CTA - Pre-Footer */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-accent text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-cta-title">
            Partner with Global Top 0.001% Expertise
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" data-testid="text-cta-description">
            Leverage unprecedented certification portfolio and global expertise for your organization's 
            most critical digital transformation initiatives.
          </p>
          <a href="mailto:info@doganahmet.com?subject=Schedule%20Executive%20Consultation%20with%20Ahmet%20Doğan" data-testid="button-cta-contact">
            <Button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animate-bounce-subtle">
              Schedule Executive Consultation
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}