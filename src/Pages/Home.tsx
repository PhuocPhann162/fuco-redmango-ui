import React, { useState } from "react";
import { MenuItemList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";
import { ChatButton } from "../Components/Animation";
import { ChatFrame } from "../Components/Layout";

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isButtonShow, setIsButtonShow] = useState<boolean>(true);
  const handleOpen = () => {
    setIsOpen(true);
    setIsButtonShow(false);
  };
  const handleClose = () => {
    setIsOpen(false);
    setIsButtonShow(true);
  };
  return (
    <div className="container">
      <div>
        <Banner />
        <div className="container p-2">
          <MenuItemList />
        </div>
      </div>
      <div className="z-999 fixed-bottom pb-5 pe-5">
        <ChatButton isShow={isButtonShow} handleOpenChatFrame={handleOpen} />
        <ChatFrame isShow={isOpen} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default Home;
