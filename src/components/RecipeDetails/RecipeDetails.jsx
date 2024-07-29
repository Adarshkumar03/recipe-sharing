import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setRecipeData(docSnap.data());
        } else {
          console.log("No such document!!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("An error occurred while fetching the recipe.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  return (
    <div className="container mx-auto p-6 mt-10">
      {isLoading && (
        <div className="text-center text-teal-500 font-semibold">
          Loading recipe...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      {recipeData && (
        <div className="bg-white rounded-lg shadow-md p-6 flex">
          <div className="w-1/3">
            <img
              src={recipeData.img}
              alt={recipeData.title}
              className="w-full h-auto mb-4 object-cover rounded"
            />
          </div>
          <div className="w-2/3 ml-6">
            <h1 className="text-4xl font-bold text-teal-600 mb-2">
              {recipeData.title}
            </h1>
            <p className="text-gray-600 mb-4"><span className="font-semibold">Category:</span> {recipeData.category}</p>
            <p className="text-gray-600 mb-4"><span className="font-semibold">User:</span> {recipeData.username}</p>
            
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">
              Ingredients
            </h2>
            <ul className="list-none ml-6 mb-6">
              {recipeData.ingredients.split(";").map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold text-teal-600 mb-3">Steps</h2>
            <ol className="list-decimal ml-6 mb-6">
              {recipeData.steps.split(";").map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
