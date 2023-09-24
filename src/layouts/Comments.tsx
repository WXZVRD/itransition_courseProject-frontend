import { Box, Skeleton, Typography } from "@mui/material";
import CommentCreator from "../components/CommentCreator";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FC, useEffect } from "react";
import {fetchComments} from "../redux/slices/commentsSlice";
import CommentCard from "../components/CommentCard";
import { ReviewId } from "../types/common";
import {selectComments, selectCommentsStatus, selectUser} from "../redux/selectors"

interface ICommentsProp {
    reviewId: ReviewId;
}

const Comments: FC<ICommentsProp> = ({ reviewId }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const comments = useAppSelector(selectComments)
    const status = useAppSelector(selectCommentsStatus)

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
                comments.length > 0 ? (
                    comments.map((el) => (
                        <CommentCard
                            key={el.id}
                            author={el.user}
                            createdAt={el.createdAt}
                            text={el.text}
                        />
                    ))
                ) : (
                    !user && <Typography variant="body1" sx={{mb:'40px'}}>Already no any comment.</Typography>
                )
            ) : (
                <Skeleton height={"200px"} />
            )}
        </Box>
    );
};

export default Comments;
