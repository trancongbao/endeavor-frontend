import './SideBarProfile.scss';
export default function Profile() {
  return (
    <div className="profile active">
      <img className="short-avatar" src="https://i.seadn.io/gae/IZEEg3gIDw-zlV7Z8l1_-OgEkYKnFXJXYjEKY6Ue-Nuhfk-cv0FnRA5eOC2lM8EdEHKHNWljh_7pUmxXNtKKlzqqeZwWmNhGCoCMtew?auto=format&dpr=1&w=1000" alt="" />
      <h3>PANDA</h3>
      <div>
        <span>ADMIN</span>
      </div>
      <div>
        {" "}
        <span>
          <b>Level: </b>
        </span>
        <span>5</span>
      </div>

      <div className="flex-btn">
        <a className="option-btn" >
          Profile
        </a>
        <a className="option-btn" >
          Logout
        </a>
      </div>
    </div>
  );
}
