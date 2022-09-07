import {
    Facebook,
    Instagram,
    LinkedIn,
    Twitter,
    YouTube,
} from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Fab,
    IconButton,
    Input,
    Link,
    Paper,
    Stack,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import React, { ReactComponentElement, ReactNode } from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { convertToBase64 } from "../utils";

const IconProvider = ({
    Icon,
    iconName,
    link,
}: {
    Icon: ReactNode;
    iconName: string;
    link: string;
}) => {
    const { state, dispatch } = usePageContent();
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
    const { state, dispatch } = usePageContent();
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
                justifyContent: "space-around",
                mt: 5,
                p: 10,
                mx: "auto",
                alighItems: "center",
                backgroundColor: "customColor.light",
            }}
        >
            <Box>
                {state.edit && (
                    <input
                        className="custom-file-input"
                        accept="image/*"
                        type="file"
                        onChange={ownerImageUpload}
                    />
                )}

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
                    Mia Khalifa
                </Typography>
            </Box>
            <Stack sx={{ maxWidth: "80%", alignItems: "center", gap: 2 }}>
                <Typography
                    contentEditable={state.edit}
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
                    variant="h5"
                    textAlign="center"
                >
                    Community Owner
                </Typography>
                <Typography
                    contentEditable={state.edit}
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
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium, quam nam repellat sint, dolores earum facere
                    dolor rem quibusdam quia vel ducimus accusamus qui culpa
                    corporis id quisquam quaerat quos!
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
