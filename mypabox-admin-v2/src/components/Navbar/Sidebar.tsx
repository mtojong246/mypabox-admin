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
        <div className="fixed top-0 font-['Noto Sans'] select-none z-20 w-[15em] bg-[#252628] h-screen flex flex-col justify-between items-start">
          <div className="pl-4 pt-4 mt-[76px] w-full flex flex-col justify-start items-start gap-3 border-t border-[#a2a2a2]">
            {NAV_ITEMS.map((item) => (
              <Link
                to={item.path}
                className=" text-white text-lg active:underline focus:underline hover:underline border-3 border-black"
                style={{ left: item.left }}
                onClick={handleToggleSideMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <button
            onClick={signOutHandler}
            className="p-4 text-left w-full border-t border-[#a2a2a2] text-xl text-white">
            Sign Out
          </button>
       
        </div>
       }
    </>
  )
}

export default Sidebar