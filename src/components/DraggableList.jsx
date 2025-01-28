import { useRef } from "react";
import { useState } from "react";

const DraggableList = () => {
  const [array, setArray] = useState([
    { id: 1, name: "Adam Scout" },
    { id: 2, name: "Helena Eagon" },
    { id: 3, name: "Irving Bailiff" },
    { id: 4, name: "Dylan George" },
    { id: 5, name: "Harmony Cobel" },
    { id: 6, name: "Seth Milchick" },
  ]);
  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  const handleSort = () => {
    const arrayClone = [...array];
    const temp = arrayClone[dragItem.current];
    arrayClone[dragItem.current] = arrayClone[draggedOverItem.current];
    arrayClone[draggedOverItem.current] = temp;

    setArray(arrayClone);
  };

  return (
    <main>
      <h1>list</h1>

      <div className="list">
        {array.map((item, i) => (
          <div
            className="list-item"
            draggable
            key={i}
            onDragStart={() => (dragItem.current = i)}
            onDragEnter={() => (draggedOverItem.current = i)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
export default DraggableList;
