const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { encrypt, decrypt } = require('../config/encryption');

const router = express.Router();
const prisma = new PrismaClient();

router.use(authenticateToken, requireRole('admin', 'founder'));

router.get('/volunteers', async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        availability: true,
        skills: true,
        consentGiven: true,
        consentDate: true,
        status: true,
        screeningStatus: true,
        screeningNotes: true,
        memberType: true,
        memberSince: true,
        notes: true,
        createdAt: true,
        documents: {
          select: { id: true, originalName: true, mimeType: true, fileSize: true, category: true, createdAt: true }
        },
      }
    });

    const decrypted = volunteers.map(v => ({
      ...v,
      fullName: decrypt(v.fullName),
      email: decrypt(v.email),
      phone: decrypt(v.phone),
      screeningNotes: v.screeningNotes ? decrypt(v.screeningNotes) : null,
    }));

    res.json(decrypted);
  } catch (error) {
    console.error('Admin volunteers error:', error);
    res.status(500).json({ error: 'Failed to fetch volunteers' });
  }
});

router.patch('/volunteers/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['PENDING', 'APPROVED', 'INELIGIBLE', 'FLAGGED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: { status, notes: notes || null }
    });

    await prisma.auditLog.create({
      data: {
        action: 'VOLUNTEER_STATUS_UPDATED',
        adminId: req.admin.id,
        details: `Volunteer ${id} status changed to ${status}`,
        ipAddress: req.ip,
      }
    });

    res.json({ message: 'Status updated', id: volunteer.id, status: volunteer.status });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

router.patch('/volunteers/:id/screening', async (req, res) => {
  try {
    const { id } = req.params;
    const { screeningStatus, screeningNotes } = req.body;

    const validScreening = ['ELIGIBLE', 'INELIGIBLE', 'IN_PROGRESS'];
    if (!validScreening.includes(screeningStatus)) {
      return res.status(400).json({ error: 'Invalid screening status' });
    }

    const updateData = { screeningStatus };
    if (screeningStatus === 'INELIGIBLE') {
      updateData.status = 'INELIGIBLE';
      if (screeningNotes) {
        updateData.screeningNotes = encrypt(screeningNotes);
      }
    } else if (screeningStatus === 'ELIGIBLE') {
      updateData.status = 'APPROVED';
      updateData.memberType = 'MEMBER';
      updateData.memberSince = new Date();
    }

    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: updateData
    });

    await prisma.auditLog.create({
      data: {
        action: 'SCREENING_UPDATED',
        adminId: req.admin.id,
        details: `Volunteer ${id} screening status: ${screeningStatus}${screeningNotes ? ' — reason recorded' : ''}`,
        ipAddress: req.ip,
      }
    });

    res.json({ message: 'Screening status updated', id: volunteer.id, screeningStatus: volunteer.screeningStatus, status: volunteer.status, memberType: volunteer.memberType, memberSince: volunteer.memberSince });
  } catch (error) {
    console.error('Screening update error:', error);
    res.status(500).json({ error: 'Failed to update screening status' });
  }
});

router.patch('/volunteers/:id/member-type', async (req, res) => {
  try {
    const { id } = req.params;
    const { memberType } = req.body;

    if (!['VOLUNTEER', 'MEMBER'].includes(memberType)) {
      return res.status(400).json({ error: 'Invalid member type' });
    }

    const updateData = { memberType };
    if (memberType === 'MEMBER') {
      updateData.memberSince = new Date();
    } else {
      updateData.memberSince = null;
    }

    const volunteer = await prisma.volunteer.update({
      where: { id },
      data: updateData
    });

    await prisma.auditLog.create({
      data: {
        action: 'MEMBER_TYPE_UPDATED',
        adminId: req.admin.id,
        details: `Volunteer ${id} member type changed to ${memberType}`,
        ipAddress: req.ip,
      }
    });

    res.json({ message: 'Member type updated', id: volunteer.id, memberType: volunteer.memberType, memberSince: volunteer.memberSince });
  } catch (error) {
    console.error('Member type update error:', error);
    res.status(500).json({ error: 'Failed to update member type' });
  }
});

router.get('/volunteers/export', async (req, res) => {
  try {
    const volunteers = await prisma.volunteer.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        availability: true,
        skills: true,
        status: true,
        screeningStatus: true,
        screeningNotes: true,
        memberType: true,
        memberSince: true,
        consentGiven: true,
        consentDate: true,
        createdAt: true,
        documents: {
          select: { id: true, originalName: true, mimeType: true, fileSize: true, category: true, createdAt: true }
        },
      }
    });

    const decrypted = volunteers.map(v => ({
      ...v,
      fullName: decrypt(v.fullName),
      email: decrypt(v.email),
      phone: decrypt(v.phone),
      screeningNotes: v.screeningNotes ? decrypt(v.screeningNotes) : null,
    }));

    res.json(decrypted);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

router.get('/tips', async (req, res) => {
  try {
    const tips = await prisma.anonymousTip.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(tips);
  } catch (error) {
    console.error('Tips fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

router.get('/contact-submissions', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(submissions);
  } catch (error) {
    console.error('Contact fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(logs);
  } catch (error) {
    console.error('Audit log error:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const volunteerCount = await prisma.volunteer.count();
    const pendingCount = await prisma.volunteer.count({ where: { status: 'PENDING' } });
    const approvedCount = await prisma.volunteer.count({ where: { status: 'APPROVED' } });
    const memberCount = await prisma.volunteer.count({ where: { memberType: 'MEMBER' } });
    const tipCount = await prisma.anonymousTip.count();
    const contactCount = await prisma.contactSubmission.count();
    const recentVolunteers = await prisma.volunteer.count({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }
    });

    res.json({
      totalVolunteers: volunteerCount,
      pendingApplications: pendingCount,
      approvedVolunteers: approvedCount,
      totalMembers: memberCount,
      totalTips: tipCount,
      totalContacts: contactCount,
      recentVolunteers,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
