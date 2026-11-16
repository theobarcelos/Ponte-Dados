export interface IProduto {
    descricao: string;
    quantidade: number | string;
};

export interface IPedido {
    _id?: string;
    nf?: string;
    fornecedor?: string;
    pedido?: string;
    solicitante?: string;
    dataPrevista?: string;
    status: "Em atraso" | "Aguardando recebimento" | "Recebido";
    aceitarRejeitar: "Aceito" | "Rejeitado" | null;
    produtos: IProduto[];
};