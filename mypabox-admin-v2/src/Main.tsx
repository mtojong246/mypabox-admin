// Importing necessary dependencies and components
import logo from "./My PA Box - Logo Polychrome Horizontal.png";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "./utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { logout } from "./app/slices/login";

// Array of objects, each representing a navigation item
const NAV_ITEMS = [
  { path: "/schools", label: "Schools", left: "21.5em" },
  { path: "/courses", label: "Courses", left: "29em" },
  { path: "/categories", label: "Course Categories", left: "36.5em" },
  { path: "/users", label: "Users", left: "49em" },
];

// Main functional component
const Main = () => {
  // Using navigate hook from react-router-dom
  const navigate = useNavigate();
  // Dispatches action from redux
  const dispatch: AppDispatch = useDispatch()
  
  // Sign out handler function
  const signOutHandler = async (): Promise<void> => {
    // Sign out from Firebase
    await signOutUser();
    // Clears redux state
    dispatch(logout())
    // Navigate back to root
    navigate("/");
  };

  // Return JSX
  return (
    <div>
      {/* Top navigation bar */}
      <div className="bg-blue-500 h-16 w-full">
        {/* Logo image */}
        <img src={logo} alt="myPAbox" className="h-16" />
        {/* Loop through navigation items and create a Link for each */}
        {NAV_ITEMS.map((item) => (
          <Link
            to={item.path}
            className="absolute text-white text-xl top-4"
            style={{ left: item.left }}
          >
            {item.label}
          </Link>
        ))}
        {/* Sign Out button with handler to trigger sign out process */}
        <button
          onClick={signOutHandler}
          className="absolute top-4 left-[67.5em] text-xl 
        text-white"
        >
          Sign Out
        </button>
      </div>
      {/* Left navigation bar */}
      <div className="w-40 bg-gray-200 h-screen"></div>

    </div>
  );
};

// Exporting Main component as default
export default Main;

// Changes:

// I've added a NAV_ITEMS constant that is an array of objects, where each object corresponds to a navigation item. Each object in the array has a path for the route, a label for the text to display on the link, and a left for the left positioning style. This simplifies the JSX, and makes it easy to add or remove navigation links in the future. This can be considered a kind of data-driven UI, which can help to optimize the readability of your code.
// Replaced the inline CSS left with a style prop in the Link components. This can improve readability when using CSS-in-JS values.
// As a side note, it might be beneficial to consider using a responsive layout that doesn't rely on hard-coded pixel values for positioning (left), as it will make your application more flexible and adaptable to different screen sizes.
