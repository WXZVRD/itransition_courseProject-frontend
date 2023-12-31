import React, { FC, useState } from 'react';
import { Paper, Rating, IconButton, Box, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReviewServices from "../services/ReviewServices";
import {useIntl} from "react-intl";

interface IRatePanel {
    rate: number | null;
    likes: boolean;
    productId: string,
    authorId: string,
    reviewId?: string
}

const RatePanel: FC<IRatePanel> = ({ rate, likes, productId, authorId, reviewId }) => {
    const [rating, setRating] = useState<number | null>(rate);
    const [liked, setLiked] = useState<boolean>(likes);

    const intl = useIntl()
    const likePut = intl.formatMessage({ id: "like.idle" })
    const likePutted = intl.formatMessage({ id: "like.ready" })
    const rateText = intl.formatMessage({ id: "rate" })

    const handleLike = async () => {
        setLiked(!liked);
        await ReviewServices.like(reviewId || '', authorId, )
    };

    const handleRate = async (newRate: number | null) => {
        setRating(newRate);
        const rateForm = {
            productId: productId,
            userRating: newRate
        }
        await ReviewServices.rateProduct(rateForm)
    };

    return (
        <Paper sx={{ display: 'flex', alignItems: 'center', mb: '60px', justifyContent: 'center' }}>
            <Box sx={{ p: '16px', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleLike}>
                    <ThumbUpIcon sx={{ color: liked ? '#FF2D55' : 'primary' }} />
                </IconButton>
                <Typography variant="body2" sx={{ ml: '8px' }}>
                    {liked ? likePutted : likePut}
                </Typography>
            </Box>

            <Box sx={{ p: '16px', display: 'flex', alignItems: 'center' }}>
                <Rating
                    name="rating"
                    value={rating}
                    precision={1}
                    onChange={(_, newValue) => {
                        handleRate(newValue);
                    }}
                />
                <Typography variant="body2" sx={{ ml: '8px' }}>
                    {rateText}
                </Typography>
            </Box>
        </Paper>
    );
};

export default RatePanel;
