import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { validateQR, ValidateQRResponse } from "../utils/validateQR";

import styles from "./QRScanner.module.css";

/**
 * Only load client side, as camera not available server side!
 */
const QrReader = dynamic(() => import("modern-react-qr-reader"), {
  ssr: false,
}) as any;

export interface ExtraPersonInfo {
  name: string;
  username: string;
  testRef: number;
}

export type QRResultData = {
  originalData: string;
} & ValidateQRResponse;

interface QRScannerProps {
  onScan: (scanData: QRResultData) => void;
  onError: (e: unknown) => void;
}

/**
 * Element which contains the scanning and passes
 * the parsed metadata from the scanned lft qr code
 * up via the onScan prop callback.
 * Additionally, if an error occurs, it passes it via
 * the onError prop callback.
 *
 * N.B. An error is not the LFT qr code being old or similarly
 * invalid but rather an error in the scanning process itself
 *
 * @param props props passed with onScan/onError callback
 * @returns React Element
 */
const QRScanner = ({ onScan, onError }: QRScannerProps) => {
  const handleError = useCallback(
    (err: unknown) => {
      onError(err);
    },
    [onError]
  );

  const handleScan = useCallback(
    (qrData: string) => {
      if (qrData) {
        try {
          // wrap with original data so can respond state-fully
          onScan({ originalData: qrData, ...validateQR(qrData) });
        } catch (e) {
          onError(e);
        }
      }
    },
    [onScan, onError]
  );

  return (
    <div>
      <QrReader
        delay={300}
        resolution={300}
        onError={handleError}
        onScan={handleScan}
        className={styles.qrReaderContainer}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export { QRScanner };
