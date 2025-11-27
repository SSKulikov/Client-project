import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import Registration from "../../pages/Registration";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import LandlordPage from "../../pages/LandlordPage";
import LocatairePage from "../../pages/LocatairePage";
import CardPage from "../../pages/CradsPage";
import { setAccessToken } from "../../shared/axiosinstance";
import ProtectedRoute from "../../shared/ProtectedRoute";
import Layout from "../Layout";
import Page1 from "../../pages/Page1";

function Router() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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
      setFavoriteProperties([]);
    });
  };

  const addToFavorites = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `/api/property/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await loadFavorites();
    } catch (err) {
      console.error("Ошибка добавления в избранное:", err);
      throw err;
    }
  };

  const removeFromFavorites = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/property/${id}/favorite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await loadFavorites();
    } catch (err) {
      console.error("Ошибка удаления из избранного:", err);
      throw err;
    }
  };

  const loadFavorites = async () => {
    if (user?.type === "locataire") {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("/api/property/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFavoriteProperties(res.data);
      } catch (err) {
        console.error("Ошибка загрузки избранного:", err);
      }
    }
  };

  const isFavorite = (propertyId) => {
    return favoriteProperties.some((fav) => fav.id === propertyId);
  };

  useEffect(() => {
    axios
      .get("/api/property")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Ошибка загрузки объявлений:", err));
  }, []);

  useEffect(() => {
    axios
      .get("/api/auth/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        localStorage.setItem("token", res.data.accessToken);
        if (res.data.user?.type === "locataire") {
          loadFavorites();
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user?.type === "locataire") {
      loadFavorites();
    } else {
      setFavoriteProperties([]);
    }
  }, [user]);

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
        <Route
          element={
            <Layout
              user={user}
              logout={logout}
              favoriteCount={favoriteProperties.length}
            />
          }
        >
          <Route path="/card/:id" element={<CardPage />} />
          <Route
            path="/"
            element={
              <HomePage
                user={user}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorite={isFavorite}
                favoriteProperties={favoriteProperties}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <ProtectedRoute isAllowed={!user} redirectTo={redirectAfterAuth}>
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

          <Route
            path="/landlord"
            element={
              <ProtectedRoute
                isAllowed={!!user && user.type === "landlord"}
                redirectTo="/"
              >
                <LandlordPage
                  setProperties={setProperties}
                  properties={properties}
                />
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
                <LocatairePage
                  user={user}
                  favoriteProperties={favoriteProperties}
                  removeFromFavorites={removeFromFavorites}
                  loadFavorites={loadFavorites}
                />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="/page1"
          element={<Page1 properties={properties} user={user} />}
        >
          <></>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
