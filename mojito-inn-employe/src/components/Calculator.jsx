import { useState } from "react";

const Calculator = ({ cart, onUpdateQuantity, onRemoveItem }) => {
  const [tooltip, setTooltip] = useState({ visible: false, text: "", x: 0, y: 0 });

  const handleKeyPress = (e, id) => {
    if (e.key === "Enter") {
      const newQuantity = parseInt(e.target.value) || 1;
      onUpdateQuantity(id, newQuantity);
    }
  };

  const showTooltip = (e, name) => {
    const { clientX, clientY } = e;
    const tooltipWidth = 150; // Largeur estimée du tooltip
    const screenWidth = window.innerWidth;

    let x = clientX + 10;
    if (x + tooltipWidth > screenWidth) {
      x = screenWidth - tooltipWidth - 10; // Ajuste pour ne pas dépasser à droite
    }

    setTooltip({ visible: true, text: name, x, y: clientY + 10 });

    // Cache le tooltip après 2 secondes
    setTimeout(() => {
      setTooltip({ ...tooltip, visible: false });
    }, 2000);
  };

  return (
    <div className="relative p-4">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg z-50"
          style={{
            top: tooltip.y, // Position légèrement en dessous
            left: tooltip.x, // Position ajustée dynamiquement
            maxWidth: "150px", // Largeur max
            wordWrap: "break-word", // Pour éviter les débordements
          }}
        >
          {tooltip.text}
        </div>
      )}

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {/* Quantité */}
            <div className="flex items-center">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                }
                onKeyPress={(e) => handleKeyPress(e, item.id)}
                className="w-16 p-2 border rounded text-center text-lg dark:bg-gray-600 dark:text-white focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Nom complet */}
            <span
              className="text-lg font-medium flex-1 truncate text-center cursor-pointer"
              title={item.name} // Ajoute une infobulle native
              onClick={(e) => showTooltip(e, item.name)} // Tooltip uniquement sur le clic du nom
            >
              {item.name}
            </span>

            {/* Prix */}
            <span className="text-lg font-semibold">
              ${item.quantity * item.price}
            </span>

            {/* Supprimer */}
            <button
              onClick={() => onRemoveItem(item.id)}
              className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
    </div>
  );
};

export default Calculator;
