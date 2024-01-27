import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdVideocam } from "react-icons/io";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  console.log("Data:    ", data);
  return (
    <div className="chat">
      <div className="chatfInfo">
        <span>{data.user?.name}</span>
        <div className="chatIcons">
          <IoMdVideocam className="icon" />
          <FaUserAlt className="icon" />
          <HiDotsHorizontal className="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
