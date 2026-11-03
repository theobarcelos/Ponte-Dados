'use client';
import styles from "./CustomButtonIcon.module.css";
import Button from "react-bootstrap/Button"

interface CustomButtonIconProps{
    text: string;
    src: string;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
    name?: string;
}

export const CustomButtonIcon = (props: CustomButtonIconProps) => {
    const {text, src, onclick, type, name} = props;

    return(
        <>
            <Button 
            name={ name }
            onClick={ onclick }
            type={ type }
            className={ styles.botao }
            variant="primary"
            > 
            <img src={ src } className={styles.img} alt="icon" />
            { text }
            </Button>
        </>
    )
}