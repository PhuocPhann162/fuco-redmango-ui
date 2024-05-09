import React from "react";
import { Banner1 , Banner2, Banner3 } from "../../../Assets/Images";
import "./banner.css";
function Banner() {
  
  return (
    <div id="carouselExampleDark" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner custom-banner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img src={Banner1} className="d-block w-100 banner-style1" alt="..." />
        </div>
        <div className="carousel-item" data-bs-interval="5000">
          <img src={Banner2} className="d-block w-100 banner-style2" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={Banner3} className="d-block w-100 banner-style3" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Banner;