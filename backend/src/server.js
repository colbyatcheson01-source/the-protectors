const dotenv = require('dotenv');
const path = require('path');
const envResult = dotenv.config({ path: path.join(__dirname, '../.env') });
if (envResult.parsed && envResult.parsed.DATABASE_URL) {
  process.env.DATABASE_URL = envResult.parsed.DATABASE_URL;
}
if (envResult.parsed && envResult.parsed.ENCRYPTION_KEY) {
  process.env.ENCRYPTION_KEY = envResult.parsed.ENCRYPTION_KEY;
}
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');

const authRoutes = require('./routes/auth');
const volunteerRoutes = require('./routes/volunteer');
const contactRoutes = require('./routes/contact');
const tipRoutes = require('./routes/tips');
const adminRoutes = require('./routes/admin');
const documentRoutes = require('./routes/documents');

const prisma = new PrismaClient();
const app = express();

app.set('trust proxy', true);
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
// Documents served only through authenticated /api/documents/:id route

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', globalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/tips', tipRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
