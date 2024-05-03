import { NavLink } from "react-router-dom";

const SideBarMenu = () => {
  return (
    <nav className="navbar">
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        to={``}
      >
        <div>
          <i className="fa fa-graduation-cap" />
          <span>My Courses</span>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        to={``}
      >
        <div>
          <i className="fa fa-book"></i>
          <span>My Decks</span>
        </div>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
        to={``}
      >
        <div>
          <i className="fa fa-phone" />
          <span>Contact us</span>
        </div>
      </NavLink>
    </nav>
  );
};
export default SideBarMenu;
