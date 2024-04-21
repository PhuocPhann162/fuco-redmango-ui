import React, { ReactElement } from "react";

type Props = {
  isShow?: boolean;
  handleClose?: () => void;
};

export default function ChatFrame({
  isShow,handleClose,
}: Props) {
  return (
    <>
      {isShow && (
        <div className="chat-frame">
        <div className="chat-messages"/>
        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
      )}
    </>
  );
}
