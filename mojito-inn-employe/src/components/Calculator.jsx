const Calculator = ({ cart, onUpdateQuantity, onRemoveItem }) => {
    const handleKeyPress = (e, id) => {
      if (e.key === "Enter") {
        const newQuantity = parseInt(e.target.value) || 1;
        onUpdateQuantity(id, newQuantity);
      }
    };
  
    return (
      <div>
        <ul>
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between mb-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              {/* Quantité */}
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  onKeyPress={(e) => handleKeyPress(e, item.id)}
                  className="w-16 p-2 border rounded text-center text-lg dark:bg-gray-600 dark:text-white focus:ring focus:ring-blue-300"
                />
              </div>
  
              {/* Nom complet */}
              <span className="text-lg font-medium w-1/2 text-center truncate">
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
  