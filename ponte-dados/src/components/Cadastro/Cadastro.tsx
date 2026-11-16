"use client";

import { CustomButton } from "@/src/components/CustomButton/CustomButton";
import { CustomContainer } from "@/src/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/src/components/CustomInput/CustomInput";
import { IPedido } from "@/src/types/pedido";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Cadastro() {

    const url = "http://localhost:3010"

    const [codigo, setCodigo] = useState<string>();
    const router = useRouter();
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    

    useEffect(() => {
            fetch(`${url}/listarPedidos`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.sucesso) {
                        setPedidos(data.dados);
                    }
                })
                .catch((err) => console.error("Erro ao carregar pedidos:", err));
        }, [])

    return (
        <CustomContainer id="log">
            <img src="/img/logo_rose.png" style={{ width: "500px", marginBottom: "100px" }} alt="" />
            {(codigo === "lgstcs") && (
                <p style={{ color: "var(--verde)", margin: "0" }}>Código válido para o setor de logística!</p>
            )}
            {(codigo === "prchs") && (
                <p style={{ color: "var(--verde)", margin: "0" }}>Código válido para o setor de compras!</p>
            )}
            {(codigo === "fnncl") && (
                <p style={{ color: "var(--verde)", margin: "0" }}>Código válido para o setor financeiro!</p>
            )}
            <CustomInput
                label="Código de acesso"
                type="text"
                id="cod-acesso"
                name="cod-acesso"
                placeholder="Cód. de acesso"
                change={(v) => {
                    setCodigo(v.target.value);
                }}
            />



            <CustomButton
                type="submit"
                text="Entrar"
                onclick={
                    codigo === "lgstcs" || codigo === "fnncl"  ? () => router.push("/lgstcsfnncl")
                        : codigo === "prchs"? () => router.push("/prchs")
                            : () => router.push("./")
                }
            />
        </CustomContainer>
    )
}