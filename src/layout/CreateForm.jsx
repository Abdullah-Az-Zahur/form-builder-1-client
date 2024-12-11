import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const CreateForm = () => {
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar></Sidebar>
      {/* Outlet --> Dynamic content */}
      <div className="flex-1 md:ml-64">
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
