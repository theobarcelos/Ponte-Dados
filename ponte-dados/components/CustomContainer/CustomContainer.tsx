'use client';
import styles from "./CustomContainer.module.css";

interface CustomContainerProps {
    children: React.ReactNode[];
    title?: string;
    id?: "coluna" | "linha" | "log" | "form";
}

export const CustomContainer = (props: CustomContainerProps) => {
    const { children, title, id } = props;

    return (
        <>
            <div
                className={
                    id === "linha" ? styles.container_fxrow
                        : id === "log" ? styles.container_log
                            : id === "form" ? styles.container_form
                                : styles.container
                }
                id={id}
            >   <h1>{title}</h1>
                {...children}
            </div>
        </>
    )
}