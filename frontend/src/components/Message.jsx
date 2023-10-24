import React from "react";
import { Alert } from "react-bootstrap";

// Define a functional component called "Message"
// It takes two props: "variant" for specifying the alert variant and "children" for the content inside the alert.
function Message({ variant, children }) {
  return (
    <div>
      {/* Render an Alert component from react-bootstrap with the specified variant */}
      <Alert variant={variant}>
        {/* Display the content passed as "children" inside the alert */}
        {children}
      </Alert>
    </div>
  );
}

export default Message; // Export the Message component for use in other parts of the application.
