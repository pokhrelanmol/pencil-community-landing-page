import { Box, Typography } from "@mui/material";
import React from "react";
import AboutCommunityLists from "./components/AboutCommunityLists";
import Header from "./components/Header";
import Hero from "./components/Hero";

const App = () => {
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
            >
                "Experiencing a new culture is like entering a whole new world
                of sights, sounds, smells, and textures."
            </Typography>
            <Box>
                <AboutCommunityLists />
            </Box>
        </div>
    );
};

export default App;
