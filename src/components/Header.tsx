import {
    Camera,
    CameraAltOutlined,
    CancelOutlined,
    Edit,
    PreviewOutlined,
    SaveAltOutlined,
} from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Icon,
    IconButton,
    Input,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { HtmlHTMLAttributes, useEffect } from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { theme } from "../expand-theme";
import { convertToBase64 } from "../utils";
import FileUploader from "./FileUploader";
// import Logo from "../assets/logo.webp";
const Header = () => {
    const { state, dispatch } = usePageContent();
    // const [edit, setEdit] = React.useState(false);
    const [embbedEditedData, setEmbbedEditedData] = React.useState(false);
    const handleEditButtonClick = () => {
        dispatch({ type: actionTypes.EDIT, payload: true });
    };
    const handleSaveButtonClick = () => {
        dispatch({ type: actionTypes.SAVE });

        setEmbbedEditedData(true);
    };
    const handlePreview = () => {
        dispatch({ type: actionTypes.PREVIEW, payload: state });
        setEmbbedEditedData(false);
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
        <Box
            sx={{
                position: "sticky",
                minWidth: "100%",
                backgroundColor: "customColor.light",
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
                                    <SaveAltOutlined color="secondary" />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        {state.edit ? (
                            <Tooltip title="Preview">
                                <IconButton onClick={handlePreview}>
                                    <PreviewOutlined color="primary" />
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
        </Box>
    );
};

export default Header;
