import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const NAME_REGEX = /^(?:\s*?Name:\s*?)(?<name>\S.+\S)(?:\s*?)$/im;
const USERNAME_REGEX = /^(?:\s*?Username:\s*?)(?<username>\S.+\S)(?:\s*?)$/im;
const TEST_REF_REGEX = /^(?:\s*?)(?:Test ref\.)\s*?(?<ref>\d*)(?:\s*?)$/im;
const DATE_REGEX =
  /^(?:\s*?)(?<date>\S.+\S)(?:\s*?\:\s*?)(?<result>POSITIVE|NEGATIVE)(?:\s*?)$/im;

// dayJs date format https://day.js.org/docs/en/parse/string-format
const DATE_FORMAT = "DD MMM YYYY";

/**
 * Takes a QR code and validates it
 *
 * @param qrData takes QR data of the form:
 * Name: Joe Bloggs
 * Username: ABCD23
 * 01 Jun 2021: NEGATIVE
 * Test ref. 82424
 * @returns [isValid, listOfReasonsWhyNotValid]
 */
const validateQR = (
  qrData: string
): [boolean, string[], { name: string; username: string; testRef: number }] => {
  if (qrData == null) {
    throw new Error("QRData is null");
  }

  let name = qrData.match(NAME_REGEX)?.groups?.name;
  let username = qrData.match(USERNAME_REGEX)?.groups?.username;

  let testRef = +qrData.match(TEST_REF_REGEX)?.groups?.ref;

  let dateRegexResult = qrData.match(DATE_REGEX);

  let date = dateRegexResult?.groups?.date;
  let result = dateRegexResult?.groups?.result;

  let invalidReasons = [];

  if (result == null) {
    invalidReasons.push([
      "Invalid QR Code, QR code not in right format. Are you sure this is from an LFT email?",
    ]);
    return [false, invalidReasons, null];
  }

  // check whether is valid
  if (result?.toUpperCase() !== "NEGATIVE") {
    invalidReasons.push(["Test Result was positive!"]);
  }

  if (!dayjs(date, DATE_FORMAT).isValid()) {
    invalidReasons.push(["Date is invalid!"]);
  } else {
    const diffToCurrent = dayjs.duration(dayjs().diff(date));
    // check if date > 48 hours ago
    if (diffToCurrent.asHours() > 48) {
      invalidReasons.push(["Test Date is >48 hours ago"]);
    }

    if (diffToCurrent.asHours() < 0) {
      invalidReasons.push(["Test Date is in future..."]);
    }
  }

  return [
    invalidReasons.length === 0,
    invalidReasons,
    { name, username, testRef },
  ];
};

export { validateQR };
