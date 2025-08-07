import React, { useState, useEffect } from 'react';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(100);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [isSorting, setIsSorting] = useState(false);
  const [duration, setDuration] = useState(null);

  const generateArray = () => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 20);
    setArray(arr);
    setDuration(null);
  };

  useEffect(() => {
    generateArray();
  }, [size]);

  const sort = async () => {
    setIsSorting(true);
    const start = performance.now();

    switch (algorithm) {
      case 'Bubble Sort':
        await bubbleSort();
        break;
      case 'Selection Sort':
        await selectionSort();
        break;
      case 'Merge Sort':
        await mergeSortWrapper();
        break;
      case 'Quick Sort':
        await quickSortWrapper();
        break;
      case 'Insertion Sort':
        await insertionSort();
        break;
      case 'Heap Sort':
        await heapSort();
        break;
      default:
        break;
    }

    const end = performance.now();
    setDuration((end - start).toFixed(2));
    setIsSorting(false);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(speed);
        }
      }
    }
  };

  const selectionSort = async () => {
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await sleep(speed);
    }
  };

  const insertionSort = async () => {
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await sleep(speed);
    }
  };

  const mergeSortWrapper = async () => {
    const arr = [...array];
    await mergeSort(arr, 0, arr.length - 1);
  };

  const mergeSort = async (arr, l, r) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  };

  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const L = arr.slice(l, m + 1);
    const R = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k++] = L[i++];
      } else {
        arr[k++] = R[j++];
      }
      setArray([...arr]);
      await sleep(speed);
    }

    while (i < n1) {
      arr[k++] = L[i++];
      setArray([...arr]);
      await sleep(speed);
    }

    while (j < n2) {
      arr[k++] = R[j++];
      setArray([...arr]);
      await sleep(speed);
    }
  };

  const quickSortWrapper = async () => {
    const arr = [...array];
    await quickSort(arr, 0, arr.length - 1);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(speed);
    return i + 1;
  };

  const heapSort = async () => {
    const arr = [...array];
    const n = arr.length;

    const heapify = async (n, i) => {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && arr[l] > arr[largest]) largest = l;
      if (r < n && arr[r] > arr[largest]) largest = r;

      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await sleep(speed);
        await heapify(n, largest);
      }
    };

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      await sleep(speed);
      await heapify(i, 0);
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 text-white">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="mr-2 text-white font-semibold">Algorithm:</label>
          <select
            className="bg-gray-900 text-white p-2 rounded"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting}
          >
            <option>Bubble Sort</option>
            <option>Selection Sort</option>
            <option>Insertion Sort</option>
            <option>Merge Sort</option>
            <option>Quick Sort</option>
            <option>Heap Sort</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <label className="text-white font-semibold">Array Size</label>
            <input
              type="range"
              min="10"
              max="150"
              value={size}
              disabled={isSorting}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-40 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-white font-semibold">Speed</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              disabled={isSorting}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-40 h-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        </div>

        <button
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
          onClick={sort}
          disabled={isSorting}
        >
          Start Sorting
        </button>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          onClick={generateArray}
          disabled={isSorting}
        >
          Reset Array
        </button>
      </div>

      <div className="flex items-end h-[300px] bg-gray-900 p-2 rounded">
        {array.map((val, idx) => (
          <div
            key={idx}
            style={{ height: `${val}px` }}
            className="bg-gradient-to-t from-pink-500 to-purple-500 mx-[1px] w-[5px] rounded"
          ></div>
        ))}
      </div>

      {duration && (
        <p className="mt-4 text-sm text-green-400">
          ✅ Sorting completed in {duration} ms.
        </p>
      )}
    </div>
  );
};

export default SortingVisualizer;


// import React, { useState, useEffect } from 'react';

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const SortingVisualizer = () => {
//   const [array, setArray] = useState([]);
//   const [size, setSize] = useState(30);
//   const [speed, setSpeed] = useState(50);
//   const [algorithm, setAlgorithm] = useState('Bubble Sort');
//   const [isSorting, setIsSorting] = useState(false);
//   const [duration, setDuration] = useState(null);

//   const generateArray = () => {
//     const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 20);
//     setArray(arr);
//     setDuration(null);
//   };

//   useEffect(() => {
//     generateArray();
//   }, [size]);

//   const sort = async () => {
//     setIsSorting(true);
//     const start = performance.now();

//     switch (algorithm) {
//       case 'Bubble Sort':
//         await bubbleSort();
//         break;
//       case 'Selection Sort':
//         await selectionSort();
//         break;
//       case 'Insertion Sort':
//         await insertionSort();
//         break;
//       case 'Merge Sort':
//         await mergeSortWrapper();
//         break;
//       case 'Quick Sort':
//         await quickSortWrapper();
//         break;
//       case 'Heap Sort':
//         await heapSort();
//         break;
