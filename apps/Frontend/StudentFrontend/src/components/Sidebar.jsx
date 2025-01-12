// import React, { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Layout,
//   User,
//   Briefcase,
//   Calendar,
//   FileText,
//   Menu,
//   X,
// } from "lucide-react";
// import { studentidContext } from "../context/StudentidProvider";
// const Sidebar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { studentId } = localStorage.getItem("studentId");
//   const onLogout = () => {
//     localStorage.removeItem("studentId");
//     localStorage.removeItem("studentData");
//     window.location.replace("/login");
//   };
//   const navigate = useNavigate();

//   const navigation = [
//     { name: "Dashboard", icon: Layout, path: "/dashboard" },
//     { name: "Profile", icon: User, path: `/profile/${studentId}` },
//     { name: "Jobs", icon: Briefcase, path: "/jobs" },
//     { name: "Event Scheduler", icon: Calendar, path: "/events" },
//     { name: "Resume Builder", icon: FileText, path: "/resume" },
//   ];
//   const toProfile = () => {
//     navigate(`/profile/${studentId}`);
//   };
//   const NavItem = ({ item }) => {
//     const isActive = location.pathname === item.path;
//     if (item.name === "Profile") {
//       return (
//         <button
//           onClick={toProfile}
//           className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
//             ${
//               isActive
//                 ? "bg-blue-100 text-blue-600"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//         >
//           <item.icon className="w-5 h-5" />
//           <span className="font-medium">{item.name}</span>
//         </button>
//       );
//     }
//     return (
//       <Link
//         to={item.path}
//         className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
//           ${
//             isActive
//               ? "bg-blue-100 text-blue-600"
//               : "text-gray-600 hover:bg-gray-100"
//           }`}
//       >
//         <item.icon className="w-5 h-5" />
//         <span className="font-medium">{item.name}</span>
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
//       >
//         {isMobileMenuOpen ? <X /> : <Menu />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`
//         fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 z-40
//         w-64 p-6 flex flex-col
//         ${
//           isMobileMenuOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }
//       `}
//       >
//         {/* Logo Area */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">TnP Cell</h1>
//         </div>

//         {/* Navigation */}
//         <nav className="space-y-2 flex-1">
//           {navigation.map((item) => (
//             <NavItem key={item.name} item={item} />
//           ))}
//         </nav>

//         {/* Profile Section */}
//         <div className="pt-4 border-t border-gray-200">
//           <div className="flex items-center gap-3 px-4 py-3">
//             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//               <User className="w-4 h-4 text-blue-600" />
//             </div>
//             <div>
//               <p className="font-medium text-gray-800">Student Name</p>
//               <p className="text-sm text-gray-500">student@example.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Log Out Button */}
//         <div className="mt-4">
//           <button
//             className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//             onClick={onLogout}
//           >
//             Log Out
//           </button>
//         </div>
//       </div>

//       {/* Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default Sidebar;
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layout, 
  User, 
  Briefcase, 
  Calendar, 
  FileText,
  Menu,
  X
} from 'lucide-react';
import {studentidContext} from "../context/StudentidProvider";
const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const studentId =  localStorage.getItem('studentId');
  const onLogout = () => {
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentData');
    window.location.replace('/login');
  } 

  const navigation = [
    { name: 'Dashboard', icon: Layout, path: '/dashboard' },
    { name: 'Profile', icon: User, path: `/profile/${studentId}` },
    { name: 'Jobs', icon: Briefcase, path: '/jobs' },
    { name: 'Event Scheduler', icon: Calendar, path: '/events' },
    { name: 'Resume Builder', icon: FileText, path: `/resume-builder/${studentId}` },
  ];

  const NavItem = ({ item }) => {
    const isActive = location.pathname === item.path;
    if(item.name === 'Profile') {
      console.log('Profile' , studentId);
    }
    return (
      <Link
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-blue-100 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-100'}`}
      >
        <item.icon className="w-5 h-5" />
        <span className="font-medium">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 z-40
        w-64 p-6 flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Area */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">TnP Cell</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>

        {/* Profile Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Student Name</p>
              <p className="text-sm text-gray-500">student@example.com</p>
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="mt-4">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" onClick={onLogout}>
            Log Out
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;