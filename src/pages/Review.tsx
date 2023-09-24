import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Skeleton,
} from '@mui/material';
import Header from '../layouts/Header';
import FullReview from '../layouts/FullReview';
import ReviewsCollumn from '../components/ReviewsCollumn';
import Comments from '../layouts/Comments';
import { useParams } from 'react-router-dom';
import ReviewServices from '../services/ReviewServices';
import { IReview } from '../types/review/Review';
import RatePanel from '../components/RatePanel';
import { useAppSelector } from '../redux/hooks';
import {selectUser} from "../redux/selectors";

const Review = () => {
    const { id } = useParams();
    const user = useAppSelector(selectUser);
    const [review, setReview] = useState<IReview | null>(null);
    const [similarReview, setSimilarReview] = useState<IReview[] | null>(null);

    useEffect(() => {
        if (id) {
            const fetchReview = async () => {
                const resp = await ReviewServices.getById(id, user?.id);
                setReview(resp);
            };

            fetchReview();
        }
    }, [id, user]);

    useEffect(() => {
        if (review && review.productId) {
            const fetchSimilar = async () => {
                const resp = await ReviewServices.getSimilar(review.productId);
                setSimilarReview(resp);
            };

            fetchSimilar();
        }
    }, [review]);

    return (
        <Paper sx={{ borderRadius: '0px', height: '100%' }}>
            <Container maxWidth="lg">
                <Header />
                <Grid container sx={{ pt: '32px' }}>
                    <Grid item xs={12} lg={8} sx={{ paddingRight: '26px' }}>
                        <Box>
                            {review !== null ? (
                                <>
                                    <FullReview review={review} />
                                    {typeof review.reviewerRate !== 'undefined' && review.likes && (
                                        <RatePanel
                                            reviewId={review.id}
                                            authorId={review.author}
                                            productId={review.product.id}
                                            rate={review.reviewerRate}
                                            likes={review.likes.includes(user?.id || '')}
                                        />
                                    )}
                                    {review.id && <Comments reviewId={review.id} />}
                                </>
                            ) : (
                                <Skeleton height={'1000px'} />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <ReviewsCollumn
                            isCollumn={true}
                            collumnContent={similarReview}
                            collumnTitle={'Similar Review by composition'}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
};

export default Review;
