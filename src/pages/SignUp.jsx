import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

function SignUp() {
  //React Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //SignUp Form Submit Handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "user/signup",
        data
      );
      if (response.status === 201) {
        const loginRes = await axios.post(
          import.meta.env.VITE_SERVER_URL + "user/login",
          { email: data.email, password: data.password }
        );

        if (loginRes.status === 200) {
          dispatch(
            login({ user: loginRes.data.user, token: loginRes.data.token })
          );
          navigate("/");
        }
      }
    } catch (error) {
      setError("root", { message: error.response.data.message });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-70px)] text-white">
      <form
        className="flex flex-col gap-3 w-[350px] border-white border-2 px-10 py-8 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold text-3xl mb-3 text-center">Sign up</h3>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent outline-none border-b-2 box-border border-gray-300 px-3 py-1.5 focus:bg-transparent focus:border-2 autofill:bg-transparent"
            {...register("name", {
              required: true,
              minLength: 1,
              maxLength: 30,
            })}
          />
          {errors.name && <p>Invalid Name</p>}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent outline-none border-b-2 box-border border-gray-300 px-3 py-1.5 focus:bg-transparent focus:border-2 autofill:bg-transparent"
            {...register("email", { required: true, pattern: /^.+@.+\..+$/ })}
          />
          {errors.email && <p>Invalid Email</p>}
          {errors.root && <p>{errors.root.message}</p>}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent outline-none border-b-2 border-gray-300 px-3 py-1.5 focus:bg-transparent focus:border-2 box-border"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p>Password too short</p>}
        </div>
        <button
          type="submit"
          className="bg-white text-slate-800 font-semibold text-lg rounded-lg px-3 py-1 mt-6">
          Sign Up
        </button>
        <h2 className="text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="underline underline-offset-4">
            Login.
          </Link>
        </h2>
      </form>
    </div>
  );
}

export default SignUp;
