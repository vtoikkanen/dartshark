import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMainContent from "../../components/PageMainContent/PageMainContent";
import Heading from "../../components/Heading/Heading";
import Popup from "../../components/Popup/Popup";

import styles from "./Game.module.css";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const Game = () => {
    const navigate = useNavigate();
    const gameState = JSON.parse(localStorage.getItem("gameState") as string);
    const sets = parseInt(gameState.settings.sets);
    const legs = parseInt(gameState.settings.legs);
    const [actions, setActions] = useState(gameState.actions);
    const [latestAction, setLatestAction] = useState(actions[actions.length - 1]);
    const [activeMultiplier, setActiveMultiplier] = useState(gameState.activeMultiplier)

    const setMultiplier = (multiplier: number) => {
        const existingGameState = JSON.parse(localStorage.getItem("gameState") as string);
        const updatedGameState = { ...existingGameState };
        updatedGameState.multiplier = multiplier;
        localStorage.setItem("gameState", JSON.stringify(updatedGameState));
        setActiveMultiplier(multiplier)
    }

    // First parameter is type, second is number
    const doAction = (type: string, number?: number) => {
        if (type === "throw" && latestAction.currentThrow === 3) return;
        if (type === "next" && latestAction.currentThrow !== 3) return;

        const existingGameState = JSON.parse(localStorage.getItem("gameState") as string);
        const updatedGameState = { ...existingGameState };
        const newAction = { ...latestAction };
        const activePlayer = latestAction.activePlayer;
        const currentThrow = latestAction.currentThrow;
        const playerOneScore = latestAction.playerOneScore;
        const playerTwoScore = latestAction.playerTwoScore;
        const playerOneLegsWon = latestAction.playerOneLegsWon;
        const playerOneSetsWon = latestAction.playerOneSetsWon;
        const playerTwoLegsWon = latestAction.playerTwoLegsWon;
        const playerTwoSetsWon = latestAction.playerTwoSetsWon;
        const leg = parseInt(latestAction.leg);
        const set = parseInt(latestAction.set);
        const legWon = latestAction.legWon;
        const setWon = latestAction.setWon;

        let newPlayer;
        let newPlayerOneScore = playerOneScore;
        let newPlayerTwoScore = playerTwoScore;
        let newPlayerOneLegsWon = playerOneLegsWon;
        let newPlayerOneSetsWon = playerOneSetsWon;
        let newPlayerTwoLegsWon = playerTwoLegsWon;
        let newPlayerTwoSetsWon = playerTwoSetsWon;
        let newScore;
        let newCurrentThrow;
        let newBust;
        let newLeg;
        let newSet;
        let newLegWon;
        let newSetWon;
        let newGameWon;

        if (type === "throw" && number) {
            newPlayer = activePlayer;
            if (activePlayer === 1) {
                newScore = playerOneScore - (number * activeMultiplier);
                newPlayerOneScore = newScore;
            }
            if (activePlayer === 2) {
                newScore = playerTwoScore - (number * activeMultiplier);
                newPlayerTwoScore = newScore;
            }
            newCurrentThrow = currentThrow !== 3 ? currentThrow + 1 : 3;
            newBust = newScore && newScore !== 0 && newScore < 2;
            newLegWon = newScore === 0 && (activeMultiplier === 2 || number === 50);
            newSetWon = newLegWon && ((playerOneLegsWon + (activePlayer === 1 ? 1 : 0)) === legs || (playerTwoLegsWon + (activePlayer === 2 ? 1 : 0)) === legs);
            newGameWon = newSetWon && ((playerOneSetsWon + (activePlayer === 1 ? 1 : 0)) === sets || (playerTwoSetsWon + (activePlayer === 2 ? 1 : 0)) === sets);
            newLeg = leg;
            newSet = set;
        }

        if (type === "next") {
            newPlayer = activePlayer === 1 ? 2 : 1;
            newCurrentThrow = 0;
            newBust = false;
            newLeg = leg;
            newSet = set;
            newLegWon = false;
            newSetWon = false;
            newGameWon = false;
        }

        if (type === "continue") {
            newPlayer = activePlayer === 1 ? 2 : 1;
            newPlayerOneScore = gameState.settings.legLength;
            newPlayerTwoScore = gameState.settings.legLength;
            newPlayerOneLegsWon = legWon && activePlayer === 1 ? playerOneLegsWon + 1 : playerOneLegsWon;
            newPlayerTwoLegsWon = legWon && activePlayer === 2 ? playerTwoLegsWon + 1 : playerTwoLegsWon;
            newPlayerOneSetsWon = setWon && activePlayer === 1 ? playerOneSetsWon + 1 : playerOneSetsWon;
            newPlayerTwoSetsWon = setWon && activePlayer === 2 ? playerTwoSetsWon + 1 : playerTwoSetsWon;
            if (setWon) {
                newPlayerOneLegsWon = 0;
                newPlayerTwoLegsWon = 0;
            }
            newCurrentThrow = 0;
            newBust = false;
            newLeg = setWon ? 1 : leg + 1;
            newSet = setWon ? set + 1 : set;
            newLegWon = false;
            newSetWon = false;
            newGameWon = false;
        }

        updateGameState(
            updatedGameState,
            newAction,
            type,
            newPlayer,
            newPlayerOneScore,
            newPlayerTwoScore,
            newPlayerOneLegsWon,
            newPlayerOneSetsWon,
            newPlayerTwoLegsWon,
            newPlayerTwoSetsWon,
            newCurrentThrow,
            newBust,
            newSet,
            newLeg,
            newLegWon,
            newSetWon,
            newGameWon
        )
    }

    const updateGameState = (
        updatedGameState: any,
        newAction: any,
        newType: string,
        newPlayer: number,
        newPlayerOneScore: number,
        newPlayerTwoScore: number,
        newPlayerOneLegsWon: number,
        newPlayerOneSetsWon: number,
        newPlayerTwoLegsWon: number,
        newPlayerTwoSetsWon: number,
        newCurrentThrow: number,
        newBust: any,
        newSet: any,
        newLeg: any,
        newLegWon: any,
        newSetWon: any,
        newGameWon: any
    ) => {
        newAction.type = newType;
        newAction.activePlayer = newPlayer;
        newAction.set = newSet;
        newAction.set = newLeg;
        newAction.usedMultiplier = activeMultiplier;
        newAction.playerOneScore = newPlayerOneScore;
        newAction.playerTwoScore = newPlayerTwoScore;
        newAction.playerOneLegsWon = newPlayerOneLegsWon;
        newAction.playerTwoLegsWon = newPlayerTwoLegsWon;
        newAction.playerOneSetsWon = newPlayerOneSetsWon;
        newAction.playerTwoSetsWon = newPlayerTwoSetsWon;
        newAction.currentThrow = newCurrentThrow;
        newAction.bust = newBust;
        newAction.leg = newLeg
        newAction.set = newSet;
        newAction.legWon = newLegWon;
        newAction.setWon = newSetWon;
        newAction.gameWon = newGameWon;

        const updatedActions = [
            ...actions,
            newAction
        ];
        updatedGameState.actions = updatedActions;
        localStorage.setItem("gameState", JSON.stringify(updatedGameState));
        setActions(updatedActions);
        setLatestAction(newAction);
        setActiveMultiplier(1);
    }

    const undo = () => {
        const existingGameState = JSON.parse(localStorage.getItem("gameState") as string);
        const updatedGameState = { ...existingGameState };
        const updatedActions = [...actions];
        updatedActions.pop();
        if (updatedActions.length > 0) {
            setActions(updatedActions);
            setLatestAction(updatedActions[updatedActions.length - 1]);
            updatedGameState.actions = updatedActions;
            localStorage.setItem("gameState", JSON.stringify(updatedGameState));
        }
    }

    return (
        <PageMainContent>
            <div className={styles.game}>
                <div className={styles.header}>First to {gameState.settings.sets} sets wins the game</div>
                <div className={styles.header}>First to {gameState.settings.legs} legs wins a set</div>
                <div className={styles.status}>
                    <div className={styles.sets}>Set {latestAction.set}</div>
                    <div className={styles.legs}>Leg {latestAction.leg}</div>
                </div>
                <div className={styles.turns}>
                    <div className={`${latestAction.activePlayer === 1 && styles.active} ${styles.turn}`}>{latestAction.activePlayer === 1 && `Your turn`}</div>
                    <div className={`${latestAction.activePlayer === 2 && styles.active} ${styles.turn}`}>{latestAction.activePlayer === 2 && `Your turn`}</div>
                </div>
                <div className={styles.players}>
                    <div className={styles.player}>
                        <Heading level={4}>{gameState.settings.playerOne}</Heading>
                        <div className={styles.setsAndLegs}>
                            <div className={styles.sets}>Sets: {latestAction.playerOneSetsWon}</div>
                            <div className={styles.legs}>Legs: {latestAction.playerOneLegsWon}</div>
                        </div>
                        <div className={styles.score}><Heading>{latestAction.playerOneScore}</Heading></div>
                    </div>
                    <div className={styles.player}>
                        <Heading level={4}>{gameState.settings.playerTwo}</Heading>
                        <div className={styles.setsAndLegs}>
                            <div className={styles.sets}>Sets: {latestAction.playerTwoSetsWon}</div>
                            <div className={styles.legs}>Legs: {latestAction.playerTwoLegsWon}</div>
                        </div>
                        <div className={styles.score}><Heading>{latestAction.playerTwoScore}</Heading></div>
                    </div>
                </div>
                <div className={styles.throws}>
                    <div className={styles.throw}>{ }</div>
                    <div className={styles.throw}>{ }</div>
                    <div className={styles.throw}>{ }</div>
                </div>
                <div className={styles.keyboard}>
                    <div className={styles.multipliers}>
                        <div onClick={() => setMultiplier(1)} className={`${styles.multiplier} ${activeMultiplier === 1 && styles.activeMultiplier}`}>Single</div>
                        <div onClick={() => setMultiplier(2)} className={`${styles.multiplier} ${activeMultiplier === 2 && styles.activeMultiplier}`}>Double</div>
                        <div onClick={() => setMultiplier(3)} className={`${styles.multiplier} ${activeMultiplier === 3 && styles.activeMultiplier}`}>Triple</div>
                        <div onClick={() => doAction("throw", 25)} className={styles.multiplier}>25</div>
                        <div onClick={() => doAction("throw", 50)} className={styles.multiplier}>50</div>
                        <div onClick={() => doAction("throw", 0)} className={styles.multiplier}>Miss</div>
                    </div>
                    <div className={styles.numbers}>
                        {
                            numbers.map(number => {
                                return (
                                    <div key={number} onClick={() => doAction("throw", number)} className={styles.number}>{number}</div>
                                )
                            })
                        }
                    </div>
                    <div className={styles.turnOptions}>
                        <div onClick={() => { undo() }} className={`${styles.turnOption} ${styles.back}`}>Undo move</div>
                        <div onClick={() => { doAction("next") }} className={`${styles.turnOption} ${styles.next}`}>Next player</div>
                    </div>
                </div>
                {latestAction.bust && <Popup type={"bust"} undoCallback={() => undo()} continueCallback={() => doAction("next")} />}
                {latestAction.legWon && !latestAction.setWon && !latestAction.gameWon && <Popup type={"legWon"} undoCallback={() => undo()} continueCallback={() => doAction("continue")} />}
                {latestAction.setWon && !latestAction.gameWon && <Popup type={"setWon"} undoCallback={() => undo()} continueCallback={() => doAction("continue")} />}
                {latestAction.gameWon && latestAction.setWon && latestAction.legWon && <Popup type={"gameWon"} undoCallback={() => undo()} continueCallback={() => navigate("/recap")} />}
            </div>
        </PageMainContent>
    );
}

export default Game;