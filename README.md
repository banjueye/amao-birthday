# ✨ Interactive Sensory Particles

A real-time, interactive 3D particle experience built as a special birthday gift. This project uses web-based AI and audio analysis to allow users to control a universe of particles using only their hand gestures and sound. 

## 🎮 Features

* **👐 Hand Gesture Control:** Uses your webcam to track hand tension and movement. 
  * Open/close your hands to explode or reform the particles.
  * Move your hands around the screen to rotate the 3D shapes in real-time.
* **🎵 Audio Reactivity:** Listens to your microphone. The particles breathe with ambient noise and pulse/jitter to the beat of loud sounds or music.
* **💠 Procedural 3D Morphing:** 25,000 particles smoothly morph between mathematical shapes (Cake, Heart, Fireworks, Flower, Saturn) without needing external `.glb` or `.obj` files.
* **🎨 Live UI:** A sleek, frosted-glass sidebar to switch shapes, change particle colors on the fly, and toggle the UI visibility for a clean cinematic view.

## 🛠️ Tech Stack

This entire experience runs in the browser using a single `index.html` file.
* **[Three.js](https://threejs.org/):** For rendering the 3D scene, cameras, and 25,000 custom particles.
* **[MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker):** Google's machine learning model for real-time, in-browser hand tracking.
* **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API):** To capture microphone input and perform Fast Fourier Transform (FFT) for beat detection.
* **HTML5 / CSS3 / Vanilla JS:** For the layout, animations, and logic.

## 🚀 How to Run

Because this project requests access to the webcam and microphone, it must be run on a secure server (`https://` or `localhost`). You cannot simply double-click the HTML file to open it.

**Option 1: Live Demo (Easiest)**
Enable GitHub Pages in your repository settings. Once deployed, simply visit your GitHub Pages link!

**Option 2: Local Development**
1. Clone this repository to your local machine.
2. Open the folder in a code editor like VS Code.
3. Use an extension like **Live Server** to host the `index.html` file on a local port.
4. Allow camera and microphone permissions when prompted by your browser.

---
*Created with ❤️ for A Mao's Birthday.*
