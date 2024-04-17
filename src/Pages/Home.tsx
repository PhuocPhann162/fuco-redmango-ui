import React from "react";
import { MenuItemList } from "../Components/Page/Home";
import { Banner } from "../Components/Page/Common";
import { ChatButton } from "../Components/Layout";

function Home() {
  return (
    <div className="container">
      <div>
        <Banner />
        <div className="container p-2">
          <MenuItemList />
        </div>
      </div>
      <div className="z-999 fixed-bottom pb-5 pe-5">
        <ChatButton />
      </div>
    </div>
  );
}

export default Home;
