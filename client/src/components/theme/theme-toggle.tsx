import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme()

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      case "system":
        return <Monitor className="h-5 w-5" />
      default:
        return actualTheme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-10 w-10 px-0 bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
          data-testid="button-theme-toggle"
        >
          {getIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border-border">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="hover:bg-accent hover:text-accent-foreground cursor-pointer"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Simple toggle version (for minimal UI)
export function SimpleThemeToggle() {
  const { actualTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(actualTheme === "light" ? "dark" : "light")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 px-0 bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
      data-testid="button-simple-theme-toggle"
    >
      {actualTheme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}