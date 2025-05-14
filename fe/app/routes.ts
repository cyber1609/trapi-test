import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/duffel-demo", "routes/duffel-demo.tsx"),
] satisfies RouteConfig;
