import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo não Permitido' });
  }

  const clienteData = JSON.parse(req.body);

  const savedCliente = await prisma.cliente.create({
    data: clienteData,
  });

  res.json(savedCliente);
};