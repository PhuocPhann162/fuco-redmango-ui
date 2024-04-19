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
        <div className="wrapper-modal">
          <div className="modal-body">
            <h1>Chat Frame</h1>
          </div>
        </div>
      )}
    </>
  );
}
