"use client";

import { CustomButton } from "@/components/CustomButton/CustomButton";
import { CustomContainerLog } from "@/components/CustomContainerLog/CustomContainerLog";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastro(){  

    const [codigo, setCodigo] = useState<string>(); 
    const router = useRouter();
    
    return(
        <CustomContainerLog>
            <img src="/img/logo-without-bg.png" style={{width: "500px"}} alt="" />
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
                
                {(codigo === "lgstcs") && (
                    <p style={{color: "var(--verde)", margin: "0"}}>Código válido para o setor de logística!</p>
                )} 
                {(codigo === "prchs") && (
                    <p style={{color: "var(--verde)", margin: "0"}}>Código válido para o setor de compras!</p>
                )} 
                {(codigo === "fnncl") && (
                    <p style={{color: "var(--verde)", margin: "0"}}>Código válido para o setor financeiro!</p>
                )} 
                
                <CustomButton 
                    type="submit" 
                    text="Entrar" 
                    onclick={
                        codigo === "lgstcs" ? () => router.push("/lgstcs") 
                        : codigo === "prchs" || codigo === "fnncl" ? () => router.push("/prchsfnncl")
                        : () => router.push("./")
                        }
                />
        </CustomContainerLog>
    )
}