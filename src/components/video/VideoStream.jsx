import { Stack } from "@mui/material";
import React from "react";
import Webcam from "react-webcam";

const VideoStreaming = () => {
  const videoConstraints = {
    facingMode: "user",
  };

  return (
    <Stack
      sx={{
        maxWidth: "225px",
        position: "absolute",
        left: "10px",
        bottom: "6.5rem",
        zIndex: 99999,
      }}
    >
      <Webcam audio={false} videoConstraints={videoConstraints} />
    </Stack>
  );
};

export default VideoStreaming;
