import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const routes = {
  main: resolve(__dirname, "index.html"),
  courses: resolve(__dirname, "courses.html"),
  course: resolve(__dirname, "course.html"),
  about: resolve(__dirname, "about.html"),
  pricing: resolve(__dirname, "pricing.html"),
  contact: resolve(__dirname, "contact.html"),
  login: resolve(__dirname, "login.html"),
  "sign-up": resolve(__dirname, "sign-up.html"),
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
  base: "/skillbridge/",
};
