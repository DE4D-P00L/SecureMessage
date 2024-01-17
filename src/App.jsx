import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="bg-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* <RouterProvider router={router}>
          <NavBar />
          <Outlet />
        </RouterProvider> */}

        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
