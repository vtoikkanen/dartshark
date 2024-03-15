import styles from "./Heading.module.css";

interface IHeadingProps {
    level?: 1 | 2 | 3 | 4;
    children: string | JSX.Element | JSX.Element[];
    className?: string;
}

const Heading = ({ level, children, className }: IHeadingProps) => {
    return <div className={`${styles.heading} ${level === 2 && styles.level2} ${level === 3 && styles.level3} ${level === 4 && styles.level4} ${className}`}>
        {children}
    </div>
}

export default Heading