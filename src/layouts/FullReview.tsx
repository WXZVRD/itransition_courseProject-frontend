import {Box, Typography} from "@mui/material";
import {FC} from "react";
import Tag from "../components/Tag";
import AuthorInfo from "../components/AuthorInfo";
import {IReview} from "../types/review/Review";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import StarIcon from "@mui/icons-material/Star";


interface IFullReviewProp {
    review: IReview,
}

const FullReview: FC<IFullReviewProp> = ({ review }) => {
    console.log(review)
    const modules = {
        toolbar: false,
    };

    return(
        <Box sx={{width:'100%', maxWidth:'742px', height:'100%', pb:'80px'}}>
                {review.tags.map(tag => <Tag title={tag}/>)}
            <Typography
                variant={"body2"}
                sx={{
                    display:'flex',
                    m:'20px 0',
                    alignItems:'center'}}>
                <StarIcon sx={{mr:'5px', color:'#ECB43C'}}/>
                {Math.floor(review.product.averageRating * 10) / 10} {review.product.title}
            </Typography>
            <Typography sx={{mb:'20px'}} variant={"h1"}>{ review.title }</Typography>
                {review && review.user && review.createdAt && (
                    <AuthorInfo
                        author={review.user}
                        createdAt={review.createdAt}
                    />
                )}
                <img src={review.img} alt={review.title} style={{
                    marginTop:'10px',
                    width:'100%',
                    maxHeight: '462px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius:'6px'
                }}/>
            <div>
                <ReactQuill
                    value={review.text}
                    readOnly={true}
                    theme="bubble"
                    modules={modules}
                />
            </div>
        </Box>
    )
}

export default FullReview