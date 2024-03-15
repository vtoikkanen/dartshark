import styles from "./PageMainContent.module.css";

interface IPageMainContentProps {
    children: any;
}

const PageMainContent = ({ children }: IPageMainContentProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.pageMainContent}>
                {children}
            </div>
        </div>
    )
}

export default PageMainContent;