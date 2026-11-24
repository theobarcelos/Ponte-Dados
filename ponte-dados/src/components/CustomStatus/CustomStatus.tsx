'use client';

import styles from "./CustomStatus.module.css"

interface CustomStatusProps {
    text: "Aguardando recebimento" | "Em atraso" | "Recebido" | null | undefined;
}

export const CustomStatus = (props: CustomStatusProps) => {

    const text = props.text;

    return (
        <div className={
            text === 'Aguardando recebimento' ? ` ${styles.default} ${styles.aguardando}`
                : text === 'Em atraso' ? ` ${styles.default} ${styles.atraso}`
                    : text === 'Recebido' ? ` ${styles.default} ${styles.recebido}`
                        : styles.common
        }>
            <p className={styles.paragraph}> {text} </p>
        </div>
    )
}