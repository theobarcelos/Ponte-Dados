'use client';
import { CustomNavbar } from "@/src/components/CustomNavbar/CustomNavbar";
import { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function layoutHome(props: LayoutHomeProps) {

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
      <CustomNavbar
        hrefLogo={isCompras ? "/prchs" : "/lgstcsfnncl"}
        mostrarNovoPedido={isCompras} />
        {props.children}
    </>
  );
}
