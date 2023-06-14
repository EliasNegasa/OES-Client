import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

const ZoomComponent = () => {
  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/1.9.1/lib", "/av"); // Replace with the appropriate Zoom Web SDK version
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    const apiKey = "YOUR_ZOOM_API_KEY";
    const apiSecret = "hH4TTRS2he5QWcZ8d6ffAy4uR0XxuOC9";

    ZoomMtg.init({
      leaveUrl: "http://localhost:5173/",
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          meetingNumber: "YOUR_MEETING_NUMBER",
          userName: "YOUR_USERNAME",
          signature: "YOUR_GENERATED_SIGNATURE",
          apiKey,
          userEmail: "YOUR_USER_EMAIL",
          passWord: "YOUR_MEETING_PASSWORD",
          success: (joinSuccess) => {
            console.log(joinSuccess);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }, []);

  return <div id="zmmtg-root"></div>;
};

export default ZoomComponent;
