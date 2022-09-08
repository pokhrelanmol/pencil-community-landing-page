import { FileUpload } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { theme } from "../expand-theme";
import { convertToBase64 } from "../utils";
import FileUploader from "./FileUploader";
// import Banner from "../assets/logo.webp"
const Hero = () => {
    const { state, dispatch } = usePageContent();
    const heroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files
            ? e.currentTarget.files[0]
            : ("null" as unknown as File);

        //  const base64 = file ? URL.createObjectURL(file) : "";
        convertToBase64(file).then((data) => {
            dispatch({
                type: actionTypes.INPUT_CHANGE,
                payload: { ...state, heroImage: data },
            });
        }) as unknown as string;
    };
    return (
        <Stack
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            pt={3}
            sx={{
                backgroundColor: "customColor.light",
            }}
        >
            <Typography
                contentEditable={state.edit}
                suppressContentEditableWarning={true}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                        type: actionTypes.INPUT_CHANGE,
                        payload: {
                            ...state,
                            heroHeading: e.currentTarget.innerText,
                        },
                    });
                }}
                sx={{
                    color: "customColor.main",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                    textAlign: "center",
                    maxWidth: "80%",
                    [theme.breakpoints.up("lg")]: {
                        fontSize: theme.typography.h2.fontSize,
                    },
                    [theme.breakpoints.down("md")]: {
                        fontSize: theme.typography.h4.fontSize,
                    },
                }}
            >
                {state.preview ? state.heroHeading : initialState.heroHeading}
            </Typography>

            <Typography
                contentEditable={state.edit}
                suppressContentEditableWarning={true}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                        type: actionTypes.INPUT_CHANGE,
                        payload: {
                            ...state,
                            heroSubHeading: e.currentTarget.innerText,
                        },
                    });
                }}
                variant="h6"
                sx={{
                    color: "customColor.main",
                    textAlign: "center",

                    maxWidth: "80%",
                }}
            >
                {state.preview
                    ? state.heroSubHeading
                    : initialState.heroSubHeading}
            </Typography>
            <Button size="large" variant="contained">
                Join
            </Button>
            <FileUploader handleChange={heroImageUpload} />
            <Box
                component="img"
                sx={{
                    [theme.breakpoints.down("md")]: {
                        width: "100%",
                    },
                    [theme.breakpoints.up("md")]: {
                        width: "700px",
                        height: "400px",
                    },
                }}
                src={state.heroImage}
            />
        </Stack>
    );
};

export default Hero;
