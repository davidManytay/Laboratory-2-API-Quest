# 🍳 API Quest: Recipe Finder

A premium mobile application built with **React Native** and **Expo**. Discover thousands of international recipes with a sleek, high-performance interface powered by public API data.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TheMealDB](https://img.shields.io/badge/API-TheMealDB-FF4757?style=for-the-badge)

---

## ✨ Features

*   **Premium UI/UX**: Modern design with glassmorphism, custom typography, and smooth layouts.
*   **Dynamic Search**: Instant recipe lookups based on ingredients or meal names.
*   **Smooth Animations**: Fluid entrance transitions powered by `react-native-reanimated`.
*   **Smart Redirection**: Intelligent link handling that prioritizes official sources with a YouTube fallback.
*   **Interactive List**: High-performance `FlatList` with "Pull-to-Refresh" functionality.

---

## 🚀 How It Works (Step-by-Step)

1.  **Welcome**: Experience a professional animated introduction.
2.  **Explore**: Tap "Start Exploring" to access the main search hub.
3.  **Search**: Enter any ingredient (like *Salmon* or *Pasta*) for real-time API results.
4.  **Interact**: Pull down on the list any time to refresh the latest data.
5.  **Cook**: Tap a card to instantly open the cooking guide or video tutorial.

---

## 📔 Technical Reflection

### **The API Integration**
I chose **TheMealDB** for this project. It is a robust REST API that provides high-quality images, category metadata (e.g., Seafood, Dessert), and origin data (e.g., Italian, British). It also offers multi-format cooking guides (source websites and YouTube), which I used to build a resilient user experience.

### **The Problem Solved**
"API Quest" addresses "decision fatigue." By distilling thousands of global recipes into a fast, searchable mobile interface, users can find meal inspiration based on specific ingredients, helping to reduce food waste and simplify daily meal preparation.

### **The Technical Challenge**
The most difficult aspect was handling **Resilient State Transitions**. I had to ensure the UI gracefully handled "Loading" states, "Search Not Found" scenarios, and "Network Failures" without crashing. Implementing the **Smart Redirection** fallback (where the app checks for a primary source and falls back to YouTube automatically) required careful logic inside the `MealCard` component.

### **Future Roadmap**
With more time, I would implement:
*   **Local Favorites**: Offline recipe saving using `AsyncStorage`.
*   **Advanced Filtering**: Sorting by diet type, prep time, or calorie count.
*   **In-App Details**: A dedicated deep-dive screen for ingredients and measurements.

---

## 🛠️ Development Setup

### **1. Prerequisites**
Ensure you have Node.js and the Expo Go app installed.

### **2. Installation**
```bash
npm install
```

### **3. Launch**
```bash
npx expo start
```

---
Built for **Laboratory 2: API Quest** • Crafted with ❤️
