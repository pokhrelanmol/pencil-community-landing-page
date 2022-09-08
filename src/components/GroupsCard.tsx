import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
interface GroupsCardProps {
    name: string;
    description: string;
    image: string;
    link: string;
    id: number;
}

const GroupsCard = ({
    name,
    description,
    image,
    link,
    id,
}: GroupsCardProps) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    href={link}
                    type="contained"
                    size="small"
                    color="primary"
                >
                    Join
                </Button>
            </CardActions>
        </Card>
    );
};

export default GroupsCard;
