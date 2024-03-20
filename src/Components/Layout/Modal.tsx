import React, { ReactElement } from "react";

type Props = {
  width?: string;
  children?: ReactElement;
  title?: string;
  content?: string;
  contentButton?: string;
  isShow?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

export default function Modal({
  children,
  title,
  content,
  isShow,
  contentButton = "Delete",
  onClose,
  onConfirm,
}: Props) {
  return (
    <>
      {isShow && (
        <div className="wrapper-modal">
          <div className="modal-body">
            {!children ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "1rem",
                }}
              >
                <div
                  style={{ fontWeight: 600, opacity: "0.8" }}
                  className="fs-5 align-items-center"
                >
                  <i className="bi bi-x-circle text-danger"></i>
                  {title}
                </div>
                <div
                  style={{ opacity: "0.7" }}
                  className="px-3 fs-6 align-items-center"
                >
                  {content}
                </div>
                <div
                  className="d-flex justify-content-end px-4"
                  style={{
                    columnGap: "1rem",
                  }}
                >
                  <button
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={onConfirm}>
                    {contentButton}
                  </button>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </>
  );
}
