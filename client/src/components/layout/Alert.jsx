import React from 'react';
import { connect } from 'react-redux';
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(({ msg, id, alertType }) => (
    <div key={id} className={`alert alert-${alertType}`}>
      {msg}
    </div>
  ));

const mapStateToProps = ({ alert }) => {
  return {
    alerts: alert,
  };
};
export default connect(mapStateToProps, null)(Alert);
