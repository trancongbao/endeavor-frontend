import { Outlet } from 'react-router-dom';
import './Student.scss';
import React from 'react';

export default function Student() {
  return (
    <React.Fragment>
      <div className="outlet">
        <Outlet />
      </div>
    </React.Fragment>
  );
}
