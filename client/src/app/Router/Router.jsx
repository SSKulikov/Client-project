import { BrowserRouter, Routes, Route } from "react-router";
import Registration from "../../pages/Registration";
import LoginPage from "../../pages/LoginPage";
import { useState } from "react";
import axios from "axios";
import { setAccessToken } from "../../shared/axiosinstance";
import ProtectedRoute from "../../shared/ProtectedRoute";
import HomePage from "../../pages/HomePage";
import Layout from "../Layout";
import { useEffect } from "react";

function Router() {
  const [user, setUser] = useState(null);

  const registration = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    const respons = await axios.post("/api/auth/registration", data);
    setUser(respons.data.user);
    setAccessToken(respons.data.accessToken);
  };

  const login = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    const respons = await axios.post("/api/auth/login", data);
    setUser(respons.data.user);
    setAccessToken(respons.data.accessToken);
  };

  const logout = async (e) => {
    axios.delete("/api/auth/logout").then(() => setUser(null));
  };

  useEffect(() => {
    axios
      .get("/api/auth/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} logout={logout} />}>
          <Route path="/" element={<HomePage user={user} />} />
          <Route
            path="/registration"
            element={
              <ProtectedRoute isAllowed={!user} redirectTo="/landlord">
                <Registration registration={registration} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAllowed={!user} redirectTo="/">
                <LoginPage login={login} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
