import "../scss/style.scss";

import {
  HelloWorldController,
  MobileNavController,
  StickyNavController,
} from "./controllers";

import { Application } from "@hotwired/stimulus";

const application = Application.start();
application.register("hello-world", HelloWorldController);
application.register("mobile-nav", MobileNavController);
application.register("sticky-nav", StickyNavController);
