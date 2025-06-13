"use client";
import { useState, useEffect } from "react";
import Player from "./Player";
import CardComponent from "./CardComponent";

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
  return (
    <>
      <CardComponent
        title={`${title} Team`}
        footer={
          <div>
            <button
              type="button"
              onClick={deleteTeamHandler}
              className="btn btn-danger"
            >
              Delete Team
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onCreateTeamHandler}
            >
              Generate Team
            </button>
          </div>
        }
      >
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
      </CardComponent>
    </>
  );
}
export default Team;
