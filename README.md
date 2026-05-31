# 🌐 3D-Renderer — Interactive 3D Web Environment

**Final Year Project (FYP)**
**Author:** Hatim Dyani
**Institution:** MultiHexa DIGITAL Institute - AI
**Degree:** Specialized Technician in Software Development

---

## 📌 Overview

**3D-Renderer** is a web application that allows users to visualize and explore interactive 3D scenes directly in their browser without requiring plugins or additional software. The project leverages the power of **Three.js** and **WebGL** to load and render 3D models in both `.glb` (GLTF) and `.obj/.mtl` formats, while providing multiple camera navigation modes for real-time scene exploration.

The environment is designed as an interactive 3D portfolio experience. Users begin in an animated welcome scene and can navigate through different modules, such as a house interior and an urban environment, while interacting with clickable 3D objects that display contextual information.

---

## ✨ Features

| Feature                         | Description                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------- |
| 🔭 **Orbit Mode**               | Freely navigate around the scene using mouse controls (rotate, zoom, and pan) |
| 🚶 **First-Person Mode (FPS)**  | Move through the environment using keyboard and mouse controls                |
| 🖱️ **Pointer Lock Mode**       | Immersive camera control with mouse cursor capture                            |
| 📦 **OBJ/MTL Loading**          | Import Wavefront 3D models with associated materials                          |
| 🏗️ **GLTF/GLB Loading**        | Import binary GLTF models with textures and lightmaps                         |
| 💡 **Advanced Lighting System** | Ambient, directional, hemisphere, and dynamic spot lighting                   |
| 🖱️ **Raycasting Interaction**  | Hover and double-click detection on 3D objects using DOM events               |
| 📊 **Performance Monitoring**   | Real-time FPS counter powered by Stats.js                                     |
| 🗺️ **Reference Axes**          | Built-in AxesHelper for spatial orientation                                   |
| 🔄 **Scene Switching**          | Seamlessly cycle between multiple 3D environments without page reloads        |

---

## 🗂️ Project Structure

```text
3D-Renderer/
├── index.html              # Application entry point
├── style.css               # Global styles and UI button positioning
├── package.json            # NPM dependencies
│
├── JS/
│   ├── script.js           # Main logic: scene, camera, and render loop
│   ├── state.js            # FPS monitor (Stats.js)
│   ├── utils.js            # Shared utility functions
│   ├── constants.js        # Scene constants
│   │
│   ├── Three.js            # Three.js core library
│   ├── three.module.js     # ES6 module version of Three.js
│   ├── OrbitControls.js    # Orbit navigation controls
│   ├── FirstPersonControls.js  # First-person controls
│   ├── PointerLockControls.js  # Immersive pointer-lock controls
│   ├── GLTFLoader.js       # GLTF/GLB model loader
│   ├── OBJLoader.js        # Wavefront OBJ loader
│   ├── MTLLoader.js        # MTL material loader
│   ├── threex.domevents.js # DOM event handling for 3D objects
│   │
│   ├── cameras/            # Three.js camera extensions
│   ├── core/               # Core Three.js components
│   ├── geometries/         # Primitive geometries
│   ├── lights/             # Lighting components
│   └── math/               # 3D mathematics utilities
│
└── dd/
    ├── home.glb            # House interior model (Module 1)
    ├── home8.glb           # Alternative house model (Module 2)
    ├── city2.glb           # Urban environment model (Module 3)
    ├── welcome3.obj        # Welcome scene model
    └── welcome3.mtl        # Welcome scene materials
```

---

## 🛠️ Technologies Used

* **Three.js** — JavaScript library for 3D graphics
* **WebGL** — Browser-based 3D rendering API
* **GLTF / GLB** — Modern 3D asset transmission format by Khronos Group
* **Wavefront OBJ/MTL** — Traditional 3D model format
* **jQuery** — DOM manipulation and UI interactions
* **HTML5 / CSS3 / JavaScript (ES5/ES6)** — Front-end web technologies

---

## 🚀 Getting Started

### Prerequisites

* A modern browser with WebGL support (Chrome, Firefox, Edge, etc.)
* A local web server (required for loading 3D assets via XHR requests)

### Option 1 — Live Server (VS Code)

```bash
# Install the "Live Server" extension in VS Code
# Right-click index.html → "Open with Live Server"
```

### Option 2 — Python HTTP Server

```bash
cd 3D-Renderer/
python3 -m http.server 8080

# Open:
http://localhost:8080
```

### Option 3 — Node.js

```bash
npm install
npx serve .
```

> ⚠️ **Important:** Do not open `index.html` directly using the `file://` protocol. Browser security restrictions (CORS) will prevent 3D assets from loading correctly. Always use a local HTTP server.

---

## 🎮 Controls

| Mode                               | Input              | Action                |
| ---------------------------------- | ------------------ | --------------------- |
| **Orbit** (Default)                | Left Click + Drag  | Rotate camera         |
| **Orbit**                          | Mouse Wheel        | Zoom in/out           |
| **Orbit**                          | Right Click + Drag | Pan camera            |
| **FPS** ("Drive" Button)           | `W / A / S / D`    | Move around           |
| **FPS**                            | Mouse Movement     | Look around           |
| **Pointer Lock** ("Fly" Button)    | Click to Lock      | Enable immersive mode |
| **Pointer Lock**                   | `Esc`              | Exit immersive mode   |
| **Exploration** ("Explore" Button) | Click              | Load next 3D module   |

---

## 🔮 Future Improvements

* [ ] Modernized UI using React or Vue.js
* [ ] Asynchronous asset loading with progress indicators
* [ ] Collision detection system for FPS mode
* [ ] GLTF skeletal animation support
* [ ] HDRI skybox and environment mapping
* [ ] VR support through the WebXR API
* [ ] Online scene editor
* [ ] High-resolution screenshot export

---

## 👤 Author

**Hatim Dyani**
MultiHexa DIGITAL Institute - AI
Specialized Technician in Software Development

---

## 📄 License

This project was developed as part of a Final Year Project (FYP). All rights reserved © 2024 Hatim Dyani.
