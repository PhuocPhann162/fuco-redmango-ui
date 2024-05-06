import React, { useState, useEffect, useRef } from "react";
import { chatBotApi } from "../../Apis";

type Props = {
  isShow?: boolean;
  handleClose?: () => void;
};

type Message = {
  sender: "user" | "bot";
  content: string;
};

export default function ChatFrame({
  isShow,
  handleClose,
}: Props) {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      content: "Hello Welcome, I'm chat bot, What do you want?",
    },
  ]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSend();
      event.preventDefault();
      setUserMessage('');
    }
  };

  const handleSend = async () => {
    setMessages((prevMessages) => [...prevMessages, { sender: "user", content: userMessage }]);
    const response = await chatBotApi({ message: userMessage });
    if (typeof response === 'string') {
      setMessages((prevMessages) => [...prevMessages, { sender: "bot", content: response }]);
    } else {
      // handle error
    }
    setUserMessage('');
  };

  return (
    <>
      {isShow && (
        <div className="d-flex justify-content-end">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-12">
              <div className="card" id="chat1" style={{ borderRadius: '15px', width: '300px', height: '500px' }}>
                <div className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0" style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                  <label className="mb-0 fw-bold">RedMango Bot</label>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className="card-body d-flex flex-column justify-content-between" >
                  <div style={{ overflowY: 'auto', maxHeight: '370px' }}>
                    {messages.map((message, index) => (
                      <div key={index} className={`d-flex flex-row justify-content-${message.sender === "user" ? "end" : "start"} mb-2`}>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp" alt="avatar 2" style={{ width: '45px', height: '100%', visibility: message.sender === "user" ? 'hidden' : 'visible' }} />
                        <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: message.sender === "user" ? '#CED2D9' : 'rgba(57, 192, 237, .2)' }}>
                          <label className="small">{message.content}</label>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="row">
                    <div className="form-outline col-xl-10">
                      <input
                        className="form-control"
                        id="textAreaExample"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <button type="button" className="btn btn-primary col-xl-2" onClick={handleSend}>
                      <span className="bi bi-send"></span>
                    </button>
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