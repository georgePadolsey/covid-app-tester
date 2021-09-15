import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { validateQR, ValidateQRResponse } from "../utils/validateQR";

/**
 * Only load client side
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
        style={{ width: "100%" }}
      />
    </div>
  );
};

export { QRScanner };
