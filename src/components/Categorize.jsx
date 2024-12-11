import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";

const Categorize = ({ point }) => {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [categories, setCategories] = useState([]);
  const [dropdowns, setDropdowns] = useState([]);
  const mediaOptions = ["Image", "Video", "Audio", "Text"];

  onsubmit = (data) => {
    console.log("from Data:", data);
  };

  const addCategory = () => {
    setCategories((prev) => [...prev, ""]);
  };

  const removeCategory = (index) => {
    setCategories((prev) => [...prev.filter((_, i) => i !== index)]);
  };

  const handleCategoryChange = (index, value) => {
    const updateCategories = [...categories];
    updateCategories[index] = value;
    setCategories(updateCategories);
    setValue("categories", updateCategories);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)} className="space-y-6">
        <h2 className="text-xl font-bold">Form Heading</h2>
        {/* media drop down */}
        <div className="mb-4">
          <label
            htmlFor="media"
            className="block text-sm font-medium text-gray-700"
          >
            Media Type
          </label>

          <Controller
            name="media"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                id="media"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {mediaOptions.map((media, index) => (
                  <option key={index} value={media}>
                    {media}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {/* category section */}

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Categories</h3>

          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Enter category"
              />
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="bg-red-500 text-white rounded px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCategory}
            className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
          >
            Add Category
          </button>
        </div>

        {/* input section */}
      </form>
    </div>
  );
};

export default Categorize;
