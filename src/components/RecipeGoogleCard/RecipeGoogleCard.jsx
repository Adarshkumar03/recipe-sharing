import { Link, useNavigate } from "react-router-dom";

const RecipeGoogleCard = ({ id, recipe, className = "" }) => {
  return (
    <Link
      to={`/recipeDetails/${id}`}
      className={`flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full sm:w-96 mx-auto  ${className} `}
    >
      <div className="h-56 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={recipe.img} alt={recipe.title} />
      </div>
      <div className="p-5">
        <h5 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-blue-gray-900 text-center">
          {recipe.title}
        </h5>
      </div>
      <div className="p-6 pt-0 flex justify-between items-center">
        <p className="text-xl font-semibold">User: {recipe.username}</p>
        <p className="p-2 bg-slate-300 rounded-md font-bold relative top-0">
          {recipe.category}
        </p>
      </div>
    </Link>
  );
};

export default RecipeGoogleCard;
