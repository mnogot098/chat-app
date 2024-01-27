import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="message-container">
    <div className="conversation-img">
      <img
    
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
    </div>
    
    <div
      className={`${
        (message.senderId === currentUser.uid && "owner") ?"messageSender": "messageReceiver"
      }`}
      ref={ref}
    >
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
      <div className="messageInfo">
        <span>{currentUser.displayName}</span>
      </div>
    </div>
    </div>
    
  );
};

export default Message;
