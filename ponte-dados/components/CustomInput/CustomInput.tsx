'use client';
import styles from "./CustomInput.module.css";
import Form from "react-bootstrap/Form";

interface CustomInputProps{
    type: string;
    label: string;
    id: string;
    value?: string | number;
    name?: string;
    placeholder?: string;
    change?: (e: any) => void;
}

export const CustomInput = (props: CustomInputProps) => {
    const {type, label, id, name, placeholder, change, value} = props;
    
    const form = id.includes('_form');

    return(
        <>
            <Form.Group className={ !form ? styles.containerText : styles.containerTextForm }>
                <Form.Label htmlFor={ id }> { label } </Form.Label>
                <Form.Control
                type={ type }
                name={ name }
                className={ styles.caixadetexto }
                id={ id }
                placeholder={ placeholder }
                onChange={ change }
                value={ value }
                >
                </Form.Control>
            </Form.Group>
        </>
    )
}