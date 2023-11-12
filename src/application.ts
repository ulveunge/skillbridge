import "./scss/style.scss";

import { Application } from "@hotwired/stimulus";
import { HelloWorldController } from "./controllers";

const application = Application.start();
application.register("hello-world", HelloWorldController);
