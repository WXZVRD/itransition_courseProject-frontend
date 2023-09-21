import {Button, Container, Paper, Toolbar, Typography} from "@mui/material";
import Header from "../layouts/Header";
import {DataGrid} from "@mui/x-data-grid";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {useAppSelector} from "../redux/hooks";

const reviews = [
    {
        id: 1,
        avatar: 'https://t3.ftcdn.net/jpg/05/81/21/88/360_F_581218825_jgHnhuy2O2URUpHL8zmfIutzzmCoeGRh.jpg',
        name: 'Alice Johnson',
        isAdmin: false,
        isBlocked: false,
        likes: 12,
    },
    {
        id: 2,
        avatar: 'https://avatarfiles.alphacoders.com/190/190400.jpg',
        name: 'Bob Smith',
        isAdmin: true,
        isBlocked: false,
        likes: 45,
    },
    {
        id: 3,
        avatar: 'https://t4.ftcdn.net/jpg/05/83/64/15/360_F_583641514_Lq6e2rbkErV2DUUSG8bX6jBTZaLVSd3s.jpg',
        name: 'Charlie Brown',
        isAdmin: true,
        isBlocked: true,
        likes: 8,
    },
    {
        id: 4,
        avatar: 'https://i.pinimg.com/736x/8a/4f/26/8a4f262dde3da987527fb0760ab95df8.jpg',
        name: 'David Wilson',
        isAdmin: false,
        isBlocked: true,
        likes: 23,
    },
    {
        id: 5,
        avatar: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2418b422-e4a0-471e-95b7-d2d3cfc9eb4b/d6coadk-d9184a90-1f05-4bdd-8332-8283a4df77a3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MThiNDIyLWU0YTAtNDcxZS05NWI3LWQyZDNjZmM5ZWI0YlwvZDZjb2Fkay1kOTE4NGE5MC0xZjA1LTRiZGQtODMzMi04MjgzYTRkZjc3YTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.B2Ctqvw1Dj2ZXqRIOxsncBAETqSJxFs0o_7PWmxqXOc',
        name: 'Eve Davis',
        isAdmin: false,
        isBlocked: false,
        likes: 37,
    },
    {
        id: 6,
        avatar: 'https://example.com/avatar6.jpg',
        name: 'Frank White',
        isAdmin: true,
        isBlocked: false,
        likes: 19,
    },
    {
        id: 7,
        avatar: 'https://example.com/avatar7.jpg',
        name: 'Grace Clark',
        isAdmin: false,
        isBlocked: true,
        likes: 51,
    },
    {
        id: 8,
        avatar: 'https://example.com/avatar8.jpg',
        name: 'Hannah Lee',
        isAdmin: true,
        isBlocked: false,
        likes: 6,
    },
    {
        id: 9,
        avatar: 'https://example.com/avatar9.jpg',
        name: 'Isaac Davis',
        isAdmin: false,
        isBlocked: false,
        likes: 29,
    },
    {
        id: 10,
        avatar: 'https://example.com/avatar10.jpg',
        name: 'Jack Taylor',
        isAdmin: true,
        isBlocked: true,
        likes: 14,
    },
];

const header = [
    {
        field: 'avatar',
        headerName: 'AVATAR',
        width: 120,
        renderCell: (params: any) => (
            <Avatar  src={params.value}/>
        )
    },
    {
        field: 'name',
        headerName: 'FULL NAME',
        width: 250,
        renderCell: (params: any) => (
            <Link
                to={`/profile/${params.row.id}`}
                style={{ textDecoration: 'none', color: 'inherit', cursor:'pointer' }}
            >
                {params.value}
            </Link>
        ),
    },
    {
        field: 'isAdmin',
        headerName: 'ROLE',
        width: 250,
        valueGetter: (params: any) => params.row.isAdmin ? 'ADMIN' : 'USER'
    },
    {
        field: 'isBlocked',
        headerName: 'STATUS',
        width: 250,
        valueGetter: (params: any) => params.row.isBlocked ? 'BLOCKED' : 'ACTIVE'
    },
    { field: 'likes', headerName: 'LIKES', width: 220 },
];

const Admin = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleSelectionChange = (newSelection: any) => {
        setSelectedItems(newSelection.selectionModel as number[]);
    };

    console.log(isAuth)

    return(
        <Paper sx={{width:'100%', borderRadius:0, height:'100%', pb:'132px'}}>
            <Container maxWidth="lg">
                <Header />
                <Typography sx={{m:'20px 0'}} variant={"h1"}>Admin Panel</Typography>
                <Toolbar sx={{maxWidth:'500px', width:'100%', justifyContent:'space-between', mb:'20px'}}>
                    <Button variant={"contained"}>Delete</Button>
                    <Button variant={"contained"}>Block</Button>
                    <Button variant={"contained"}>Unblock</Button>
                    <Button variant={"contained"}>Make admin</Button>
                </Toolbar>
                <DataGrid
                    rows={reviews}
                    columns={header}
                    onRowSelectionModelChange={handleSelectionChange}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 6},
                        },
                    }}
                    pageSizeOptions={[2, 4, 6, 8]}
                    checkboxSelection
                />
            </Container>
        </Paper>
    )
}


export default Admin