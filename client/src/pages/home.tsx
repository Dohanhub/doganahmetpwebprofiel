import { ChevronRight, Trophy, Users, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedContainer, StaggeredContainer } from "@/components/ui/animated-container";
import { useIntersectionObserver } from "@/hooks/use-performance";
import Footer from "@/components/footer";
import ChatAgent from "@/components/chat-agent";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import { InteractiveFeaturesHub } from "@/components/interactive/interactive-features-hub";
// import { useTheme } from "@/components/theme-provider";
import { Link } from "wouter";

export default function Home() {
  // const { theme } = useTheme();
  const { elementRef: heroRef, hasIntersected: heroVisible } = useIntersectionObserver();
  const { elementRef: expertiseRef, hasIntersected: expertiseVisible } = useIntersectionObserver();
  const { elementRef: credentialsRef, hasIntersected: credentialsVisible } = useIntersectionObserver();
  
  const achievements = [
    {
      testId: "achievement-1",
      number: "20+",
      label: "Elite Certifications",
      description: "PgMP, CISA/CISM/CRISC, RCDD, and other globally recognized credentials placing Ahmet in the top 0.001% of ICT professionals worldwide."
    },
    {
      testId: "achievement-2", 
      number: "130+",
      label: "Team Members Led",
      description: "Cross-functional teams across multiple countries, delivering complex digital transformation projects with operational excellence."
    },
    {
      testId: "achievement-3",
      number: "5",
      label: "Countries",
      description: "Saudi Arabia, Kuwait, Turkey, Egypt, and international projects spanning the Middle East and global markets."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* 1. Hero Section - Enhanced with smooth animations */}
      <motion.section 
        ref={heroRef}
        className="relative bg-muted overflow-hidden min-h-screen flex items-center"
        initial="hidden"
        animate={heroVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Content Container */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
          
          {/* Name with Yellow Underline - Enhanced animations */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 font-playfair" 
              data-testid="text-hero-title"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Ahmet Doğan
            </motion.h1>
            {/* Orange Accent Line - Enhanced animation */}
            <motion.div 
              className="w-24 sm:w-32 h-0.5 bg-primary mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>

          {/* Credentials - Enhanced animation */}
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl font-medium text-accent font-montserrat tracking-wide"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              DBA Candidate | PgMP | Chartered Manager | Consultant Engineer (SCE)
            </motion.p>
          </motion.div>

          {/* Tagline - Enhanced animation */}
          <motion.div variants={itemVariants}>
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl italic text-foreground font-ibm-plex leading-relaxed max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              "Shaping strategy and governance with accredited expertise — delivering impact across borders."
            </motion.p>
          </motion.div>

          {/* Saudi Premium Residency Badge - Enhanced animation */}
          <motion.div 
            className="mt-12"
            variants={itemVariants}
          >
            <motion.span 
              className="inline-block px-6 sm:px-8 py-3 bg-gradient-to-r from-[#0047AB] to-[#009873] text-white rounded-full text-base sm:text-lg font-semibold shadow-lg"
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Saudi Premium Residency
            </motion.span>
          </motion.div>


        </div>
      </motion.section>

      {/* 2. Accreditation & Elite Certifications - Enhanced with staggered animations */}
      <AnimatedContainer className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div 
              className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6" 
                data-testid="text-accreditation-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Accreditation Beyond Boundaries
              </motion.h2>
              <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {achievements.map((achievement) => (
                  <motion.div 
                    key={achievement.testId} 
                    className="text-center" 
                    data-testid={achievement.testId}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <motion.div 
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-700 dark:text-primary-300 mb-2 sm:mb-3"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {achievement.number}
                    </motion.div>
                    <div className="text-base sm:text-lg font-semibold text-primary-800 dark:text-primary-200 mb-2">
                      {achievement.label}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {achievement.description}
                    </div>
                  </motion.div>
                ))}
              </StaggeredContainer>
            </motion.div>
          </div>
        </div>
      </AnimatedContainer>

      {/* 3. Core Expertise & Projects - Enhanced with intersection observer */}
      <motion.section 
        ref={expertiseRef}
        id="expertise" 
        className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative"
        initial="hidden"
        animate={expertiseVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6" 
              data-testid="text-expertise-title"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Core Expertise & Featured Projects
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4" 
              data-testid="text-expertise-subtitle"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              Proven leadership across digital transformation, infrastructure development, and strategic business growth with alignment to Vision 2030 objectives and international best practices.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left Side - Executive Profile */}
            <motion.div 
              className="px-2 sm:px-0"
              variants={itemVariants}
            >
              <motion.h3 
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 dark:text-primary-100 mb-4 sm:mb-6" 
                data-testid="text-profile-title"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                Visionary ICT Leader
              </motion.h3>
              <motion.p 
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed" 
                data-testid="text-profile-description-1"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                Visionary ICT leader specializing in digital transformation and infrastructure projects across the Middle East 
                (Saudi Arabia, Kuwait, Turkey, Egypt). Proven track record of turning around underperforming operations and 
                accelerating growth.
              </motion.p>
              <motion.p 
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed" 
                data-testid="text-profile-description-2"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                Combines deep technical expertise with strategic business acumen: led nationwide sales and P&L management, 
                executed smart city and cloud initiatives aligned with Vision 2030 goals. One of the most highly certified 
                ICT executives globally.
              </motion.p>
              <StaggeredContainer className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { text: "NEOM Project Leader", testId: "badge-neom-leader", color: "blue" },
                  { text: "Vision 2030 Aligned", testId: "badge-vision-2030", color: "green" },
                  { text: "PgMP Certified", testId: "badge-pgmp-certified", color: "blue" },
                  { text: "Saudi Premium Residency", testId: "badge-premium-residency", color: "orange" }
                                 ].map((badge) => (
                  <motion.span 
                    key={badge.testId}
                    className={`bg-${badge.color}-100 text-${badge.color}-700 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium`}
                    data-testid={badge.testId}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {badge.text}
                  </motion.span>
                ))}
              </StaggeredContainer>
            </motion.div>

            {/* Right Side - Project Cards */}
            <StaggeredContainer className="space-y-4 sm:space-y-6">
              {[
                {
                  title: "NEOM Telco Park Data Center",
                  description: "Spearheaded enterprise-grade Tier III Data Center delivery for NEOM Telco Park, achieving full Uptime Institute certification. Established critical infrastructure foundation for Saudi Arabia's flagship smart city development.",
                  tags: ["Vision 2030 Flagship", "Smart Cities", "Data Centers"],
                  color: "blue"
                },
                {
                  title: "Regional Digital Transformation",
                  description: "Orchestrated comprehensive business transformation across Western Region operations, achieving nationwide market leadership through strategic technology integration.",
                  tags: ["Healthcare IT", "Education Tech", "Government Services"],
                  color: "green"
                }
                             ].map((project) => (
                <motion.div 
                  key={project.title}
                  className={`bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700`}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <motion.h4 
                    className="font-bold text-lg sm:text-xl mb-2 sm:mb-3 text-primary-900 dark:text-primary-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.title}
                  </motion.h4>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                                         {project.tags.map((tag) => (
                      <motion.span 
                        key={tag}
                        className={`bg-${project.color}-100 dark:bg-${project.color}-900/30 text-${project.color}-700 dark:text-${project.color}-300 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </StaggeredContainer>
          </div>
        </div>
      </motion.section>

      {/* 4. Executive Recommendations - Enhanced with smooth animations */}
      <AnimatedContainer className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4 sm:mb-6" 
              data-testid="text-recommendations-title"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Executive Recommendations
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4" 
              data-testid="text-recommendations-subtitle"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              Endorsed by 18 senior executives across 5 countries for exceptional ICT leadership and digital transformation expertise
            </motion.p>
          </motion.div>
          
          {/* Horizontal Stat Cards */}
          <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
            {[
              { number: "18", label: "Executive Recommendations" },
              { number: "5", label: "Countries" },
              { number: "12", label: "C-Level Endorsements" },
              { number: "6", label: "Fortune 500 Companies" }
                         ].map((stat) => (
              <motion.div 
                key={stat.label}
                className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg text-center"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold text-primary-700"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </StaggeredContainer>

          {/* LinkedIn Recommendations CTA */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.a 
              href="https://www.linkedin.com/in/ahmet-dogan-ict-executive" 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid="button-linkedin-recommendations"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                View LinkedIn Recommendations
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </AnimatedContainer>

      {/* 5. Elite Professional Credentials - Enhanced with intersection observer */}
      <motion.section 
        ref={credentialsRef}
        className="py-16 bg-white"
        initial="hidden"
        animate={credentialsVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12 md:mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4 sm:mb-6" 
              data-testid="text-credentials-title"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Elite Professional Credentials
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4" 
              data-testid="text-credentials-subtitle"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              Comprehensive portfolio placing Ahmet in the global top 0.001% of ICT professionals
            </motion.p>
          </motion.div>
          
          <StaggeredContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {[
              {
                icon: Award,
                number: "5",
                title: "Advanced Degrees",
                subtitle: "DBA, MBA, Stanford Executive Education",
                color: "blue"
              },
              {
                icon: Trophy,
                number: "20+",
                title: "Elite Certifications",
                subtitle: "PgMP, CISA/CISM/CRISC, RCDD",
                color: "indigo"
              },
              {
                icon: Users,
                number: "10",
                title: "Professional Organizations",
                subtitle: "PMI, ISACA, IEEE, CMI",
                color: "green"
              },
              {
                icon: TrendingUp,
                number: "0.001%",
                title: "Global Top Percentile",
                subtitle: "ICT Professional Ranking",
                color: "orange"
              }
                         ].map((credential) => (
              <motion.div 
                key={credential.title}
                className={`text-center bg-gradient-to-br from-${credential.color}-50 to-${credential.color}-100 p-6 sm:p-8 rounded-lg sm:rounded-xl`}
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className={`w-12 h-12 sm:w-16 sm:h-16 bg-${credential.color}-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <credential.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <motion.div 
                  className={`text-2xl sm:text-3xl font-bold text-${credential.color}-700 mb-2`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {credential.number}
                </motion.div>
                <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{credential.title}</div>
                <div className="text-xs sm:text-sm text-gray-600">{credential.subtitle}</div>
              </motion.div>
            ))}
          </StaggeredContainer>

          {/* Buttons in Single Row */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              {[
                { href: "/experience#experience", label: "View Full Experience", testId: "button-view-experience" },
                { href: "/certifications#certifications", label: "View All Certifications", testId: "button-view-certifications" },
                { href: "/organizations#organizations", label: "Professional Organizations", testId: "button-view-organizations" }
                             ].map((button) => (
                <motion.div
                  key={button.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={button.href} data-testid={button.testId}>
                    <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50 w-full sm:w-auto">
                      {button.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Call-to-Action - Enhanced with smooth animations */}
      <AnimatedContainer className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary-600 to-accent text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" 
            data-testid="text-cta-title"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Ready for Executive-Level Digital Transformation?
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-4" 
            data-testid="text-cta-description"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            Driving innovation, growth, and organizational excellence through strategic digital transformation 
            initiatives aligned with Vision 2030 objectives.
          </motion.p>
          <motion.a 
            href="mailto:info@doganahmet.com?subject=Contact%20Ahmet%20Doğan" 
            data-testid="button-cta-contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-white text-primary-600 hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-500 transform hover:scale-110 hover:shadow-2xl animate-bounce-subtle w-full sm:w-auto">
              Contact Ahmet
            </Button>
          </motion.a>
        </div>
      </AnimatedContainer>

      {/* 7. Interactive Business Platform - Transform from Static to Interactive */}
      <InteractiveFeaturesHub />

      {/* 8. Footer */}
      <Footer />
      <ChatAgent />
    </div>
  );
}