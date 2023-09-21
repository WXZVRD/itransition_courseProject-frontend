import {CardContent, Typography, Paper } from "@mui/material";
import { FC } from "react";

import {highlightText} from "../utils/markText";
import {Link} from "react-router-dom";

interface IMiniReviewProp {
    id: string,
    img: string,
    title: string,
    text: string,
    searchText: string
}

const MiniReview: FC<IMiniReviewProp> = ({ id, img, title, text, searchText }) => {

    return (
        <Link to={`/post/${id}`} style={{ textDecoration: 'none' }}>

        <Paper sx={{display:'flex', flexDirection:'column', p:'10px'}}>
            <img
                alt={title}
                src={img}
                style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '5px'
                }}
                title="Review Image"
            />
            <CardContent>
                <Typography variant="h6" sx={{ fontSize: '16px', overflowWrap: 'break-word', mb: '5px' }}>
                    <Typography component="span" variant="inherit" dangerouslySetInnerHTML={{ __html: highlightText(title, searchText).slice(0, 120) }} />
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '12px', maxWidth: '200px', overflowWrap: 'break-word' }}>
                    <Typography component="span" variant="inherit" dangerouslySetInnerHTML={{ __html: highlightText(text, searchText).slice(0, 120) }} />
                </Typography>
            </CardContent>
        </Paper>
        </Link>
    )
}

export default MiniReview;
