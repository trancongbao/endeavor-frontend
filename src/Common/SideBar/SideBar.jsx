import SideBarProfile from "./Profile/SideBarProfile";
import './SideBar.scss';
import SideBarLogo from "./Logo/SideBarLogo";
import SideBarMenu from "./Menu/SideBarMenu";

export default function SideBar() {
  return (
    <div className="side-bar active">
      <SideBarLogo/>

      <SideBarProfile isShowAccountButton={false} isOpenUserProfile={true}/>

      <SideBarMenu/>
    </div>
  );
}
