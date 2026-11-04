import { CustomNavbar } from "@/components/CustomNavbar/CustomNavbar";

interface LayoutHomePurchaseProps {
  children: React.ReactNode;
}

export default function layoutHomePurchase(props: LayoutHomePurchaseProps) {
  return (
    <>
      <CustomNavbar hrefLogo="./prchsfnncl" />
      {props.children}
    </>
  );
}
