"use client";

import { CustomInput } from "@/components/CustomInput/CustomInput";

export default function Cadastro(){  
    
    return(
        <>
        <img src="/img/logo.jpeg" style={{width: "500px"}} alt="" />
            <CustomInput 
                label="Código de acesso" 
                type="text" 
                id="cod-acesso"
                name="cod-acesso" 
                placeholder="Cód. de acesso" 
            >
            </CustomInput>
        </>
    )
}