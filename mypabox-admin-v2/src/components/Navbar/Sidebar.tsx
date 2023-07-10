import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../app/slices/login';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';

// Array of objects, each representing a navigation item
const NAV_ITEMS = [
  { path: "/schools", label: "Schools", left: "21.5em" },
  { path: "/courses", label: "Courses", left: "29em" },
  { path: "/categories", label: "Course Categories", left: "36.5em" },
  { path: "/users", label: "Users", left: "49em" },
];

const Sidebar = () => {
  // Find out current pathname in url
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const signOutHandler = async (): Promise<void> => {
    // Sign out from Firebase
    await signOutUser();
    // Clears redux state
    dispatch(logout())
    // Navigate back to root
    navigate("/");
  };
  
  return (
    <>
      {/* Left navigation bar */}
      {location.pathname === '/' ? '' :
        <div className="fixed block z-30 w-40 mt-16 bg-[#424244] h-screen">
          {NAV_ITEMS.map((item, i) => (
            <Link
              to={item.path}
              key={i}
              className=" text-white text-lg active:underline focus:underline hover:underline ml-4 border-3 w-2 block mt-16 border-black"
              style={{ left: item.left }}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={signOutHandler}
            className="absolute top-[25em] ml-4 text-xl text-white">
            Sign Out
          </button>
        </div>
      }
    </>
  )
}

export default Sidebar