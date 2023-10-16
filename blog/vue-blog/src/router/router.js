import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import About from "../components/About.vue";
import Contact from "../components/Contact.vue";
import Posts from "../components/Posts.vue";
import Post from "../components/Post.vue";
import Sidebar from "../components/Sidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import Protected from "../components/Protected.vue";
import Admin from "../components/Admin.vue";
import Editor from "../components/Editor.vue";

import { authStore } from "../store/store";
// import { authStore } from "../store/piniastore";

const routes = [
  {
    path: "/",
    components: {
      default: Home,
      LeftSideBar: Sidebar,
    },
    name: "home",
  },

  {
    path: "/login",
    components: {
      default: Login,
      LeftSideBar: Sidebar,
    },
    name: "login",
  },

  {
    path: "/about",
    components: {
      default: About,
      LeftSideBar: Sidebar,
    },
    name: "about",
  },

  {
    path: "/admin",
    components: {
      default: Admin,
      LeftSideBar: Sidebar,
    },
    name: "admin",
    meta: {
      requiresAuth: true,
      role: "admin",
    },
  },

  {
    path: "/editor",
    components: {
      default: Editor,
      LeftSideBar: Sidebar,
    },
    name: "editor",
    meta: {
      requiresAuth: true,
      role: "editor",
    },
  },

  {
    path: "/contact",
    components: {
      default: Contact,
      LeftSideBar: Sidebar,
    },
    name: "contact",
  },

  {
    path: "/posts",
    components: {
      default: Posts,
      LeftSideBar: Sidebar,
      RightSideBar: RightSidebar,
    },
    name: "posts",
  },

  {
    path: "/posts/tag/:tag",
    components: {
      default: Posts,
      LeftSideBar: Sidebar,
      RightSideBar: RightSidebar,
    },
    name: "tag",
  },

  {
    path: "/posts/:id",
    components: {
      default: Post,
      LeftSideBar: Sidebar,
    },
    name: "post",
  },

  {
    path: "/protected",
    components: {
      default: Protected,
      LeftSideBar: Sidebar,
    },
    name: "protected",
    meta: {
      requiresAuth: true,
    },
  },
];

// const isAuthenticated = () => {
//   return localStorage.getItem("token") == "123";
// };

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("To:", to);
  // console.log("From:", from);
  // next();
  const auth = authStore;

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next("/login");
  } else if (to.meta.role == "admin" && auth.user.role != "admin") {
    next("/");
  } else {
    next();
  }
});

export default router;
