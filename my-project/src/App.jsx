// import './index.css'
// // import { useState, useEffect } from "react";
// import Bar from "./components/Bar";
// import { getMergeSortAnimations } from "./algorithms/mergeSort";
// import { getQuickSortAnimations } from "./algorithms/quickSort";
// import { getSelectionSortAnimations } from "./algorithms/selectionSort";
// import React, { useState, useEffect } from "react";

// function App() {
//   const [array, setArray] = useState([]);

//   const generateArray = () => {
//     const newArr = Array.from({ length: 50 }, () =>
//       Math.floor(Math.random() * 300) + 10
//     );
//     setArray(newArr);
//   };

//   useEffect(() => {
//     generateArray();
//   }, []);

//   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//   const animateArray = async (arr) => {
//     setArray([...arr]);
//     await sleep(50); // slower animation
//   };

//   // 🟡 SELECTION SORT
//   const selectionSort = async () => {
//     const arr = [...array];
//     const n = arr.length;
//     for (let i = 0; i < n; i++) {
//       let minIdx = i;
//       for (let j = i + 1; j < n; j++) {
//         if (arr[j] < arr[minIdx]) {
//           minIdx = j;
//         }
//       }
//       if (minIdx !== i) {
//         [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
//         await animateArray(arr);
//       }
//     }
//   };

//   // 🔵 MERGE SORT
//   const mergeSort = async () => {
//     const arr = [...array];

//     async function mergeSortHelper(arr, start, end) {
//       if (start >= end) return;

//       const mid = Math.floor((start + end) / 2);
//       await mergeSortHelper(arr, start, mid);
//       await mergeSortHelper(arr, mid + 1, end);

//       const merged = [];
//       let i = start,
//         j = mid + 1;

//       while (i <= mid && j <= end) {
//         if (arr[i] < arr[j]) {
//           merged.push(arr[i++]);
//         } else {
//           merged.push(arr[j++]);
//         }
//       }

//       while (i <= mid) merged.push(arr[i++]);
//       while (j <= end) merged.push(arr[j++]);

//       for (let k = start; k <= end; k++) {
//         arr[k] = merged[k - start];
//         await animateArray(arr);
//       }
//     }

//     await mergeSortHelper(arr, 0, arr.length - 1);
//   };

//   // 🔴 QUICK SORT
//   const quickSort = async () => {
//     const arr = [...array];

//     async function partition(low, high) {
//       let pivot = arr[high];
//       let i = low - 1;

//       for (let j = low; j < high; j++) {
//         if (arr[j] < pivot) {
//           i++;
//           [arr[i], arr[j]] = [arr[j], arr[i]];
//           await animateArray(arr);
//         }
//       }

//       [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
//       await animateArray(arr);
//       return i + 1;
//     }

//     async function quickSortHelper(low, high) {
//       if (low < high) {
//         let pi = await partition(low, high);
//         await quickSortHelper(low, pi - 1);
//         await quickSortHelper(pi + 1, high);
//       }
//     }

//     await quickSortHelper(0, arr.length - 1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-4xl font-bold my-6 text-cyan-400">Sorting Visualizer</h1>
//       <div className="flex flex-wrap gap-3 mb-6">
//         <button onClick={generateArray} className="px-4 py-2 bg-cyan-600 rounded hover:bg-cyan-700 transition">
//           Generate New Array
//         </button>
//         <button onClick={selectionSort} className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition">
//           Selection Sort
//         </button>
//         <button onClick={mergeSort} className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
//           Merge Sort
//         </button>
//         <button onClick={quickSort} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition">
//           Quick Sort
//         </button>
//       </div>

//       <div className="flex items-end h-80 w-full max-w-5xl bg-white/10 rounded-md px-1 gap-1 overflow-hidden shadow-inner">
//         {array.map((value, idx) => (
//           <div
//             key={idx}
//             className="bg-cyan-300 w-full rounded-t-sm"
//             style={{
//               height: `${value}px`,
//               width: `${100 / array.length}%`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';

// function App() {
//   const [array, setArray] = useState([]);
//   const [arraySize, setArraySize] = useState(20);
//   const [isSorting, setIsSorting] = useState(false);
//   const [sortTime, setSortTime] = useState(null);

//   useEffect(() => {
//     generateArray();
//   }, [arraySize]);

//   const generateArray = () => {
//     const newArray = Array.from({ length: arraySize }, () =>
//       Math.floor(Math.random() * 300) + 10
//     );
//     setArray(newArray);
//     setSortTime(null);
//   };

//   const bubbleSort = async () => {
//     setIsSorting(true);
//     let arr = [...array];
//     const bars = document.getElementsByClassName('bar');

//     const start = performance.now();
//     for (let i = 0; i < arr.length - 1; i++) {
//       for (let j = 0; j < arr.length - i - 1; j++) {
//         bars[j].style.backgroundColor = 'red';
//         bars[j + 1].style.backgroundColor = 'red';

//         await new Promise((res) => setTimeout(res, 50));
//         if (arr[j] > arr[j + 1]) {
//           [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//           setArray([...arr]);
//         }

//         bars[j].style.backgroundColor = 'skyblue';
//         bars[j + 1].style.backgroundColor = 'skyblue';
//       }
//     }
//     const end = performance.now();
//     setSortTime((end - start).toFixed(2));
//     setIsSorting(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-3xl font-bold mb-4">🔢 Sorting Visualizer</h1>

//       <div className="mb-4 flex items-center space-x-4">
//         <label htmlFor="size" className="text-lg">Array Size:</label>
//         <input
//           id="size"
//           type="range"
//           min="5"
//           max="100"
//           value={arraySize}
//           disabled={isSorting}
//           onChange={(e) => setArraySize(Number(e.target.value))}
//           className="w-48"
//         />
//         <span>{arraySize}</span>
//         <button
//           onClick={generateArray}
//           disabled={isSorting}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//         >
//           🔄 Regenerate
//         </button>
//         <button
//           onClick={bubbleSort}
//           disabled={isSorting}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           ▶️ Start Bubble Sort
//         </button>
//       </div>

//       {sortTime && (
//         <p className="mb-2 text-green-700 font-semibold">
//           ⏱️ Sorting Time: {sortTime} ms
//         </p>
//       )}

//       <div className="flex items-end h-72 w-full max-w-5xl border p-2 bg-white rounded shadow overflow-hidden">
//         {array.map((value, idx) => (
//           <div
//             key={idx}
//             className="bar mx-0.5 bg-sky-400"
//             style={{
//               height: `${value}px`,
//               width: `${Math.floor(1000 / arraySize)}px`,
//               transition: 'height 0.2s ease',
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold my-6">🌌 Sorting Visualizer</h1>
      <SortingVisualizer />
      <footer className="mt-10 text-sm text-gray-400">Made with 💫 by Deepanshi</footer>
    </div>
  );
};

export default App;
