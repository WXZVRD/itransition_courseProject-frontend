import {Container, Paper} from "@mui/material";
import Header from "../layouts/Header";
import ReviewForm from "../layouts/ReviewForm";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";

const ReviewMaker = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.isAuth)


    useEffect(() => {
        if (!isAuth){
            navigate('/')
        }
    }, [])

    return(
        <Paper sx={{width:'100%', borderRadius:0, height:'100%', pb:'40px'}}>
            <Container maxWidth={"lg"}>
                <Header/>
                <ReviewForm/>
            </Container>
        </Paper>
    )
}


export default ReviewMaker