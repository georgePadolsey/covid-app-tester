import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { validateQR } from "../utils/validateQR";

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

export interface QRResultData {
  originalData: string;
  isValid: boolean;
  invalidReasons: string[];
  extraInformation: ExtraPersonInfo;
}

const QRScanner = ({ onScan, onError }) => {
  const handleError = useCallback((err) => {
    onError(err);
  }, []);

  const handleScan = useCallback((qrData) => {
    if (qrData) {
      let isValid: boolean,
        invalidReasons: string[],
        extraInformation: ExtraPersonInfo;
      try {
        [isValid, invalidReasons, extraInformation] = validateQR(qrData);
      } catch (e) {
        onError(e);
      }
      onScan({
        originalData: qrData,
        isValid,
        extraInformation,
        invalidReasons,
      });
    }
  }, []);

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
