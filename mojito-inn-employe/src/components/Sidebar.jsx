import { useState } from "react";
import { drinks } from "../data/drinks";

const Sidebar = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Triangle pour ouvrir/fermer */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 transform -translate-y-1/2 bg-blue-500 text-white cursor-pointer transition-all ${
          isOpen ? "left-[250px]" : "left-0"
        }`}
        style={{
          clipPath: "polygon(100% 50%, 0 0, 0 100%)", // Crée le triangle
          width: "50px", // Largeur du triangle
          height: "50px", // Hauteur du triangle
        }}
      ></div>

      {/* Contenu de la barre latérale */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-800 p-6 shadow-lg transform transition-transform overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: "250px", // Largeur du menu
        }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Boissons
        </h2>
        <div className="flex flex-col gap-4">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              onClick={() => onAdd(drink)}
              className="border p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:scale-105 transition"
            >
              <span className="block font-bold text-lg text-gray-900 dark:text-gray-100">
                {drink.name}
              </span>
              <span className="block text-gray-700 dark:text-gray-300">
                ${drink.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
