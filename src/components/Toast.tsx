import { Cancel } from "@mui/icons-material";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

const Toast = () => {
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
                severity="info"
                color="info"
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
                <AlertTitle>Info</AlertTitle>
                Click on a text to edit them
            </Alert>
        </Collapse>
    );
};

export default Toast;
