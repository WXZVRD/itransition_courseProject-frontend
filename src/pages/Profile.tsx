import {Button, Container, Paper, Toolbar} from "@mui/material";
import Header from "../layouts/Header";
import React, {useState} from "react";
import UserCard from "../components/UserCard";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";

const header = [
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        renderCell: (params: any) => (
            <Link
                to={`/post/${params.row.id}`}
                style={{ textDecoration: 'none', color: 'inherit', cursor:'pointer' }}
            >
                {params.value}
            </Link>
        ),
    },
    { field: 'composition', headerName: 'Composition', width: 250 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'avgRating', headerName: 'Average Rating', width: 150 },
];

const reviews = [
    {
        id: 1,
        title: 'Review 1',
        composition: 'Twisted Metal',
        type: 'Game',
        createdAt: '20 August, 2023',
        avgRating: '3.56'
    },
    {
        id: 2,
        title: 'Review 2',
        composition: 'Red Dead Redemption 2',
        type: 'Game',
        createdAt: '15 August, 2023',
        avgRating: '4.78'
    },
    {
        id: 3,
        title: 'Review 3',
        composition: 'The Lord of the Rings',
        type: 'Movie',
        createdAt: '10 August, 2023',
        avgRating: '4.2'
    },
    {
        id: 4,
        title: 'Review 4',
        composition: 'Harry Potter and the Sorcerer\'s Stone',
        type: 'Book',
        createdAt: '5 August, 2023',
        avgRating: '4.9'
    },
    {
        id: 5,
        title: 'Review 5',
        composition: 'Breaking Bad',
        type: 'TV Show',
        createdAt: '2 August, 2023',
        avgRating: '4.6'
    },
    {
        id: 6,
        title: 'Review 6',
        composition: 'The Witcher 3: Wild Hunt',
        type: 'Game',
        createdAt: '1 August, 2023',
        avgRating: '4.7'
    },
    {
        id: 7,
        title: 'Review 7',
        composition: 'Sherlock Holmes',
        type: 'Book',
        createdAt: '28 July, 2023',
        avgRating: '4.4'
    },
    {
        id: 8,
        title: 'Review 8',
        composition: 'Inception',
        type: 'Movie',
        createdAt: '25 July, 2023',
        avgRating: '4.8'
    },
    {
        id: 9,
        title: 'Review 9',
        composition: 'Game of Thrones',
        type: 'TV Show',
        createdAt: '22 July, 2023',
        avgRating: '4.5'
    },
    {
        id: 10,
        title: 'Review 10',
        composition: 'Pride and Prejudice',
        type: 'Book',
        createdAt: '20 July, 2023',
        avgRating: '4.0'
    }
];

const author = {
    authorImg: 'https://wallpaperaccess.com/full/395934.jpg',
    authorName: 'Kiril Horih',
    likes: 5
}

const Profile = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleSelectionChange = (newSelection: any) => {
        setSelectedItems(newSelection.selectionModel as number[]);
    };

    return (
        <Paper sx={{ borderRadius: '0px', height: '100vh' }}>
            <Container maxWidth="lg">
                <Header />
                <UserCard user={author} />
                <Toolbar>
                    <Button variant={"contained"}>Delete</Button>
                </Toolbar>
                <DataGrid
                    rows={reviews}
                    columns={header}
                    onRowSelectionModelChange={handleSelectionChange}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Container>
        </Paper>
    )
}

export default Profile;
