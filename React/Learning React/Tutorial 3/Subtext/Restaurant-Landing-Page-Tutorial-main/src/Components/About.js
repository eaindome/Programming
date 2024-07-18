import React from "react";
import AboutBackground from "../Assets/about-background-3.png";
import AboutBackgroundImage from "../Assets/network.png";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Transforming Pharmaceutical Supply Chains
        </h1>
        <p className="primary-text">
          MedTrail aims to revolutionize pharmaceutical traceability via blockchain technology.
        </p>
        <p className="primary-text">
        Our platform ensures transparency and trust throughout the supply chain, from manufacturing to consumer purchase.</p>
        <p className="primary-text">
        By leveraging immutable blockchain records, MedTrail enhances security, reduces fraud, and ensures the authenticity of pharmaceutical products.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button-a">Learn More</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
