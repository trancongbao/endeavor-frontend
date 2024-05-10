import './SideBar.scss';
import Logo from "./Logo/Logo";
import Profile from "./Profile/Profile";
import Menu from "./Menu/Menu";

export default function SideBar({user, setIsLoggedIn}) {
  return (
    <div className="side-bar active">
      <Logo/>
      <Profile user={user} setIsLoggedIn={setIsLoggedIn}/>
      <Menu/>
    </div>
  );
}
