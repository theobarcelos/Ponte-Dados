'use client';

import { CustomButton } from "@/src/components/CustomButton/CustomButton";
import { CustomButtonIcon } from "@/src/components/CustomButtonIcon/CustomButtonIcon";
import { CustomCard } from "@/src/components/CustomCard/CustomCard";
import { CustomContainer, CustomContainerProps } from "@/src/components/CustomContainer/CustomContainer";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home(props: CustomContainerProps) {

    const id = props.id;

    const router = useRouter();
    const segmentoAtivo = useSelectedLayoutSegment();
    const [setorAtual, setSetorAtual] = useState<string>("(purchase)");
    const [aguardo, setAguardo] = useState('');
    const [atrasado, setAtrasado] = useState('');;
    const [recebido, setRecebido] = useState('');;
    

    useEffect(() => {
        try{
            fetch("/api/contarPedidos")
            .then((res) => res.json())
            .then((data) => {
                setAguardo(data.aguardandoRecebimento);
                setAtrasado(data.emAtraso);
                setRecebido(data.recebidos)
            });
        } catch (e) {
            console.error("Erro: " + e);
        }

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
                    <CustomCard title="Em atraso" info={`${atrasado} pedidos`} text="Atrasados" />
                    <CustomCard title="Aguardando" info={`${aguardo} pedidos`}  text="Para serem recebidos" />
                    <CustomCard title="Recebidos" info={`${recebido} pedidos`}  text="Entregues" />
                </CustomContainer>
                <CustomButton text="Visualizar status de pedidos" name="status" onclick={() => router.push("/status")}></CustomButton>
            </CustomContainer>
        </>
    )
}