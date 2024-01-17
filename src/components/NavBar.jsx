import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Outlet, useNavigate, Link } from "react-router-dom";

const NavBar = () => {
  const userState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!userState;

  return (
    <div className="flex flex-col">
      <nav className="fixed left-0 h-[70px] w-full flex items-center bg-gray-900 text-white z-10">
        <div className="flex items-center justify-between max-w-7xl w-full mx-auto sm:px-[50px] px-[20px]">
          <h1 className="text-2xl font-bold">
            <Link to="/">Logo</Link>
          </h1>
          <ul className="flex sm:gap-3 gap-2 items-center justify-between">
            <li>
              {isAuthenticated && (
                <button
                  className="text-black bg-white px-2 py-1 cursor-pointer"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}>
                  Sign Out
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div className="pt-[70px]">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
