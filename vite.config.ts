import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const routes = {
  main: resolve(__dirname, "index.html"),
  ui: resolve(__dirname, "ui.html"),
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
