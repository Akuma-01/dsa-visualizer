# 📊 DSA Sorting Visualizer

An interactive **Sorting Algorithm Visualizer** built with **React + TypeScript + TailwindCSS** that animates sorting algorithms step-by-step with code synchronization, operation labels, and color-state tracking.

This project focuses on deep visualization of how sorting algorithms work internally — not just the final output, but every compare, swap, merge, and write operation.

---

## 🌐 Live Demo

👉 https://dsa-visualizer-swart.vercel.app/


---

## 🚀 Features

- 🎯 Step-by-step sorting animation with Play / Pause / Step Forward / Step Back
- 🧠 Pseudocode line highlighting synchronized with each execution step
- 💬 Human-readable step descriptions (*"Comparing 42 and 17 — out of order, will swap"*)
- 📊 Live comparison and swap counters updated at every step
- 🎨 Color-coded operation states (compare, swap, pivot, sorted, merged, write)
- 🏷️ Operation labels — COMPARE / SWAP / WRITE / PIVOT / MERGE\_DONE
- ⚡ Adjustable execution speed and dynamic array size
- 🧩 Modular step engine shared across all algorithms
- 📱 Responsive layout — works on desktop and mobile

---

## 🧮 Algorithms

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(n) |

Each algorithm includes description, time/space complexity, pseudocode display, and frame-level visualization.

---

## 🏗️ How It Works

Built around a **step timeline model** — each algorithm pre-computes all sorting steps upfront into a `SortingStep[]` before any animation begins:

```ts
type SortingStep = {
  main: ArrayElement[];   // full array state with colors
  aux?: AuxState;         // optional auxiliary buffers (merge sort)
  line?: number;          // active pseudocode line
  operation?: string;     // e.g. "COMPARE", "SWAP", "PIVOT_PLACED"
  description?: string;   // human-readable explanation
  comparisons?: number;   // running comparison count
  swaps?: number;         // running swap/write count
}
```

This enables pause, rewind, and frame scrubbing with zero re-computation.

---

## 🎨 Color State Machine

| Color | State | Meaning |
|---|---|---|
| 🔵 Slate | UNSORTED | Untouched element |
| 🔴 Red | COMPARING | Values being compared |
| 🟡 Amber | SWAPPING | Swap in progress |
| 🟢 Green | SORTED | Final position confirmed |
| 🟣 Purple | PIVOT | Quick sort pivot element |
| 🩵 Cyan | SELECTED | Active / key element |
| 🟡 Yellow | WRITING | Being written to array |
| 🟩 Emerald | MERGED | Merged region |

---

## 🖥️ Tech Stack

- React + TypeScript
- Tailwind CSS
- Vite
- Functional components + hooks
- Immutable step snapshots

---

## 📂 Project Structure

```
src/
├── algorithms/
│   ├── bubbleSort.ts       # Step generation with counters + descriptions
│   ├── insertionSort.ts
│   ├── mergeSort.ts
│   ├── quickSort.ts
│   ├── stepBuilder.ts      # Shared step factory
│   └── index.ts            # Algorithm registry
├── components/
│   ├── AlgorithmDetails.tsx  # Complexity info panel
│   ├── CodeDisplay.tsx       # Pseudocode with line highlighting
│   ├── ColorLegend.tsx       # Color state legend
│   ├── Controls.tsx          # Sliders, playback, algorithm picker
│   ├── StepInfo.tsx          # Step description + counters
│   └── Visualization.tsx     # Animated bar chart
├── types.ts
├── constants.ts
├── utils.ts
└── SortingVisualizer.tsx     # Main orchestrator
```

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Open at `http://localhost:5173`

---

## 🤝 Acknowledgements

UI refinements developed with AI-assisted tools.
All algorithm step modeling, visualization engine design, and integration logic implemented and customized manually.

---

## 📜 License

MIT
