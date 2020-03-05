import React, { useEffect, useRef, useState } from "react";

import * as faceapi from "face-api.js";
import { canvas, faceDetectionNet, faceDetectionOptions } from "./commons";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user"
};

const FaceScreen = () => {
  const webcamRef = useRef<any>();
  const detectionRef = useRef<any>();

  const [modelsLoading, setModelsLoading] = useState(true);

  const loadModels = async () => {
    await faceDetectionNet.loadFromUri("/weights");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/weights");
    await faceapi.nets.faceExpressionNet.loadFromUri("/weights");
    setModelsLoading(false);
    setInterval(drawPred, 100);
  };

  // Component did mount
  useEffect(() => {
    loadModels();
  }, []);

  const drawPred = async () => {
    const imgData = webcamRef.current.getScreenshot();
    const img = await canvas.loadImage(imgData);

    const results = await faceapi
      .detectAllFaces(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceExpressions();

    const cnv = detectionRef.current;
    const ctx = cnv.getContext("2d");

    var image = new Image();
    image.src = imgData;
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      faceapi.draw.drawDetections(
        cnv,
        results.map(res => res.detection)
      );
      faceapi.draw.drawFaceExpressions(cnv, results);
    };
  };

  return (
    <div>
      {modelsLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div>
            <Webcam
              audio={false}
              height={480}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              videoConstraints={videoConstraints}
            />
            <canvas
              ref={detectionRef}
              id="detection"
              width={640}
              height={480}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceScreen;
