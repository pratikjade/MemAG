import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { EmailDetail } from "./pages/EmailDetail";
import { PriorityEngine } from "./pages/PriorityEngine";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/email/:id",
    Component: EmailDetail,
  },
  {
    path: "/priority-engine",
    Component: PriorityEngine,
  },
]);
