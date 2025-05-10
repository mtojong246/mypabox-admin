import { Alert, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function SnackbarAlert({
    open,
    setOpen,
    message,
    severity,
}: {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning',
}) {
  
  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}