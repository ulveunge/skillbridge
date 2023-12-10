import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const routes = {
  main: resolve(__dirname, "index.html"),
  courses: resolve(__dirname, "courses.html"),
  // about: resolve(__dirname, "about.html"),
  // pricing: resolve(__dirname, "pricing.html"),
  // contact: resolve(__dirname, "contact.html"),
  ui: resolve(__dirname, "ui.html"),
  // "sign-in": resolve(__dirname, "sign-in.html"),
  // "sign-up": resolve(__dirname, "sign-up.html"),
};

export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        ...routes,
      },
    },
  },
};
