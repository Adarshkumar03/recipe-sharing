import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RecipeGoogleCard from "../RecipeGoogleCard/RecipeGoogleCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";

function UserProfile() {
  const [recs, setRecs] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const q = query(
          collection(db, "recipes"),
          where("username", "==", auth.currentUser.displayName)
        );
        const querySnapshot = await getDocs(q);
        let temp = [];
        querySnapshot.forEach((doc) => {
          console.log("Doc: ", doc.id);
          console.log("Data: ", doc.data());
          temp = [...temp, { id: doc.id, data: doc.data() }];
        });
        setRecs(temp);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-teal-600 mb-4">
        Welcome, {auth.currentUser.displayName}
      </h1>
      {recs.length === 0 ? (
        <div className="text-center text-teal-600">
          <p>
            Oops! Looks like your recipe book is on a diet. Time to add some
            deliciousness!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* <RecipeCard recipe={recipe} /> */}
              <RecipeGoogleCard id={rec.id} recipe={rec.data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
