const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { tipValidation } = require('../utils/validation');
const { formLimiter } = require('../middleware/rateLimiter');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', formLimiter, tipValidation, async (req, res) => {
  try {
    const { content, category } = req.body;

    const safeCategory = typeof category === 'string' ? category.trim().slice(0, 100) : null;

    await prisma.anonymousTip.create({
      data: {
        content,
        category: safeCategory,
      }
    });

    res.status(201).json({
      message: 'Your anonymous tip has been received and will be reviewed privately.'
    });
  } catch (error) {
    console.error('Tip submission error:', error);
    res.status(500).json({ error: 'Failed to submit tip. Please try again.' });
  }
});

module.exports = router;
