'use client';

import { CustomButton } from "@/components/CustomButton/CustomButton";
import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";
import { CustomCard } from "@/components/CustomCard/CustomCard";
import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { useRouter } from "next/navigation";

export default function purchaseFinancial() {

    const router = useRouter();

    return (
        <>
            <CustomContainer id="inicio">
                <CustomButtonIcon text="Novo Produto" src="/icons/plus.svg" name="novo_produto" onclick={() => router.push("/novo-pedido")} />
                <CustomContainer id="linha">
                    <CustomCard title="Novas compras" info="12 Pedidos" text="Aguardando aprovação"/>
                    <CustomCard title="Em trânsito" info="08 Pedidos" text="Enviados"/>
                    <CustomCard title="Recebidos" info="03 Pedidos" text="Entregues"/>
                </CustomContainer>
                <CustomButton text="Visualizar status de pedidos" name="status"></CustomButton>
            </CustomContainer>
        </>
    )
}