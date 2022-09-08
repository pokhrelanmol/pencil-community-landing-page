import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Paper,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
                <Avatar sx={{ width: 56, height: 56 }} src={image} />
                <CardContent>
                    <Typography textAlign="center" gutterBottom variant="h5">
                        {username}
                    </Typography>
                    <Typography
                        textAlign="center"
                        variant="body2"
                        color="text.secondary"
                    >
                        <span
                            style={{
                                display: "inline",
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "3rem",
                            }}
                        >
                            &ldquo;
                        </span>
                        {review}
                    </Typography>
                    <Typography sx={{ mt: 3, fontSize: "0.8rem" }}>
                        - HR, <span style={{ color: "red" }}>Google</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Testimonial;
