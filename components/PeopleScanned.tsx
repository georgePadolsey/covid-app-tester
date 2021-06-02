import styles from "./PeopleScanned.module.css";
import Swal from "sweetalert2";
import { downloadCSV } from "../utils/CSVUtils";
import { ScannedPersonData } from "../pages";

interface Props {
  peopleScanned: ScannedPersonData[];
  onClose: () => void;
  onClear: () => void;
}

const PeopleScanned = ({ peopleScanned, onClose, onClear }: Props) => {
  return (
    <div className={styles.showPeopleScanned}>
      {peopleScanned.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Username</th>
              <th>Test Ref</th>
              <th>Is Valid</th>
            </tr>
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
            downloadCSV([
              ["Time Scanned", "Name", "Username", "Test Ref", "Is Valid"],
              ...peopleScanned.map((person) => {
                return [
                  person?.timeScanned,
                  person?.name,
                  person?.username,
                  String(person?.testRef),
                  String(person?.isValid),
                ];
              }),
            ]);
          }}
        >
          Export
        </button>
        <button onClick={onClose}>Back to Scanning</button>
        <button
          className={styles.clear}
          onClick={async () => {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "Are you 100% sure you want to clear all the information for people that have scanned in via the app.",
              icon: "warning",
              confirmButtonText: "I'm sure",
              showCancelButton: true,
            });

            if (result.isConfirmed) {
              onClear();
            }
          }}
        >
          Clear
        </button>
      </footer>
    </div>
  );
};

export { PeopleScanned };
