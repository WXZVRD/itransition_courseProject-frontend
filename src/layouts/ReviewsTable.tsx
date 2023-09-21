import {Box} from "@mui/material";
import ReviewsCollumn from "../components/ReviewsCollumn";
import {useEffect, useState} from "react";
import ProductServices from "../services/ReviewServices";
import {IReview} from "../types/review/Review";


const ReviewsTable = () => {

    const [latestReviews, setLatestReview] = useState<IReview[] | null>(null)
    const [ratedReviews, setRatedReview] = useState<IReview[] | null>(null)

    useEffect(() => {
        const getLatestReview = async () => {
            const latestReviewResp = await ProductServices.getLatest()
            setLatestReview(latestReviewResp)
        }
        const getRatedReview = async () => {
            const ratedReviewResp = await ProductServices.getTopRated()
            setRatedReview(ratedReviewResp)
        }

        getLatestReview()
        getRatedReview()
    }, [])

    return(
        <Box>

            <ReviewsCollumn isCollumn={false} collumnTitle={"Latest reviews"} collumnContent={latestReviews} />

            <ReviewsCollumn isCollumn={false} collumnTitle={"Most rated reviews"} collumnContent={ratedReviews} />

        </Box>
    )
}

export default ReviewsTable