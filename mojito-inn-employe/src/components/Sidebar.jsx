import { useState } from "react";
import { drinks } from "../data/drinks";
import { nourriture } from "../data/nourriture";
import { bestbudzz } from "../data/bestbudzz";
import { tabac } from "../data/tabac";

const Sidebar = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("Boissons");

  // Obtenir les produits en fonction de la catégorie
  const getProducts = () => {
    switch (category) {
      case "Boissons":
        return drinks;
      case "Nourriture":
        return nourriture;
      case "Best Budzz":
        return bestbudzz;
      case "Tabac":
        return tabac;
      default:
        return [];
    }
  };

  return (
    <div className="relative">
      {/* Triangle pour ouvrir/fermer */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-500 text-white cursor-pointer transition-all ${
          isOpen ? "left-[250px]" : "left-0"
        }`}
        style={{
          clipPath: "polygon(100% 50%, 0 0, 0 100%)",
          width: "50px",
          height: "50px",
        }}
      ></div>

      {/* Contenu de la barre latérale */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-800 p-6 shadow-lg transform transition-transform overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "250px",
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Carte
        </h2>

        {/* Navigation des catégories */}
        <div className="mb-6">
          {["Boissons", "Nourriture", "Best Budzz", "Tabac"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`w-full p-2 text-left mb-2 rounded-lg transition ${
                category === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Liste des produits */}
        <div className="flex flex-col gap-4">
          {getProducts().map((product) => (
            <div
              key={product.id}
              onClick={() => onAdd(product)}
              className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition"
            >
              <span className="block font-bold text-lg text-gray-900 dark:text-gray-100">
                {product.name}
              </span>
              <span className="block text-gray-700 dark:text-gray-300">
                ${product.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
