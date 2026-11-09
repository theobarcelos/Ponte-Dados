'use client';

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import styles from "./style.module.css";
import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";



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
                            <td style={{display: "flex", justifyContent: "space-around"}}>
                                <CustomButtonIcon src="/icons/check.svg" name="check" img="sim"/>
                                <CustomButtonIcon src="/icons/close.svg" name="refuse" img="nao" />
                            </td>
                            <td>Icone de detalhes</td>
                        </tr>
                    </tbody>
                </table>
            </CustomContainer>
        </CustomContainer>
    )
}