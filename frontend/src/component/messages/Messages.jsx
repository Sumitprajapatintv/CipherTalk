import Message from "./Message";
import useGetMessages from "./../../hook/useGetMessage";
import MessageSkeleton from "./../skeletons/messageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "../../hook/useListenMessage";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log("message", message);
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages?.length === 0 && (
        <p className="text-center text-blue-500">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
