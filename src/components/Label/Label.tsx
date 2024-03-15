import styles from "./Label.module.css";

interface ILabelProps {
    text: string;
}

const Label = ({ text }: ILabelProps) => {
    return (
        <div className={styles.label}>
            {text}
        </div>
    )
}

export default Label;