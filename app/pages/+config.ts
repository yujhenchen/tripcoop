import type { Config } from "vike/types";
import vikePhoton from "vike-photon/config";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: "Trip Co-op",
  description: "Plan your next adventure together",

  passToClient: ["user", "routePath", "bgImgUrl"],
  extends: [vikeReact, vikePhoton],

  // https://vike.dev/vike-photon
  photon: {
    server: "../server/entry.ts",
  },
} satisfies Config;
