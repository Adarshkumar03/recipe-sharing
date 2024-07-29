import { useState, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import { db } from "../../utils/firebase";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // Add a state for error display

  const { setFetchedRecipes, setGoogleRecipes } = useContext(AuthContext);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const q = query(
        collection(db, "recipes"),
        or(
          where("title", "==", searchTerm),
          where("category", "==", searchTerm)
        )
      );
      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp = [...temp, { id: doc.id, data: doc.data() }];
      });
      setGoogleRecipes(temp);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Unable to load recipes. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-teal-100 p-4 mb-8 rounded-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for recipes by title or category"
            className="flex-1 bg-white p-3 rounded-l-md focus:outline-none focus:ring-teal-500"
            value={searchTerm}
            onChange={handleChange}
            required
          />
          <button
            type="submit" // Use type='submit' for form submission
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-r-md text-lg font-semibold"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
