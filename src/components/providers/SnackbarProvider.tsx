"use client";

import { Snackbar as MuiSnackbar, SnackbarOrigin } from "@mui/material";
import { useContext, useState, createContext } from "react";

const SnackbarContext = createContext({
  open: false,
  showSnackbar: (message: string, position?: SnackbarOrigin) => {},
});

export const useSnackbar = () => {
  const { open, showSnackbar } = useContext(SnackbarContext);
  return { open, showSnackbar };
};

export default function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<SnackbarOrigin | undefined>({
    vertical: "top",
    horizontal: "right",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (message: string, position?: SnackbarOrigin) => {
    setMessage(message);
    position && setPosition(position);
    setOpen(true);
  };
  return (
    <SnackbarContext.Provider value={{ open, showSnackbar }}>
      <MuiSnackbar
        key="snackbar-message"
        anchorOrigin={position}
        open={open}
        onClose={handleClose}
        message={message}
        color="success"
      />
      {children}
    </SnackbarContext.Provider>
  );
}
