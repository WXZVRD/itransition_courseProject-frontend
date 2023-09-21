import { Paper, Button } from "@mui/material";
import AuthorInfo from "./AuthorInfo";
import {ChangeEvent, FC, useState} from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IAuthor } from "../types/user/User";
import { useAppDispatch } from "../redux/hooks";
import { createComment } from "../redux/slices/commentsSlice";

interface ICommentCardProp {
    author: IAuthor;
    review: string;
}

const CommentCreator: FC<ICommentCardProp> = ({ review, author }) => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>("");

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
                placeholder={"Make the history, leave the comment"}
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
                Submit
            </Button>
        </Paper>
    );
};

export default CommentCreator;
