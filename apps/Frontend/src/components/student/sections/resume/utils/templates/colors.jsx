export const colors = {
  modern: {
    primary: "#1a365d", // Deep blue - professional & trustworthy
    secondary: "#4a5568", // Slate gray - readable
    accent: "#3182ce", // Bright blue - attention
    surface: "#ffffff", // White background
    hover: {
      primary: "#2c5282",
      accent: "#2b6cb0",
    },
    text: {
      primary: "#2d3748",
      secondary: "#4a5568",
      light: "#718096",
    },
    border: "#e2e8f0",
  },
  professional: {
    primary: "#2d3748",
    secondary: "#4a5568",
    accent: "#38a169",
    surface: "#ffffff",
    hover: {
      primary: "#1a202c",
      accent: "#2f855a",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
      light: "#718096",
    },
    border: "#cbd5e0",
  },
  minimalist: {
    primary: "#000000",
    secondary: "#4a5568",
    accent: "#718096",
    surface: "#ffffff",
    hover: {
      primary: "#1a202c",
      accent: "#4a5568",
    },
    text: {
      primary: "#000000",
      secondary: "#4a5568",
      light: "#a0aec0",
    },
    border: "#e2e8f0",
  },
  creative: {
    primary: "#312e81",
    secondary: "#4f46e5",
    accent: "#818cf8",
    surface: "#ffffff",
    background: {
      gradient: "linear-gradient(135deg, #312e81 0%, #4f46e5 100%)",
    },
    hover: {
      primary: "#3730a3",
      accent: "#6366f1",
    },
    text: {
      primary: "#1e1b4b",
      secondary: "#4338ca",
      light: "#6366f1",
    },
    border: "#c7d2fe",
  },
  // Shared colors for all templates
  common: {
    error: "#e53e3e",
    success: "#38a169",
    warning: "#d69e2e",
    info: "#3182ce",
    white: "#ffffff",
    black: "#000000",
  },
  // Dark mode variations (optional)
  dark: {
    surface: "#1a202c",
    text: {
      primary: "#f7fafc",
      secondary: "#e2e8f0",
    },
  },
};

// Spacing system
export const spacing = {
  base: 8,
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
};

// Typography system
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};
