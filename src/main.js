import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//Fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faMagnifyingGlass,
  faPlus,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan);
library.add(faPenToSquare);
library.add(faMagnifyingGlass);
library.add(faPlus);
library.add(faChevronRight);
library.add(faChevronLeft);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
