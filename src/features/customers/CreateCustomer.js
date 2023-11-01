import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("Jonas");
  const [nationalId, setNationalId] = useState("1234");

  const dispatch = useDispatch();

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId));
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            onKeyDown={handleKeyPress}
            required
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
