import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Menu from "./pages/Menu";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Update dark mode class on the `body` element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <header className="bg-blue-500 dark:bg-blue-700 text-white py-4 px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mojito Inn</h1>
          <button
            onClick={toggleTheme}
            className="text-2xl p-2 rounded-full bg-white dark:bg-gray-800 text-blue-500 dark:text-yellow-300 shadow-lg"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default App;
