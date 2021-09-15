import styles from "./QRResult.module.css";
import { QRResultData } from "./QRScanner";

interface QRResultProps {
  qrResult: QRResultData;
}

/**
 * Displays the validity of the QR result in a div fixed above other content
 */
const QRResult = ({
  qrResult: { isValid, invalidReasons, originalData },
}: QRResultProps) => {
  return (
    <div
      className={
        styles.qrResultContainer +
        (isValid ? " " + styles.valid : " " + styles.invalid)
      }
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
  );
};

export { QRResult };
