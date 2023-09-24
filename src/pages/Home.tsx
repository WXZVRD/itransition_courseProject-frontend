import Header from "../layouts/Header";
import {Container, Paper} from "@mui/material";
import TagCloud from "../layouts/TagCloud";
import ReviewsTable from "../layouts/ReviewsTable";
import {useAppSelector} from "../redux/hooks";
import {selectUser} from "../redux/selectors";
import BlockNotify from "../layouts/BlockNotify";

function Profile() {
    const user = useAppSelector(selectUser)
    return (
        <Paper sx={{borderRadius:'0px', pb:'40px', height:'100%'}}>
            <Container maxWidth="lg">
                { user && user.isBlocked
                 ? (
                     <BlockNotify/>
                    )
                : (
                    <>
                        <Header/>
                        <TagCloud/>
                        <ReviewsTable/>
                    </>
                    )}
            </Container>
        </Paper>
    );
}

export default Profile;
