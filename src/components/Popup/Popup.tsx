import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";

import styles from "./Popup.module.css";

interface IPopupProps {
    type: any,
    undoCallback: any,
    continueCallback: any
}

const Popup = ({ type, undoCallback, continueCallback }: IPopupProps) => {
    const gameState = JSON.parse(localStorage.getItem("gameState") as string);
    const lastAction = gameState.actions[gameState.actions.length - 1];

    return (
        <div className={styles.shader}>
            <div className={styles.popup}>
                {
                    type === "bust" &&
                    <>
                        <Heading>Bust!</Heading>
                        <div className={styles.buttons}>
                            <Button callback={() => undoCallback()} variant={"warning"} text="Undo" />
                            <Button callback={() => continueCallback()} variant={"secondary"} text="Next player" />
                        </div>
                    </>
                }
                {
                    type === "legWon" &&
                    <>
                        <Heading>Checkout!</Heading>
                        <Heading level={3}>Leg finished</Heading>
                        <div className={styles.buttons}>
                            <Button callback={() => undoCallback()} variant={"warning"} text="Undo" />
                            <Button callback={() => continueCallback()} variant={"secondary"} text="Next leg" />
                        </div>
                    </>
                }
                {
                    type === "setWon" &&
                    <>
                        <Heading>Checkout!</Heading>
                        <Heading level={3}>Leg and set finished</Heading>
                        <div className={styles.buttons}>
                            <Button callback={() => undoCallback()} variant={"warning"} text="Undo" />
                            <Button callback={() => continueCallback()} variant={"secondary"} text="Next set" />
                        </div>
                    </>
                }
                {
                    type === "gameWon" &&
                    <>
                        <Heading>Game over!</Heading>
                        <Heading level={3}>{lastAction.activePlayer === 1 ? gameState.settings.playerOne : gameState.settings.playerTwo} wins the game!</Heading>
                        <div className={styles.buttons}>
                            <Button callback={() => undoCallback()} variant={"warning"} text="Undo" />
                            <Button callback={() => continueCallback()} variant={"secondary"} text="Continue" />
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Popup;