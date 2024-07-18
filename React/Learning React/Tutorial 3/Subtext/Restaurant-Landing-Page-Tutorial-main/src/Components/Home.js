import React from "react";
import BannerBackground from "../Assets/home-banner-background-2.png";
import BannerImage from "../Assets/home.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Ensuring Pharmaceutical Integrity 
          </h1>
          <p className="primary-text">
          A secure and transparent way to trace and verify pharmaceutical medicines from manufacturer to consumer.
          </p>
          <button className="secondary-button">
            Scan Now <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
