import { Facebook, LinkedIn, Twitter, YouTube } from "@mui/icons-material";
import { Box, Fab, Input, Link, Stack, Typography } from "@mui/material";
import React, { ReactComponentElement, ReactNode } from "react";
import { initialState, useAppContext } from "../contexts/AppContext";
import { actionTypes } from "../contexts/types";
import { theme } from "../expand-theme";
import { convertToBase64 } from "../utils";
import FileUploader from "./FileUploader";

const IconProvider = ({
    Icon,
    iconName,
    link,
}: {
    Icon: ReactNode;
    iconName: string;
    link: string;
}) => {
    const { state, dispatch } = useAppContext();
    return (
        <>
            {state.edit ? (
                <>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Input
                            value={link}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch({
                                    type: actionTypes.INPUT_CHANGE,
                                    payload: {
                                        ...state,
                                        communityOwnerSocialMediaLink: {
                                            ...state.communityOwnerSocialMediaLink,
                                            [iconName.toLowerCase()]:
                                                e.target.value,
                                        },
                                    },
                                });
                            }}
                            sx={{ mr: 2 }}
                            placeholder={`${iconName} Link`}
                        />
                        <Fab size="small">
                            <Link color="inherit" href={link}>
                                {Icon}
                            </Link>
                        </Fab>
                    </Stack>
                </>
            ) : (
                <Fab size="small" href={link}>
                    {Icon}
                </Fab>
            )}
        </>
    );
};

const CommunityOwner = () => {
    const { state, dispatch } = useAppContext();
    const ownerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files
            ? e.currentTarget.files[0]
            : ("null" as unknown as File);

        //  const base64 = file ? URL.createObjectURL(file) : "";
        convertToBase64(file).then((data) => {
            dispatch({
                type: actionTypes.INPUT_CHANGE,
                payload: { ...state, communityOwnerImage: data },
            });
        }) as unknown as string;
    };
    return (
        <Stack
            direction="row"
            sx={{
                [theme.breakpoints.down("md")]: {
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                },
                justifyContent: "space-around",
                mt: 5,
                p: 10,
                mx: "auto",
                alighItems: "center",
                backgroundColor: "customColor.light",
            }}
        >
            <Box>
                <FileUploader handleChange={ownerImageUpload} />

                <Box
                    component="img"
                    sx={{
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        border: "1px solid black",
                        backgroundColor: "customColor.light",
                        mb: 2,
                    }}
                    src={
                        state.preview
                            ? state.communityOwnerImage
                            : initialState.communityOwnerImage
                    }
                />
                <Typography
                    contentEditable={state.edit}
                    suppressContentEditableWarning={true}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type: actionTypes.INPUT_CHANGE,
                            payload: {
                                ...state,
                                communityOwnerName: e.currentTarget.innerText,
                            },
                        });
                    }}
                    variant="h5"
                    textAlign="center"
                >
                    {state.preview
                        ? state.communityOwnerName
                        : initialState.communityOwnerName}
                </Typography>
            </Box>
            <Stack sx={{ maxWidth: "80%", alignItems: "center", gap: 2 }}>
                <Typography
                    contentEditable={state.edit}
                    suppressContentEditableWarning={true}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type: actionTypes.INPUT_CHANGE,
                            payload: {
                                ...state,
                                communityOwnerHeading:
                                    e.currentTarget.innerText,
                            },
                        });
                    }}
                    sx={{
                        [theme.breakpoints.down("md")]: {
                            display: "none",
                        },
                    }}
                    variant="h5"
                    textAlign="center"
                >
                    {state.preview
                        ? state.communityOwnerHeading
                        : initialState.communityOwnerHeading}
                </Typography>
                <Typography
                    contentEditable={state.edit}
                    suppressContentEditableWarning={true}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type: actionTypes.INPUT_CHANGE,
                            payload: {
                                ...state,
                                communityOwnerDescription:
                                    e.currentTarget.innerText,
                            },
                        });
                    }}
                    maxWidth={400}
                    textAlign="center"
                    variant="body1"
                >
                    {state.preview
                        ? state.communityOwnerDescription
                        : initialState.communityOwnerDescription}
                </Typography>
                <Stack direction="row" gap={2}>
                    <IconProvider
                        link={
                            state.communityOwnerSocialMediaLink
                                .facebook as string
                        }
                        iconName="Facebook"
                        Icon={<Facebook />}
                    />
                    <IconProvider
                        link={
                            state.communityOwnerSocialMediaLink
                                .youtube as string
                        }
                        iconName="Youtube"
                        Icon={<YouTube />}
                    />
                    <IconProvider
                        link={
                            state.communityOwnerSocialMediaLink
                                .twitter as string
                        }
                        iconName="Twitter"
                        Icon={<Twitter />}
                    />
                    <IconProvider
                        link={
                            state.communityOwnerSocialMediaLink
                                .linkedin as string
                        }
                        iconName="Linkedin"
                        Icon={<LinkedIn />}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CommunityOwner;
