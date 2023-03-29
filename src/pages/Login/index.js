import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import LoginSvg from "../../assets/login.svg";
import IconGoogleSvg from "../../assets/icon-google.svg";

const clientId = process.env.REACT_APP_CLIENT_ID_DEV;

const CustomLoginButton = (props) => {
  return (
    <button
      className="bg-primary p-2 rounded-lg w-2/3 text-white flex flex-row justify-center"
      onClick={props.onClick}
    >
      <img src={IconGoogleSvg} alt={IconGoogleSvg} className="w-7 h-7" />
      <span className="font-bold text-lg ml-1">Login</span>
    </button>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const onSuccess = (res) => {
    if (res?.profileObj?.email) {
      localStorage.email = res.profileObj.email;
      navigate("/");
    }
  };
  const onFailure = (res) => {
    console.error(res);
    alert("Login failed!");
  };

  useEffect(() => {
    const start = () => {
      gapi?.client.init({clientId, scope: ""});
    };
    gapi.load("client:auth2", start);
  });

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-96 p-4">
        <span className="text-left text-xs text-secondary">Login to</span>
        <h1 className="font-bold text-2xl text-zinc-900">Do Your List</h1>
        <img src={LoginSvg} alt={LoginSvg} className="w-4/5" />
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy="single_host_origin"
          render={(props) => <CustomLoginButton {...props} />}
        />
      </div>
    </div>
  );
};
export default LoginPage;
