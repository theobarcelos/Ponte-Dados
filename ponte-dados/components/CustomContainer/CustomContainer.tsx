'use client';
import styles from "./CustomContainer.module.css";

interface CustomContainerProps {
    children: React.ReactNode;
    id?: "coluna" | "linha" | "log" | "form" | "inicio";
}

export const CustomContainer = (props: CustomContainerProps) => {
    const { children, id } = props;

    return (
        <>
            <div
                className={
                    id === "linha" ? styles.container_fxrow
                        : id === "log" ? styles.container_log
                            : id === "form" ? styles.container_form
                                : id === "inicio" ? `${styles.container_inicio_media} ${styles.container}`
                                    : styles.container
                }
                id={id}
            >
                {children}
            </div>
        </>
    )
}