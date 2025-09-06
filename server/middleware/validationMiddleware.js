const { body } = require("express-validator");

// Validation rules for voter registration
const validateVoterRegistration = [
  // Full name - only letters and spaces
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Full name must contain only letters and spaces")
    .isLength({ min: 2, max: 50 })
    .withMessage("Full name must be between 2 and 50 characters"),

  // Email validation with specific domains
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid")
    .normalizeEmail()
    .custom((value) => {
      const emailRegex =
        /^[^\s@]+@((gmail\.com|yahoo\.com|outlook\.com)|[^\s@]+\.(com|net|org|edu|gov))$/i;
      if (!emailRegex.test(value)) {
        throw new Error(
          "Email is not valid. Allowed: Gmail, Yahoo, Outlook, or domains ending with .com, .net, .org, .edu, .gov"
        );
      }
      return true;
    }),

  // Password validation
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
    .withMessage("Password must contain both letters and numbers"),

  // Confirm password
  body("password2")
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

// Validation rules for voter login
const validateVoterLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = {
  validateVoterRegistration,
  validateVoterLogin,
};
