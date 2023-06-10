// import React from "react";
// import {
//   Navbar,
//   Collapse,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import LogOutButton from "./LogOutButton";
// import LogInButton from "./LogInButton";

// function NavList() {
//   return (
    // <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    //   <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
    //     <a href="#" className="flex items-center hover:text-blue-500 transition-colors"> Documentation </a>
    //   </Typography>
    //   <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
    //     <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
    //       My Characters
    //     </a>
    //   </Typography>
    //   {/* <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium"> */}
    //     {localStorage.getItem("usertoken") ?
    //     <LogOutButton/> :
    //     <LogInButton/>}
    //     {/* <a href="/api/logout" className="flex items-center hover:text-blue-500 transition-colors">
    //       Log Out
    //     </a>
    //   </Typography> */}
    // </ul>
//   );
// }
 
// const NavBar =() => {
//   const [openNav, setOpenNav] = React.useState(false);
 
//   const handleWindowResize = () =>
//     window.innerWidth >= 1960 && setOpenNav(false); //960 is default
 
//   React.useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);
 
//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);
 
//   return (
//     <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-200">
//       <div className="flex items-center justify-between text-blue-gray-900">
//         <Typography
//           as="a"
//           href="#"
//           variant="h6"
//           className="cursor-pointer py-1.5 mr-5"
//         >
//           RISE Character Planner
//         </Typography>
//         <div className=" lg:block">
//           <NavList />
//         </div>
//         <IconButton
//           variant="text"
//           className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//           ripple={false}
//           onClick={() => setOpenNav(!openNav)}
//         >
//           {openNav ? (
//             <XMarkIcon className="h-6 w-6" strokeWidth={2} />
//           ) : (
//             <Bars3Icon className="h-6 w-6" strokeWidth={2} />
//           )}
//         </IconButton>
//       </div>
//       <Collapse open={openNav}>
//         <NavList />
//       </Collapse>
//     </Navbar>
//   );
// }

// export default NavList;

// import React from "react";
// import {
//   Navbar,
//   Collapse,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import LogOutButton from "./LogOutButton";
// import LogInButton from "./LogInButton";
 
// function NavList() {
//   return (
//     <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
//       <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
//         <a href="#" className="flex items-center hover:text-blue-500 transition-colors"> Documentation </a>
//       </Typography>
//       <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
//         <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
//           My Characters
//         </a>
//       </Typography>
//       {/* <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium"> */}
        // {localStorage.getItem("usertoken") ?
        // <LogOutButton/> :
        // <LogInButton/>}
//         {/* <a href="/api/logout" className="flex items-center hover:text-blue-500 transition-colors">
//           Log Out
//         </a>
//       </Typography> */}
//     </ul>
//   );
// }
 
// export default function Example() {
//   const [openNav, setOpenNav] = React.useState(false);
 
//   const handleWindowResize = () =>
//     window.innerWidth >= 960 && setOpenNav(false);
 
//   React.useEffect(() => {
//     window.addEventListener("resize", handleWindowResize);
 
//     return () => {
//       window.removeEventListener("resize", handleWindowResize);
//     };
//   }, []);
 
//   return (
//     <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-200">
//       <div className="flex items-center justify-between text-blue-gray-900">
//         <Typography as="a" href="#" variant="h6" className="mr-4 cursor-pointer py-1.5">
//           Material Tailwind
//         </Typography>
//         <div className="hidden lg:block">
//           <NavList />
//         </div>
//         <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
//           {openNav ? (<XMarkIcon className="h-6 w-6" strokeWidth={2} />) : (<Bars3Icon className="h-6 w-6" strokeWidth={2} />)}
//         </IconButton>
//       </div>
//       <Collapse open={openNav}>
//         <NavList />
//       </Collapse>
//     </Navbar>
//   );
// }

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import LogOutButton from "./LogOutButton";
import LogInButton from "./LogInButton";
import Switcher from './ThemeSwitcher';

const Navbar = () => {
  return (
    <nav className="w-screen max-w-7xl mb-32 bg-zinc-200 dark:bg-zinc-900  py-4">
      <div className="container mx-auto flex items-center justify-between max-w-4xl ">
        <Link to="/" className="text-yellow-500 font-bold text-3xl">
          RISE Character Planner
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300 ">
            <FiHome className="inline-block mr-1" />
            Documentation
          </Link>
          <Link to="/profile" className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300">
            <FiUser className="inline mr-1" />
            My Characters
          </Link>
          
          <Link to="/settings" className="text-zinc-700 hover:text-black dark:text-white hover:text-gray-300">
            <FiSettings className="inline mr-1" />
            Settings
          </Link>
          {localStorage.getItem("usertoken") ?
          <LogOutButton/> :
          <LogInButton/>}
          <Switcher/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
