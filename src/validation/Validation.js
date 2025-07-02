// Format South African phone number for display
export const formatSouthAfricanPhone = phoneNumber => {
  const cleaned = (phoneNumber || '').replace(/\D/g, '');

  // Format based on length
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6)
    return `${cleaned.substring(0, 3)} ${cleaned.substring(3)}`;
  return `${cleaned.substring(0, 3)} ${cleaned.substring(
    3,
    6,
  )} ${cleaned.substring(6, 10)}`;
};

// Validate South African mobile number
export const validateSouthAfricanMobile = phoneNumber => {
  const cleaned = (phoneNumber || '').replace(/\D/g, '');

  // Must be exactly 9 digits
  if (cleaned.length !== 9) {
    return false;
  }

  // Only first digit should be 6, 7, or 8
  const firstDigit = cleaned.charAt(0);
  return ['6', '7', '8'].includes(firstDigit);
};

// Get validation error message
export const getSouthAfricanValidationError = phoneNumber => {
  const cleaned = (phoneNumber || '').replace(/\D/g, '');

  if (!cleaned) return 'Phone number is required';

  if (cleaned.length < 9) {
    return 'Phone number is too short';
  }

  if (cleaned.length > 9) {
    return 'Phone number is too long';
  }

  if (cleaned.length === 9) {
    const firstDigit = cleaned.charAt(0);
    if (!['6', '7', '8'].includes(firstDigit)) {
      return `Invalid phone number`;
    }
  }

  return '';
};
