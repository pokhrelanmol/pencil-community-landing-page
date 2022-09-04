import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    styled,
} from "@mui/material";
import { Forward } from "@mui/icons-material";
import React from "react";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "../contexts/PageContentContext";
import { platform } from "os";

const ForwardIcon = styled(Forward)(({ theme }) => ({
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
    const { state, dispatch } = usePageContent();
    return (
        <ListItem
            disablePadding
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "500px",
            }}
        >
            <ListItemButton>
                <ListItemIcon>
                    <ForwardIcon />
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
                >
                    {state.preview
                        ? content
                        : initialState.aboutCommunityList[id].content}
                </ListItemText>
            </ListItemButton>
        </ListItem>
    );
};
const AboutCommunityLists = () => {
    const { state, dispatch } = usePageContent();
    const handleAddMoreList = () => {
        dispatch({
            type: actionTypes.ADD_MORE_LIST,
        });
    };
    return (
        <Paper sx={{ backgroundColor: "customColor.light", pt: 5 }}>
            <nav aria-label="main mailbox folders">
                <List
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr ",
                        placeItems: "center",
                        alignItems: "space-around",
                    }}
                >
                    <>
                        {state.aboutCommunityList.map((content, index) => (
                            <AboutCommunityCard
                                key={index}
                                id={index}
                                content={content.content}
                            />
                        ))}
                    </>
                </List>
                <Button sx={{ float: "right" }} onClick={handleAddMoreList}>
                    Add more list
                </Button>
            </nav>
        </Paper>
    );
};

export default AboutCommunityLists;
