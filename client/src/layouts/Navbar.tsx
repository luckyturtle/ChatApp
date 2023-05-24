// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../api/auth";

function Navbar() {
  // const { profile } = useContext(AuthContext)
  // const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="px-2 py-4">
        <div className="text-3xl font-bold text-white uppercase">Chat App</div>
      </div>
    </nav>
  );
}

export default Navbar;
