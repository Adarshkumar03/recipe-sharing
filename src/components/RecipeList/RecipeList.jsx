// RecipeList.js
import { useState, useEffect, useContext } from "react";
import { RecipeGoogleCard } from "../../components";
import AuthContext from "../../contexts/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

const RecipeList = () => {
  const [error, setError] = useState(null);
  const { googleRecipes, setGoogleRecipes } = useContext(AuthContext);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        let temp = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          temp = [...temp, { id: doc.id, data: doc.data() }];
        });
        setGoogleRecipes(temp);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError("Unable to load recipes. Please try again later.");
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-x-3">
      {error ? (
        <p className="col-span-full text-center text-red-500">{error}</p>
      ) : googleRecipes?.length > 0 ? (
        googleRecipes.map((recipe) => (
          <RecipeGoogleCard
            key={recipe.id}
            id={recipe.id}
            recipe={recipe.data}
            className=""
          />
        ))
      ) : (
        <p className="">No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList;
