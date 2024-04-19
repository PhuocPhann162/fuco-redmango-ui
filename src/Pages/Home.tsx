import React, { useState } from "react";
import { MenuItemList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";
import { ChatButton } from "../Components/Animation";
import { ChatFrame } from "../Components/Layout";

function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
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
        <ChatButton handleOpenChatFrame={handleOpen}/>
        <ChatFrame isShow={isOpen} handleClose={handleClose}/>
      </div>
    </div>
  );
}

export default Home;
