import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { LiaUserSecretSolid } from "react-icons/lia";

const Home = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token === null) navigate("/login");
  }, []);

  return (
    <div className="flex w-full md:flex-row flex-col bg-transparent text-white  min-h-[calc(100vh-70px)] sm:px-[50px] px-[20px]">
      <div className="flex-1 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center">
          <LiaUserSecretSolid className="text-[200px]" />
          <h1 className="text-center font-bold text-3xl">Chat Anonymously</h1>
        </div>
      </div>
      <div className="flex-1 min-w-[250px] items-center justify-center p-2">
        <MessageBox />
      </div>
    </div>
  );
};

export default Home;
