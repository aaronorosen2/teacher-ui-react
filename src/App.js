import {
  BrowserRouter as Router,
  Routes,
  Route,
  browserHistory,
} from "react-router-dom";
import ImportLeads from "./pages/ImportLeads";
import BaseView from "./views/BaseView";
import LoginScreen from "./pages/auth/LoginScreen";
import InitView from "./pages/InitView";
import RegisterScreen from "./pages/auth/RegisterScreen";
import Home from "./pages/auth/home";
import { useNavigate } from "react-router-dom";
import Student_Dashboard from "./components/Student/Student_Dashboard";
import Teacher from "./components/Teacher/Teacher";
import Student_list from "./components/Student/Student_list";
import Room_list from "./components/Room/Room_list";
import Room_visitor from "./components/Room/Room_visitor";
import Add_class from "./components/Room/Add_class";
import Lesson_list from "./components/Lesson/Lesson_list";
import Lesson_list_new from "./components/Lesson/Lesson_list_new";
import Users from "./components/User/Users";
import Leads from "./components/User/Leads";
import Sms from "./pages/Sms";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import UserFetchApp from "./components/ChatRoom/UserFetchApp";
import MainChat from "./components/ChatRoom/MainChat";
import UserProfile from "./pages/auth/UserProfile/UserProfile";
import ChangePassword from "./pages/auth/ChangePassword";
import ForgetPassword from './pages/auth/ForgetPassword';
import { Socket } from "./components/ChatRoom/Socket";
import Orginization from "./components/Orginization/Orginization";
import OrgChannel from "./components/Orginization/OrginazationChannel";
import UserRequest from "./components/Orginization/channelPage";
import SearchChannelAndUser from "./components/SearchChannelAndUser/SearchChannelAndUser";
import CreatePassword from "./pages/auth/CreatePassword";
import Places from "./components/map_places/Places";
// import SocketContext, { socket } from "context/socket";
// import MyComponent from "./components/Service/MyComponent";
function App() {
  let Token = localStorage.getItem("token");
  console.log("🚀 ~ file: App.js ~ line 14 ~ App ~ isToken   ", Token);
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<BaseView />}>
            <Route index element={<InitView />} />
            <Route path={"login"} element={<LoginScreen />} />
            <Route path={"register"} element={<RegisterScreen />} />
            <Route path={"changepassword"} element={<ChangePassword/>} /> 
            <Route path={"forgetpassword"} element={<ForgetPassword />} />
            <Route path={"importleads"} element={<ImportLeads />} />
            <Route path={"dashboard"} element={<Home />} />
            <Route path={"student_dashboard"} element={<Student_Dashboard />} />
            <Route path={"teacher"} element={<Teacher />} />
            <Route path={"student_list"} element={<Student_list />} />
            <Route path={"room_list"} element={<Room_list />} />
            <Route path={"room_visitor"} element={<Room_visitor />} />
            <Route path={"add_class"} element={<Add_class />} />
            <Route path={"lesson_list"} element={<Lesson_list />} />
            <Route path={"lesson_list_new"} element={<Lesson_list_new />} />
            <Route path={"users"} element={<Users />} />
            <Route path={"leads"} element={<Leads />} />
            <Route path={"chatroom"} element={<Socket />}/> 
            <Route path={"usefetch"} element={<UserFetchApp />}/>
            <Route path={"sms"} element={<Sms />} />
            <Route path={"userprofile"} element={<UserProfile />} />
            <Route path={"orginization"} element={<Orginization />} />
            <Route path={"orginization_channel"} element={<OrgChannel />} />
            <Route path={"user_request"} element={<UserRequest />} />
            <Route path={"channels"} element={<SearchChannelAndUser />} />
            <Route path={"CreatePassword"} element={<CreatePassword />} />
            <Route path={"map"} element={<map />} />
            <Route path={"place"} element={<Places />}/>
          </Route>
        </Routes>
      </Router>
      {/* <SocketContext.Provider value={socket}>
                      <MyComponent />
                  </SocketContext.Provider> */}
    </>
  );
}

export default App;
