import React, { useState } from 'react';
// import { Alert } from 'reactstrap';
import {Alert} from 'react-bootstrap'
function AlertDisplay(){
  const [visible, setVisible] = React.useState(true);
  const onDismiss = () => setVisible(false);
  return (
    <div >
      <Alert color="info" isOpen={visible} toggle={onDismiss}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Alert>
    </div>
  );
}

export default AlertDisplay;