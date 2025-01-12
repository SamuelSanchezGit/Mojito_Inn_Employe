import { useState } from "react";
import { drinks } from "../data/drinks";
import { nourriture } from "../data/nourriture";
import { bestbudzz } from "../data/bestbudzz";
import { tabac } from "../data/tabac";
import { drinksDiscount } from "../data/drinksDiscount";
import { nourritureDiscount } from "../data/nourritureDiscount";
import { bestbudzzDiscount } from "../data/bestbudzzDiscount";
import { tabacDiscount } from "../data/tabacDiscount";

const Sidebar = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false); // Basculer entre les cartes
  const [category, setCategory] = useState("drinks"); // Catégorie par défaut

  // Charger les données en fonction de "isDiscount"
  const data = isDiscount
    ? {
        drinks: drinksDiscount,
        nourriture: nourritureDiscount,
        bestbudzz: bestbudzzDiscount,
        tabac: tabacDiscount,
      }
    : { drinks, nourriture, bestbudzz, tabac };

  return (
    <div className="relative">
      {/* Triangle pour ouvrir/fermer */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-500 text-white cursor-pointer transition-all ${
          isOpen ? "left-[300px]" : "left-0"
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
          width: "300px",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {isDiscount ? "Carte -30%" : "Carte"}
          </h2>
          <button
            onClick={() => setIsDiscount(!isDiscount)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            {isDiscount ? "Normale" : "-30%"}
          </button>
        </div>

        {/* Navigation des catégories */}
        <div className="flex flex-col gap-2">
          {Object.keys(data).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`p-2 rounded ${
                category === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Produits de la catégorie sélectionnée */}
        <div className="flex flex-col gap-4 mt-4">
          {data[category]?.map((item) => (
            <div
              key={item.id}
              onClick={() => onAdd(item)}
              className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition"
            >
              <span className="block font-bold text-lg text-gray-900 dark:text-gray-100">
                {item.name}
              </span>
              <span className="block text-gray-700 dark:text-gray-300">
                ${item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
