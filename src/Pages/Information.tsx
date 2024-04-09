import { ProgressBar } from "../Components/Animation";
import { Avatar, InformationCard } from "../Components/Page/Information";
import { useState, useEffect } from "react";

function Information() {
  const [isChangeAvatar, setAvatar] = useState<boolean>(false);
  const [isInformation, setInformation] = useState<boolean>(false);
  console.log("1: ",isChangeAvatar);
  const handleChangeAvatar = () => {
    setAvatar(true);
    // setInformation(false);
  };
  const handleCloseAvatar = () => {
    setAvatar(false);
  };
  const handleInformation = () => {
    // setAvatar(false);
    setInformation(true);
  };
  const handleCloseInformation = () => {
    setInformation(false);
  };
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 10);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);
  return (
    <div className="container">
      <div className="row w-80 pt-3 justify-content-end" >
        <div className="dropdown col-xl-2">
          <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="bi-pencil-fill" /> Edit
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={handleChangeAvatar}>Change Avatar</button></li>
            <li><button className="dropdown-item" onClick={handleInformation}>Change Information</button></li>
          </ul>
        </div>
      </div>
      <div className="container row justify-content-evenly ">
        <Avatar AvatarState= {isChangeAvatar} handleCloseAvatar={handleCloseAvatar}/>
        <InformationCard InformationState={isInformation} handleCloseInformation={handleCloseInformation}/>
      </div>
      <div className="container row justify-content-center">  
        <div className="col-xl-6 ">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default Information;