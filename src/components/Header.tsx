import { CancelOutlined, Edit, RemoveRedEye, Save } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import { initialState, useAppContext } from "../contexts/AppContext";
import { actionTypes } from "../contexts/types";
import { theme } from "../expand-theme";
import { convertToBase64 } from "../utils";
import FileUploader from "./FileUploader";
const Header = () => {
    const { state, dispatch } = useAppContext();
    const handleEditButtonClick = () => {
        dispatch({ type: actionTypes.EDIT, payload: true });
    };
    const handleSaveButtonClick = () => {
        dispatch({ type: actionTypes.SAVE });
    };
    const handlePreview = () => {
        dispatch({ type: actionTypes.PREVIEW, payload: state });
    };
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files
            ? e.currentTarget.files[0]
            : ("null" as unknown as File);
        convertToBase64(file).then((data) => {
            dispatch({
                type: actionTypes.INPUT_CHANGE,
                payload: { ...state, logo: data },
            });
        });
    };

    return (
        <AppBar
            sx={{
                position: "sticky",
                boxShadow: "none",
                backgroundColor: "customColor.light",
                zIndex: 100,
            }}
        >
            <Box
                sx={{
                    backgroundColor: "customColor.light",
                }}
            >
                <Toolbar>
                    <Box>
                        <FileUploader handleChange={handleLogoUpload} />

                        <Avatar src={state.logo} />
                    </Box>
                    <Typography
                        contentEditable={state.edit}
                        suppressContentEditableWarning={true}
                        ml={1}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch({
                                type: actionTypes.INPUT_CHANGE,
                                payload: {
                                    ...state,
                                    title: e.currentTarget.innerText,
                                },
                            });
                        }}
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            color: "customColor.main",
                            [theme.breakpoints.up("sm")]: {
                                fontSize: theme.typography.h5.fontSize,
                            },
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "12px",
                            },
                        }}
                    >
                        {state.preview ? state.title : initialState.title}
                    </Typography>

                    <Box display="flex" gap={2}>
                        {!state.edit && (
                            <Button variant="outlined">Login</Button>
                        )}
                        {state.edit || state.preview ? (
                            <Tooltip title="Save">
                                <IconButton onClick={handleSaveButtonClick}>
                                    <Save
                                        sx={{
                                            [theme.breakpoints.down("md")]: {
                                                display: "none",
                                            },
                                        }}
                                        color="secondary"
                                    />
                                    <Typography
                                        sx={{
                                            [theme.breakpoints.down("md")]: {
                                                display: "block",
                                            },
                                            [theme.breakpoints.up("md")]: {
                                                display: "none",
                                            },

                                            fontSize: "12px",
                                        }}
                                    >
                                        Save
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {state.edit ? (
                            <Tooltip title="Preview">
                                <IconButton onClick={handlePreview}>
                                    <RemoveRedEye
                                        sx={{
                                            [theme.breakpoints.down("md")]: {
                                                display: "none",
                                            },
                                        }}
                                        color="primary"
                                    />
                                    <Typography
                                        sx={{
                                            [theme.breakpoints.up("md")]: {
                                                display: "block",
                                            },
                                            [theme.breakpoints.up("md")]: {
                                                display: "none",
                                            },
                                            fontSize: "12px",
                                        }}
                                    >
                                        preview
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Edit">
                                <IconButton onClick={handleEditButtonClick}>
                                    <Edit color="primary" />
                                </IconButton>
                            </Tooltip>
                        )}

                        {state.edit && (
                            <Tooltip title="Cancel Edit">
                                <IconButton>
                                    <CancelOutlined
                                        color="error"
                                        onClick={() => {
                                            dispatch({
                                                type: actionTypes.CANCEL_EDIT,
                                            });
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </Box>
        </AppBar>
    );
};

export default Header;
