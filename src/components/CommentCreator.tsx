import { Paper, Button } from "@mui/material";
import AuthorInfo from "./AuthorInfo";
import {ChangeEvent, FC, useState} from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IAuthor } from "../types/user/User";
import { useAppDispatch } from "../redux/hooks";
import { createComment } from "../redux/slices/commentsSlice";
import {useIntl} from "react-intl";

interface ICommentCardProp {
    author: IAuthor;
    review: string;
}

const CommentCreator: FC<ICommentCardProp> = ({ review, author }) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>("");
    const intl = useIntl();
    const commentPlaceholder = intl.formatMessage({ id: 'comment.placeholder' });
    const submitBtn = intl.formatMessage({ id: 'submit.btn' });

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        const commentData = {
            reviewId: review,
            text: text
        }
        dispatch(createComment(commentData));
    };

    return (
        <Paper sx={{ display: "flex", flexDirection: "column", p: "20px", mb: "30px" }}>
            <AuthorInfo author={author} />
            <TextField
                sx={{ mt: "20px" }}
                onChange={handleTextChange}
                placeholder={commentPlaceholder}
                variant={"outlined"}
                multiline={true}
                value={text}
            />
            <Button
                sx={{ mt: "10px", alignSelf: "flex-end" }}
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                startIcon={<SendIcon />}
            >
                {submitBtn}
            </Button>
        </Paper>
    );
};

export default CommentCreator;
