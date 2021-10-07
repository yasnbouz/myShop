// @ts-ignore
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: `class`,
  theme: {},
  extract: {
    include: [`src/**/*.{ts,js,tsx,css}`],
    exclude: [`node_modules`, `.git`, `.next`],
  },
});
