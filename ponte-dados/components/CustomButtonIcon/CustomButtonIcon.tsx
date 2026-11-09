'use client';
import styles from "./CustomButtonIcon.module.css";
import Button from "react-bootstrap/Button"

interface CustomButtonIconProps {
    src: string;
    name: string;
    img?: string;
    text?: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
}

export const CustomButtonIcon = (props: CustomButtonIconProps) => {
    const { text, src, onclick, type, name, img} = props;

    const form = name.includes('_form');
    const botao = name.includes("botao_");

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
                                            : form ? styles.botao_form
                                                : styles.botao
                }
                variant="primary"
            >
                <img src={src} className={
                    form ? styles.img_form
                        : img === "sim" || img === "nao" ? styles.img_status
                            : styles.img
                } alt="icon" />
                {text}
            </Button>
        </>
    )
}