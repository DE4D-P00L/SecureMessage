import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) navigate("/login");
  }, []);

  return (
    <div className="flex w-full md:flex-row flex-col bg-slate-800 text-white  min-h-[calc(100vh-70px)] sm:px-[50px] px-[20px]">
      <div className="flex-1">Hero</div>
      <div className="flex-1 min-w-[250px] items-center justify-center p-2">
        <MessageBox />
      </div>
    </div>
  );
};

export default Home;
