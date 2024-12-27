"use client";

import { cacheRtl, theme } from "@/utils/muiTheme";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";

function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

export default ClientProvider;
