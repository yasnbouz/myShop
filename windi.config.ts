import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: `class`,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        hero: `linear-gradient(225deg, #21D4FD 0%, #B721FF 100%)`,
      }),
    },
  },
  extract: {
    include: [`src/**/*.{ts,js,tsx,css}`],
    exclude: [`node_modules`, `.git`, `.next`],
  },
  plugins: [],
});
