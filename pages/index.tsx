import React, { useEffect, useRef, useState } from "react";
import useStateMachine from "@cassiozen/usestatemachine";
import { QRReader } from "../components/QRReader";
import _uniqBy from "lodash/uniqBy";
import styles from "../styles/index.module.css";
import { validateQR } from "../utils/validateQR";
import Swal from "sweetalert2";

interface ExtraPersonInfo {
  name: string;
  username: string;
  testRef: number;
}

interface QRResult {
  originalData: string;
  isValid: boolean;
  invalidReasons: string[];
  extraInformation: ExtraPersonInfo;
}

import createPersistedState from "use-persisted-state";
import dayjs from "dayjs";
const usePeopleScannedState = createPersistedState("peopleScanned");

const IndexPage = ({}) => {
  const lastQRResult = useRef(null as QRResult);
  const [showPeopleScanned, setShowPeopleScanned] = useState(false);

  const [peopleScanned, setPeopleScanned] = usePeopleScannedState([]);

  const [state, send] = useStateMachine()({
    initial: "waiting",
    states: {
      waiting: {
        on: { DETECTED_QR: "QR_SCANNED" },
        effect() {
          // reset qr result on getting to this state
          lastQRResult.current = null;
        },
      },
      QR_SCANNED: {
        on: { RESET: "waiting" },
        effect() {
          console.log("Just entered the QR_SCANNED state");

          setPeopleScanned([
            {
              ...lastQRResult.current.extraInformation,
              timeScanned: dayjs().format("HH:mm:ss DD/MM/YY"),
              isValid: lastQRResult.current.isValid,
            },
            ...peopleScanned,
          ]);

          setTimeout(
            () => {
              send("RESET");
            },
            lastQRResult?.current?.isValid ? 2000 : 5000 // give more time if invalid
          );
        },
      },
    },
  });

  const { isValid, originalData, invalidReasons } = lastQRResult?.current || {};

  const validationBgColor = isValid ? "#0AA920" : "#ff0033";

  return (
    <>
      {lastQRResult.current != null ? (
        <div
          style={{
            backgroundColor: validationBgColor,
          }}
          className={styles.qrResultContainer}
          hidden={state.value !== "QR_SCANNED"}
        >
          <p>{isValid ? "Valid" : "Invalid"}</p>
          <div className={styles.invalid} hidden={isValid}>
            QR Code is Invalid as:{" "}
            <ul>
              {invalidReasons?.map((reason) => {
                return <li key={reason}>{reason}</li>;
              })}
            </ul>
          </div>

          <pre>{originalData}</pre>
        </div>
      ) : null}

      <div className={styles.showPeopleScanned} hidden={!showPeopleScanned}>
        {peopleScanned.length !== 0 ? (
          <table>
            <thead>
              <th>Time</th>
              <th>Name</th>
              <th>Username</th>
              <th>Test Ref</th>
              <th>Is Valid</th>
            </thead>
            <tbody>
              {peopleScanned.map((person) => {
                return (
                  <tr key={person?.timeScanned}>
                    <td>{person?.timeScanned}</td>
                    <td>{person?.name}</td>
                    <td>{person?.username}</td>
                    <td>{person?.testRef}</td>
                    <td>{person?.isValid ? "✅" : "❌"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>Information will appear here as people scan in.</p>
        )}
        <footer className={styles.buttonBar}>
          <button
            onClick={() => {
              const rows = [
                ["Time Scanned", "Name", "Username", "Test Ref", "Is Valid"],
                ...peopleScanned.map((person) => {
                  return [
                    person?.timeScanned,
                    person?.name,
                    person?.username,
                    person?.testRef,
                    person?.isValid,
                  ];
                }),
              ];

              let csvContent = "";

              rows.forEach(function (rowArray) {
                let row = rowArray.join(",");
                csvContent += row + "\r\n";
              });
              let blob = new Blob([csvContent], { type: "text/csv" });
              let href = window.URL.createObjectURL(blob);
              window.open(href);
            }}
          >
            Export
          </button>
          <button onClick={() => setShowPeopleScanned(false)}>
            Back to Scanning
          </button>
          <button
            onClick={async () => {
              const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you 100% sure you want to clear all the information for people that have scanned in via the app.",
                icon: "warning",
                confirmButtonText: "I'm sure",
                showCancelButton: true,
              });

              if (result.isConfirmed) {
                setPeopleScanned([]);
              }
            }}
          >
            Clear
          </button>
        </footer>
      </div>
      <div className={styles.qrContainer}>
        {!showPeopleScanned ? (
          <QRReader
            onScan={(scanData) => {
              let isValid: boolean,
                invalidReasons: string[],
                extraInformation: ExtraPersonInfo;
              try {
                [isValid, invalidReasons, extraInformation] =
                  validateQR(scanData);
              } catch (e) {
                console.error(e);
              }

              lastQRResult.current = {
                originalData: scanData,
                isValid,
                extraInformation,
                invalidReasons,
              };

              send("DETECTED_QR");
            }}
          />
        ) : null}
      </div>

      <div className={styles.scanning}>
        <p>{state.value === "QR_SCANNED" ? "scanned" : "Scanning..."}</p>
      </div>

      <button
        className={styles.peopleScannedOpen}
        onClick={() => setShowPeopleScanned(true)}
      >
        People scanned
      </button>

      <footer className={styles.footer}>Designed by the SJCR</footer>
    </>
  );
};

export default IndexPage;
