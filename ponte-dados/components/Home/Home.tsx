'use client';

import { CustomButton } from "@/components/CustomButton/CustomButton";
import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";
import { CustomCard } from "@/components/CustomCard/CustomCard";
import { CustomContainer, CustomContainerProps } from "@/components/CustomContainer/CustomContainer";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(props: CustomContainerProps) {

    const id = props.id;

    const router = useRouter();
    const segmentoAtivo = useSelectedLayoutSegment();
    const [setorAtual, setSetorAtual] = useState<string>("(purchase)");

    useEffect(() => {
        if (segmentoAtivo === "(purchase)" || segmentoAtivo === "(logistics)") {
            setSetorAtual(segmentoAtivo);
            sessionStorage.setItem("setorAtivo", segmentoAtivo);
        } else {
            const setorSalvo = sessionStorage.getItem("setorAtivo");
            if (setorSalvo) {
                setSetorAtual(setorSalvo);
            }
        }
    }, [segmentoAtivo]);

    const isCompras = setorAtual === "(purchase)";

    return (
        <>
            <CustomContainer id={id}>
                {isCompras && (
                    <CustomButtonIcon text="Novo Produto" src="/icons/plus.svg" name="novo_produto" onclick={() => router.push("/novo-pedido")} />
                )}
                <CustomContainer id="linha">
                    <CustomCard title="Novas compras" info="12 Pedidos" text="Aguardando aprovação" />
                    <CustomCard title="Aguardando recebimento" info="08 Pedidos" text="Para serem recebidos" />
                    <CustomCard title="Recebidos" info="03 Pedidos" text="Entregues" />
                </CustomContainer>
                <CustomButton text="Visualizar status de pedidos" name="status" onclick={() => router.push("/status")}></CustomButton>
            </CustomContainer>
        </>
    )
}