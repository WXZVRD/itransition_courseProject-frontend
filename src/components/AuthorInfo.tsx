import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {FC} from "react";
import {formatDate} from "../utils/formateDate";
import {IAuthor} from "../types/user/User";

interface IAuthorInfoProp {
    author: IAuthor,
    createdAt?: string
}

const AuthorInfo: FC<IAuthorInfoProp> = ({ author, createdAt }) => {


    return(
        <Box sx={{justifyContent:'space-between', display:'flex', alignItems:'end', maxWidth:'360px'}}>
            <Box sx={{display:'flex', maxWidth:'189px', width:'100%'}}>
                <Avatar sx={{mr:'12px'}} alt={author.name} src={author.avatar} />
                <Box>
                    <Typography variant={"body2"}>{author.name} {author.secondName}</Typography>
                    <Typography variant={"body1"} sx={{alignItems:'center', display:'flex'}}><FavoriteIcon sx={{mr:'8px', color:'#FF2D55'}}/>{author.likes}</Typography>
                </Box>
            </Box>
            {createdAt && <Typography>{formatDate(createdAt)}</Typography>}
        </Box>

)
}

export default AuthorInfo