import { Box, Typography } from "@mui/material";
import React from "react";
import AboutCommunityLists from "./components/AboutCommunityLists";
import CommunityOwner from "./components/CommunityOwner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import {
    actionTypes,
    initialState,
    usePageContent,
} from "./contexts/PageContentContext";

const App = () => {
    const { state, dispatch } = usePageContent();
    return (
        <div className="app">
            <Box sx={{ backgroundColor: "customColor.light" }}>
                <Header />
                <Hero />
            </Box>
            {/* full width text */}
            <Typography
                sx={{
                    textAlign: "center",
                    marginTop: 5,
                    padding: 2,
                    color: "white",
                    bgcolor: "customColor.main",
                    borderRadius: 1,
                }}
                variant="h5"
                contentEditable={state.edit}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch({
                        type: actionTypes.INPUT_CHANGE,
                        payload: {
                            ...state,
                            textBelowHeroSection: e.currentTarget.innerText,
                        },
                    });
                }}
            >
                {state.preview
                    ? state.textBelowHeroSection
                    : initialState.textBelowHeroSection}
            </Typography>
            <Box sx={{ maxWidth: "90%", mx: "auto" }}>
                <AboutCommunityLists />
            </Box>

            <CommunityOwner />
        </div>
    );
};

export default App;
