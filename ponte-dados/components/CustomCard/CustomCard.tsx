'use client';

import Card from "react-bootstrap/Card";
import styles from "./CustomCard.module.css";

interface CustomCardProps {
    info: string;
    title: string;
    text: string;
}

export const CustomCard = (props: CustomCardProps) => {

    const {title, text, info} = props;

    return (
        <Card className={
            title === "Recebidos" ? styles.recebido
                : title === "Aguardando recebimento" ? styles.transito
                    : styles.nova_compra
        }>
            <Card.Body className={ styles.corpo }>
                <Card.Subtitle className={styles.title}> { title } </Card.Subtitle>
                <Card.Title className={styles.info}> { info } </Card.Title>
                <Card.Text className={styles.text}> { text } </Card.Text>
            </Card.Body>
        </Card>
    )
}