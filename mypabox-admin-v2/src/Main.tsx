// import logo from './My PA Box - Logo Polychrome Horizontal.png'
// import { Link, useNavigate } from 'react-router-dom'
// import { signOutUser } from './utils/firebase/firebase.utils'

// const Main = () => {
//   const navigate = useNavigate()

//   //Signs out user from Firebase and clears local storage
//   //Navigates user from main page to login page
//   const signOutHandler = async (): Promise<void> => {
//     await signOutUser();
//     localStorage.clear()
//     navigate('/')
// }

//   return (
//     <div>
//       <div className='bg-blue-500 h-16 w-full'>
//         <img src={logo} alt='myPAbox' className='h-16'/>
//         <Link to='/schools' className='absolute text-white text-xl top-4 left-[430px]'>
//           Schools
//         </Link>
//         <Link to='/courses' className='absolute text-white text-xl top-4 left-[580px]'>
//           Courses
//         </Link>
//         <Link to='/categories' className='absolute text-white text-xl top-4 left-[730px]'>
//           Course Categories
//         </Link>
//         <Link to='/users' className='absolute text-white text-xl top-4 left-[980px]'>
//           Users
//         </Link>
//         <button onClick={signOutHandler} className='absolute top-4 left-[1350px] text-xl
//         text-white'>Sign Out</button>
//       </div>

//       <div className='w-40 bg-gray-200 h-screen'></div>
//     </div>
//   )
// }

// export default Main

// Importing necessary dependencies and components
import logo from "./My PA Box - Logo Polychrome Horizontal.png";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "./utils/firebase/firebase.utils";

// Array of objects, each representing a navigation item
const NAV_ITEMS = [
  { path: "/schools", label: "Schools", left: "430px" },
  { path: "/courses", label: "Courses", left: "580px" },
  { path: "/categories", label: "Course Categories", left: "730px" },
  { path: "/users", label: "Users", left: "980px" },
];

// Main functional component
const Main = () => {
  // Using navigate hook from react-router-dom
  const navigate = useNavigate();

  // Sign out handler function
  const signOutHandler = async (): Promise<void> => {
    // Sign out from Firebase
    await signOutUser();
    // Clear local storage
    localStorage.clear();
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
          className="absolute top-4 left-[1350px] text-xl 
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
