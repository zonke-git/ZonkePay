// validation.js

/**
 * Validates a South African mobile number
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const validateSouthAfricanMobile = phoneNumber => {
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  return (
    cleaned.length === 10 && // Must be exactly 10 digits
    cleaned.startsWith('0') && // Must start with 0
    ['6', '7', '8'].includes(cleaned.charAt(1)) // Second digit must be 6,7, or 8
  );
};

/**
 * Formats a South African phone number as "0XX XXX XXXX"
 * @param {string} text - The input text to format
 * @returns {string} - Formatted phone number
 */
export const formatSouthAfricanPhone = text => {
  const cleaned = text.replace(/\D/g, '').slice(0, 10); // Remove non-digits and limit to 10 chars

  let formatted = cleaned;
  if (cleaned.length > 3) {
    formatted = `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }
  if (cleaned.length > 6) {
    formatted = `${formatted.slice(0, 7)} ${formatted.slice(7)}`;
  }
  return formatted;
};

/**
 * Converts a local SA number to international format
 * @param {string} phoneNumber - The local phone number (0XX XXX XXXX)
 * @returns {string} - International format (+27XX XXX XXXX)
 */
export const convertToInternationalFormat = phoneNumber => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    return `+27${cleaned.slice(1)}`;
  }
  return phoneNumber;
};
