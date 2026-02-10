# 📊 DSA Sorting Visualizer

An interactive **Sorting Algorithm Visualizer** built with **React + TypeScript + TailwindCSS** that animates sorting algorithms step-by-step with code synchronization, operation labels, and color-state tracking.

This project focuses on deep visualization of how sorting algorithms work internally — not just final output, but every compare, swap, merge, and write operation.

---

## 🌐 Live Demo

Try the project live here:

👉 https://dsa-visualizer-01.vercel.app/

No installation required — open and start visualizing algorithms instantly.

---

## 🚀 Features

- 🎯 Step-by-step sorting animation
- 🎨 Color-coded operation states (compare, swap, pivot, sorted, merged, etc.)
- 🧠 Code line highlighting synchronized with algorithm execution
- 🏷️ Operation labels (COMPARE / SWAP / WRITE / PIVOT / MERGE)
- ⏯️ Play / Pause / Step Forward / Step Back controls
- ⚡ Adjustable execution speed
- 📏 Dynamic array size control
- 📦 Merge sort auxiliary buffer visualization
- 🔁 Recursion visualization (merge & quick sort)
- 🧩 Modular step engine shared across algorithms
- 📱 Responsive dashboard layout

---

## 🧮 Implemented Algorithms

- Bubble Sort
- Insertion Sort
- Merge Sort (with auxiliary buffer tracking)
- Quick Sort (pivot + partition visualization)

Each algorithm includes:

- Description
- Time complexity
- Space complexity
- Pseudocode display
- Step-level visualization frames

---

## 🏗️ Architecture Concepts Used

This project is built around a **step timeline model**:

Each algorithm produces a sequence of frames:

```
SortingStep {
  main: ArrayElement[]
  aux?: AuxState
  codeLine?: number
  operation?: string
}
```

This enables:

- visualization playback
- code line synchronization
- operation tagging
- auxiliary array rendering
- rewind/forward stepping

---

## 🎨 Color State Machine

Bars change color based on operation type:

| State | Meaning |
|--------|---------|
UNSORTED | untouched |
COMPARING | values being compared |
SWAPPING | swap in progress |
SELECTED | active element |
SORTED | finalized position |
PIVOT | quicksort pivot |
MERGED | merged region |
WRITING | write to array |

---

## 🖥️ Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite
- Functional components + hooks
- Immutable step snapshots

---

## 📂 Project Structure

```
src/
  algorithms/
    bubbleSort.ts
    insertionSort.ts
    mergeSort.ts
    quickSort.ts
    stepBuilder.ts
    index.ts

  components/
    Visualization.tsx
    Controls.tsx
    CodeDisplay.tsx
    AlgorithmDetails.tsx
    Header.tsx

  types.ts
  constants.ts
  utils.ts
  SortingVisualizer.tsx
```

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Open browser at:

```
http://localhost:5173
```

---

## 🎯 Learning Goals

This project demonstrates:

- algorithm visualization design
- state timeline modeling
- UI-algorithm synchronization
- recursion visualization
- immutable state snapshots
- React performance patterns
- TypeScript typing
- modular algorithm engines

---


## 🤝 Acknowledgements

UI layout ideas and some refinement patterns were developed with AI-assisted tools.  
All algorithm step modeling, visualization engine design, and integration logic were implemented and customized manually.

---

## 📜 License

MIT License
