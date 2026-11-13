'use client';

import { CustomContainer } from "@/src/components/CustomContainer/CustomContainer";
import { CustomInput } from "@/src/components/CustomInput/CustomInput";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import styles from "./style.module.css";
import { CustomButtonIcon } from "@/src/components/CustomButtonIcon/CustomButtonIcon";
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
    dataPrevista?: string;
    status: "Em atraso" | "Aguardando recebimento" | "Recebido";
    aceitarRejeitar: "Aceito" | "Rejeitado" | null;
    produtos: IProduto[];
};

const produtoInicial: IProduto = {
    descricao: "",
    quantidade: ""
};

const url = 'http://localhost:3010';


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
            dataPrevista: "",
            status: "Aguardando recebimento",
            aceitarRejeitar: null,
            produtos: [{ ...produtoInicial }]
        },

        validationSchema: novoPedidoSchema,

        onSubmit: async (values) => { 
            try {
                const response = await fetch(`${url}/insertNovoPedido`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...values,
                        status: "Aguardando recebimento",
                        aceitarRejeitar: null
                    })
                });

                if(!response.ok) {
                    const erro = await response.json();
                    throw new Error(erro.detalhes || "Erro ao salvar pedido!");
                }

                alert("Pedido cadastrado com sucesso!");
                router.push("/status");
            } catch (e) {
                console.error(e);
                alert("Erro ao cadastrar pedido");
            }
        }

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
            const buffer = e.target?.result as ArrayBuffer;
            if (!buffer) return;

            // Decodifica em UTF-8 ou faz fallback para Windows-1252 caso salvo em ANSI pelo Excel/SAP
            let conteudo = "";
            try {
                conteudo = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
            } catch {
                conteudo = new TextDecoder("windows-1252").decode(buffer);
            }

            const linhas = conteudo
                .replace(/^\uFEFF/, "") // Remove o BOM do início do arquivo gerado pelo SAP
                .split(/\r?\n/)
                .map((linha) => linha.trim())
                .filter((linha) => linha.length > 0);

            if (linhas.length === 0) return;

            // Usa ';' como separador padrão do SAP (evitando quebrar números decimais com vírgula)
            const separador = linhas[0].includes(";") ? ";" : ",";

            const cabecalhoCols = linhas[0]
                .toLowerCase()
                .split(separador)
                .map((col) => col.trim());

            const idxTextoBreve = cabecalhoCols.findIndex(
                (col) => col.includes("texto breve") || col.includes("descri")
            );
            const idxQuantidade = cabecalhoCols.findIndex(
                (col) =>
                    col.includes("qtd.do pedido") ||
                    col.includes("qtd. do pedido") ||
                    col === "quantidade"
            );

            const possuiCabecalho =
                idxTextoBreve !== -1 || idxQuantidade !== -1;

            // Índices das colunas no relatório padrão do SAP (5, 7 e 14) caso não haja cabeçalho customizado
            const colTexto = idxTextoBreve !== -1 ? idxTextoBreve : 7;
            const colQtd = idxQuantidade !== -1 ? idxQuantidade : 14;

            const linhasDados = possuiCabecalho ? linhas.slice(1) : linhas;

            let dataDocumentoExtraida = "";

            const produtosImportados: IProduto[] = linhasDados
                .map((linha) => {
                    const colunas = linha.split(separador).map((item) => item.trim());

                    const descricao = colunas[colTexto] ?? "";
                    const qtdBruta = colunas[colQtd] ?? "";

                    // Trata números no formato brasileiro (remove ponto de milhar e troca vírgula decimal por ponto)
                    const qtdLimpa = qtdBruta.replace(/\./g, "").replace(",", ".");
                    const quantidade =
                        qtdLimpa !== "" && !isNaN(Number(qtdLimpa)) ? Number(qtdLimpa) : "";

                    return {
                        descricao,
                        quantidade
                    };
                })
                // Ignora as linhas de cabeçalho/subtotal do SAP onde Texto breve e Qtd.do pedido estão vazios
                .filter((item) => item.descricao !== "" && item.quantidade !== "");

            if (produtosImportados.length > 0) {
                const primeiroProdutoVazio =
                    formik.values.produtos.length === 1 &&
                    !formik.values.produtos[0].descricao &&
                    !formik.values.produtos[0].quantidade;

                const novaListaProdutos = primeiroProdutoVazio
                    ? produtosImportados
                    : [...formik.values.produtos, ...produtosImportados];

                formik.setFieldValue("produtos", novaListaProdutos);
            }

            event.target.value = "";
        };

        reader.readAsArrayBuffer(file);
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
                                            value={formik.values.dataPrevista}
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
                            name="cadastrar_pedido_form"
                            onclick={formik.handleSubmit} />
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
                            style={{ display: "none" }} />
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