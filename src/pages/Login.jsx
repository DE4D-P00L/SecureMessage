import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { useEffect } from "react";

function Login() {
  //React Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token != null) navigate("/");
  }, []);

  //Login Form Submit Handler
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "user/login",
        { email, password }
      );
      if (response.status === 200) {
        dispatch(
          login({ user: response.data.user, token: response.data.token })
        );
        navigate("/");
      } else {
        setError("root", { message: response.message });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-70px)] text-white">
      <form
        className="flex flex-col gap-3 w-[350px] border-white border-2 px-10 py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-3xl mb-3 text-center">Login</h3>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none border-b-2 box-border border-gray-300 px-3 py-1.5 focus:bg-transparent focus:border-2 autofill:bg-transparent"
            {...register("email", { required: true, pattern: /^.+@.+\..+$/ })}
          />
          {errors.email && <p>Invalid Email</p>}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none border-b-2 border-gray-300 px-3 py-1.5 focus:bg-transparent focus:border-2 box-border"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p>Password too short</p>}
          {errors.root && <p>{errors.root.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-white mt-7 text-slate-800 font-semibold text-lg rounded-lg px-3 py-1">
          Login
        </button>
        <h2 className="text-center">
          <span>New here? </span>
          <Link to="/signup" className="underline underline-offset-4">
            Create an account.
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default Login;
