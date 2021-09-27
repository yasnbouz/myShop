// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: [`src/**/*.{ts,js,tsx,css}`],
    exclude: [`node_modules`, `.git`, `.next`],
  },
});
