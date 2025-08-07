export function getSelectionSortAnimations(array) {
  const animations = [];
  const n = array.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      animations.push([i, j]);
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    animations.push([i, array[minIdx]]);
    animations.push([minIdx, array[i]]);
    [array[i], array[minIdx]] = [array[minIdx], array[i]];
  }
  return animations;
}
