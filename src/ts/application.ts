import "../scss/style.scss";

import {
  MobileNavController,
  StickyNavController,
  InteractiveBorderController,
  VideoController,
  TabController,
  AccordionController,
} from "./controllers";

import { Application } from "@hotwired/stimulus";

const application = Application.start();
application.register("mobile-nav", MobileNavController);
application.register("sticky-nav", StickyNavController);
application.register("interactive-border", InteractiveBorderController);
application.register("video", VideoController);
application.register("tab", TabController);
application.register("accordion", AccordionController);
