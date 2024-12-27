import createCache from "@emotion/cache";
import { createTheme } from "@mui/material";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export const theme = createTheme({
  direction: "rtl", // Global RTL setting
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
