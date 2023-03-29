import {useNavigate} from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {useGoogleLogout} from "react-google-login";

const clientId = process.env.REACT_APP_CLIENT_ID_DEV;

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
    <Box sx={{flexGrow: 1, zIndex: 2000}} className="fixed w-full">
      <AppBar
        position="static"
        className="lg:p-4 bg-primary"
        data-cy="header-background"
      >
        <Toolbar className="flex flex-row justify-between">
          <h2
            className="font-bold text-xl lg:text-2xl lg:ml-48"
            data-cy="header-title"
          >
            Do Your List
          </h2>
          <span
            role="button"
            className="font-bold text-md lg:text-xl lg:mr-24"
            onClick={onLogout}
          >
            Logout
          </span>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
