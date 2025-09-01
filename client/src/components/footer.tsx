import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="md:col-span-2">
            <div className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Ahmet Doğan</div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 max-w-md">
              Elite ICT Executive & Digital Transformation Leader specializing in strategic leadership, 
              cybersecurity governance, and Vision 2030 alignment for enterprise organizations.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/ahmet-dogan-ict/" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-3 transform"
                data-testid="link-linkedin"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Expertise</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/experience" data-testid="link-footer-career">
                  <span className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 transform text-sm sm:text-base">Career Experience</span>
                </Link>
              </li>
              <li>
                <Link href="/certifications" data-testid="link-footer-certifications">
                  <span className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 transform text-sm sm:text-base">Certifications</span>
                </Link>
              </li>
              <li>
                <Link href="/organizations" data-testid="link-footer-organizations">
                  <span className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 transform text-sm sm:text-base">Professional Organizations</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Connect</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/about" data-testid="link-footer-about">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">About</span>
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:info@doganahmet.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  data-testid="link-footer-email"
                >
                  info@doganahmet.com
                </a>
              </li>
              <li>
                <Link href="/contact" data-testid="link-footer-contact">
                  <span className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Network</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a
                  href="https://www.doganhub.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  data-testid="link-footer-doganhub"
                >
                  Main Hub - doganhub.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.doganconsult.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                  data-testid="link-footer-doganconsult"
                >
                  Consultancy - doganconsult.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.dogan-ai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2"
                  data-testid="link-footer-doganai"
                >
                  Innovation Gateway - dogan-ai.com
                  <span className="inline-flex items-center rounded-full bg-gray-800 text-gray-300 px-2 py-0.5 text-xs uppercase tracking-wide">Coming soon</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">&copy; 2025 DoganConsult. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
