import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
} from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import React from "react";
import { initialState, useAppContext } from "../contexts/AppContext";
import { theme } from "../expand-theme";
import { actionTypes } from "../contexts/types";

const CheckIcon = styled(Check)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: "white",
    fontSize: 30,
    padding: 5,
    borderRadius: 30,
}));

const AboutCommunityCard = ({
    content,
    id,
}: {
    content: string;
    id: number;
}) => {
    const { state, dispatch } = useAppContext();
    return (
        <ListItem
            disablePadding
            sx={{
                maxWidth: "80%",
            }}
        >
            <ListItem
                sx={{
                    "&:hover": { backgroundColor: "transparent" },
                }}
            >
                <ListItemIcon>
                    <CheckIcon />
                </ListItemIcon>
                <ListItemText
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch({
                            type: actionTypes.LIST_ITEM_CHANGE,
                            payload: {
                                id: id,
                                content: e.currentTarget.textContent as string,
                            },
                        });
                    }}
                    contentEditable={state.edit}
                    suppressContentEditableWarning={true}
                >
                    {state.preview
                        ? content
                        : initialState.aboutCommunityList[id].content}
                </ListItemText>
            </ListItem>
        </ListItem>
    );
};

const AboutCommunityLists = () => {
    const { state, dispatch } = useAppContext();

    return (
        <Box sx={{ pt: 5 }}>
            <List
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    [theme.breakpoints.down("md")]: {
                        gridTemplateColumns: "1fr",
                        justifyItems: "center",
                        gap: 3,
                    },

                    justifyItems: "end",
                }}
            >
                {state.aboutCommunityList.map((content, index) => (
                    <AboutCommunityCard
                        key={index}
                        id={index}
                        content={content.content}
                    />
                ))}
            </List>
            {state.edit && (
                <Tooltip arrow title="Delete list item">
                    <IconButton
                        sx={{ float: "right" }}
                        onClick={() => {
                            dispatch({
                                type: actionTypes.DELETE_LIST_ITEM,
                            });
                        }}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default AboutCommunityLists;
