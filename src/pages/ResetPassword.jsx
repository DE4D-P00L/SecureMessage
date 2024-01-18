import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "user/reset-password/" + token,
        data
      );
      if (response.status === 200) {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      setError("password", { message: error.response.data.message });
    }
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-70px)] text-white grid place-content-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="New Password"
            {...register("password", { required: true, minLength: 8 })}
            className="px-3 py-1.5 rounded-lg text-black"
          />
          <button
            type="submit"
            className="px-2 py-1.5 ml-4 bg-white text-black rounded-lg">
            Reset
          </button>
          <br />
          {errors.password && <p>Password too short</p>}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
