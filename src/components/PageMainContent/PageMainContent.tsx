import styles from "./PageMainContent.module.css";

const PageMainContent = (children: any) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.pageMainContent}>
                {children}
            </div>
        </div>
    )
}

export default PageMainContent;