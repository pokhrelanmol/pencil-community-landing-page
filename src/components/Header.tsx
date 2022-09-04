import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Input,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { HtmlHTMLAttributes, useEffect } from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { convertToBase64 } from "../utils";
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
                flexGrow: 1,
            }}
        >
            <Box
                position="sticky"
                sx={{
                    backgroundColor: "customColor.light",
                }}
            >
                <Toolbar>
                    <Box>
                        {state.edit && (
                            <input
                                className="custom-file-input"
                                type="file"
                                onChange={handleLogoUpload}
                            />
                        )}

                        <Avatar
                            src={state.preview ? state.logo : initialState.logo}
                        />
                    </Box>
                    <Typography
                        contentEditable={state.edit}
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
                        }}
                    >
                        {state.preview ? state.title : initialState.title}
                    </Typography>

                    <Box display="flex" gap={2}>
                        <Button variant="outlined">Login</Button>
                        {state.edit || state.preview ? (
                            <Button
                                variant="contained"
                                onClick={handleSaveButtonClick}
                            >
                                save
                            </Button>
                        ) : null}
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={
                                state.edit
                                    ? handlePreview
                                    : handleEditButtonClick
                            }
                        >
                            {state.edit ? "preview" : "Edit"}
                        </Button>
                    </Box>
                </Toolbar>
            </Box>
        </Box>
    );
};

export default Header;
