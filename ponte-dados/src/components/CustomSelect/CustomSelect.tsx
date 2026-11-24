'use client';
import styles from "./CustomSelect.module.css";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Interface para criar as opções do select
interface SelectOption {
    id: string;
    value: string;
    label: string;
}

// Interface para as props do componente CustomSelect
interface PropsCustomSelect {
    name: string;
    options: SelectOption[];
    value?: string;
    change?: (e: any) => void;
    error?: string;
};

export const CustomSelect = (props: PropsCustomSelect) => {

    const { name, options, value, change } = props;
    return (
        <Form.Group>
            <Form.Select
                value={value}
                onChange={change}
                name={name}
                className={
                    value === "Aguardando recebimento" ? `${styles.aguardando} ${styles.status} `
                    : value === "Em atraso" ? `${styles.status} ${styles.atraso}`
                    : value === "Recebido" ? `${styles.status} ${styles.recebido}`
                    : styles.status
                }
            >

                {options.map((option) => (
                    <option
                        key={option.id}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}