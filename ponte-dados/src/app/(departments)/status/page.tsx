'use client';

import { CustomContainer } from "@/src/components/CustomContainer/CustomContainer";
import styles from "./style.module.css";
import { CustomButtonIcon } from "@/src/components/CustomButtonIcon/CustomButtonIcon";
import { useEffect, useState } from "react";
import { IPedido, IProduto } from "@/src/types/pedido";
import { CustomButton } from "@/src/components/CustomButton/CustomButton";
import { CustomModal } from "@/src/components/CustomModal/CustomModal";
import { CustomStatus } from "@/src/components/CustomStatus/CustomStatus";
import { CustomSelect } from "@/src/components/CustomSelect/CustomSelect";



export default function Status() {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [pedidoSelecionado, setPedidoSelecionado] = useState<IPedido>();
    
    const opcoes = [
        { id: "1", value: "Aguardando recebimento", label: "Aguardando recebimento" },
        { id: "2", value: "Em atraso", label: "Em atraso" },
        { id: "3", value: "Recebido", label: "Recebido" }
    ]

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

    async function detalhesPedido(nf?: string) {
        try {
            const pedido = await fetch(`http://localhost:3010/detalhesPedido/${nf}`);
            const data = await pedido.json();

            const resultado = data.pedido ? data.pedido : data;
            setPedidoSelecionado(Array.isArray(resultado) ? resultado[0] : resultado);
        } catch (e) {
            console.error("Erro: ", e)
        }
    }

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
                                        <CustomStatus text={item.status} />
                                    </td>
                                    <td>
                                        <div className={styles.td_c_r}>
                                            <CustomButtonIcon src="/icons/check.svg" name="check" />
                                            <CustomButtonIcon src="/icons/close.svg" name="refuse" />
                                        </div>
                                    </td>
                                    <td><CustomButton text="Detalhes" type="button" name="detalhes" onclick={() => detalhesPedido(item.nf)} /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {pedidoSelecionado && (
                    <CustomModal
                        title={`Pedido: ${pedidoSelecionado.pedido || ""}`}
                        show={!!pedidoSelecionado}
                        onClose={() => setPedidoSelecionado(undefined)}
                        nf={pedidoSelecionado.nf}
                    >


                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <CustomContainer id="modal_main">
                                <p><strong>NF:</strong> {pedidoSelecionado.nf}</p>
                            </CustomContainer>
                            <CustomSelect name="status" options={opcoes}></CustomSelect>
                        </div>
                        <CustomContainer id="modal_main">
                            <p><strong>Fornecedor:</strong> {pedidoSelecionado.fornecedor}</p>
                        </CustomContainer>
                        <CustomContainer id="modal_main">
                            <p><strong>Solicitante:</strong> {pedidoSelecionado.solicitante}</p>
                        </CustomContainer>
                        <CustomContainer id="modal_main">
                            <p><strong>Data Prevista:</strong> {pedidoSelecionado.dataPrevista}</p>
                        </CustomContainer>
                        




                        <h3 style={{marginTop: "40px"}}><strong>Produtos {`(${pedidoSelecionado.produtos.length} itens)`}</strong></h3>
                        {pedidoSelecionado.produtos.map((item, index) => (
                            <CustomContainer id="modal_box_product" key={index}>
                                <h5>Produto {index + 1}</h5>
                                <p><strong>Descrição:</strong> {item.descricao}</p>
                                <p><strong>Quantidade:</strong> {item.quantidade}</p>
                            </CustomContainer>
                        ))}
                    </CustomModal>
                )}
            </CustomContainer>
        </CustomContainer>
    )
}