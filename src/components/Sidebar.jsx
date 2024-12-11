import React from "react";
import { Link } from "react-router";

const Sidebar = () => {
  const sidebarItems = (
    <>
      <li>
        <Link to="/categorize">Categorize</Link>
      </li>
      <li>
        <Link to="/cloze">Cloze</Link>
      </li>
      <li>
        <Link to="/comprehension">Comprehension</Link>
      </li>
    </>
  );

  return (
    <div>
      <aside className="  text-white p-5 bg-base-200 flex max-w-min h-screen">
        <ul className="flex-grow flex flex-col justify-center items-center gap-10">
          {sidebarItems}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
