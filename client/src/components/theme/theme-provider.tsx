import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "executive-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme
      if (stored && ["dark", "light", "system"].includes(stored)) {
        return stored
      }
    }
    return defaultTheme
  })

  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light")

  // Get system preference
  const getSystemTheme = (): "dark" | "light" => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }

  // Apply theme to DOM
  const applyTheme = (newTheme: "dark" | "light") => {
    const root = window.document.documentElement
    const body = window.document.body
    
    // Remove existing theme classes
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")
    
    // Add new theme class
    root.classList.add(newTheme)
    body.classList.add(newTheme)
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    const color = newTheme === 'dark' ? '#0a0a0a' : '#ffffff'
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', color)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = color
      document.head.appendChild(meta)
    }
    
    // Set color scheme for better form controls
    root.style.colorScheme = newTheme
    
    setActualTheme(newTheme)
  }

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    
    const handleChange = () => {
      if (theme === "system") {
        const systemTheme = getSystemTheme()
        applyTheme(systemTheme)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  // Apply theme on mount and theme change
  useEffect(() => {
    let themeToApply: "dark" | "light"
    
    if (theme === "system") {
      themeToApply = getSystemTheme()
    } else {
      themeToApply = theme
    }
    
    applyTheme(themeToApply)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    actualTheme,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <div className="theme-transition">
        {children}
      </div>
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}