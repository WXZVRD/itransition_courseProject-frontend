import {Box, Grid, Skeleton, Typography} from "@mui/material";
import { FC } from "react";
import ReviewCard from "./ReviewCard";
import {IReview} from "../types/review/Review";

interface IReviewCollumnProp {
    collumnTitle: string;
    collumnContent: IReview[] | null;
    isCollumn: boolean
}

const ReviewsCollumn: FC<IReviewCollumnProp> = ({ collumnTitle, collumnContent = null, isCollumn }) => {
    return (
        <Box sx={{pt:'32px'}}>
            <Typography variant={"h3"} fontWeight={700} mb={'32px'}>{collumnTitle}</Typography>
            { collumnContent
            ? (<Grid
                    style={isCollumn ? { flexDirection: "column" } : {}}
                    container spacing={8} justifyContent={"center"}>
                    {collumnContent.map((review, index) => (
                        <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                            <ReviewCard review={review} />
                        </Grid>
                    ))}
                </Grid>)
            : (<Grid
                    style={isCollumn ? { flexDirection: "column" } : {}}
                    container spacing={8} justifyContent={"center"}>
                    {Array(6).fill( null).map((_, index) => (
                        <Grid item key={index} xs={12} sm={8} md={6} lg={4}>
                            <Skeleton width={"400px"} height={"500px"}></Skeleton>
                        </Grid>
                    ))}
                </Grid>)}
        </Box>
    );
}

export default ReviewsCollumn;
