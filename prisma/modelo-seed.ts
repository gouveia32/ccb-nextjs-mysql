const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const cli1 = await prisma.cliente.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            nome: "TELMA",
            contato_funcao: "",
            contato_nome: " ",
            cgc_cpf: "",
            Razao_social: null,
            inscr_estadual: "",
            endereco: "RUA SÃO CRISTÓVÃO,4399(VIZ. EDF.FUTURO)",
            cidade: "Aracaju",
            uf: "SE",
            cep: "",
            telefone1: "3214-4962",
            telefone2: "9981-6365",
            telefone3: "",
            email: "",
            obs: "",
            estado: 1,
        },
    },
    )

    const cli2 = await prisma.cliente.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            email: 'financeiro@algomaisse.com.br',
            nome: 'Algo Mais Confecções',
            endereco: 'Rua Engenheiro Marcondes Ferraz, 33 ( ao lado da Energisa)',
            telefone1: '3217-1726',
            telefone2: '',
            cidade: 'Aracaju',
        },
    },
    )
    
    //console.log("FIM:", { cli1,cli2 })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })