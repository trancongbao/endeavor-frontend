import './Profile.scss';
import {rpc} from "../../../rpc/rpc";

export default function Profile({setIsLoggedIn}) {
  return (
    <div className="profile active">
      <img className="short-avatar"
           src="https://i.seadn.io/gae/IZEEg3gIDw-zlV7Z8l1_-OgEkYKnFXJXYjEKY6Ue-Nuhfk-cv0FnRA5eOC2lM8EdEHKHNWljh_7pUmxXNtKKlzqqeZwWmNhGCoCMtew?auto=format&dpr=1&w=1000"
           alt=""/>
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
        <div className="option-btn">
          Profile
        </div>
        <div className="option-btn" onClick={logout}>
          Logout
        </div>
      </div>
    </div>
  );

  function logout() {
    rpc("auth", "logout", {})
    .then((result) => {
      if (result) {
        setIsLoggedIn(false)
      } else {
        alert("Logout error.")
      }
    })
  }
}
