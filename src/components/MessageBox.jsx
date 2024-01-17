import { useState, useEffect } from "react";
import axios from "axios";
import MessageItem from "./MessageItem";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function MessageBox() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const message = data.newMessage;
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "messages",
        { message },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (response.status === 200) {
        const temp = response.data.message;
        setMessages([temp, ...messages]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          import.meta.env.VITE_SERVER_URL + "messages"
        );
        if (response.status != 200) {
          setError(response?.data?.message);
          setLoading(false);
        } else {
          setMessages(response.data.messages);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="bg-slate-600 relative w-full h-full px-2 py-3 rounded-xl pb-[100px]">
      <h2 className="text-center font-semibold text-xl mb-2">Secrets</h2>
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[100%]">
        {!loading &&
          messages &&
          messages.map((message) => (
            <MessageItem key={message._id} message={message.message} />
          ))}
      </div>
      <form
        className="absolute bottom-5 left-3 flex w-full"
        onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("newMessage", { required: true })}
          className="flex-1 bg-transparent border-b-2 border-white p-1 min-w-0"
          placeholder="Message"
        />
        <button
          type="submit"
          className="ml-5 mr-8 bg-slate-800 px-2.5 py-1.5 rounded-md">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageBox;
