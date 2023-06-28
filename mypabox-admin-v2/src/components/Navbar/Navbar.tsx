import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../app/slices/login';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import logo from "../../My PA Box - Logo Monochrome Flat Horizontal Negative.png"

// Array of objects, each representing a navigation item
const NAV_ITEMS = [
  { path: "/schools", label: "Schools", left: "21.5em" },
  { path: "/courses", label: "Courses", left: "29em" },
  { path: "/categories", label: "Course Categories", left: "36.5em" },
  { path: "/users", label: "Users", left: "49em" },
];

const Navbar = () => {
  // Using navigate hook from react-router-dom
  const navigate = useNavigate();
  // Dispatches action from redux
  const dispatch: AppDispatch = useDispatch()
  // Find out current pathname in url
  const location = useLocation()

  // Sign out handler function
  const signOutHandler = async (): Promise<void> => {
    // Sign out from Firebase
    await signOutUser();
    // Clears redux state
    dispatch(logout())
    // Navigate back to root
    navigate("/");
  };

  return (
    <div>
      {/* If the current path is '/', do not show the navigation bar, otherwise show the navigation bar*/}
      {/* Top navigation bar */}
      {location.pathname === '/' ? '' :
        <div className="fixed z-10 bg-blue-500 h-16 w-full">
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
      }
    </div>
  )
}

export default Navbar