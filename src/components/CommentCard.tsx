import {Paper, Typography} from "@mui/material";
import AuthorInfo from "./AuthorInfo";
import {FC} from "react";
import {IAuthor} from "../types/user/User";

interface ICommentCardProp {
    author?: IAuthor,
    createdAt: string,
    text: string
}

const CommentCard:FC<ICommentCardProp> = ({ author, text, createdAt }) => {
    return(
        <Paper sx={{display:'flex', flexDirection:'column', p:'20px', mb:'30px'}}>
            { author && <AuthorInfo author={author} createdAt={createdAt}/>}
            { !author && <Typography variant={"body2"}>{ createdAt }</Typography>}
            <Typography variant={"body1"} mt={"15px"}>{ text }</Typography>
        </Paper>
    )
}

export default CommentCard