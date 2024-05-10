import './SideBar.scss';
import Logo from "./Logo/Logo";
import Profile from "./Profile/Profile";
import Menu from "./Menu/Menu";

export default function SideBar({setIsLoggedIn}) {
  return (
    <div className="side-bar active">
      <Logo/>
      <Profile isShowAccountButton={false} isOpenUserProfile={true} setIsLoggedIn={setIsLoggedIn}/>
      <Menu/>
    </div>
  );
}
