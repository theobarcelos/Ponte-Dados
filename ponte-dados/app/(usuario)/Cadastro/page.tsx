"use client";

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";

export default function Cadastro(){  
    
    return(
        <CustomContainer>
            <img src="/img/logo-without-bg.png" style={{width: "500px"}} alt="" />
                <CustomInput
                    label="Código de acesso"
                    type="text"
                    id="cod-acesso"
                    name="cod-acesso"
                    placeholder="Cód. de acesso"
                >
                </CustomInput>
        </CustomContainer>
    )
}