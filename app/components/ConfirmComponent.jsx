import { useState, useRef, useEffect, Children } from "react";
function CardComponent({ text, titleId, btnClass, onSubmit }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const modalRef = useRef(null);
  const passwordRef = useRef(null);

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function closeModal() {
    setErrorMessage("");
    setPassword("");
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    let adminPass = localStorage.getItem("adminPass") || "";
    if (adminPass == password) {
      onSubmit(true);
      let element = document.getElementById(`cancel-btn-pass-${titleId}`);
      element.click();
    } else {
      setErrorMessage("Incorrect Password");
      return false;
    }
  }

  return (
    <div>
      <button
        className={`${btnClass}`}
        data-bs-toggle="modal"
        data-bs-target={`#ConfirmModal-${titleId}`}
      >
        {text}
      </button>
      <div
        className="modal fade"
        ref={modalRef}
        id={`ConfirmModal-${titleId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={onSubmitHandler}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Confirmation
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
                  <label className="form-label">Enter Yor Password:</label>
                  <input
                    ref={passwordRef}
                    onChange={onPasswordChange}
                    value={password}
                    name="password"
                    type="password"
                    className="form-control"
                    id={`exampleFormControlInput1-${titleId}`}
                    placeholder="Password"
                  />
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id={`cancel-btn-pass-${titleId}`}
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardComponent;
