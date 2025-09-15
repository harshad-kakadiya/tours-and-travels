/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-800
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // blue-800
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // orange-500
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // slate-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // emerald-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // slate-50
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand-specific colors
        'trust-builder': {
          DEFAULT: "var(--color-trust-builder)", // indigo-500
          foreground: "var(--color-trust-builder-foreground)", // white
        },
        'conversion-cta': {
          DEFAULT: "var(--color-conversion-cta)", // red-600
          foreground: "var(--color-conversion-cta-foreground)", // white
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Poppins", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "sans-serif"],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }], // 48px
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }], // 40px
        'heading-1': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }], // 32px
        'heading-2': ['1.5rem', { lineHeight: '1.3' }], // 24px
        'heading-3': ['1.25rem', { lineHeight: '1.4' }], // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.6' }], // 18px
        'body': ['1rem', { lineHeight: '1.6' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5' }], // 14px
        'caption': ['0.75rem', { lineHeight: '1.4' }], // 12px
      },
      spacing: {
        'brand-xs': 'var(--spacing-xs)', // 8px
        'brand-sm': 'var(--spacing-sm)', // 16px
        'brand-md': 'var(--spacing-md)', // 24px
        'brand-lg': 'var(--spacing-lg)', // 32px
        'brand-xl': 'var(--spacing-xl)', // 48px
        'brand-2xl': 'var(--spacing-2xl)', // 64px
      },
      borderRadius: {
        'brand-sm': 'var(--radius-sm)', // 4px
        'brand-md': 'var(--radius-md)', // 8px
        'brand-lg': 'var(--radius-lg)', // 12px
        'brand-xl': 'var(--radius-xl)', // 16px
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'brand-soft': 'var(--shadow-soft)',
        'brand-medium': 'var(--shadow-medium)',
        'brand-large': 'var(--shadow-large)',
      },
      animation: {
        'fade-in': 'fadeIn var(--timing-normal) var(--easing-smooth)',
        'slide-up': 'slideUp var(--timing-normal) var(--easing-smooth)',
        'pulse-soft': 'pulseSoft 2s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      transitionTimingFunction: {
        'brand-smooth': 'var(--easing-smooth)',
      },
      transitionDuration: {
        'brand-fast': 'var(--timing-fast)',
        'brand-normal': 'var(--timing-normal)',
        'brand-slow': 'var(--timing-slow)',
      },
      backdropBlur: {
        'brand': '8px',
      },
      screens: {
        'xs': '475px',
      },
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '60',
        'tooltip': '70',
        'dropdown': '55',
      },
      aspectRatio: {
        'hero': '16/9',
        'card': '4/3',
        'square': '1/1',
        'portrait': '3/4',
      },
      gridTemplateColumns: {
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
        'asymmetric': '2fr 1fr 1.5fr',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'wide': '1400px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}