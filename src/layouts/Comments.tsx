import { Box, Skeleton, Typography } from "@mui/material";
import CommentCreator from "../components/CommentCreator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FC, useEffect } from "react";
import { fetchComments } from "../redux/slices/commentsSlice";
import CommentCard from "../components/CommentCard";
import {ReviewId} from "../types/common";

interface ICommentsProp {
    reviewId: ReviewId;
}

const Comments: FC<ICommentsProp> = ({ reviewId }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const { comments, status } = useAppSelector((state) => state.comments);

    useEffect(() => {
        dispatch(fetchComments(reviewId));
    }, []);

    return (
        <Box>
            <Typography sx={{ mb: "40px" }} variant={"h3"}>
                Comments
            </Typography>
            {user && <CommentCreator review={reviewId} author={user} />}
            {status === 'loaded' ? (
                comments.map((el) => (
                    <CommentCard
                        author={el.user}
                        createdAt={el.createdAt}
                        text={el.text}
                    />
                ))
            ) : (
                    <Skeleton height={"200px"} />
            )}
        </Box>
    );
};

export default Comments;
