import { Cancel } from "@mui/icons-material";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import React from "react";
import { usePageContent } from "../contexts/PageContentContext";

const Toast = () => {
    const { state } = usePageContent();
    const [open, setOpen] = React.useState(true);
    if (!state.edit) return null;
    return (
        <Collapse in={open}>
            <Alert
                sx={{ maxWidth: "60%", mx: "auto" }}
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
