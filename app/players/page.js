"use client";
import { useState, useEffect } from "react";
import Player from "../components/Player";
import CreatePlayer from "../components/CreatePlayer";
import CardComponent from "../components/CardComponent";
import styles from "./players.module.css";
import Link from "next/link";
function Players() {
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    const fetchPlayers = () => {
      try {
        let players = JSON.parse(localStorage.getItem("playerList")) || [];
        setPlayerList(players);
      } catch (err) {
        console.error("Error fetching players from localStorage");
      }
    };
    fetchPlayers();
  }, []);
  const handleOnCreateNewPlayer = (newPlayer) => {
    setPlayerList((prevPlayers) => [...prevPlayers, newPlayer]);
  };
  function CleanPlayerListHandler() {
    setPlayerList([]);
    localStorage.setItem("playerList", JSON.stringify([]));
  }
  function removePlayerHandler(player) {
    const players = playerList.filter((item) => item.playerName !== player);
    setPlayerList(players);
    localStorage.setItem("playerList", JSON.stringify(players));
  }
  return (
    <>
      <CardComponent
        title="Player List"
        footer={
          <div>
            <button
              type="button"
              onClick={CleanPlayerListHandler}
              className="btn btn-danger"
            >
              Delete List
            </button>

            <Link
              href="/"
              className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Go Back
            </Link>
          </div>
        }
      >
        <CreatePlayer onSubmit={handleOnCreateNewPlayer} />
        <div>
          <ul className={`list-group list-group-flush ${styles.listContainer}`}>
            {playerList.length > 0 &&
              playerList.map((player, i) => (
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
    </>
  );
}
export default Players;
