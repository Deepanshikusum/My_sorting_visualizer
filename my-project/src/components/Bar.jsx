export default function Bar({ height, index, selected }) {
  return (
    <div
      className={`w-2 mx-0.5 rounded-t-md ${selected ? "bg-red-400" : "bg-blue-500"}`}
      style={{ height: `${height}px` }}
    ></div>
  );
}
