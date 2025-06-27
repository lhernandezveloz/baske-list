"use client";
function Player({ player, timeIn, remove }) {
  function removePlayer() {
    remove(player);
  }
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center ps-0 pe-0">
      <span>
        {player}, {new Date(timeIn).toLocaleTimeString()}
      </span>
      <i className="bi bi-trash text-danger fs-5" onClick={removePlayer}></i>
    </li>
  );
}
export default Player;
