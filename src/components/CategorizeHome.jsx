import React, { useEffect, useState } from "react";
import axiosPublic from "../hooks/useAxiosPublic";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Swal from "sweetalert2";

const CategorizeHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosPublic.get("/categorize");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap gap-4">
        {data.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </DndProvider>
  );
};

const CategoryCard = ({ item }) => {
  const [availableValues, setAvailableValues] = useState(item.dropdownInputs);
  const [columns, setColumns] = useState(
    [...new Set(item.dropdownInputs.map((input) => input.title))].map(
      (title) => ({
        title,
        values: [],
      })
    )
  );

  const handleDrop = (title, draggedItem) => {
    setAvailableValues((prev) =>
      prev.filter((input) => input.value !== draggedItem.value)
    );
    setColumns((prev) =>
      prev.map((column) =>
        column.title === title
          ? { ...column, values: [...column.values, draggedItem] }
          : column
      )
    );
  };

  const handleSubmit = () => {
    let correctCount = 0;
    let wrongCount = 0;

    // Iterate over each column
    columns.forEach((column) => {
      column.values.forEach((value) => {
        if (value.title === column.title) {
          correctCount++;
        } else {
          wrongCount++;
        }
      });
    });

    // Display results using SweetAlert
    Swal.fire({
      title: "Results",
      html: `
        <p><strong>Correct Answers:</strong> ${correctCount}</p>
        <p><strong>Wrong Answers:</strong> ${wrongCount}</p>
      `,
      icon: correctCount > wrongCount ? "success" : "warning",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="border p-4 rounded shadow-md w-full md:w-1/3 ">
      <h3 className="text-lg font-bold mb-2">{item.heading}</h3>
      <div className="mb-4">
        <h4 className="font-semibold">Draggable Values</h4>
        <div className="flex flex-wrap gap-2">
          {availableValues.map((input) => (
            <DraggableItem
              key={input.value}
              item={input}
              setAvailableValues={setAvailableValues}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {columns.map((column) => (
          <DroppableColumn
            key={column.title}
            title={column.title}
            values={column.values}
            onDrop={(item) => handleDrop(column.title, item)}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </div>
  );
};

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`p-2 bg-base-200 rounded shadow ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {item.value}
    </div>
  );
};

const DroppableColumn = ({ title, values, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-4 border rounded ${
        isOver ? "bg-green-100" : "bg-white"
      } min-h-[100px]`}
    >
      <h4 className="font-bold mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <div
            key={value.value}
            className="p-2 bg-blue-200 rounded shadow text-sm"
          >
            {value.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizeHome;
