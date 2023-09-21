import Header from "../layouts/Header";
import {Container, Paper} from "@mui/material";
import TagCloud from "../layouts/TagCloud";
import ReviewsTable from "../layouts/ReviewsTable";

function Profile() {

    return (
        <Paper sx={{borderRadius:'0px', pb:'40px'}}>
            <Container maxWidth="lg">
                <Header/>
                <TagCloud/>
                <ReviewsTable/>
            </Container>
        </Paper>
    );
}

export default Profile;
