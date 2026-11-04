'use client';

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { Formik } from "formik";

export default function novoPedido() {



    return (
        <CustomContainer title="Novo pedido">
            <p>Informações do pedido, previsão de recebimento e dados dos produtos.</p>
            <CustomContainer id="form">
                <h2>Dados do pedido</h2>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width: "100%"}}>
                                <CustomInput type="text" label="Nota Fiscal" id="nf" name="nf_form" placeholder="Nota Fiscal" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CustomContainer>
        </CustomContainer>
    );
}