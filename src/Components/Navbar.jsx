import React from "react";
import "../Style/Navbar.css";
import { Search } from "lucide-react";
function Navbar() {
  return (
    <nav className="d-sticky navbar justify-space-between">
      <h2>Storm Weather</h2>
      <div className="d-flex justify-center align-center g-2">
        <input className="btn-dark-mode" type="text" name="" placeholder="Search By City" id="" />
        <Search onClick={()=>{console.log("Hello")}} className="hvr-orange"/>
      </div>
    </nav>
  );
}
export default Navbar;
