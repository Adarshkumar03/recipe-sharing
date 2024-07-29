import { createContext, useState } from "react";
const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [googleRecipes, setGoogleRecipes] = useState([]);
  const [userName, setUName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        fetchedRecipes,
        setFetchedRecipes,
        googleRecipes,
        setGoogleRecipes,
        userName,
        setUName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
export { AuthContextProvider };
