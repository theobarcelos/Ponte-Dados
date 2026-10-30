"use client";
import { Form } from "react-bootstrap";
import styles from "./CustomInput.module.css";


interface CustomInputProps{
    label: string;
    type: string;
    id: string;
    name: string;
    change?: (e: any) => void;
    error?: string;
    placeholder?: string;
}

export const CustomInput = (props: CustomInputProps) => {
    
    const {label, type, id, name, change,  error, placeholder} = props;
    
    return(
        <>
            <Form.Group className="mb-3">
                <Form.Label htmlFor={ id }> { label } </Form.Label>
                <Form.Control
                    type={ type }
                    id={ id }
                    name={ name }
                    className={ styles.input }
                    placeholder={ placeholder }
                    onChange={ change }
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid"> { error } </Form.Control.Feedback>
            </Form.Group>
        </>
    )
}