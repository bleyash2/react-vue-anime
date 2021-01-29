import Vue from "vue";
import App from "./App.vue";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueRouter from "vue-router";
import VueApollo from "vue-apollo";
import MediaList from "./components/MediaList.vue";
import MediaView from "./components/MediaView.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronLeft);
library.add(faChevronRight);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://graphql.anilist.co",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const apolloProvider = new VueApollo({ defaultClient: apolloClient });

const routes = [
  { path: "/:pageNum", component: MediaList },
  { path: "/title/:id", component: MediaView },
  { path: "/", redirect: "/1" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
