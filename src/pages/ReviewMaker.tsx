import {Container, Paper} from "@mui/material";
import Header from "../layouts/Header";
import ReviewForm from "../layouts/ReviewForm";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {selectIsAuth} from "../redux/selectors";

const ReviewMaker = () => {
    const navigate = useNavigate()
    const isAuth = useAppSelector(selectIsAuth)


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