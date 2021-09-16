import dayjs from "dayjs";
import { INVALID_QR_SCAN_REASONS, validateQR } from "../utils/validateQR";

function fakeResult({
  name,
  username,
  date,
  testResult,
  testRef,
}: {
  name?: string;
  username?: string;
  date?: string;
  testResult?: string;
  testRef?: string;
}) {
  return `Name: ${name == null ? "" : name}
Username: ${username == null ? "" : username}
${date == null ? "" : date}: ${testResult == null ? "" : testResult}
Test ref. ${testRef == null ? "" : testRef}`;
}

function fakeResultShuffled({
  name,
  username,
  date,
  testResult,
  testRef,
}: {
  name?: string;
  username?: string;
  date?: string;
  testResult?: string;
  testRef?: string;
}) {
  return `${date == null ? "" : date}: ${testResult == null ? "" : testResult}
Username: ${username == null ? "" : username}
Name: ${name == null ? "" : name}
Test ref. ${testRef == null ? "" : testRef}`;
}

// dayJs date format https://day.js.org/docs/en/parse/string-format
const DATE_FORMAT = "DD MMM YYYY";

test("Empty string should return multiple invalid reasons", () => {
  expect(validateQR("")).toStrictEqual({
    isValid: false,
    invalidReasons: [
      INVALID_QR_SCAN_REASONS.NAME_IS_UNDEFINED,
      INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED,
      INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED,
      INVALID_QR_SCAN_REASONS.INVALID_TEST_RESULT,
      INVALID_QR_SCAN_REASONS.TEST_REF_NAN,
    ],
  });
});
// should only give no name error as should return earlier
test("Old and no name, but all else right should give just no name error ", () => {
  expect(
    validateQR(
      fakeResult({
        name: undefined,
        username: "ABCD23",
        date: "01 Jun 1993",
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.NAME_IS_UNDEFINED],
  });
});

test("All valid but testRef not number", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jeff Bloggs",
        username: "ABCD23",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "abc",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.TEST_REF_NAN],
  });
});

test("All valid except result is POSITIVE, should return metadata", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jeff Bloggs",
        username: "ABCD23",
        date: dayjs().format(DATE_FORMAT),
        testResult: "POSITIVE",
        testRef: "542135",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.TEST_RESULT_POSITIVE],
    scanMetadata: {
      name: "Jeff Bloggs",
      username: "ABCD23",
      testRef: 542135,
    },
  });
});

// should only give no name error as should return earlier
test("Old and no username, but all else right should give just no username error ", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: undefined,
        date: "01 Jun 1993",
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED],
  });
});

// should only give no name error as should return earlier
test("Old and no date, but all else right should give just no date error ", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: undefined,
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED],
  });
});

test("All valid should be valid", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: true,
    scanMetadata: {
      name: "Jaffa Lord",
      username: "Jaffa",
      testRef: 82424,
    },
  });
});

test("All valid, weird character username should be valid", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: "__I'm a gummy bear__",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: true,
    scanMetadata: {
      name: "Jaffa Lord",
      username: "__I'm a gummy bear__",
      testRef: 82424,
    },
  });
});

test("Invalid username, just whitespace should give undefined username", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: " ",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED],
  });
});

test("Invalid test result, just whitespace should give undefined test result and undefined date", () => {
  expect(
    validateQR(
      fakeResult({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: dayjs().format(DATE_FORMAT),
        testResult: "",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [
      INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED,
      INVALID_QR_SCAN_REASONS.INVALID_TEST_RESULT,
    ],
  });
});

// should only give no name error as should return earlier
test("Shuffled Old and no name, but all else right should give just no name error ", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: undefined,
        username: "ABCD23",
        date: "01 Jun 1993",
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.NAME_IS_UNDEFINED],
  });
});

// should only give no name error as should return earlier
test("Shuffled Old and no username, but all else right should give just no username error ", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: undefined,
        date: "01 Jun 1993",
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED],
  });
});

// should only give no name error as should return earlier
test("Shuffled Old and no date, but all else right should give just no date error ", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: undefined,
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED],
  });
});

test("Shuffled All valid should be valid", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: true,
    scanMetadata: {
      name: "Jaffa Lord",
      username: "Jaffa",
      testRef: 82424,
    },
  });
});

test("Shuffled All valid, weird character username should be valid", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: "__I'm a gummy bear__",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: true,
    scanMetadata: {
      name: "Jaffa Lord",
      username: "__I'm a gummy bear__",
      testRef: 82424,
    },
  });
});

test("Shuffled Invalid username, just whitespace should give undefined username", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: " ",
        date: dayjs().format(DATE_FORMAT),
        testResult: "NEGATIVE",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [INVALID_QR_SCAN_REASONS.USERNAME_IS_UNDEFINED],
  });
});

test("Shuffled invalid test result, just whitespace should give undefined test result and undefined date", () => {
  expect(
    validateQR(
      fakeResultShuffled({
        name: "Jaffa Lord",
        username: "Jaffa",
        date: dayjs().format(DATE_FORMAT),
        testResult: "",
        testRef: "82424",
      })
    )
  ).toStrictEqual({
    isValid: false,
    invalidReasons: [
      INVALID_QR_SCAN_REASONS.DATE_IS_UNDEFINED,
      INVALID_QR_SCAN_REASONS.INVALID_TEST_RESULT,
    ],
  });
});
