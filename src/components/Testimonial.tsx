import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Paper,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
interface TestimonialProps {
    username: string;
    image: string;
    review: string;
}
const Testimonial = ({ username, image, review }: TestimonialProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 4,
                }}
            >
                <Avatar src={image} />
                <CardContent>
                    <Typography
                        textAlign="center"
                        gutterBottom
                        variant="h5"
                        component="div"
                    >
                        {username}
                    </Typography>
                    <Typography
                        textAlign="center"
                        variant="body2"
                        color="text.secondary"
                    >
                        {review}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Testimonial;
