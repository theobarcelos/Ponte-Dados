'use client';

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import styles from "./style.module.css";
import { Collapse } from "react-bootstrap";

export default function status() {


    return (
        <CustomContainer>
            <h1>Status</h1>
            <CustomContainer id="form">
                <table className={styles.table} cellPadding={10}>
                    <thead>
                        <tr>
                            <th>NF</th>
                            <th>Pedido</th>
                            <th>Solicitante</th>
                            <th>Data Prevista</th>
                            <th>Status</th>
                            <th>Aceitar/Rejeitar</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>19800</td>
                            <td>45001133131</td>
                            <td>Jailson</td>
                            <td>13/05/2027</td>
                            <td>
                                <select name="" id="">
                                    <option value="">Selecione...</option>
                                    <option value="">Em aprovação</option>
                                    <option value="">Sim</option>
                                    <option value="">Não</option>
                                </select>
                            </td>
                            <td><button>Sim ou nao</button></td>
                            <td>Icone de detalhes</td>
                        </tr>
                    </tbody>
                </table>
            </CustomContainer>
        </CustomContainer>
    )
}