import { HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.css";

interface IInputModuleProps {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    callback?: any
}

const Input = ({ placeholder, type, callback }: IInputModuleProps) => {
    return (
        <input onChange={(e) => { callback && callback(e.target.value) }} type={type && type} className={styles.input} placeholder={placeholder} />
    )
}

export default Input;