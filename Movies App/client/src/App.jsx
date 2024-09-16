import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movie from "./pages/Movie";
import MovieFormPage from "./pages/MovieFormPage";
import Profile from "./pages/Profile";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import DashBoard from "./pages/DashBoard";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/movie" element={<Movie />} />
              <Route path="/add-movie" element={<MovieFormPage />} />
              <Route path="/add-movie/:id" element={<MovieFormPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/dashboard/:id" element={<DashBoard />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
