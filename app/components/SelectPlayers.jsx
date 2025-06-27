import { useState, useEffect, useRef } from "react";
function SelectPlayers({ team, addPlayers }) {
  const [playerList, setPlayerList] = useState([]);
  const [selected, setSelected] = useState([]);
  const formRef = useRef(null);
  const modalRef = useRef(null);
  useEffect(() => {
    modalRef.current.addEventListener("hidden.bs.modal", resetForm);
    return () =>
      modalRef.current?.removeEventListener("hidden.bs.modal", resetForm);
  }, []);
  const loadPlayerLis = () => {
    fetchPlayers();
  };

  const fetchPlayers = () => {
    try {
      let players = JSON.parse(localStorage.getItem("playerList")) || [];
      setPlayerList(players);
    } catch (err) {
      console.error("Error fetching players from localStorage");
    }
  };
  function resetForm() {
    formRef.current?.reset(); // Reset the form
    setSelected([]);
  }

  function onCheckedHandler(element) {
    const playerName = element.target.nextElementSibling.textContent;
    if (element.target.checked) {
      setSelected((prevSelected) => [...prevSelected, playerName]);
    } else {
      setSelected(selected.filter((item) => item !== playerName));
    }
  }
  function addSelectedPlayers() {
    //fetchPlayers();
    let newWaitingList = playerList.filter(
      (player) => !selected.includes(player.playerName)
    );
    addPlayers(
      playerList.filter((player) => selected.includes(player.playerName))
    );
    setPlayerList(newWaitingList);
    localStorage.setItem("playerList", JSON.stringify(newWaitingList));
    setSelected([]);
    let element = document.getElementById(`cancel-btn-${team}`);
    element.click();
    resetForm();
  }
  return (
    <div>
      <i
        onClick={loadPlayerLis}
        className="bi bi-person-plus-fill fs-3 d-flex justify-content-end"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${team}`}
      />

      <div
        className="modal fade"
        ref={modalRef}
        id={`exampleModal${team}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Select players for team {team}
              </h5>
              <button
                type="button"
                className="btn-close btn-sm"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form ref={formRef}>
                <ul className="list-group">
                  {playerList.length > 0 &&
                    playerList.map((player, i) => (
                      <li className="list-group-item" key={i}>
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          onClick={onCheckedHandler}
                          id="select-player"
                        />{" "}
                        <label
                          className="form-check-label fs-6"
                          htmlFor="select-player"
                        >
                          {player.playerName}
                        </label>
                      </li>
                    ))}
                </ul>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id={`cancel-btn-${team}`}
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={addSelectedPlayers}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectPlayers;
