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

  email: Yup.string()
    .required(i18n.t('EmailIsRequired'))
    .email(i18n.t('InvalidEmailAddress')),

  location: Yup.string().required(i18n.t('LocationIsRequired')),

  // termsAndConditions_PrivacyPolicyCheckBox: Yup.boolean().oneOf(
  //   [true],
  //   i18n.t('YouMustAcceptTheTermsAndConditions'),
  // ),
});
