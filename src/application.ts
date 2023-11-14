import "./scss/style.scss";

import { HelloWorldController, MobileNavController } from "./ts/controllers";

import { Application } from "@hotwired/stimulus";

const application = Application.start();
application.register("hello-world", HelloWorldController);
application.register("mobile-nav", MobileNavController);
