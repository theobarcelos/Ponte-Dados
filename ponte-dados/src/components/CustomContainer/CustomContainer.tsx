'use client';
import styles from "./CustomContainer.module.css";

export interface CustomContainerProps {
    children?: React.ReactNode;
    id?: "coluna" | "linha" | "log" | "form" | "inicio_prchs" | "modal_box_product" | "modal_main";
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
                                : id === "inicio_prchs" ? `${styles.container_inicio_media} ${styles.container}`
                                    : id === "modal_box_product" ? styles.modal_box      
                                        : id === "modal_main" ? styles.main_data_modal    
                                            : styles.container
                }
                id={id}
            >
                {children}
            </div>
        </>
    )
}