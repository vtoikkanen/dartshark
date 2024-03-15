import PageMainContent from "../../components/PageMainContent/PageMainContent";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { calculateCheckouts } from "../../utils.ts";

import styles from "./Recap.module.css";

const Recap = () => {
    const gameState = JSON.parse(localStorage.getItem("gameState") as string);
    const settings = gameState.settings;
    const actions = gameState.actions;

    const throwActions = actions.filter((action: any) => action.type === "throw");
    const playerOneCheckouts = calculateCheckouts(throwActions, 1);

    const deleteGameFromLocalStorage = () => {
        localStorage.clear();
    }

    return (
        <PageMainContent>
            <div className={styles.recap}>
                <Heading>Game Recap</Heading>
                <div className={styles.players}>
                    <div className={styles.player}>
                        <Heading className={styles.customHeading} level={4}>{settings.playerOne}</Heading>
                        <div className={styles.stat}>
                            Checkout rate: {playerOneCheckouts.rate}
                        </div>
                    </div>
                    <div className={styles.player}>
                        <Heading className={styles.customHeading} level={4}>{settings.playerTwo}</Heading>
                        <div className={styles.stat}>

                        </div>
                    </div>
                </div>
                <Link onClick={() => deleteGameFromLocalStorage()} style={{ textDecoration: 'none' }} to="/frontpage"><Button variant={"primary"} text="Return to the menu" /></Link>
            </div>
        </PageMainContent>
    )
}

export default Recap;