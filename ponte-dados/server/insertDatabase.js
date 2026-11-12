use("PONTE-DADOS");

db.createCollection("pedidos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",

            required: [
                "nf",
                "fornecedor",
                "pedido",
                "solicitante",
                "dataPrevista",
                "status",
                "produtos"
            ],
            additionalProperties: false,
            properties: {

                nf: {
                    bsonType: "string",
                    description: "Nota fiscal do Pedido"
                },

                fornecedor: {
                    bsonType: "string",
                    description: "Fornecedor do pedido"
                },

                pedido: {
                    bsonType: "string",
                    description: "Código interno do pedido"
                },

                solicitante: {
                    bsonType: "string",
                    description: "Solicitante interno do pedido",
                },

                dataPrevista: {
                    bsonType: "date",
                    description: "Data de previsão de entrega do pedido"
                },

                status: {
                    bsonType: "string",
                    description: "Estado de envio do pedido",
                    enum: [
                        "Aguardando recebimento",
                        "Recebido",
                        "Em atraso"
                    ],
                },

                aceitarRejeitar: {
                    bsonType: ["string", "null"],
                    description: "Estado de pedido aceito ou rejeitado",
                    enum: [
                        "Aceito",
                        "Rejeitado",
                        null
                    ],
                },

                produtos: {
                    bsonType: "array",
                    minItems: 1,
                    additionalProperties: false,
                    items: {
                        bsonType: "object",
                        required: [
                            "descricao",
                            "quantidade"
                        ],
                        properties: {
                            descricao: {
                                bsonType: "string",
                                description: "Descricão do produto",
                                minLength: 1
                            },
                            quantidade: {
                                bsonType: "number",
                                description: "Quantidade do produto",
                                minimum: 0
                            }
                        }
                    },
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
})