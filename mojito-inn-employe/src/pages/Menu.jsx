import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Calculator from "../components/Calculator";

const Menu = () => {
  const [cart, setCart] = useState([]);

  const handleAddDrink = (drink) => {
    const existing = cart.find((item) => item.id === drink.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...drink, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCopyTotal = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    navigator.clipboard.writeText(total);
    alert("Total copié dans le presse-papier !");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar onAdd={handleAddDrink} />

      {/* Commande */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Commande :</h2>
        <Calculator
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Total</h2>
          <p className="text-4xl font-bold text-blue-500">${total}</p>
          <button
            onClick={handleCopyTotal}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition"
          >
            Copier le total
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
