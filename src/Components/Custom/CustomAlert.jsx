import { Alert, AlertTitle, Slide } from "@mui/material";
import { useEffect } from "react";

export default function CustomAlerts({ severity, title, message, show, setShow }) {

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => {
      clearTimeout(timeId);
    };
  }, [setShow]);

  if (!show) {
    return null;
  }

  return (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <Alert
        severity={severity}
        sx={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: "0",
          right: "0",
          top: "1em",
          width: 1 / 2,
          zIndex: 2,
        }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Slide>
  );
}
