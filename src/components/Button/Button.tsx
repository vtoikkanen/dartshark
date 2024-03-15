import styles from "./Button.module.css";

interface IButtonProps {
    callback?: () => void;
    text: string;
    variant: "primary" | "secondary" | "warning";
}

const Button = ({ text, callback, variant }: IButtonProps) => {
    return (
        <div
            onClick={() => { callback && callback() }}
            className={`${styles.button} ${variant === "primary" && styles.primary} ${variant === "secondary" && styles.secondary} ${variant === "warning" && styles.warning}`}>
            {text}
        </div >
    )
}

export default Button;