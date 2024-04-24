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
        <div/>
        <div className="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button className="btn btn-primary rounder-circle" onClick={handleClose}>Close</button>
        </div>
      </div>
      )}
    </>
  );
}
