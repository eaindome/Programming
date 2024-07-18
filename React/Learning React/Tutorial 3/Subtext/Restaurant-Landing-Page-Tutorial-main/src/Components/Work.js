import React from "react";
import ScanQRCode from "../Assets/scan.jpg";
import Certification from "../Assets/certified.jpg";
import Journey from "../Assets/Journey.png";

const Work = () => {
  const workInfoData = [
    {
      image: ScanQRCode,
      title: "Scan QR Code",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: Certification,
      title: "Verify FDA Approval",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: Journey,
      title: "Check Drug Journey",
      // text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading-a">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
        MedTrail uses blockchain technology to track pharmaceuticals through every stage of the supply chain, recording transactions via QR code scans. 
        This ensures a transparent and immutable history of each product's journey, providing real-time updates and verification of authenticity.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
