import { useState, useEffect } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    fetch("/data/auth.json")
      .then((res) => res.json())
      .then((data) => setAuth(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des identifiants", err)
      );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === auth.username && password === auth.password) {
      setLoading(true); // Active le mode chargement
      setError("");

      // Simule une barre de chargement
      let progressValue = 0;
      const messages = [
        "Chargement de la carte...",
        "Chargement des prix...",
        "Connexion à la base de données du Mojito Inn...",
        "100% Bienvenue employé(e) du Mojito Inn !",
      ];

      const interval = setInterval(() => {
        progressValue += 25;
        setProgress(progressValue);
        setWelcomeMessage(messages[progressValue / 25 - 1]);

        if (progressValue === 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLogin(); // Passe à l'application principale
          }, 1000);
        }
      }, 1000);
    } else {
      setError("Identifiants incorrects !");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      {loading ? (
        <div className="text-center">
          <div className="w-64 h-6 bg-gray-200 rounded-full overflow-hidden relative mb-4">
            <div
              className="bg-blue-500 h-full absolute left-0 transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-900 dark:text-white">{welcomeMessage}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg space-y-4 w-80"
        >
          <h1 className="text-xl font-bold text-center text-gray-900 dark:text-white">
            Connexion
          </h1>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-600 dark:text-gray-300"
            >
              {showPassword ? "👁️" : "👁‍🗨"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Se connecter
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
