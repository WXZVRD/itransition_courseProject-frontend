import {Box, Button, CircularProgress, Container, Paper, Toolbar} from "@mui/material";
import Header from "../layouts/Header";
import React, {useEffect, useState} from "react";
import UserCard from "../components/UserCard";
import {Link, useParams} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {deleteReview, fetchReview} from "../redux/slices/reviewSlice";
import {STATUS} from "../types/common";
import {formatDate} from "../utils/formateDate";
import {IUser} from "../types/user/User";
import UserServices from "../services/userServices";


const Profile = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [user, setUser] = useState<IUser>()
    const me = useAppSelector(state => state.auth.user)
    const { reviewList, status } = useAppSelector(state => state.reviews)

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
        {
            field: 'product.title',
            headerName: 'Composition',
            width: 220,
            valueGetter: (params:any) => {
                return params.row.product?.title;
            },
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 120 },
        {
            field: 'grade',
            headerName: 'Grade',
            width: 120
        },
        {
            field: 'product.averageRating',
            headerName: 'AvgRating',
            width: 120,
            valueGetter: (params:any) => {
                return params.row.product?.averageRating;
            },
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 180,
            valueGetter: (params:any) => {
                return formatDate(params.row.createdAt);
            },
        },
        {
            field: 'edit',
            headerName: me && me.id === id || me?.isAdmin ? 'Edit' : '',
            width: 70,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
                me && me.id === id || me?.isAdmin ? (
                    <Link
                        to={`/post/edit/${params.row.id}`}
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
                    >
                        <Button sx={{ width: '100%' }}>Edit</Button>
                    </Link>
                ) : null
            ),
        },
    ];


    useEffect(() => {
        if (id){
            dispatch(fetchReview(id))
            const fetchUser = async () => {
                const res = await UserServices.getOneUser(id)
                setUser(res)
            }
            fetchUser()
        }
    }, [id])

    const handleSelectionChange = (newSelection: any) => {
        setSelectedItems(newSelection)
    };

    const handleDeleteSelected = async () => {
        dispatch(deleteReview(selectedItems))
    }

    return (
        <Paper sx={{ borderRadius: '0px', height: '100vh' }}>
            <Container maxWidth="lg">
                <Header />
                { user && <UserCard user={user} />}

                    {status === STATUS.LOADING ? (
                        <Box sx={{mt:'100px', display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                            <CircularProgress />
                        </Box>
                    ) : (
                       <>
                           {
                               me && me.id === id || me?.isAdmin ? (
                                   <Toolbar>
                                       <Button
                                           disabled={!selectedItems.length}
                                           onClick={handleDeleteSelected}
                                           variant="contained"
                                       >
                                           Delete
                                       </Button>
                                   </Toolbar>
                               ) : ''
                           }
                           <DataGrid
                               rows={reviewList}
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
                       </>
                    )}
            </Container>
        </Paper>
    )
}

export default Profile;
