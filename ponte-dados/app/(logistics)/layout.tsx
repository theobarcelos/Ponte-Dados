import { CustomNavbar } from "@/components/CustomNavbar/CustomNavbar";

interface LayoutHomeLogisticsProps {
  children: React.ReactNode;
}

export default function layoutHomeLogistics(props: LayoutHomeLogisticsProps) {
  return (
    <>
      <CustomNavbar hrefLogo="./lgstcs" />
      {props.children}
    </>
  );
}
