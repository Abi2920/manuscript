import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, category } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const contact = await prisma.contact.create({
      data: { name, email, phone, message, category, fileUrl },
    });

    res.status(201).json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.contact.count(),
    ]);

    res.json({ contacts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
