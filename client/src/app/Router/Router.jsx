import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Registration from "../../pages/Registration";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import LandlordPage from "../../pages/LandlordPage";
import LocatairePage from "../../pages/LocatairePage";

import { setAccessToken } from "../../shared/axiosinstance";
import ProtectedRoute from "../../shared/ProtectedRoute";
import Layout from "../Layout";

function Router() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registration = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const respons = await axios.post("/api/auth/registration", data);
    setUser(respons.data.user);
    setAccessToken(respons.data.accessToken);
    localStorage.setItem("token", respons.data.accessToken);
    console.log("Токен сохранен при регистрации");
  };

  const login = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const respons = await axios.post("/api/auth/login", data);
    setUser(respons.data.user);
    setAccessToken(respons.data.accessToken);
    localStorage.setItem("token", respons.data.accessToken);
    console.log("Токен сохранен при регистрации");
  };

  const logout = async () => {
    axios.delete("/api/auth/logout").then(() => {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem("token");
    });
  };

  useEffect(() => {
    axios
      .get("/api/auth/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
      })
      .finally(() => setLoading(false));
  }, []);

  const redirectAfterAuth =
    user?.type === "landlord"
      ? "/landlord"
      : user?.type === "locataire"
      ? "/locataire"
      : "/";

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} logout={logout} />}>
          <Route path="/" element={<HomePage user={user} />} />

          <Route
            path="/registration"
            element={
              <ProtectedRoute
                isAllowed={!user}
                redirectTo={redirectAfterAuth}
              >
                <Registration registration={registration} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <ProtectedRoute
                isAllowed={!user}
                redirectTo="/"
              >
                <LoginPage login={login} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/landlord"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.type === "landlord"}
                redirectTo="/"
              >
                <LandlordPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/locataire"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.type === "locataire"}
                redirectTo="/"
              >
                <LocatairePage user={user}/>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
