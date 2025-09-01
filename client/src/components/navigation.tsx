import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandToggle } from "@/components/theme/brand-toggle";
import { Menu, X, Calendar, Linkedin, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/experience", label: "Career" },
    { href: "/certifications", label: "Credentials" },
    { href: "/organizations", label: "Organizations" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  } as const;

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
      },
    },
  } as const;

  return (
    <motion.nav
      className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/80"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div className="flex-shrink-0" variants={itemVariants}>
            <Link href="/" data-testid="link-home">
              <motion.span
                className="text-2xl font-bold text-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Ahmet Doğan
              </motion.span>
            </Link>
          </motion.div>

          <motion.div className="hidden md:block" variants={itemVariants}>
            <div className="ml-10 flex items-center space-x-10">
              {navItems.map((item, index) => (
                <motion.div key={item.href} variants={itemVariants} custom={index}>
                  <Link href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`}>
                    <motion.span
                      className={`px-4 py-2 text-base font-medium transition-colors rounded-md cursor-pointer ${
                        isActive(item.href)
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-accent"
                      }`}
                      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side icons - Network, LinkedIn, Calendar, and Theme Toggle */}
          <motion.div className="flex items-center space-x-2" variants={itemVariants}>
            {/* Ecosystem dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:inline-flex" data-testid="btn-ecosystem">
                  <Globe className="w-4 h-4 mr-2" />
                  Network
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Digital Ecosystem</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="https://www.doganhub.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                    <span>Main Hub - doganhub.com</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://www.doganconsult.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                    <span>Consultancy - doganconsult.com</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://www.dogan-ai.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                    <span>Innovation Gateway - dogan-ai.com</span>
                    <Badge variant="secondary">Coming soon</Badge>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Calendar Icon - Opens Email */}
            <motion.a
              href="mailto:info@doganahmet.com?subject=Contact%20Ahmet%20Doğan"
              className="group relative"
              data-testid="button-calendar-email-nav"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md hover:shadow-primary/30 transform transition-all duration-300 flex items-center justify-center border border-white/20">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              {/* Floating Label */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Schedule Meeting
              </motion.div>
            </motion.a>

            {/* LinkedIn Icon - Opens LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/ahmet-dogan-ict-executive"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              data-testid="button-linkedin-profile-nav"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg shadow-md hover:shadow-primary/30 transform transition-all duration-300 flex items-center justify-center border border-white/20">
                <Linkedin className="w-4 h-4 text-white" />
              </div>
              {/* Floating Label */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                LinkedIn Profile
              </motion.div>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2">
                <BrandToggle />
                <ThemeToggle />
              </div>
            </motion.div>

            {/* Theme Debug Display */}
            <motion.div
              className="ml-2 text-xs text-white/70 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {document.documentElement.classList.contains('dark') ? 'DARK' : 'LIGHT'}
            </motion.div>
          </motion.div>

          <motion.div className="md:hidden" variants={itemVariants}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100 dark:border-gray-800">
                {navItems.map((item, index) => (
                  <motion.div key={item.href} variants={itemVariants} custom={index}>
                    <Link href={item.href} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                      <motion.span
                        className={`block px-3 py-2 text-base font-medium transition-colors cursor-pointer ${
                          isActive(item.href)
                            ? "text-primary-600 dark:text-primary-400"
                            : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}

                <motion.div className="flex items-center justify-between px-3 py-2" variants={itemVariants}>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">Theme</span>
                  <ThemeToggle />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
