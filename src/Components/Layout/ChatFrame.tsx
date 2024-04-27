import React, { ReactElement } from "react";

type Props = {
  isShow?: boolean;
  handleClose?: () => void;
};

export default function ChatFrame({
  isShow, handleClose,
}: Props) {
  return (
    <>
      {isShow && (
        <div className="d-flex justify-content-end">
          <div className="chat-frame">
            <div className="chat-header">
              <div className="chat-header-title">Chat</div>
              <div className="chat-header-icon">
                <button className="btn btn-primary rounder-circle" onClick={handleClose}>X</button>
              </div>
            </div>
            <div className="chat-body">
              <div className="chat-message">
                <div className="chat-message-sender">Sender</div>
                <div className="chat-message-content">Content</div>
              </div>
            </div>
            <div className="chat-input">
              <input type="text" placeholder=".." />
              <button className="btn btn-primary rounder-circle" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
