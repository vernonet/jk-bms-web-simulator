# ESP32 Jikong (JK) BMS Web Server Simulator

An interactive, web-based live simulation of the customized embedded web server firmware designed for monitoring Jikong (JK) Battery Management Systems via an ESP32 microcontroller. 

This repository hosts a standalone interactive emulator of the original interface, completely cleaned up and fully translated into English.

---

## 🚀 Live Simulation
You can interact with the live telemetry interface without needing real hardware or flashing a microchip. The emulator acts exactly like the configuration web page served directly by the ESP32.

👉 **[Launch the Live Web Simulator Dashboard](https://vernonet.github.io/jk-bms-web-simulator/)**

---

## 📋 Features In Focus

- **Interactive Controls:** Toggle settings, simulation states, and explore system configuration panes exactly as they appear on a real network device node.
- **Asynchronous AJAX Simulation:** Emulates live polling with JSON payloads mimicking raw real-time data streaming over dynamic Ajax calls.

---

## ⚙️ Automated Deployment & GitHub Pages Setup

This repository is configured to build and deploy completely automatically via GitHub Actions. You don't need to install Node.js or run any local servers to update the live simulator.

### One-Time Repository Configuration:
To enable the web preview, you must activate GitHub Pages in this repository's settings:
1. Open this repository on GitHub and click the **Settings** (⚙️) tab at the top.
2. In the left sidebar menu, find the **Code and automation** section and click **Pages**.
3. Under the **Build and deployment** block, find the **Source** dropdown menu.
4. Change the source selection from *Deploy from a branch* to **GitHub Actions**.

### How the Workflow Works:
Once enabled, every time you commit changes or push code to the `main` branch, the internal workflow (`.github/workflows/deploy.yml`) handles everything automatically:
- **Environment Setup:** Boots a virtual Ubuntu environment with Node.js 20.
- **Dependency Management:** Installs required packages cleanly using isolated production trees.
- **Production Build:** Compiles the React + TypeScript code into highly optimized static assets using Vite.
- **Live Publishing:** Automatically uploads the build artifacts and updates your live site preview.

*Note: If you ever need to force a manual deployment without updating the code, go to the **Actions** tab on GitHub, select the deploy workflow, and click the **Run workflow** dropdown button.*
---

## 🗂️ Project Attribution
This web laboratory is an extension and documentation interface companion for the master backend firmware codebase. The primary source-code framework belongs to the open-source repository asset:
🔗 **[vernonet/ESP32_PRJ/esp32_jk_bms](https://github.com/vernonet/ESP32_PRJ/tree/main/esp32_jk_bms)**
