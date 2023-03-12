import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function Navbar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="static"
        className="p-4 bg-primary"
        data-cy="header-background"
      >
        <Toolbar>
          <h2 className="font-bold text-2xl ml-48" data-cy="header-title">
            TO DO LIST APP
          </h2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
