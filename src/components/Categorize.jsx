import React from "react";
import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption } from "@headlessui/react";
import Swal from "sweetalert2";
import axiosPublic from "../hooks/useAxiosPublic";


const Categorize = ({ point }) => {
  const [heading, setHeading] = useState("");
  const [media, setMedia] = useState("");
  const [categories, setCategories] = useState([]);
  const [dropdownInputs, setDropdownInputs] = useState([]);
 

  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
    setDropdownInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index, value) => {
    const updateCategories = [...categories];
    updateCategories[index] = value;
    setCategories(updateCategories);
  };

  const handleRemoveDropdownInput = (index) => {
    setDropdownInputs(dropdownInputs.filter((_, i) => i !== index));
  };

  const handleDropdownInputChange = (index, field, value) => {
    const updateDropdownInputs = [...dropdownInputs];
    updateDropdownInputs[index][field] = value;
    setDropdownInputs(updateDropdownInputs);
  };

  const handleAddDropdownInput = () => {
    setDropdownInputs([...dropdownInputs, { title: "", value: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      heading,
      media,
      categories,
      dropdownInputs,
      point,
    };
    try {
      const response = await axiosPublic.post("/create-categorize", formData);
      console.log("data saved", response.data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your data has been saved successfully!",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error saving data:", error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Failed to save data.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* heading */}
        <div>
          <label className="block">
            <input
              type="text"
              value={heading}
              placeholder="Description Text"
              onChange={(e) => setHeading(e.target.value)}
              className="block w-full border p-2 rounded mt-1"
            />
          </label>

          {/* media */}
          <label className=" items-center gap-2 my-7">
            Media:
            <Listbox value={media} onChange={setMedia}>
              <ListboxButton className="block w-1/5 border p-2 rounded mt-1">
                {media || "media"}
              </ListboxButton>
              <Listbox.Options className="border rounded w-1/5">
                {["image", "video", "audio"].map((item, index) => (
                  <Listbox.Option key={index} value={item}>
                    {item}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </label>
        </div>

        {/* category */}
        <div className="space-y-4">
          <label className="block font-bold"> Category: </label>
          {categories.map((category, index) => (
            <div key={index} className="flex space-x-2 items-center">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button type="button" onClick={() => handleRemoveCategory(index)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Category
          </button>
          <button type="button"></button>
        </div>

        {/* make item */}
        <div className="space-y-4 ">
          <label className="block font-bold"> items </label>
          {dropdownInputs.map((input, index) => (
            <div key={index} className="flex gap-10">
              <select
                value={input.title}
                onChange={(e) =>
                  handleDropdownInputChange(index, "title", e.target.value)
                }
                className="block w-full border p-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={input.value}
                onChange={(e) =>
                  handleDropdownInputChange(index, "value", e.target.value)
                }
                placeholder={`item ${index}`}
                className="block w-full border p-2 rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveDropdownInput(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddDropdownInput}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add Dropdown Input
          </button>
        </div>

        {/* submit */}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
};

export default Categorize;
