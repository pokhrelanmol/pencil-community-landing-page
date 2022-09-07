import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { convertToBase64 } from "../utils";
// import Banner from "../assets/logo.webp"
const Hero = () => {
    const { state, dispatch } = usePageContent();
    const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                        type: actionTypes.INPUT_CHANGE,
                        payload: {
                            ...state,
                            heroHeading: e.currentTarget.innerText,
                        },
                    });
                }}
                variant="h2"
                sx={{
                    color: "customColor.main",
                    fontWeight: "bold",
                    textAlign: "center",
                    maxWidth: "80%",
                }}
            >
                {state.preview ? state.heroHeading : initialState.heroHeading}
            </Typography>

            <Typography
                contentEditable={state.edit}
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
            {state.edit && (
                <input
                    className="custom-file-input"
                    type="file"
                    onChange={handleHeroImageUpload}
                />
            )}
            <Box
                component="img"
                sx={{ width: 700, height: 360, borderRadius: 10 }}
                src={state.preview ? state.heroImage : initialState.heroImage}
            />
        </Stack>
    );
};

export default Hero;
