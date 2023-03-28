import {useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {useGoogleLogout} from "react-google-login";

const clientId = process.env.REACT_APP_CLIENT_ID;

export default function Navbar() {
  const navigate = useNavigate();

  const onLogoutSuccess = () => {
    localStorage.clear();
    navigate("/login");
  };

  const {signOut} = useGoogleLogout({
    clientId,
    onLogoutSuccess,
  });

  const onLogout = () => {
    signOut();
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="static"
        className="p-4 bg-primary"
        data-cy="header-background"
      >
        <Toolbar className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl ml-48" data-cy="header-title">
            Do Your List
          </h2>
          <span
            role="button"
            className="font-bold text-xl mr-24"
            onClick={onLogout}
          >
            Logout
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
