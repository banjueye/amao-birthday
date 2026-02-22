# ✨ Interactive Magic Particles (A Mao's Birthday Edition)

A real-time, interactive 3D particle experience built as a special birthday gift. This project allows users to control a universe of glowing particles using only their hand gestures, accompanied by an immersive background soundtrack.

## 🎮 Features

* **👐 Hand Gesture Control:** Uses your webcam to track hand tension and movement. 
  * Open/close your hands to explode or reform the particles.
  * Move your hands around the screen to smoothly rotate the 3D shapes in real-time.
* **🎵 Immersive Soundtrack:** Plays a continuous background music track to create the perfect birthday atmosphere.
* **💠 Procedural 3D Morphing:** 25,000 particles smoothly morph between mathematical shapes (Cake, Heart, Fireworks, Flower, Saturn) without needing any external 3D model files.
* **🎨 Responsive UI:** A sleek, frosted-glass interface that adapts to both computer screens (left sidebar) and mobile phones (bottom panel). Includes a live color picker and a "hide UI" toggle for a clean, cinematic view.

## 🛠️ Tech Stack

This entire experience runs in the browser using a single `index.html` file.
* **[Three.js](https://threejs.org/):** For rendering the 3D scene, camera, and 25,000 custom particles.
* **[MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker):** Google's machine learning model for real-time, in-browser hand tracking.
* **HTML5 Audio:** For seamless background music playback.
* **Vanilla JavaScript & CSS3:** For the layout, responsive design, and core logic.

## 🚀 How to Run

Because this project requests access to the webcam, it must be run on a secure server (`https://` or `localhost`). You cannot simply double-click the HTML file to open it.

**Important Setup:** Ensure you have an audio file named `music.mp3` in the exact same folder as the `index.html` file for the background music to work!

**Option 1: Live Demo (Recommended)**
1. Upload the code and `music.mp3` to a GitHub repository.
2. Enable **GitHub Pages** in the repository settings. 
3. Visit the live link provided by GitHub!

**Option 2: Local Development**
1. Clone this repository to your local machine.
2. Add your `music.mp3` file to the folder.
3. Open the folder in a code editor like VS Code.
4. Use an extension like **Live Server** to host the `index.html` file on a local port.
5. Allow camera permissions when prompted by your browser.

---
*Created with ❤️ for 阿毛's Birthday.*
