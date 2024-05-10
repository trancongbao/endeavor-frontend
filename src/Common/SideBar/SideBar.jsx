import './SideBar.scss';
import Logo from "./Logo/Logo";
import Profile from "./Profile/Profile";
import Menu from "./Menu/Menu";

export default function SideBar({username, setIsLoggedIn}) {
  return (
    <div className="side-bar active">
      <Logo/>
      <Profile username={username} setIsLoggedIn={setIsLoggedIn}/>
      <Menu/>
    </div>
  );
}
