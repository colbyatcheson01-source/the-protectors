const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const volunteerValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required')
    .isLength({ max: 200 }).withMessage('Name too long'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Valid date of birth is required'),
  body('addressStreet').trim().notEmpty().withMessage('Street address is required'),
  body('addressCity').trim().notEmpty().withMessage('City is required'),
  body('addressProvince').trim().notEmpty().withMessage('Province is required'),
  body('addressPostalCode').trim().notEmpty().withMessage('Postal code is required')
    .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/).withMessage('Valid Canadian postal code is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('availability').trim().notEmpty().withMessage('Availability is required'),
  body('skills').trim().notEmpty().withMessage('Skills/experience is required'),
  body('consentGiven').customSanitizer(value => {
    if (typeof value === 'string') return value === 'true' || value === '1';
    return Boolean(value);
  }).isBoolean().custom(value => {
    if (value !== true) {
      throw new Error('You must consent to background screening');
    }
    return true;
  }),
  handleValidationErrors,
];

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().isLength({ max: 2000 }).withMessage('Message is required (max 2000 chars)'),
  handleValidationErrors,
];

const tipValidation = [
  body('content').trim().notEmpty().isLength({ max: 5000 }).withMessage('Tip content is required (max 5000 chars)'),
  handleValidationErrors,
];

module.exports = { volunteerValidation, contactValidation, tipValidation };
