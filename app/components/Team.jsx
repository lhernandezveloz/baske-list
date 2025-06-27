"use client";
import { useState, useEffect } from "react";
import Player from "./Player";
import CardComponent from "./CardComponent";
import SelectPlayers from "./SelectPlayers";

function Team({ title }) {
  const [team, setTeam] = useState([]);
  useEffect(() => {
    const fetchPlayers = () => {
      try {
        let players = JSON.parse(localStorage.getItem(title)) || [];
        setTeam(players);
      } catch (err) {
        console.error("Error fetching players from localStorage");
      }
    };
    fetchPlayers();
  }, []);
  function onCreateTeamHandler(event) {
    event.preventDefault();
    let myList = JSON.parse(localStorage.getItem(title)) || [];
    let waitingList = JSON.parse(localStorage.getItem("playerList")) || [];
    for (let i = 0; i <= 3; i++) {
      myList.push(waitingList.shift());
    }
    localStorage.setItem("playerList", JSON.stringify(waitingList));
    localStorage.setItem(title, JSON.stringify(myList));
    setTeam(myList);
  }
  function deleteTeamHandler() {
    let waitingList = JSON.parse(localStorage.getItem("playerList")) || [];
    localStorage.setItem(
      "playerList",
      JSON.stringify(waitingList.concat(team))
    );
    localStorage.setItem(title, JSON.stringify([]));
    setTeam([]);
  }
  function removePlayerHandler(player) {
    let myList = JSON.parse(localStorage.getItem("playerList")) || [];
    let newPlayer = team.filter((item) => item.playerName == player);
    const players = team.filter((item) => item.playerName !== player);
    setTeam(players);
    localStorage.setItem(title, JSON.stringify(players));
    localStorage.setItem(
      "playerList",
      JSON.stringify(myList.concat(newPlayer))
    );
  }
  function addPlayersHandler(players) {
    console.log(players);
    setTeam(team.concat(players));
    localStorage.setItem(title, JSON.stringify(team.concat(players)));
  }
  return (
    <div className="team-container">
      <CardComponent
        title={
          <div className="d-flex justify-content-between align-items-center">
            {`${title} Team`}
            <SelectPlayers team={title} addPlayers={addPlayersHandler} />
          </div>
        }
        footer={
          <>
            <button
              type="button"
              onClick={deleteTeamHandler}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={onCreateTeamHandler}
            >
              Generate
            </button>
          </>
        }
      >
        <div>
          <ul className={`list-group list-group-flush listContainer`}>
            {team.length > 0 &&
              team.map((player, i) => (
                <Player
                  key={i}
                  player={player?.playerName}
                  timeIn={player?.timeIn}
                  remove={removePlayerHandler}
                />
              ))}
          </ul>
        </div>
      </CardComponent>
    </div>
  );
}
export default Team;
