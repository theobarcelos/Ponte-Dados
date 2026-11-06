'use client';
import styles from "./CustomButtonIcon.module.css";
import Button from "react-bootstrap/Button"

interface CustomButtonIconProps {
    text: string;
    src: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
    name: string;
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
                                    : form ? styles.botao_form
                                        : styles.botao}
                variant="primary"
            >
                <img src={src} className={form ? styles.img_form : styles.img} alt="icon" />
                {text}
            </Button>
        </>
    )
}