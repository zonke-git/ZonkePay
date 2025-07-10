import * as Yup from 'yup';
import {i18n} from '../../localization';

export const phoneValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(06|07|08)\d{8}$/,
      'Please enter a valid South African mobile number (e.g., 06XXXXXXXX).',
    )
    .required(i18n.t('PhoneNumberIsRequired')),
});

export const customerDetailsValidationSchema = Yup.object().shape({
  saId: Yup.string()
    .required(i18n.t('SettlementAccountIdIsRequired'))
    .matches(/^\d{13}$/, i18n.t('SettlementAccountID_MustBeExactly13Digits')),

  type: Yup.string().required(i18n.t('TypeIsRequired')),
});

export const onboardValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(i18n.t('FirstNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  lastName: Yup.string()
    .required(i18n.t('LastNameIsRequired'))
    .matches(
      /^[A-Za-z][A-Za-z\s]*$/,
      i18n.t('NameMustStartWithALetterAndContainOnlyAlphabetsAndSpaces'),
    )
    .min(2, i18n.t('NameMustBeAtLeastTwoCharacters'))
    .max(50, i18n.t('NameMustBeLessThanFiftyCharacters')),

  nickname: Yup.string()
    .nullable()
    .matches(/^[A-Za-z\s]*$/, i18n.t('NicknameCanOnlyContainLettersAndSpaces'))
    .max(30, i18n.t('NicknameMustBeLessThanThirtyCharacters')),

  // CIPCRegistrationNumber: Yup.string()
  //   .nullable()
  //   .notRequired()
  //   .test(
  //     'is-valid-cipc-format',
  //     'Invalid CIPC Registration Number',
  //     function (value) {
  //       if (!value || value.trim() === '') return true; // ✅ Skip validation if empty

  //       const regexFull =
  //         /^\d{4}\/\d{6,7}\/(06|07|08|09|10|12|21|22|23|24|25|26|30|31)$/;

  //       if (!/^\d{4}\/\d{6,7}\/\d{2}$/.test(value)) {
  //         return this.createError({
  //           message: 'Expected format: XXXX/XXXXXX/XX',
  //         });
  //       }

  //       if (!regexFull.test(value)) {
  //         return this.createError({
  //           message: 'Invalid CIPC Registration Number',
  //         });
  //       }

  //       return true;
  //     },
  //   ),

  email: Yup.string()
    .required(i18n.t('EmailIsRequired'))
    .email(i18n.t('InvalidEmailAddress')),

  location: Yup.string().required(i18n.t('LocationIsRequired')),

  referralCode: Yup.string()
    .nullable()
    .max(20, i18n.t('ReferralCodeMustBeLessThanTwentyCharacters')),

  termsAndConditions_PrivacyPolicyCheckBox: Yup.boolean().oneOf(
    [true],
    i18n.t('YouMustAcceptTheTermsAndConditions'),
  ),
});
