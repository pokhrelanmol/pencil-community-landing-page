import {
    Box,
    IconButton,
    Input,
    InputBase,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    styled,
    Tooltip,
} from "@mui/material";
import { Add, Check, Delete } from "@mui/icons-material";
import React from "react";
import { initialState, useAppContext } from "../contexts/AppContext";
import { theme } from "../expand-theme";
import { actionTypes } from "../contexts/types";
import uniqid from "uniqid";
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
    listItemAdded,
}: {
    content: string;
    id: number;
    listItemAdded: boolean;
}) => {
    const { state, dispatch } = useAppContext();
    const [contentThatCanBeEdited, setContentThatCanBeEdited] =
        React.useState("");
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
                        e.preventDefault();
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
                        : listItemAdded
                        ? content
                        : initialState.aboutCommunityList[id].content}
                </ListItemText>
            </ListItem>
        </ListItem>
    );
};

const AboutCommunityLists = () => {
    const [newListItem, setNewListItem] = React.useState("");
    const [listItemAdded, setListItemAdded] = React.useState(false);
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
                        key={uniqid()}
                        id={index}
                        content={content.content}
                        listItemAdded={listItemAdded}
                    />
                ))}
            </List>
            {state.edit && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Paper
                        component="form"
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            width: 400,
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder=" New List Item"
                            onChange={(e) => setNewListItem(e.target.value)}
                        />
                        <IconButton
                            onClick={() => {
                                dispatch({
                                    type: actionTypes.ADD_LIST_ITEM,
                                    payload: newListItem,
                                });
                                setListItemAdded(true);
                            }}
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <Add />
                        </IconButton>
                    </Paper>
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
                </Box>
            )}
        </Box>
    );
};

export default AboutCommunityLists;
