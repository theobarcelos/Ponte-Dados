'use client';
import styles from "./CustomButton.module.css";
import Button from "react-bootstrap/Button"

interface CustomButtonProps{
    text: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
    name?: string;
}

export const CustomButton = (props: CustomButtonProps) => {
    const {text, onclick, type, name} = props;

    return(
        <>
            <Button 
            name={ name }
            onClick={ onclick }
            type={ type }
            className={ name==="status"? styles.botao_status : styles.botao }
            variant="primary"
            > { text }
            </Button>
        </>
    )
}