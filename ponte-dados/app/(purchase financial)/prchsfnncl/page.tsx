'use client';

import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";
import { CustomCard } from "@/components/CustomCard/CustomCard";
import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomNavbar } from "@/components/CustomNavbar/CustomNavbar";

import { useRouter } from "next/navigation";

export default function purchaseFinancial() {

    const router = useRouter();

    return (
        <>
            <CustomNavbar hrefLogo="./prchsfnncl" />
            <CustomContainer id="coluna">
                <CustomButtonIcon text="Novo Produto" src="/icons/plus.svg" />
                <CustomContainer id="linha">
                    <CustomCard />
                    <CustomCard />
                    <CustomCard />
                </CustomContainer>
            </CustomContainer>
        </>
    )
}