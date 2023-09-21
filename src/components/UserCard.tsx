import {Box, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {FC} from "react";

interface IAuthor {
    authorImg: string,
    authorName: string,
    likes: number
}

interface IUserCard {
    user: IAuthor
}

const UserCard: FC<IUserCard> = ({ user }) => {
    return(
        <Box>
            <Box sx={{borderRadius:'8px', bgcolor:'#242535', display:'flex', width:'100%', justifyContent:'center', alignItems:'center', p:'48px', m:'24px 0 12px 0'}}>
                <Avatar sx={{height:'64px', width:'64px', mr:'12px'}} alt={user.authorImg} src={user.authorImg} />
                <Box>
                    <Typography variant={"body2"}>{user.authorName}</Typography>
                    <Typography variant={"body1"} sx={{alignItems:'center', display:'flex'}}><FavoriteIcon sx={{mr:'8px', color:'#FF2D55'}}/>{user.likes}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default UserCard