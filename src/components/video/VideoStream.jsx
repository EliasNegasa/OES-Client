import React from "react";
import Webcam from "react-webcam";

const VideoStreaming = () => {
  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <>
      <Webcam audio={false} videoConstraints={videoConstraints} />
    </>
  );
};

export default VideoStreaming;
