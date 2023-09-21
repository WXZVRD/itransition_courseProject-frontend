import {Typography, Paper} from "@mui/material";
import { FC } from "react";
import {highlightText} from "../utils/markText";
import {Link} from "react-router-dom";

interface IMiniCommentProp {
    id: string,
    createdAt: string,
    text: string,
    searchText: string
}

const MiniComment: FC<IMiniCommentProp> = ({ id, createdAt , text, searchText }) => {

    return (
        <Link to={`/post/${id}`} style={{ textDecoration: 'none' }}>
                <Paper sx={{display:'flex', flexDirection:'column', p:'10px', width:'279px'}}>
                    <Typography variant={"body2"} >{ createdAt }</Typography>

                    <Typography variant="body1" sx={{ fontSize: '12px', maxWidth: '200px', overflowWrap: 'break-word' }}>
                        <Typography component="span" variant="inherit" dangerouslySetInnerHTML={{ __html: highlightText(text, searchText).slice(0, 100) }} />
                    </Typography>
                </Paper>
        </Link>
    )
}

export default MiniComment;
