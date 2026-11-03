'use client';

import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";
import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomNavbar } from "@/components/CustomNavbar/CustomNavbar";

import { useRouter } from "next/navigation";

export default function purchaseFinancial() {

    const router = useRouter();

    return (
        <>
            <CustomNavbar hrefLogo="./prchsfnncl" />
            <CustomContainer>
                <CustomButtonIcon text="Novo Produto" src="/icons/plus.svg" />
            </CustomContainer>
        </>
    )
}