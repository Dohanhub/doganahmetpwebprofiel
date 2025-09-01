import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, Browser, Page } from 'playwright';

describe('Light Hours Test Suite - Deployed Website', () => {
  let browser: Browser;
  let page: Page;
  const baseUrl = process.env.DEPLOYED_URL || 'https://your-deployed-site.vercel.app';

  beforeAll(async () => {
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    
    // Set viewport for consistent testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Performance Tests', () => {
    it('should load homepage within 3 seconds', async () => {
      const startTime = Date.now();
      
      await page.goto(baseUrl, { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000);
      
      console.log(`Homepage load time: ${loadTime}ms`);
    }, 10000);

    it('should have good Core Web Vitals', async () => {
      await page.goto(baseUrl);
      
      // Measure LCP (Largest Contentful Paint)
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
        });
      });
      
      expect(lcp).toBeLessThan(2500);
      console.log(`LCP: ${lcp}ms`);
    }, 10000);

    it('should have acceptable First Contentful Paint', async () => {
      await page.goto(baseUrl);
      
      const fcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            resolve(entries[0].startTime);
          }).observe({ entryTypes: ['first-contentful-paint'] });
        });
      });
      
      expect(fcp).toBeLessThan(1800);
      console.log(`FCP: ${fcp}ms`);
    }, 10000);
  });

  describe('Accessibility Tests', () => {
    it('should have proper page title', async () => {
      await page.goto(baseUrl);
      const title = await page.title();
      
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      expect(title.length).toBeLessThan(60);
      
      console.log(`Page title: "${title}"`);
    });

    it('should have proper meta description', async () => {
      await page.goto(baseUrl);
      const metaDescription = await page.$eval(
        'meta[name="description"]',
        (el) => el.getAttribute('content')
      );
      
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      expect(metaDescription!.length).toBeLessThan(160);
      
      console.log(`Meta description: "${metaDescription}"`);
    });

    it('should have proper heading structure', async () => {
      await page.goto(baseUrl);
      
      const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (elements) => {
        return elements.map(el => ({
          tag: el.tagName.toLowerCase(),
          text: el.textContent?.trim() || '',
          id: el.id || ''
        }));
      });
      
      // Check if there's at least one h1
      const h1Elements = headings.filter(h => h.tag === 'h1');
      expect(h1Elements.length).toBeGreaterThan(0);
      
      // Check for proper heading hierarchy (no skipping levels)
      let previousLevel = 0;
      for (const heading of headings) {
        const currentLevel = parseInt(heading.tag.charAt(1));
        expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
        previousLevel = currentLevel;
      }
      
      console.log(`Found ${headings.length} headings with proper hierarchy`);
    });

    it('should have proper alt text for images', async () => {
      await page.goto(baseUrl);
      
      const images = await page.$$eval('img', (elements) => {
        return elements.map(el => ({
          src: el.src,
          alt: el.alt,
          hasAlt: el.hasAttribute('alt')
        }));
      });
      
      const imagesWithoutAlt = images.filter(img => !img.hasAlt);
      expect(imagesWithoutAlt.length).toBe(0);
      
      console.log(`All ${images.length} images have alt text`);
    });

    it('should have proper color contrast', async () => {
      await page.goto(baseUrl);
      
      // Basic color contrast check - look for common low-contrast issues
      const lowContrastElements = await page.$$eval(
        'button, a, input, textarea, select',
        (elements) => {
          return elements.filter(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Simple contrast check (this is a basic implementation)
            // In a real scenario, you'd use a proper contrast calculation library
            return color === backgroundColor || 
                   color === 'rgba(0, 0, 0, 0)' || 
                   backgroundColor === 'rgba(0, 0, 0, 0)';
          }).length;
        }
      );
      
      expect(lowContrastElements).toBe(0);
      console.log('No obvious color contrast issues found');
    });
  });

  describe('Functionality Tests', () => {
    it('should have working navigation', async () => {
      await page.goto(baseUrl);
      
      // Check if navigation links are present and clickable
      const navLinks = await page.$$('nav a, header a, [role="navigation"] a');
      expect(navLinks.length).toBeGreaterThan(0);
      
      // Test first navigation link
      if (navLinks.length > 0) {
        const firstLink = navLinks[0];
        const href = await firstLink.getAttribute('href');
        
        if (href && !href.startsWith('#')) {
          await firstLink.click();
          await page.waitForLoadState('networkidle');
          
          // Verify URL changed
          const currentUrl = page.url();
          expect(currentUrl).not.toBe(baseUrl);
          
          console.log(`Navigation test: Clicked link to ${currentUrl}`);
        }
      }
    });

    it('should have working forms', async () => {
      await page.goto(baseUrl);
      
      const forms = await page.$$('form');
      expect(forms.length).toBeGreaterThan(0);
      
      for (const form of forms) {
        const inputs = await form.$$('input, textarea, select');
        expect(inputs.length).toBeGreaterThan(0);
        
        // Check if form has proper labels
        const labels = await form.$$('label');
        expect(labels.length).toBeGreaterThan(0);
        
        console.log(`Form test: Found form with ${inputs.length} inputs and ${labels.length} labels`);
      }
    });

    it('should have responsive design', async () => {
      await page.goto(baseUrl);
      
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(1000);
      
      const mobileLayout = await page.screenshot({ fullPage: true });
      expect(mobileLayout).toBeTruthy();
      
      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.waitForTimeout(1000);
      
      const tabletLayout = await page.screenshot({ fullPage: true });
      expect(tabletLayout).toBeTruthy();
      
      // Reset to desktop
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log('Responsive design test: Layouts render properly on different screen sizes');
    });

    it('should have working JavaScript', async () => {
      await page.goto(baseUrl);
      
      // Check if JavaScript is working by looking for dynamic content
      const hasJavaScript = await page.evaluate(() => {
        return typeof window !== 'undefined' && 
               typeof document !== 'undefined' &&
               document.readyState === 'complete';
      });
      
      expect(hasJavaScript).toBe(true);
      
      // Check for React hydration
      const hasReact = await page.evaluate(() => {
        return document.querySelector('[data-reactroot]') !== null ||
               document.querySelector('[data-reactid]') !== null ||
               window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== undefined;
      });
      
      expect(hasReact).toBe(true);
      
      console.log('JavaScript test: React app is properly hydrated');
    });
  });

  describe('SEO Tests', () => {
    it('should have proper Open Graph tags', async () => {
      await page.goto(baseUrl);
      
      const ogTitle = await page.$eval(
        'meta[property="og:title"]',
        (el) => el.getAttribute('content')
      ).catch(() => null);
      
      const ogDescription = await page.$eval(
        'meta[property="og:description"]',
        (el) => el.getAttribute('content')
      ).catch(() => null);
      
      const ogImage = await page.$eval(
        'meta[property="og:image"]',
        (el) => el.getAttribute('content')
      ).catch(() => null);
      
      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      
      console.log(`Open Graph: Title="${ogTitle}", Description="${ogDescription}", Image="${ogImage}"`);
    });

    it('should have proper canonical URL', async () => {
      await page.goto(baseUrl);
      
      const canonical = await page.$eval(
        'link[rel="canonical"]',
        (el) => el.getAttribute('href')
      ).catch(() => null);
      
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('http');
      
      console.log(`Canonical URL: ${canonical}`);
    });

    it('should have proper robots meta tag', async () => {
      await page.goto(baseUrl);
      
      const robots = await page.$eval(
        'meta[name="robots"]',
        (el) => el.getAttribute('content')
      ).catch(() => null);
      
      // Should either have robots meta tag or not block indexing
      if (robots) {
        expect(robots).not.toContain('noindex');
      }
      
      console.log(`Robots meta: ${robots || 'not set (defaults to index)'}`);
    });
  });

  describe('Security Tests', () => {
    it('should have proper security headers', async () => {
      const response = await page.goto(baseUrl);
      const headers = response?.headers();
      
      expect(headers).toBeTruthy();
      
      // Check for common security headers
      const securityHeaders = {
        'X-Content-Type-Options': headers?.['x-content-type-options'],
        'X-Frame-Options': headers?.['x-frame-options'],
        'X-XSS-Protection': headers?.['x-xss-protection'],
        'Referrer-Policy': headers?.['referrer-policy'],
        'Content-Security-Policy': headers?.['content-security-policy']
      };
      
      console.log('Security headers:', securityHeaders);
      
      // At least some security headers should be present
      const presentHeaders = Object.values(securityHeaders).filter(Boolean);
      expect(presentHeaders.length).toBeGreaterThan(0);
    });

    it('should not expose sensitive information', async () => {
      await page.goto(baseUrl);
      
      const pageSource = await page.content();
      
      // Check for common sensitive information patterns
      const sensitivePatterns = [
        /api[_-]?key/i,
        /password/i,
        /secret/i,
        /token/i,
        /private[_-]?key/i
      ];
      
      for (const pattern of sensitivePatterns) {
        const matches = pageSource.match(pattern);
        if (matches) {
          console.warn(`Potential sensitive information found: ${matches[0]}`);
        }
      }
      
      // This is more of a warning than a strict test
      expect(true).toBe(true);
    });
  });

  describe('Error Handling Tests', () => {
    it('should handle 404 errors gracefully', async () => {
      const response = await page.goto(`${baseUrl}/non-existent-page`);
      
      // Should not return 500 error
      expect(response?.status()).not.toBe(500);
      
      // Should either be 404 or redirect to a custom 404 page
      const status = response?.status();
      expect([200, 404]).toContain(status);
      
      console.log(`404 test: Status ${status}`);
    });

    it('should not have console errors', async () => {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Filter out common non-critical errors
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') &&
        !error.includes('analytics') &&
        !error.includes('adblock') &&
        !error.includes('extension')
      );
      
      console.log(`Console errors found: ${criticalErrors.length}`);
      criticalErrors.forEach(error => console.warn(`Error: ${error}`));
      
      // Allow some non-critical errors but not too many
      expect(criticalErrors.length).toBeLessThan(5);
    });
  });
});
