import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Autocomplete,
    Rating,
    Paper,
    Button,
    Box, Typography,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from "react-dropzone";
import ReviewServices from "../services/ReviewServices";
import {useDebounce} from "../utils/debounce";
import CompositionService from "../services/compositionService";
import {IComposition} from "../types/common";

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
    const [imgUrl, setImgUrl] = useState<string>('')
    const [compOpt, setCompOpt] = useState<IComposition[]>([])
    const [isDisable, setDisable] = useState<boolean>(false)

    const debounceCompositions = useDebounce(fetchCompositions, 1000)

    async function fetchCompositions() {
        const category = getValues("category").toLowerCase()
        const composition = getValues("composition")
        console.log(composition)
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
        const formData = getValues();
        console.log(formData)
        await ReviewServices.create(formData)
    };

    return (
        <Paper sx={{p:'20px'}}>
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

                <TextField {...register("title")} sx={{m:'30px 0'}} label="Title" variant="outlined" fullWidth />

                <Box sx={{ display: 'flex', width: '70%', justifyContent: 'space-between' }}>
                    <Autocomplete
                        sx={{ width: '100%', mr: '30px' }}
                        options={categories}
                        onChange={(_, newValue) => newValue !== null ? setDisable(true) : setDisable(false) }
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField {...params} {...register("category")} label="category" variant="outlined" fullWidth />
                        )}
                    />
                    <Autocomplete
                        sx={{width:'100%'}}
                        {...register("composition")}
                        onInputChange={(_, newValue) => {
                            debounceCompositions(newValue);
                        }}
                        options={compOpt}
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
                            setValue('composition', value !== null ? {title: value.title, id: value.id} : '');
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register("composition.title")}
                                label="composition"
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
                    options={tags.map((tag) => tag.title)}
                    filterSelectedOptions
                    onChange={(_, newValue) => {
                        setValue('tags', newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tags"
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
                                defaultValue={0}
                                precision={0.5}
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
        </Paper>
    );
}

export default ReviewForm;
