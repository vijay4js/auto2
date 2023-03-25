import { useCallback } from "react";
import AutoComplete from "./autocomplete";
import options from "./mocks";
import "./styles.css";

export default function App() {
  function handleOptionChange(option) {
    console.log(option);
  }
  const memoized = useCallback(handleOptionChange, []);
  return (
    <div className="container">
      <AutoComplete options={options} onChange={memoized} />
    </div>
  );
}
