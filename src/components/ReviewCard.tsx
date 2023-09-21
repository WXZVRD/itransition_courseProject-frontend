import {Box, Paper, Typography} from "@mui/material";
import {FC} from "react";

import StarIcon from '@mui/icons-material/Star';
import Tag from "./Tag";
import AuthorInfo from "./AuthorInfo";
import {Link} from "react-router-dom";
import {IReview} from "../types/review/Review";

interface IReviewCardProp {
    review: IReview
}

const ReviewCard: FC<IReviewCardProp> = ({ review }) => {

    return (
        <Paper sx={{ width: '380px', height:'520px', p: '16px',
            justifyContent:'space-between', display:'flex', flexDirection:'column', position:'relative' }}>
            <img src={review.img} alt="" style={{
                    width: '350px',
                    height: '240px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius:'6px'
                }}/>
            <Box sx={{ mb: '5px', mt: '10px' }}>
                {review.tags.slice(0, 3).map(el => <Tag key={el} title={el}/>)}
            </Box>
            <Typography
                variant={"body2"}
                sx={{
                    position:'absolute',
                    top:'23px',
                    right: '20px',
                    display:'flex',
                    alignItems:'center',
                    bgcolor:'#181a2a',
                    borderRadius: '5px',
                    p:'5px'
                }}>
                <StarIcon sx={{mr:'5px', color:'#ECB43C'}}/>
                {review.grade}
            </Typography>
            <Typography
                variant={"body2"}
                sx={{
                    display:'flex',
                    alignItems:'center'}}>
                <StarIcon sx={{mr:'5px', color:'#ECB43C'}}/>
                {Math.floor(review.product.averageRating * 10) / 10} {review.product.title}
            </Typography>
            <Link to={`/post/${review.id}`} style={{textDecoration:'none'}}>
                <Typography variant={"h3"} mb={'20px'}>{review.title}</Typography>
            </Link>
            {review.user && review.createdAt && <AuthorInfo  author={review.user} createdAt={review.createdAt}/>}
        </Paper>
    );
}


export default ReviewCard