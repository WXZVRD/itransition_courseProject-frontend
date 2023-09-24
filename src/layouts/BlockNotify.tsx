import {Box, Button, Typography} from "@mui/material";
import {useAppDispatch} from "../redux/hooks";
import {logout} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";


const BlockNotify = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Box sx={{height:'99vh', alignItems:'center', justifyContent:'center', display:'flex'}}>
            <Box sx={{textAlign:'center'}}>
                <Typography variant={"h1"}>You have beem blocked!</Typography>
                <Button onClick={handleLogout} sx={{mt:'60px'}} variant={"contained"}>Logout</Button>
            </Box>
        </Box>
    )
}

export default BlockNotify