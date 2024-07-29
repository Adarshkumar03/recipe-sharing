import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./addRecipe.module.css";
import AuthContext from "../../contexts/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db, auth, storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const categories = [
    "Appetizers & Snacks",
    "Main Dishes",
    "Side Dishes",
    "Desserts",
    "Beverages",
    "Soups & Stews",
    "Salads",
    "Breakfast & Brunch",
    "Sauces & Condiments",
    "Breads & Baked Goods",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, `images/${title}`);
      await uploadBytes(storageRef, imageFile);
      const recipeUrl = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, "recipes"), {
        title,
        category,
        steps,
        img: recipeUrl,
        userId: auth.currentUser.uid,
        username: auth.currentUser.displayName,
        ingredients,
      });
      console.log("Document wriiten with ID: ", docRef.id);
      setIsSubmitted(true);
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000); // Clear success message after 3 seconds
    }

    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000); // Clear success message after 3 seconds
    }
  }, [isSubmitted, errorMessage]);

  return (
    <>
      {isLoggedIn ? (
        <div className="container mt-20 mx-auto p-8 bg-teal-500 text-white flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Add a New Recipe</h2>
          <form
            onSubmit={handleSubmit}
            className="w-2/3 flex flex-col justify-center items-center"
          >
            <div className="mb-4 w-3/5">
              <input
                type="text"
                placeholder="Recipe Title"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 w-3/5">
              <select
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 w-3/5">
              <textarea
                placeholder="Ingredients (separate with semicolon)"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 w-3/5">
              <textarea
                placeholder="Instructions (separate steps with semicolon)"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                required
              />
            </div>

            <div className="mb-10">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <label
                htmlFor="fileInput"
                className="bg-[#CCFBF1] hover:bg-[#CCFBF1ee] text-[#050517] font-medium px-24 py-3 rounded-md cursor-pointer"
              >
                Upload Image
              </label>
              {imageFile && (
                <p className="mt-2 text-teal-200">{imageFile.name}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-5 py-3 rounded-md w-3/5"
            >
              Share Recipe
            </button>
          </form>
          {isSubmitted && (
            <div className="p-4 bg-green-200 text-green-800 rounded-md mt-4">
              Recipe added successfully!
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-200 text-red-800 rounded-md mt-4">
              An error occurred while adding the recipe. Please try again.
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AddRecipe;
