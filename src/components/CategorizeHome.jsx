import React, { useEffect, useState } from "react";
import axiosPublic from "../hooks/useAxiosPublic";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Swal from "sweetalert2";

const DraggableItem = ({ value, type, datasetId }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: `dataset-${datasetId}`,
    item: { value, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      className={`p-2 m-1 text-white bg-blue-500 rounded cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {value}
    </div>
  );
};

const DroppableColumn = ({ title, datasetId, onDrop, items }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: `dataset-${datasetId}`,
    drop: (item) => onDrop(item.value, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      className={`p-4 border-2 rounded ${isOver ? "bg-green-100" : "bg-white"}`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-2">
        {items.map((item, index) => (
          <div key={index} className="p-2 my-1 text-white bg-green-500 rounded">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const CategorizeHome = () => {
  const [categories, setCategories] = useState([]);
  const [remainingItems, setRemainingItems] = useState({});
  const [droppedItems, setDroppedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosPublic.get("/categorize");
        setCategories(response.data);

        const initialRemainingItems = response.data.reduce((acc, dataset) => {
          acc[dataset._id] = dataset.dropdownInputs.map((input) => ({
            value: input.value,
            type: input.title,
          }));
          return acc;
        }, {});
        setRemainingItems(initialRemainingItems);

        const initialDroppedItems = response.data.reduce((acc, dataset) => {
          acc[dataset._id] = {};
          return acc;
        }, {});
        setDroppedItems(initialDroppedItems);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleDrop = (datasetId, value, column) => {
    setDroppedItems((prev) => ({
      ...prev,
      [datasetId]: {
        ...prev[datasetId],
        [column]: [...(prev[datasetId][column] || []), value],
      },
    }));

    setRemainingItems((prev) => {
      const filteredItems = prev[datasetId].filter(
        (item) => item.value !== value
      );
      return { ...prev, [datasetId]: filteredItems };
    });
  };

  const handleSubmit = (datasetId) => {
    const dataset = categories.find((cat) => cat._id === datasetId);
    if (!dataset) return;

    let correct = 0;
    let total = dataset.dropdownInputs.length;

    dataset.dropdownInputs.forEach((input) => {
      const { title, value } = input;
      if (droppedItems[datasetId][title]?.includes(value)) correct++;
    });

    const maxPoints = dataset.point;
    const score = (correct / total) * maxPoints;

    Swal.fire({
      title: `Results for ${dataset.heading}`,
      html: `<p><strong>Correct:</strong> ${correct}</p>
             <p><strong>Incorrect:</strong> ${total - correct}</p>
             <p><strong>Score:</strong> ${score.toFixed(2)} / ${maxPoints}</p>`,
      icon: "info",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold">Categorize</h3>
      <DndProvider backend={HTML5Backend}>
        <div className="p-4 grid grid-cols-2 gap-5">
          {categories.map((dataset) => {
            const uniqueTitles = [
              ...new Set(dataset.dropdownInputs.map((input) => input.title)),
            ];
            const datasetId = dataset._id;

            return (
              <div
                key={datasetId}
                className="p-4 mt-4 border-2 rounded shadow-md bg-gray-100"
              >
                <h4 className="text-xl font-semibold">{dataset.heading}</h4>
                <div className="flex flex-wrap mt-4">
                  {remainingItems[datasetId]?.map((item, index) => (
                    <DraggableItem
                      key={index}
                      value={item.value}
                      type={`dataset-${datasetId}`}
                      datasetId={datasetId}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {uniqueTitles.map((title, idx) => (
                    <DroppableColumn
                      key={idx}
                      title={title}
                      datasetId={datasetId}
                      items={droppedItems[datasetId][title] || []}
                      onDrop={(value, column) =>
                        handleDrop(datasetId, value, column)
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleSubmit(datasetId)}
                  className="px-4 py-2 mt-4 text-white bg-green-600 rounded"
                >
                  Submit
                </button>
              </div>
            );
          })}
        </div>
      </DndProvider>
    </div>
  );
};

export default CategorizeHome;
