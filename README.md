# 🎂 Interactive 3D Particle Cake

An interactive 3D particle cake that responds to hand gestures! Control the cake rotation and particle explosion using both hands through your webcam.

## ✨ Features

- **3D Particle Cake**: Programmatically generated cake shape with multiple layers and decorative sprinkles
- **Hand Rotation Control**: Rotate your hands to rotate the cake in 3D space
- **Particle Explosion**: Spread your hands apart to explode particles, bring them together to reform the cake
- **Smooth Animations**: Fluid particle movements and rotations
- **No External Files Needed**: Everything is generated programmatically - no 3D models or images required!

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. Upload all files to a GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be live at `https://yourusername.github.io/repository-name/`

### Option 2: Local Development

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Allow camera access when prompted
4. Show both hands to the camera and start controlling!

## 📋 Requirements

- Modern web browser with WebGL support (Chrome, Firefox, Edge, Safari)
- Webcam/camera access
- Internet connection (for loading CDN libraries)

## 🎮 How to Use

1. **Allow Camera Access**: When you open the page, allow camera access when prompted
2. **Show Both Hands**: Position both hands in front of the camera
3. **Rotate Hands**: Move your hands in a circular motion to rotate the cake
4. **Spread Hands Apart**: Move your hands away from each other to explode the particles
5. **Bring Hands Together**: Move your hands closer to reform the cake

## 🛠️ Technologies Used

- **Three.js**: 3D graphics and particle system
- **MediaPipe Hands**: Hand tracking and gesture recognition
- **Vanilla JavaScript**: No frameworks needed!

## 📁 File Structure

```
particle-cake/
├── index.html      # Main HTML file
├── script.js       # JavaScript logic and particle system
└── README.md       # This file
```

## 🎨 Customization

You can customize the cake by editing `script.js`:

- **Particle Count**: Change `particleCount` variable (default: 3000)
- **Cake Layers**: Modify `layers` variable (default: 3)
- **Particle Size**: Adjust `size` in PointsMaterial (default: 0.08)
- **Colors**: Modify the color generation in `createCakeParticles()`

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ Internet Explorer (not supported)

## 📝 Notes

- Works best in good lighting conditions
- Keep both hands visible to the camera for best results
- The particle system is optimized for performance but may vary based on device capabilities

## 🎉 Enjoy!

Have fun creating your interactive particle cake! Perfect for birthdays, demos, or just having fun with 3D graphics and hand tracking.

---

Made with ❤️ using Three.js and MediaPipe
