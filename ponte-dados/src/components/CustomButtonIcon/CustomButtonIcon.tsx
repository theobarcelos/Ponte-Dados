'use client';
import styles from "./CustomButtonIcon.module.css";
import Button from "react-bootstrap/Button"

export interface CustomButtonIconProps {
    src: string;
    name: string;
    text?: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
}

export const CustomButtonIcon = (props: CustomButtonIconProps) => {
    const { text, src, onclick, type, name } = props;

    const form = name.includes('_form');

    return (
        <>
            <Button
                name={name}
                onClick={onclick}
                type={type}
                className={
                    name === "import_csv_form" ? `${styles.botao_importcsv} ${styles.botao_form}`
                        : name === "cancelar_form" ? `${styles.botao_cancelar} ${styles.botao_form}`
                            : name === "cadastrar_pedido_form" ? `${styles.botao_addprod} ${styles.botao_form}`
                                : name === "add_produto_form" ? `${styles.botao_addprod} ${styles.botao_form}`
                                    : name === "check" ? `${styles.botao_check} ${styles.botao_status}`
                                        : name === "refuse" ? `${styles.botao_refuse} ${styles.botao_status}`
                                            : name === "cadastrar_pedido_module" ? `${styles.botao_save_module} ${styles.botao_status}`
                                                : form ? styles.botao_form
                                                    : styles.botao
                }
                variant="primary"
            >
                <img src={src} className={
                    form ? styles.img_form
                        : name === "check" || name === "refuse" ? styles.img_status
                            : name === "cadastrar_pedido_module" ? styles.img_module
                                : styles.img
                } alt="icon" />
                {text}
            </Button>
        </>
    )
}