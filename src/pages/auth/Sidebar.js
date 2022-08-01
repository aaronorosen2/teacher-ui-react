import React from "react";
import {
  FaBars,
  FaBook,
  FaGraduationCap,
  FaLock,
  FaRegCreditCard,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import {
  BsBagFill,
  BsFillCreditCardFill,
  BsTelephoneFill,
} from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { HiUserGroup } from "react-icons/hi";
import Teacherlogo from "../../assets/teacherlogo.png";
import { Link } from "react-router-dom";

const SideData = [
  { icon: <AiFillDashboard />, path:"/dashboard", student: "Student Classes" },
  { icon: <AiFillDashboard />, path:"/student_dashboard", student: "Dashboard" },
  { icon: <FaGraduationCap />, path:"/teacher", student: "Teachers" },
  { icon: <FaUserAlt />, path:"/student_list", student: "Add Student" },
  { icon: <FaGraduationCap />, path:"/room_list", student: "Add Room" },
  { icon: <FaGraduationCap />, path:"/room_visitor", student: "Room Visitors" },
  { icon: <HiUserGroup />, path:"/add_class",student: "Add Class" },
  { icon: <FaBook />, path:"/lesson_list", student: "View Lessons" },
  { icon: <FaBook />, path:"/lesson_list_new", student: "View Lessons V2" },
  { icon: <FaBook />, path:"#",student: "Add Lessons" },
  { icon: <HiUserGroup />, path:"/users", student: "Users" },
  { icon: <HiUserGroup />, path:"/leads", student: "Leads" },
  { icon: <BsTelephoneFill />,path:"#", student: "Calls" },
  { icon: <TiMessages />, path:"#", student: "SMS" },
  { icon: <MdLocationOn />, path:"#", student: "Places" },
  { icon: <FaLock />, path:"#", student: "Administration" },
  { icon: <AiFillDashboard />, path:"#", student: "Video Room" },
  { icon: <FaRegCreditCard />, path:"#", student: "Orders" },
  { icon: <BsTelephoneFill />, path:"#", student: "Call Room" },
  { icon: <BsTelephoneFill />, path:"#",student: "Call Menu" },
  { icon: <BsBagFill />, path:"#", student: "Items" },
  { icon: <FaUserAlt />, path:"#", student: "User Profile" },
  { icon: <BsFillCreditCardFill />, path:"#", student: "Braintree" },
  { icon: <BsTelephoneFill />, path:"#", student: "RingLess Voice-Mail" },
];

const Sidebar = ({handleClickHere})=> {

//   hideBar = (event) => {
//     const bar = document.getElementsByClassName("sidebar-wrap   ");
    
//     for (const b of bar) {
//       b.classList.toggle("collapsed");
//     }
//     // event.target.classList.toggle(styles.collapsed);

//     this.setState({ popup: !this.state.popup }); 
//   };

  

    // let cssClass = 'sidebar-wrap'
    // if(this.state.popup) cssClass += 'className' 
    return (
      <div className="sidebar-wrap" >
        <div className="sidebar-data">
          <div className="teach-wrap" onClick={() => handleClickHere()}>
            <img src={Teacherlogo} width="55" height="45" />
            <FaBars />
          </div>
          
          {SideData.map((data) => (
            <Link to={data.path}>
            <div className="student-wrap" >
              <div>{data.icon}</div>

              <p className="mb-0"> {data.student}</p>
            </div> </Link>
          ))}
        </div>
      </div>
    );
}

export default Sidebar;
