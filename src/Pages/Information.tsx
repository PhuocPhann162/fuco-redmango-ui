import { Avatar, InformationCard } from "../Components/Page/Information";
import { useState } from "react";

function Information() {
  const [isChangeAvatar, setAvatar] = useState<boolean>(false);
  const [isInformation, setInformation] = useState<boolean>(false);
  const handleAvatar = () => {
    setAvatar(true);
    console.log(11111)
    setInformation(false);
  };
  const handleInformation = () => {
    setAvatar(false);
    setInformation(true);
  };
  return (
    <div className="container">
      <div className="row w-80 pt-3 justify-content-end" >
        <div className="dropdown col-xl-2">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="bi-pencil-fill" /> Edit
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={handleAvatar}>Change Avatar</button></li>
            <li><button className="dropdown-item" onClick={handleInformation}>Change Information</button></li>
          </ul>
        </div>
      </div>
      <div className="container row justify-content-evenly ">
        <Avatar AvatarState={isChangeAvatar}/>
        <InformationCard InformationState={isInformation}/>
      </div>
    </div>
  );
}

export default Information;