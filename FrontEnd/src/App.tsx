import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "Redux/store";
import { getUserDetails } from "./../Redux/userSlice";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import { ClipLoader } from "react-spinners";
import Navbar from "./components/Navbar";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { email, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  if (status === "NavigationLoading") {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center    ">
        <ClipLoader size={55} />
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={email ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={email ? <Navigate to="/home" /> : <RegisterPage />}
        />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
