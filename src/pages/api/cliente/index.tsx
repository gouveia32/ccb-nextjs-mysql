import prisma from "prisma"

// PUT /api/cliente/:id
export default async function handle(req, res) {
  const clienteId = req.query.id;
  const cliente = await prisma.cliente.update({
    where: { id: Number(clienteId) },
    data: { 
      nome: req.query.nome,
      telefone1: req.query.telefone1,
     },
  });
  res.json(cliente);
}