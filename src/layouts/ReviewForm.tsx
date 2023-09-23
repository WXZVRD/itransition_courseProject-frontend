import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Autocomplete,
    Rating,
    Paper,
    Button,
    Box, Typography, CircularProgress,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import ReviewServices from "../services/ReviewServices";
import {useDebounce} from "../utils/debounce";
import CompositionService from "../services/compositionService";
import {IComposition} from "../types/common";
import {useNavigate, useParams} from "react-router-dom";
import {IProduct} from "../types/product/product";

const categories = [
    { label: 'Books' },
    { label: 'Games' },
    { label: 'Films' },
];

const tags = [
    { title: 'Action' },
    { title: 'Adventure' },
    { title: 'Fantasy' },
    { title: 'Sci-Fi' },
    { title: 'Mystery' },
    { title: 'Horror' },
    { title: 'Romance' },
    { title: 'Thriller' },
    { title: 'Comedy' },
    { title: 'Drama' },
    { title: 'History' },
    { title: 'Biography' },
    { title: 'Self-Help' },
    { title: 'Science Fiction' },
    { title: 'Fantasy' },
    { title: 'Gaming' },
    { title: 'Role-Playing' },
    { title: 'Classic' },
    { title: 'Young Adult' },
    { title: 'Animation' },
];

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
];

function ReviewForm() {
    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        register,
    } = useForm();
    const navigate = useNavigate()
    const { id } = useParams()
    const [imgUrl, setImgUrl] = useState<string>('')
    const [compOpt, setCompOpt] = useState<IComposition[]>([])
    const [category, setCategory] = useState<string>('')
    const [composition, setComposition] = useState<IComposition | null>(null)
    const [ttags, setTtags] = useState<string[]>([])
    const [isDisable, setDisable] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const debounceCompositions = useDebounce(fetchCompositions, 1000)

    useEffect(() => {
        const fetchReview = async () => {
            if (id) {
                const res = await ReviewServices.getById(id)
                setValue("img", res.img)
                { res.img && setImgUrl(res.img)}
                setValue("title", res.title)
                setValue("category", res.product.type)
                setCategory(res.product.type)
                setDisable(true)
                setValue("composition", res.product)
                setComposition(res.product)
                setValue("tags", res.tags)
                setTtags(res.tags)
                setValue("text", res.text)
                setValue("rating", res.grade)
                setIsLoading(false)
                console.log(getValues())
            } else {
                setIsLoading(false)
            }
        }

        fetchReview()
    }, [id])


    async function fetchCompositions() {
        const category = getValues("category").toLowerCase()
        const composition = getValues("composition")
        const response = await CompositionService.getOne(category, composition.title || composition)
        setCompOpt(response)
    }

    const onSubmit = (data:any) => {
        console.log(data);
    };

    const onImageDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const ImgURL = await ReviewServices.uploadImg(file);
        setImgUrl(ImgURL);
        setValue("img", ImgURL)
    };

    const removeImage = () => {
        setImgUrl('');
        setValue("img", '');
    };

    const handleFormSubmit = async () => {
        if (id){
            const formData = getValues();
            const form = {
                id: id,
                ...formData
            }

            console.log(form)
            await ReviewServices.update(form)
        } else{
            const formData = getValues();
            console.log(formData)
            await ReviewServices.create(formData)
        }
        navigate('/')
    };

    return (
        <Paper sx={{p:'20px'}}>
            { !isLoading
            ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        { !imgUrl
                            ? (
                                <Dropzone {...register("img")} onDrop={onImageDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <Paper sx={{p:'40px', justifyContent:'center', alignItems:'center', border:'dashed 2px gray'}} {...getRootProps()} >
                                            <input {...getInputProps()} name="img" />
                                            <Typography variant={"body2"}>Drag files, or click to select</Typography>
                                        </Paper>
                                    )}
                                </Dropzone>
                            )
                            : (
                                <Box>
                                    <img style={{maxWidth:'1110px', width:'100%', borderRadius:"10px"}} src={imgUrl} alt="Image"/>
                                    <Button sx={{mt:'10px'}} variant={"contained"} onClick={removeImage}>Delete</Button>
                                </Box>
                            )}

                        <TextField
                            {...register("title")}
                            InputLabelProps={{
                                shrink: Boolean(getValues('title')),
                            }}
                            sx={{m:'30px 0'}}
                            variant={"outlined"}
                            label="Title"
                            fullWidth />

                        <Box sx={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>
                            <Autocomplete
                                sx={{ width: '100%', mr: '30px' }}
                                options={categories}
                                value={{ label: category }}
                                onChange={(_, newValue) => {
                                    setCategory(newValue ? newValue.label : '');
                                    setDisable(newValue !== null);
                                    setComposition(null);
                                    setValue('composition', '');
                                }}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...register("category")}
                                        variant={"outlined"}
                                        helperText={"*Choose category"}
                                        fullWidth />
                                )}
                            />
                            <Autocomplete
                                sx={{width:'100%'}}
                                {...register("composition")}
                                onInputChange={(_, newValue) => {
                                    debounceCompositions(newValue);
                                }}
                                options={compOpt}
                                value={{title: composition?.title || ''}}
                                disabled={!isDisable}
                                getOptionLabel={(option) => option.title}
                                noOptionsText="Not Found"
                                renderOption={(props, option) => (
                                    <Box component={"li"} sx={{height:'80px'}} {...props}>
                                        <img style={{backgroundSize:'cover', maxWidth:'40px', marginRight:'20px'}} src={option.cover} alt={option.title}/>
                                        <Box sx={{flexDireаction:'column'}}>
                                            <Typography sx={{color:'white'}} variant={"body2"}>{option.title}</Typography>
                                            <Typography variant={"body1"}>{option.author}</Typography>
                                        </Box>
                                    </Box>
                                )}
                                onChange={(_, value) => {
                                    setComposition(value)
                                    setValue('composition', value !== null ? {title: value.title, id: value.id} : '');
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        {...register("composition.title")}
                                        helperText={"*Choose composition"}
                                        variant="outlined"
                                        fullWidth />
                                )}
                            />

                        </Box>

                        <Autocomplete
                            {...register("tags")}
                            sx={{m:'30px 0'}}
                            multiple
                            freeSolo
                            id="tags-outlined"
                            value={ttags}
                            options={tags.map((tag) => tag.title)}
                            filterSelectedOptions
                            onChange={(_, newValue) => {
                                setValue('tags', newValue);
                                setTtags(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    helperText={"*Input tags"}
                                    defaultValue={getValues("tags")}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="text"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <ReactQuill
                                    {...field}
                                    theme="snow"
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)}
                                    style={{height:'300px', marginBottom:'80px'}}
                                    modules={{
                                        toolbar: toolbarOptions
                                    }}
                                />
                            )}
                        />

                        <Box>
                            <Typography variant={"h6"}>Rate :</Typography>
                            <Controller
                                name="rating"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <Rating
                                        {...field}
                                        name="rating"
                                        onChange={(_, value) => {
                                            console.log(value);
                                            field.onChange(value);
                                        }}
                                        defaultValue={0}
                                        precision={0.5}
                                        max={10}
                                    />
                                )}
                            />
                        </Box>

                        <Button
                            onClick={handleFormSubmit}
                            sx={{ display: 'block', mt: '20px' }}
                            type="button"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                )
            : (
            <Box sx={{alignItems:'center', justifyContent:'center', height:'600px', width:'100%'}}>
                    <CircularProgress/>
                </Box>
                )}
        </Paper>
    );
}

export default ReviewForm;
