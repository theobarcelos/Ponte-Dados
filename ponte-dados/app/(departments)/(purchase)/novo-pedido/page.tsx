'use client';

import { CustomContainer } from "@/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/components/CustomInput/CustomInput";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import styles from "./style.module.css";
import { CustomButtonIcon } from "@/components/CustomButtonIcon/CustomButtonIcon";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface IProduto {
    descricao: string;
    quantidade: number | string;
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
    descricao: "",
    quantidade: ""
};


export default function novoPedido() {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const novoPedidoSchema = Yup.object({
        nf: Yup.string().required("Campo obrigatório!"),
        fornecedor: Yup.string().required("Campo obrigatório!"),
        pedido: Yup.string().required("Campo obrigatório!"),
        solicitante: Yup.string().required("Campo obrigatório!"),
        dataPrevista: Yup.date().required("Campo obrigatório!"),
        produtos: Yup.array().of(
            Yup.object({
                descricao: Yup.string().required("Campo obrigatório!"),
                quantidade: Yup.number().required("Campo obrigatório")
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

    const removerProduto = () => {
        if (formik.values.produtos.length > 1) {
            formik.setFieldValue(
                "produtos",
                formik.values.produtos.slice(0, -1)
            )
        }
    }

    const importarCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const conteudo = e.target?.result as string;
            if (!conteudo) return;

            const linhas = conteudo
                .split(/\r?\n/)
                .map((linha) => linha.trim())
                .filter((linha) => linha.length > 0);

            if (linhas.length === 0) return;

            const primeiraLinha = linhas[0].toLowerCase();
            const possuiCabecalho =
                primeiraLinha.includes("descricao") ||
                primeiraLinha.includes("quantidade") || 
                primeiraLinha.includes("");

            const linhasDados = possuiCabecalho ? linhas.slice(1) : linhas;

            const produtosImportados: IProduto[] = linhasDados.map((linha) => {
                const [descricao = "", quantidade = ""] = linha
                    .split(/[;,]/)
                    .map((item) => item.trim());

                return {
                    descricao,
                    quantidade: quantidade !== "" ? Number(quantidade) : "",
                };
            });

            if (produtosImportados.length > 0) {
                const primeiroProdutoVazio =
                    formik.values.produtos.length === 1 &&
                    !formik.values.produtos[0].descricao &&
                    !formik.values.produtos[0].quantidade

                const novaListaProdutos = primeiroProdutoVazio ? produtosImportados : [...formik.values.produtos, ...produtosImportados];

                formik.setFieldValue("produtos", novaListaProdutos);
            }

            event.target.value = "";
        };

        reader.readAsText(file, "UTF-8");
    };

    return (
        <CustomContainer>
            <h1 style={{ marginTop: "30px" }}>Novo Pedido</h1>
            <p style={{ margin: "0" }}>Informações do pedido, previsão de recebimento e dados dos produtos.</p>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <CustomContainer id="form">
                        <h2>Dados do pedido</h2>
                        <table className={styles.tabela}>
                            <tbody>
                                <tr className={styles.tr}>
                                    <td className={styles.td}>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Nota fiscal"
                                            name="nf"
                                            id="nf_form"
                                            placeholder="Nota Fiscal"
                                        />
                                    </td>
                                    <td className={styles.td}>
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
                                    <td className={styles.td}>
                                        <CustomInput
                                            type="text"
                                            change={formik.handleChange}
                                            label="Pedido"
                                            name="pedido"
                                            id="pedido_form"
                                            placeholder="Pedido"
                                        />
                                    </td>
                                    <td className={styles.td}>
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
                            <tbody>
                                <tr className={styles.tr}>
                                    <td className={styles.td}>
                                        <CustomInput
                                            type="date"
                                            change={formik.handleChange}
                                            label="Data Prevista"
                                            name="dataPrevista"
                                            id="dataPrev_form"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CustomContainer>
                    <CustomContainer id="form">
                        <h2>Dados do(s) Produto(s)</h2>
                        {formik.values.produtos.map((produto, index) => (
                            <div key={index} style={{ width: "100%", marginBottom: "16px" }}>
                                <h3>Produto {index + 1}</h3>
                                <table className={styles.tabela}>
                                    <tbody>
                                        <tr className={styles.tr}>
                                            <td className={styles.td}>
                                                <CustomInput
                                                    type="text"
                                                    change={formik.handleChange}
                                                    label="Descrição"
                                                    name={`produtos[${index}].descricao`}
                                                    id={`descricao_produto_${index}_form`}
                                                    placeholder="Descrição"
                                                    value={produto.descricao}
                                                />
                                            </td>
                                            <td className={styles.td}>
                                                <CustomInput
                                                    type="number"
                                                    change={formik.handleChange}
                                                    label="Quantidade"
                                                    name={`produtos[${index}].quantidade`}
                                                    id={`quantidade_produto_${index}_form`}
                                                    placeholder="Quantidade"
                                                    value={produto.quantidade}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className={styles.btn_container}>
                                    <CustomButtonIcon
                                        src="/icons/delete.svg"
                                        name="delete_form"
                                        text={`Remover`}
                                        type="button"
                                        onclick={removerProduto} />
                                </div>
                            </div>
                        ))}
                    </CustomContainer>
                    <CustomContainer id="linha">
                        <CustomButtonIcon
                            text="Adicionar novo produto"
                            src="/icons/add.svg"
                            type="button"
                            onclick={adicionarNovoProduto}
                            name="add_produto_form" />
                        <CustomButtonIcon
                            text="Cadastrar pedido"
                            src="/icons/save.svg"
                            type="button"
                            name="cadastrar_pedido_form" />
                        <CustomButtonIcon
                            text="Importar arquivo .CSV"
                            src="/icons/csv.svg"
                            type="button"
                            name="import_csv_form"
                            onclick={() => fileInputRef.current?.click()} />
                        <input 
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={importarCSV}
                            style={{display: "none"}} />
                        <CustomButtonIcon
                            text="Cancelar"
                            type="button"
                            src="/icons/cancel.svg"
                            onclick={() => router.push("./prchsfnncl")}
                            name="cancelar_form" />
                    </CustomContainer>
                </form>
            </FormikProvider>
        </CustomContainer>
    );
}