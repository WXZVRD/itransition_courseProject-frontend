import {Box, Button, CircularProgress, Container, Paper, Toolbar, Typography} from "@mui/material";
import Header from "../layouts/Header";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {blockUsers, deleteUsers, fetchUsers, makeAdmin, unblockUsers} from "../redux/slices/userSlice";
import {STATUS} from "../types/common";
import {DataGrid} from "@mui/x-data-grid";
import {IUser} from "../types/user/User";
import UserServices from "../services/userServices";

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

function checkHaveBlocked(userList: IUser[], selected: string[]) {
    if (selected){
        return selected.some(userId => {
            const selectedUser = userList.find(user => user.id === userId);
            return selectedUser && selectedUser.isBlocked;
        });
    }
}

function checkHaveUnblocked(userList: IUser[], selected: string[]) {
    if (selected){
        return selected.some(userId => {
            const selectedUser = userList.find(user => user.id === userId);
            return selectedUser && !selectedUser.isBlocked;
        });
    }
}

function checkIsAdmin(userList: IUser[], selected: string[]) {
    if (selected){
        return selected.some(userId => {
            const selectedUser = userList.find(user => user.id === userId);
            return selectedUser && selectedUser.isAdmin;
        });
    }
}

const Admin = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const { status, usersList } = useAppSelector(state => state.user)

    const handleSelectionChange = (newSelection: any) => {
        setSelectedItems(newSelection);
    };

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const handleDelete = async () => {
        dispatch(deleteUsers(selectedItems))
    }

    const handleBlock = async () => {
        dispatch(blockUsers(selectedItems))
    }

    const handleUnblock = async () => {
        dispatch(unblockUsers(selectedItems))
    }

    const handleMakeAdmin= async () => {
        dispatch(makeAdmin(selectedItems))
    }

    return(
        <Paper sx={{width:'100%', borderRadius:0, height:'100%', pb:'132px'}}>
            <Container maxWidth="lg">
                <Header />
                <Typography sx={{m:'20px 0'}} variant={"h1"}>Admin Panel</Typography>
                { status === STATUS.LOADING
                ? (
                        <Box sx={{mt:'100px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                            <CircularProgress />
                        </Box>
                    )
                : (
                    <>
                        <Toolbar sx={{maxWidth:'500px', width:'100%', justifyContent:'space-between', mb:'20px'}}>
                            <Button
                                onClick={handleDelete}
                                variant={"contained"}>
                                Delete
                            </Button>
                            <Button
                                disabled={checkHaveBlocked(usersList, selectedItems) as boolean}
                                onClick={handleBlock}
                                variant={"contained"}>
                                Block
                            </Button>
                            <Button
                                disabled={checkHaveUnblocked(usersList, selectedItems) as boolean}
                                onClick={handleUnblock}
                                variant={"contained"}>
                                Unblock</Button>
                            <Button
                                disabled={checkIsAdmin(usersList, selectedItems) as boolean}
                                onClick={handleMakeAdmin}
                                variant={"contained"}>
                                Make admin</Button>
                        </Toolbar>
                        <DataGrid
                            rows={usersList}
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
                    </>
                    )}
            </Container>
        </Paper>
    )
}


export default Admin