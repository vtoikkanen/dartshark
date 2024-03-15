import PageMainContent from "../../components/PageMainContent/PageMainContent";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import { Link } from "react-router-dom";
import styles from "./FrontPage.module.css";

const FrontPage = () => {
    const gameState = JSON.parse(localStorage.getItem("gameState") as string);

    return (
        <PageMainContent>
            <div className={styles.frontPage}>
                <img className={styles.logo} src="/src/assets/dartshark.png" />
                <Heading>Dartshark</Heading>
                <Link style={{ textDecoration: 'none' }} to="/start"> <Button variant={"primary"} text="Start a game" /></Link>
                {gameState && (
                    <Link style={{ textDecoration: 'none' }} to="/game"> <Button variant={"primary"} text="Continue game" /></Link>
                )}
            </div>
        </PageMainContent>
    )
}

export default FrontPage;