import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { groups, testimonial } from "./assets/dummyData";
import AboutCommunityLists from "./components/AboutCommunityLists";
import CommunityOwner from "./components/CommunityOwner";
import Faq from "./components/Faq";
import GroupsCard from "./components/GroupsCard";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import Toast from "./components/Toast";
import { initialState, useAppContext } from "./contexts/AppContext";
import { actionTypes } from "./contexts/types";

const App = () => {
    const { state, dispatch } = useAppContext();
    return (
        <div className="app">
            <Box sx={{ backgroundColor: "customColor.light" }}>
                <Toast />
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
                suppressContentEditableWarning={true}
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
            <>
                <Typography mt={5} textAlign="center" variant="h3" pb={1}>
                    Groups
                </Typography>
                <Grid
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                    alignItems="center"
                    gap={5}
                    pt={5}
                    container
                >
                    {groups.map((group) => (
                        <GroupsCard
                            key={group.id}
                            name={group.name}
                            description={group.description}
                            image={group.image}
                            link={group.link}
                            id={group.id}
                        />
                    ))}
                </Grid>
            </>
            <>
                <Typography mt={5} textAlign="center" variant="h3" pb={1}>
                    Testimonials
                </Typography>
                <Grid
                    // columns={{ xs: 4, sm: 8, md: 12 }}
                    justifyContent="center"
                    alignItems="center"
                    flexShrink={1}
                    gap={5}
                    // pt={5}
                    mt={5}
                    container
                >
                    {testimonial.map((data) => (
                        <Testimonial
                            username={data.username}
                            review={data.review}
                            image={data.image}
                            key={data.id}
                        />
                    ))}
                </Grid>
            </>
            <Faq />
        </div>
    );
};

export default App;
