# ESP32 Jikong (JK) BMS Web Server Simulator

An interactive, web-based live simulation of the customized embedded web server firmware designed for monitoring Jikong (JK) Battery Management Systems via an ESP32 microcontroller. 

This repository hosts a standalone interactive emulator of the original interface, completely cleaned up and fully translated into English.

[![Live Demo](https://shields.io)](https://github.io)
[![Language](https://shields.io)](https://github.com)

---

## 🚀 Live Simulation
You can interact with the live telemetry interface without needing real hardware or flashing a microchip. The emulator acts exactly like the configuration web page served directly by the ESP32.

👉 **[Launch the Live Web Simulator Dashboard](https://github.io)**

---

## 📋 Features In Focus

- **100% English Localized:** All system settings, battery status tables, configuration menus, logs, and labels have been meticulously translated into proper, idiomatic English.
- **0% Cyrillic Artifacts:** Every line of HTML/JS UI data code has been scrubbed to prevent browser encoding glitches and telemetry breakages.
- **Interactive Controls:** Toggle settings, simulation states, and explore system configuration panes exactly as they appear on a real network device node.
- **Asynchronous AJAX Simulation:** Emulates live polling with JSON payloads mimicking raw real-time data streaming over dynamic Ajax calls.

---

## 💻 Local Development & Installation

If you want to run this simulator dashboard locally on your desktop or modify the interface components:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd jk-bms-web-simulator
   ```

2. **Install node dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the local Vite server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to test.

---

## 🗂️ Project Attribution
This web laboratory is an extension and documentation interface companion for the master backend firmware codebase. The primary source-code framework belongs to the open-source repository asset:
[Run Live ESP32 JK-BMS Simulator](https://vernonet.github.io/jk-bms-web-simulator/)


