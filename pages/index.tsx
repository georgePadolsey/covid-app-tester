import React, { useCallback, useEffect, useRef, useState } from "react";
import useStateMachine from "@cassiozen/usestatemachine";
import {
  ExtraPersonInfo,
  QRResultData,
  QRScanner,
} from "../components/QRScanner";
import _uniqBy from "lodash/uniqBy";
import styles from "../styles/index.module.css";
import { validateQR } from "../utils/validateQR";

import { PeopleScanned } from "../components/PeopleScanned";

import createPersistedState from "use-persisted-state";
import dayjs from "dayjs";
import { QRResult } from "../components/QRResult";
import Swal from "sweetalert2";

const usePeopleScannedState = createPersistedState("peopleScanned");

export interface ScannedPersonData extends ExtraPersonInfo {
  timeScanned: string;
  isValid: boolean;
}

/**
 * TODO export to multiple different components!
 */
const IndexPage = ({}) => {
  const lastQRResult = useRef(null as QRResultData);

  const [peopleScanned, setPeopleScanned] = usePeopleScannedState(
    [] as ScannedPersonData[]
  );

  const [state, send] = useStateMachine()({
    initial: "WAITING",
    states: {
      WAITING: {
        on: {
          DETECTED_QR: "QR_SCANNED",
          PEOPLE_SCANNED_OPEN: "SHOW_PEOPLE_SCANNED",
        },
        effect() {
          // reset qr result on getting to this state
          lastQRResult.current = null;
        },
      },
      QR_SCANNED: {
        on: { RESET: "WAITING", PEOPLE_SCANNED_OPEN: "SHOW_PEOPLE_SCANNED" },
        effect() {
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
      SHOW_PEOPLE_SCANNED: {
        on: { RESET: "WAITING" },
        effect() {},
      },
    },
  });

  const onClearPeopleScanned = useCallback(() => {
    setPeopleScanned([]);
  }, []);

  const onClosePeopleScanned = useCallback(() => {
    send("RESET");
  }, []);

  return (
    <>
      <div className={styles.appContainer}>
        {state.value === "QR_SCANNED" ? (
          <QRResult qrResult={lastQRResult?.current} />
        ) : null}

        {state.value === "SHOW_PEOPLE_SCANNED" ? (
          <PeopleScanned
            peopleScanned={peopleScanned}
            onClear={onClearPeopleScanned}
            onClose={onClosePeopleScanned}
          />
        ) : null}

        {/* have the following running all the time in background so camera doesn't have to reset */}

        <QRScanner
          onScan={(scanData: QRResultData) => {
            // don't scan codes when not waiting for them, see above comment for why it's kept running in bg
            if (state.value !== "WAITING") {
              return;
            }

            lastQRResult.current = scanData;

            send("DETECTED_QR");
          }}
          onError={(e) => {
            Swal.fire({
              title: "Error occurred",
              icon: "error",
              html:
                "Please ensure you have granted the application camera access.<br><br>Please report following error to johns.vp[at]durham.ac.uk.<br><br>Further Information: " +
                JSON.stringify(e),
            });
            console.error(e);
          }}
        />

        <div className={styles.scanning}>
          <p>Scanning...</p>
        </div>

        <button
          className={styles.peopleScannedOpen}
          onClick={() => send("PEOPLE_SCANNED_OPEN")}
        >
          People scanned
        </button>

        <footer className={styles.footer}>Designed by the SJCR</footer>
      </div>
    </>
  );
};

export default IndexPage;
