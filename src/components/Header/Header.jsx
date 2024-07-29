import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const controlMenu = isLoggedIn ? (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="focus:outline-none font-semibold bg-[#0D9488] text-[#FFFFFF] p-1.5 rounded-md hover:bg-[#0D9488aa] "
      >
        User Menu
      </button>
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
          <button
            onClick={() => {
              toggleDropdown();
              navigate(`/profile/${auth.currentUser.uid}`);
            }}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={({ isActive }) =>
          "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")
        }
      >
        Sign Up
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between py-2 px-16">
        <NavLink to="/" className="text-[1.75rem] font-bold text-teal-600">
          Recipe Sharing
        </NavLink>

        <nav className="hidden md:flex space-x-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "hover:text-teal-500 text-lg" +
              (isActive ? "text-teal-500 text-lg" : "")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/addRecipe"
            className={({ isActive }) =>
              "hover:text-teal-500 text-lg" +
              (isActive ? "text-teal-500 text-lg" : "")
            }
          >
            Add Recipe
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              "hover:text-teal-500 text-lg" +
              (isActive ? "text-teal-500 text-lg" : "")
            }
          >
            About
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">{controlMenu}</div>
      </div>
    </header>
  );
}

export default Header;
