"use client";

import { CustomButton } from "@/components/CustomButton/CustomButton";
import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastro() {

    const [codigo, setCodigo] = useState<string>();
    const router = useRouter();

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