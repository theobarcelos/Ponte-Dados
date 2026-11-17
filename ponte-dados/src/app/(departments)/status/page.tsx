'use client';

import { CustomContainer } from "@/src/components/CustomContainer/CustomContainer";
import styles from "./style.module.css";
import { CustomButtonIcon } from "@/src/components/CustomButtonIcon/CustomButtonIcon";
import { useEffect, useState } from "react";
import { IPedido } from "@/src/types/pedido";
import { CustomButton } from "@/src/components/CustomButton/CustomButton";



export default function status() {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3010/listarPedidos`)
            .then((res) => res.json())
            .then((data) => {
                if (data.sucesso) {
                    setPedidos(data.dados);
                }
            })
            .catch((err) => console.error("Erro ao carregar pedidos:", err));
    }, []);


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
                        {pedidos.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ textAlign: "center" }}>
                                    Nenhum pedido cadastrado.
                                </td>
                            </tr>
                        ) : (
                            pedidos.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.nf}</td>
                                    <td>{item.pedido}</td>
                                    <td>{item.solicitante}</td>
                                    <td>{item.dataPrevista}</td>
                                    <td>
                                        <div className={styles.status_container}>
                                            <p className={styles.status}>{item.status}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.td_c_r}>
                                            <CustomButtonIcon src="/icons/check.svg" name="check" />
                                            <CustomButtonIcon src="/icons/close.svg" name="refuse" />
                                        </div>
                                    </td>
                                    <td><CustomButton text="Detalhes" type="button" name="detalhes" /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </CustomContainer>
        </CustomContainer>
    )
}