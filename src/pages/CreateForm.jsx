import { useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import Categorize from "../components/Categorize";
import Cloze from "../components/Cloze";
import Comprehension from "../components/Comprehension";

const CreateForm = () => {
  const [selectedOption, setSelectedOption] = useState("Categorize");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="container mx-auto my-auto mt-5">
      <header>
        <div className="flex items-center gap-2">
          <BiGridVertical /> <p>Screen 1</p>
        </div>

        {/* drop down */}

        <div>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className=""
          >
            <option value="Categorize">Categorize</option>
            <option value="Cloze">Cloze</option>
            <option value="Comprehension">Comprehension</option>
          </select>
        </div>
      </header>

      {/* dynamic content */}

      <div className="mt-4">
        {selectedOption === "Categorize" && <Categorize />}
        {selectedOption === "Cloze" && <Cloze />}
        {selectedOption === "Comprehension" && <Comprehension />}
      </div>
    </div>
  );
};

export default CreateForm;
