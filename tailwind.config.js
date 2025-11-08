/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4ADE80',
        error: '#F87171',
        background: '#1E3A47',
        input: '#2D5563',
        card: '#234150',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'h1': ['64px', { lineHeight: '80px', letterSpacing: '0%' }],
        'h2': ['48px', { lineHeight: '56px', letterSpacing: '0%' }],
        'h3': ['32px', { lineHeight: '40px', letterSpacing: '0%' }],
        'h4': ['24px', { lineHeight: '32px', letterSpacing: '0%' }],
        'h5': ['20px', { lineHeight: '24px', letterSpacing: '0%' }],
        'h6': ['16px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-lg': ['20px', { lineHeight: '32px', letterSpacing: '0%' }],
        'body': ['16px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-sm': ['14px', { lineHeight: '24px', letterSpacing: '0%' }],
        'body-xs': ['12px', { lineHeight: '24px', letterSpacing: '0%' }],
        'caption': ['14px', { lineHeight: '16px', letterSpacing: '0%' }],
      },
      fontWeight: {
        regular: '400',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        '0': '0px',
        '0.5': '2px',    
        '1': '4px',      
        '2': '8px',      
        '3': '12px',     
        '4': '16px',     
        '5': '20px',     
        '6': '24px',     
        '7': '28px',     
        '8': '32px',     
        '10': '40px',    
        '12': '48px',    
        '16': '64px',    
        '20': '80px',    
        '24': '96px',    
        '30': '120px',   
        '40': '160px',   
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '126px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
}