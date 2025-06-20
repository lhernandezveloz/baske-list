"use client";
function Player({ player, timeIn, remove }) {
  function removePlayer() {
    remove(player);
  }
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {player}, {new Date(timeIn).toLocaleTimeString()}
      <i className="bi bi-trash text-danger fs-4" onClick={removePlayer}></i>
    </li>
  );
}
export default Player;
