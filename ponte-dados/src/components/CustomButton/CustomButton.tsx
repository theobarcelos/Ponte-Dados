'use client';
import styles from "./CustomButton.module.css";
import Button from "react-bootstrap/Button"

interface CustomButtonProps {
    text: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
    name?: string;
    id?: string;
}

export const CustomButton = (props: CustomButtonProps) => {
    const { text, onclick, type, name, id } = props;

    return (
        <>
            <Button
                name={name}
                onClick={onclick}
                type={type}
                className={
                    name === "status" ? styles.botao_status
                        : name === "import_csv_form" ? styles.botao_importcsv
                            : name === "cancelar_form" ? styles.botao_cancelar
                                : name === "cadastrar_pedido_form" ? styles.botao_addprod
                                    : name === "add_produto_form" ? styles.botao_addprod
                                        : styles.botao}
                variant="primary"
                id={id}
            > {text}
            </Button>
        </>
    )
}