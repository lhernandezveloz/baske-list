"use client";
import { useState, useRef, useEffect } from "react";

function CreatePlayer({ onSubmit }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus(); // Reset the form
  }, []);
  function onNameChange(event) {
    setName(event.target.value);
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    let myList = JSON.parse(localStorage.getItem("playerList")) || [];
    const newPlayer = {
      playerName: name,
      timeIn: new Date().toLocaleString(),
    };
    setName("");
    myList.push(newPlayer);
    localStorage.setItem("playerList", JSON.stringify(myList));
    onSubmit(newPlayer);
    let element = document.getElementById("cancel-btn");
    element.click();
  }
  return (
    <div>
      <i
        className="bi bi-person-plus-fill fs-3 d-flex justify-content-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={onSubmitHandler}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add New Player
                </h1>
                <button
                  type="button"
                  className="btn-close btn-sm"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Player Name</label>
                  <input
                    ref={inputRef}
                    onChange={onNameChange}
                    value={name}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="cancel-btn"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreatePlayer;
