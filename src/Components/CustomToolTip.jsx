import React from "react";

function CustomToolTip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="card p-2 br-2">
        <div className="row g-4">
          <div className="col">
            <p className="txt-gray">Temp</p>
            <h4 className="txt-blue">{(payload[0].value | 0) + "°"}</h4>
          </div>
          <div className="col">
            <p className="txt-gray">Feel Like</p>
            <h4 className="txt-red">{(payload[1].value | 0) + "°"}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomToolTip;
