import { useState } from "react";
import PageMainContent from "../../components/PageMainContent/PageMainContent";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import { Link } from "react-router-dom";
import styles from "./CreateGame.module.css";

const CreateGame = () => {
    const [sets, setSets] = useState(1);
    const [legs, setLegs] = useState(1);
    const [legLength, setLegLength] = useState(501);
    const [playerOne, setPlayerOne] = useState("Player 1");
    const [playerTwo, setPlayerTwo] = useState("Player 2");

    const startGame = () => {
        localStorage.clear();
        const gameState = {
            settings: {
                sets: sets,
                legs: legs,
                legLength: legLength,
                playerOne: playerOne,
                playerTwo: playerTwo
            },
            actions: [{
                type: "initial",
                set: 1,
                leg: 1,
                playerOneScore: legLength,
                playerTwoScore: legLength,
                playerOneSetsWon: 0,
                playerOneLegsWon: 0,
                playerTwoSetsWon: 0,
                playerTwoLegsWon: 0,
                activePlayer: 1,
                usedMultiplier: 1,
                currentThrow: 0,
                bust: false,
                legWon: false,
                setWon: false,
                gameWon: false
            }],
            activeMultiplier: 1
        }
        localStorage.setItem("gameState", JSON.stringify(gameState))
    }

    return (
        <PageMainContent>
            <div className={styles.createGame}>
                <Heading>Start a game</Heading>
                <Label text={"First to X sets"} />
                <Input callback={(value: number) => setSets(value)} type={"number"} />
                <Label text={"First to Y legs"} />
                <Input callback={(value: number) => setLegs(value)} type={"number"} />
                <Label text={"Leg length"} />
                <Input callback={(value: number) => setLegLength(value)} type={"number"} placeholder={"501, 301, ..."} />
                <Label text={"Players"} />
                <Input callback={(value: string) => setPlayerOne(value)} type={"text"} placeholder={"Player 1"} />
                <Input callback={(value: string) => setPlayerTwo(value)} type={"text"} placeholder={"Player 2"} />
                <Link style={{ textDecoration: 'none' }} to="/game"><Button callback={() => startGame()} variant={"primary"} text={"Start"} /></Link>
                <Link style={{ textDecoration: 'none' }} to="/frontpage"><Button variant={"primary"} text="Back" /></Link>
            </div>
        </PageMainContent>
    );
}

export default CreateGame;