import { useState, useMemo, useCallback, memo } from "react";
import "./index.css";

function Autocomplete({ options, selected, onChange }) {
  const [term, setTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);

  const filteredOptions = options.filter((o) =>
    o?.name.toLowerCase().includes(term.toLowerCase())
  );

  // function getSelectedOption() {
  //   return options.filter((o) => o.val === selectedOption?.val);
  // }

  // const selectedObject = useMemo(getSelectedOption, [options, selectedOption]);

  function handleSelectOption(option) {
    setSelectedOption(option);
    setTerm(option.name);
    setIsVisible(false);
    onChange(option);
  }
  const memoOnSelect = useCallback(handleSelectOption, [onChange]);

  function handleInputChange(e) {
    setIsVisible(true);
    setTerm(e.target.value);
  }
  return (
    <section className="ac-wrapper">
      <input
        className="ac-input"
        type="text"
        value={term}
        onChange={handleInputChange}
      />
      {isVisible && (
        <div className="ac-suggestions">
          {filteredOptions.map((option, id) => {
            return (
              <Suggestion key={id} option={option} onSelect={memoOnSelect} />
            );
          })}
        </div>
      )}
    </section>
  );
}

function Suggestion({ option, onSelect }) {
  const { name } = option;

  function handleSuggestionClick() {
    onSelect(option);
  }
  return (
    <div onClick={handleSuggestionClick} className="suggestion">
      {name}
    </div>
  );
}

//eslint-disable-next-line no-func-assign
Suggestion = memo(Suggestion);
export default Autocomplete;
