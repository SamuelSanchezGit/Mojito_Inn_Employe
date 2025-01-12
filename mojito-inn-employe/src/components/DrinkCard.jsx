const DrinkCard = ({ drink, onAdd }) => (
    <div
      onClick={() => onAdd(drink)}
      className="border rounded-lg p-6 shadow-lg flex flex-col justify-between items-center text-center bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer"
    >
      <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
        {drink.name}
      </span>
      <span className="text-gray-700 dark:text-gray-300 text-lg mt-2">${drink.price}</span>
    </div>
  );
  
  export default DrinkCard;
  