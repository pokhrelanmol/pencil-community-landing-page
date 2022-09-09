import { Cancel } from "@mui/icons-material";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
type ToastProps = {
    type: "success" | "error" | "info" | "warning";
    message: string;
};
const Toast = ({ type, message }: ToastProps) => {
    const { state } = useAppContext();
    const [open, setOpen] = React.useState(true);
    if (!state.edit) return null;
    return (
        <Collapse in={open}>
            <Alert
                variant="filled"
                sx={{
                    position: "fixed",
                    transform: "translate(-50%, -50%)",
                    top: "10%",
                    left: "50%",
                    zIndex: 1,
                }}
                severity={type}
                color={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <Cancel fontSize="inherit" />
                    </IconButton>
                }
            >
                <AlertTitle>{type.toUpperCase()}</AlertTitle>
                {message}
            </Alert>
        </Collapse>
    );
};

export default Toast;
