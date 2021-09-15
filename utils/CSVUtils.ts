const downloadCSV = (rows: string[][]) => {
  let csvData = rows
    .map((row) =>
      row
        .map((cell) => {
          if (cell === undefined || cell == null) {
            return '""';
          }

          // We remove blanks and check if the column contains
          // other whitespace,`,` or `"`.
          // In that case, we need to quote the column.
          if (cell.replace(/ /g, "").match(/[\s,"]/)) {
            return '"' + cell.replace(/"/g, '""') + '"';
          }
          return cell;
        })
        .join(",")
    )
    .join("\n");
  let blob = new Blob([csvData], { type: "text/csv" });
  let href = window.URL.createObjectURL(blob);
  window.open(href);
};

export { downloadCSV };
