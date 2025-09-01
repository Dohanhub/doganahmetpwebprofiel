import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "dogan-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey) as Theme
      if (stored === "dark" || stored === "light") {
        return stored
      }
    }
    return defaultTheme
  })

  // Enhanced theme effect with proper body application
  useEffect(() => {
    const root = window.document.documentElement
    const body = window.document.body
    
    // Remove existing theme classes from both html and body
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")
    
    // Apply the theme to both html and body for comprehensive styling
    root.classList.add(theme)
    body.classList.add(theme)
    
    // Set color scheme for browsers
    root.style.colorScheme = theme
    
    // Apply background color immediately for instant theme switching
    if (theme === 'dark') {
      body.style.backgroundColor = 'hsl(222.2 84% 4.9%)'
      body.style.color = 'hsl(210 40% 98%)'
    } else {
      body.style.backgroundColor = 'hsl(0 0% 100%)'
      body.style.color = 'hsl(222.2 84% 4.9%)'
    }
    
    console.log('Theme applied:', theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    console.warn("useTheme must be used within a ThemeProvider")
    return { theme: "light", setTheme: () => {} }
  }

  return context
}