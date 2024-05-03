import React from "react";
import { Outlet } from "react-router-dom";

const Teacher = () => {
return (
    <React.Fragment>
      <div className="outlet">
          <Outlet />
      </div>
    </React.Fragment>
  );
}
export default Teacher;