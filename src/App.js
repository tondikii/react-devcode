import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages";
import DetailPage from "./pages/Detail";
import WrapperRoute from "./components/WrapperRoute";
import LoginPage from "./pages/Login";

function App() {
  const RequiredLogin = ({children}) => {
    if (!localStorage.email) {
      return <Navigate to="/login" />;
    } else return children;
  };
  const ForbiddenLoggedIn = ({children}) => {
    if (localStorage.email) {
      return <Navigate to="/" />;
    } else return children;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredLogin>
              <WrapperRoute />
            </RequiredLogin>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <ForbiddenLoggedIn>
              <LoginPage />
            </ForbiddenLoggedIn>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
