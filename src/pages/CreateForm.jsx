import { useState } from "react";
import { BiGridVertical } from "react-icons/bi";
import Categorize from "../components/Categorize";
import Cloze from "../components/Cloze";
import Comprehension from "../components/Comprehension";

const CreateForm = () => {
  const [selectedOption, setSelectedOption] = useState("Categorize");
  const [point, setPoint] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  return (
    <div className="container mx-auto my-auto mt-5">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <BiGridVertical /> <p>Screen 1</p>
        </div>

        {/* drop down */}
        <div className="flex gap-5">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className=""
          >
            <option value="Categorize">Categorize</option>
            <option value="Cloze">Cloze</option>
            <option value="Comprehension">Comprehension</option>
          </select>
          {/* point */}
          <div className="flex items-center gap-2">
            <h3>Point</h3>
            <input
              type="number"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="border-b "
              required
            />
          </div>
        </div>
      </header>

      {/* dynamic content */}

      <div className="mt-4">
        {selectedOption === "Categorize" && <Categorize point={point} />}
        {selectedOption === "Cloze" && <Cloze />}
        {selectedOption === "Comprehension" && <Comprehension />}
      </div>
    </div>
  );
};

export default CreateForm;
