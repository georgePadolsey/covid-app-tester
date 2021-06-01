import React, { Component } from "react";

const isBrowser = typeof window != "undefined";

if (isBrowser) {
  var QrReader = require("react-qr-reader");
}

class QRReader extends Component<{ onScan: (data: string) => void }> {
  handleScan = (data) => {
    if (data) {
      this.props.onScan(data);
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      isBrowser && (
        <div>
          <QrReader
            delay={0}
            resolution={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        </div>
      )
    );
  }
}

export { QRReader };
