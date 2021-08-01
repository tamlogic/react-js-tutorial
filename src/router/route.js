import Dashboard from "../views/Client/Dashboard";
import Home from "../views/Client/Home";
import Login from "../views/Auth/Login";

const dashboardRoutes = [
  // Auth Routes
  {
    path: "/home",
    name: "title.home",
    component: Home
  },
  // Auth Routes
  {
    path: "/login",
    name: "title.login",
    component: Login
  },
  // Dashboard Routes
  {
    path: "/dashboard",
    name: "title.dashboard",
    component: Dashboard
  },
]

export default dashboardRoutes;