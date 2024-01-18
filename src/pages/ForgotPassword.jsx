import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "user/forgot-password",
        data
      );
      if (response.status === 200) {
        navigate("/reset-password/" + response.data.message, { replace: true });
      }
    } catch (error) {
      console.log(error);
      setError("email", { message: error.response.data.message });
    }
  };

  return (
    <div className="min-h-[calc(100vh-70px)] text-white grid place-content-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^.+@.+\..+$/ })}
          className="px-3 py-1.5 rounded-lg text-black"
        />
        <button
          type="submit"
          className="px-2 py-1.5 ml-4 bg-white text-black rounded-lg">
          Send
        </button>
        <br />
        {errors.email && <p>Enter valid email</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
