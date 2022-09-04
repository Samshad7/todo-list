import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const addItem = () => {
    if (!input) {
      alert("Please fill data");
    } else if (input && !toggleSubmit) {
      setArr(
        arr.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInput("");
      setIsEditItem(null);
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: input };
      setArr([...arr, allInputData]);
      setInput("");
    }
  };

  const removeItem = (index) => {
    const updatedArr = arr.filter((item) => {
      if (index != item.id) {
        return item;
      }
    });
    setArr(updatedArr);
  };

  const removeAll = () => {
    setArr([]);
  };

  const editItem = (id) => {
    const newEditItem = arr.find((elem) => {
      return elem.id === id;
    });

    setToggleSubmit(false);
    setInput(newEditItem.name);
    setIsEditItem(id);
  };

  return (
    <div>
      <div className="main-div">
        <div className="main-container">
          <div className="container">
            <figure>TODO</figure>
            <figcaption>Add your list here</figcaption>
          </div>
          <div className="selectitem">
            <input
              type="text"
              className="text"
              value={input}
              name="input"
              placeholder="add items..."
              onChange={(e) => setInput(e.target.value)}
            />
            {toggleSubmit ? (
              <button className="add-btn" onClick={addItem}>
                +
              </button>
            ) : (
              <button className="add-btn" onClick={addItem}>
                update
              </button>
            )}
          </div>
          <div className="showitem">
            <ul>
              {arr.map((item, i) => {
                return (
                  <li key={item.id}>
                    {item.name}

                    <button
                      className="remove-btn"
                      onClick={() => editItem(item.id)}
                    >
                      edit
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      -
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="allRemove">
            <button className="btn1 allRemoveBtn" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
