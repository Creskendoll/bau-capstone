// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
// import '@tensorflow/tfjs-node';

import * as faceapi from "face-api.js";

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = require("canvas");

// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas;

// https://github.com/justadudewhohacks/face-api.js/issues/197
faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img")
});

export { canvas };
