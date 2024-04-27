import React from "react";

type Props = {
  isShow?: boolean;
  handleClose?: () => void;
};

export default function ChatFrame({
  isShow,
  handleClose,
}: Props) {
  return (
    <>
      {isShow && (
        <div className="d-flex justify-content-end">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-12">
              <div className="card" id="chat1" style={{ borderRadius: '15px', width: '300px', height: '500px' }}>
                <div className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                  <label className="mb-0 fw-bold">Live chat</label>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex flex-row justify-content-start mb-4">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 2" style={{ width: '45px', height: '100%' }} />
                      <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237, .2)' }}>
                        <label className="small">Hello Welcome, I'm chat bot, What do you want?</label>
                      </div>
                    </div>
                    <div className="d-flex flex-row justify-content-end mb-4">
                      <div className="p-3 me-3 border" style={{ borderRadius: '15px', backgroundColor: '#fbfbfb' }}>
                        <label className="small">Thank you, I really like your product.</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-outline col-xl-8">
                      <input className="form-control" id="textAreaExample"></input>
                    </div>
                    <button type="button" className="btn btn-primary col-xl-4">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

