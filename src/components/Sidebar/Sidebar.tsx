import React from "react";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  let sugg = ["ecommerce", "daily life", "shopping", "dicussion", "hobby"];
  return (
    <div className="main">
      <div className="side-container">
        {sugg.map((su, index) => (
          <span className="item" key={index}>
            {index + 1} {". "} {su}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
