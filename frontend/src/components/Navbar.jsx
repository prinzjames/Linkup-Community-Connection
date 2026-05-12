import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2 className="logo">LinkUp</h2>

      <div className="nav-links">
        <Link to="/feed">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}