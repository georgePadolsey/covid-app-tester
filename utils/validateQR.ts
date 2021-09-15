import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const NAME_REGEX =
  /^(?:[^\S\r\n]*?Name:[^\S\r\n]*?)(?<name>\b.+\b)(?:[^\S\r\n]*?)$/im;
const USERNAME_REGEX =
  /^(?:[^\S\r\n]*?Username:[^\S\r\n]*?)(?<username>\b.+\b)(?:[^\S\r\n]*?)$/im;
const TEST_REF_REGEX =
  /^(?:[^\S\r\n]*?Test ref\.[^\S\r\n]*?)(?<ref>\b[0-9]+\b)(?:[^\S\r\n]*?)$/im;
const DATE_REGEX =
  /^(?:[^\S\r\n]*?)(?<date>\b.+\b|)(?:[^\S\r\n]*?\:[^\S\r\n]*?)(?<result>POSITIVE|NEGATIVE)(?:[^\S\r\n]*?)$/im;

// dayJs date format https://day.js.org/docs/en/parse/string-format
const DATE_FORMAT = "DD MMM YYYY";

// Implement magic invalid reason strings as an enum
// This could be generalised later into i18n

export enum INVALID_QR_SCAN_REASONS {
  NAME_IS_UNDEFINED = "The name is undefined / null. Are you sure this is from an LFT email?",
  USERNAME_IS_UNDEFINED = "The username is undefined / null. Are you sure this is from an LFT email?",
  INVALID_TEST_RESULT = "Invalid Test result. Are you sure this is from an LFT email?",
  DATE_IS_UNDEFINED = "Date is undefined / null. Are you sure this is from an LFT email?",
  DATE_IS_INVALID = "Date is invalid. Are you sure this is from an LFT email?",
  TEST_REF_NAN = "Test reference is Not a Number. Are you sure this is from an LFT Email?",
  TEST_DATE_IN_FUTURE = "The test date is in the future... This shouldn't be possible?",
  TEST_DATE_IN_PAST = "The test date is more than 48 hours ago. Please present a more recent test",
  TEST_RESULT_POSITIVE = "Test result is positive.",
}

export interface QRScanMetadata {
  name: string;
  username: string;
  testRef: number;
}

interface BaseQRResponse {
  isValid: boolean;
}

interface ValidQRResponse extends BaseQRResponse {
  isValid: true;
  scanMetadata: QRScanMetadata;
  invalidReasons?: never;
}

interface InvalidQRResponse extends BaseQRResponse {
  isValid: false;
  scanMetadata?: never;
  invalidReasons: INVALID_QR_SCAN_REASONS[];
}

export type ValidateQRResponse = Readonly<ValidQRResponse | InvalidQRResponse>;

/**
 * Takes a QR code and validates it, it will return either valid or invalid. If invalid
 * it will return a string array of reasons why the the qr code is invalid.
 *
 * @param qrData takes QR data of the form:
 * Name: Joe Bloggs
 * Username: ABCD23
 * 01 Jun 2021: NEGATIVE
 * Test ref. 82424
 * @returns [isValid, listOfReasonsWhyNotValid, validResults]
 */
const validateQR = (qrData: string): ValidateQRResponse => {
  let name = qrData.match(NAME_REGEX)?.groups?.name;
  let username = qrData.match(USERNAME_REGEX)?.groups?.username;
  let testRef = Number(qrData.match(TEST_REF_REGEX)?.groups?.ref);

  let dateRegexResult = qrData.match(DATE_REGEX);

  let date = dateRegexResult?.groups?.date;
  let result = dateRegexResult?.groups?.result;

  let invalidReasons: INVALID_QR_SCAN_REASONS[] = [];

  if (name == null || name.trim() === "") {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.NAME_IS_UNDEFINED);
  }

  if (username == null || username.trim() === "") {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED);
  }

  if (date == null || date.trim() === "") {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED);
  }

  if (result == null || result.trim() === "") {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.INVALID_TEST_RESULT);
  }

  // isNaN here because we cast with Number, Number(undefined) = NaN
  if (isNaN(testRef)) {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.TEST_REF_NAN);
  }

  // if one of the above is invalid
  // return now, skip any further processing
  if (invalidReasons.length !== 0) {
    return { isValid: false, invalidReasons };
  }

  if (!dayjs(date, DATE_FORMAT).isValid()) {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.DATE_IS_INVALID);
  } else {
    // date cannot be undefined here, as it must return
    const diffToCurrent = dayjs.duration(dayjs().diff(date!));

    // check if date > 48 hours ago, we allow +- 24 hours
    // this is because we only get the date (not time)
    // from the test qr result
    if (diffToCurrent.asHours() > 48 + 24) {
      invalidReasons.push(INVALID_QR_SCAN_REASONS.TEST_DATE_IN_PAST);
    }

    if (diffToCurrent.asHours() < 0) {
      invalidReasons.push(INVALID_QR_SCAN_REASONS.TEST_DATE_IN_FUTURE);
    }
  }

  // check whether is test result is not positive
  // result is not null (as we return earlier if case)
  if (result!.toUpperCase() === "POSITIVE") {
    invalidReasons.push(INVALID_QR_SCAN_REASONS.TEST_RESULT_POSITIVE);
  }

  if (invalidReasons.length !== 0) {
    return { isValid: false, invalidReasons };
  }

  return {
    isValid: true,
    // we know name and username aren't null as we return early if case
    scanMetadata: { name: name!, username: username!, testRef },
  };
};

export { validateQR };
