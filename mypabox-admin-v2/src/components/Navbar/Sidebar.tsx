import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../app/slices/login';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { useDispatch } from 'react-redux';
import { SchoolContext } from '../../useContext';

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

  const { handleToggleSideMenu } = useContext(SchoolContext)

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
        <div className="fixed block font-['Noto Sans'] select-none z-30 w-[15em] mt-16 bg-[#252628] h-screen">
          <div className="mt-6 border-b-2 h-[69em] border-white">
            {NAV_ITEMS.map((item) => (
              <Link
                to={item.path}
                className=" text-white text-lg active:underline focus:underline hover:underline ml-4 border-3 w-42 block mt-1 border-black"
                style={{ left: item.left }}
                onClick={handleToggleSideMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <button
            onClick={signOutHandler}
            className="absolute top-[57.5em] ml-4 text-xl text-white">
            Sign Out
          </button>
       
        </div>
       }
    </>
  )
}

export default Sidebar