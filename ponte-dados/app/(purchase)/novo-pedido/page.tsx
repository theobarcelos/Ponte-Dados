'use client';

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import styles from "./style.module.css";

interface IProduto {
    nome: string;
    quantidade: number | string;
    modelo: string;
    marca: string;
};

interface INovoPedido {
    nf?: string;
    fornecedor?: string;
    pedido?: string;
    solicitante?: string;
    dataPrevista?: Date;
    produtos: IProduto[];
};

const produtoInicial: IProduto = {
    nome: "",
    quantidade: "",
    modelo: "",
    marca: "",
};


export default function novoPedido() {

    const novoPedidoSchema = Yup.object({
        nf: Yup.string().required("Campo obrigatório!"),
        fornecedor: Yup.string().required("Campo obrigatório!"),
        pedido: Yup.string().required("Campo obrigatório!"),
        solicitante: Yup.string().required("Campo obrigatório!"),
        dataPrevista: Yup.date().required("Campo obrigatório!"),
        produtos: Yup.array().of(
            Yup.object({
                nome: Yup.string().required("Campo obrigatório!"),
                quantidade: Yup.number().required("Campo obrigatório"),
                modelo: Yup.string().required("Campo obrigatório!"),
                marca: Yup.string().required("Campo obrigatório!"),
            })
        ).min(1, "Adicione no mínimo 1 produto!")
    })



    const formik = useFormik<INovoPedido>({
        initialValues: {
            nf: "", 
            fornecedor: "", 
            pedido: "", 
            solicitante: "", 
            dataPrevista: undefined, 
            produtos: [{ ...produtoInicial }]
        },

        validationSchema: novoPedidoSchema,

        onSubmit: () => { }

    })

    const adicionarNovoProduto = () => {
        formik.setFieldValue("produtos", [
            ...formik.values.produtos,
            { ...produtoInicial }
        ])
    }




    return (
        <CustomContainer>
            <h1 style={{ marginTop: "30px" }}>Novo Pedido</h1>
            <p style={{ margin: "0" }}>Informações do pedido, previsão de recebimento e dados dos produtos.</p>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <CustomContainer id="form">
                        <h2>Dados do pedido</h2>
                        <table className={styles.tabela}>
                            <tbody style={{ display: "flex", flexDirection: "column", alignContent: "space-between", width: "100%" }}>
                                <tr className={styles.tr}>
                                    <td>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Nota fiscal"
                                            name="nf"
                                            id="nf_form"
                                            placeholder="Nota Fiscal"
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Fornecedor"
                                            name="fornecedor"
                                            id="fornecedor_form"
                                            placeholder="Fornecedor"
                                        />
                                    </td>
                                </tr>
                                <tr className={styles.tr}>
                                    <td>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Pedido"
                                            name="pedido"
                                            id="pedido_form"
                                            placeholder="Pedido"
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Solicitante"
                                            name="solicitante"
                                            id="solicitante_form"
                                            placeholder="Solicitante"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CustomContainer>
                    <CustomContainer id="form">
                        <h2>Previsão de recebimento</h2>
                        <table className={styles.tabela}>
                            <tbody style={{ display: "flex", flexDirection: "column", alignContent: "space-between", width: "100%" }}>
                                <tr className={styles.tr}>
                                    <td>
                                        <CustomInput
                                            type="date"
                                            change={formik.handleChange}
                                            label="Data Prevista"
                                            name="dataPrev"
                                            id="dataPrev_form"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CustomContainer>
                </form>
            </FormikProvider>
        </CustomContainer>
    );
}