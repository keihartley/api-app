import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "../Components/Auth/Register";
import Reset from "../Components/Auth/Reset";
import Search from "./Pages/Search";
import CocktailDetails from "../Components/CocktailList/CocktailDetails";
import Saved from "./Pages/Saved";
import Settings from "./Pages/Settings";
import { useState } from "react";
import { lightTheme, darkTheme } from "../Other/theme";
import { ThemeProvider } from "@mui/material/styles";
import useSettings from "../Tools/Hooks/useSettings";
import { useEffect } from "react";
import Loading from "react-loading";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@mui/material";
import Bar from "../Components/Nav/Bar";
import { useRef, forwardRef } from "react";
import { useLocation } from "react-router-dom";

export const BarWithRef = forwardRef((props, ref) => {
  const location = useLocation();
  const shouldShowBar = !["/", "/register", "/reset"].includes(
    location.pathname
  );
  return shouldShowBar && <Bar barRef={ref} />;
});

function App() {
  const [theme, setTheme] = useState(null);
  const barRef = useRef(null);
  const { settings, loading, user } = useSettings();

  useEffect(() => {
    if (user && settings && !loading) {
      setTheme(settings.theme);
    }
  }, [user, settings, loading]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme || "light");
  }, []);

  return (
    <AnimatePresence>
      {!theme ? (
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading type="cylon" color="#00BFFF" height={100} width={100} />
          </motion.div>
        </Container>
      ) : (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <Container disableGutters maxWidth={false}>
            <Router>
              <BarWithRef ref={barRef} />
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={<Dashboard barRef={barRef} />}
                />
                <Route path="/reset" element={<Reset />} />
                <Route path="/search/:cocktail" element={<Search />} />
                <Route path="/cocktail/:id" element={<CocktailDetails />} />
                <Route path="/profile/saved" element={<Saved />} />
                <Route
                  path="/profile/settings"
                  element={<Settings setTheme={setTheme} theme={theme} />}
                />
              </Routes>
            </Router>
          </Container>
        </ThemeProvider>
      )}
    </AnimatePresence>
  );
}

export default App;
