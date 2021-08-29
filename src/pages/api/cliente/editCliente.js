// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  const {
    id,
    nome,
    preco_base,
  } = req.body;
  try {
    const updateCliente = await prisma.cliente.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
        preco_base,
      },
    });
    res.status(200).json(updateCliente);
  } catch (error) {
    res.status(403).json({ err: "Error occurred while updating a cliente item." });
  }
};
