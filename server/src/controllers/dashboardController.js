import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboard = async (req, res) => {
  try {
    const [
      totalContacts,
      totalUsers,
      totalMessages,
      totalUploads,
      recentContacts,
      contactsByCategory,
    ] = await Promise.all([
      prisma.contact.count(),
      prisma.user.count(),
      prisma.message.count(),
      prisma.upload.count(),
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.contact.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ]);

    res.json({
      stats: {
        totalContacts,
        totalUsers,
        totalMessages,
        totalUploads,
      },
      recentContacts,
      contactsByCategory: contactsByCategory.map((c) => ({
        category: c.category,
        count: c._count.category,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
