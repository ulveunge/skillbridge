import "../scss/style.scss";

import {
  HelloWorldController,
  MobileNavController,
  StickyNavController,
  InteractiveBorderController,
  VideoController,
} from "./controllers";

import { Application } from "@hotwired/stimulus";

const application = Application.start();
application.register("hello-world", HelloWorldController);
application.register("mobile-nav", MobileNavController);
application.register("sticky-nav", StickyNavController);
application.register("interactive-border", InteractiveBorderController);
application.register("video", VideoController);
