import React, {FC, useState} from 'react';
import TextField from '@mui/material/TextField';
import ProductServices from "../services/ReviewServices";
import {useDebounce} from "../utils/debounce";
import MiniReview from "./miniReview";
import {Box, Card} from "@mui/material";
import {formatDate} from "../utils/formateDate";
import MiniComment from "./miniComment";

const Search: FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const debouncedSearch = useDebounce(search, 500)

    async function search(query: string) {
        const response = await ProductServices.search(query)
        setSearchResults(response)
    }

    const onchange = (value: string) => {
        setSearchText(value)
        console.log('OnChange!')
        console.log(searchResults)
        debouncedSearch(value)
    }

    return (
        <Box sx={{position:'relative'}}>
            <TextField
                sx={{ width: '250px', mr:'15px' }}
                size={"small"}
                placeholder={'Fulltext search'}
                fullWidth
                value={searchText}
                onChange={e => onchange(e.target.value)}
            />

            {searchResults && searchResults.length > 0 && (
                    <Card sx={{ zIndex:'10',
                        position: 'absolute',
                        top: '40px',
                        left: '0',
                        maxHeight:'570px',
                        overflowY:'auto',
                        maxWidth: '249px',
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#fff',
                            borderRadius: '3px',
                        },
                    }}>
                        {searchResults.map((result, index) =>(
                            result._index === 'reviews'
                            ? (<MiniReview
                                        key={index}
                                        id={result._source.id}
                                        title={result._source.title}
                                        img={result._source.img}
                                        text={result._source.text}
                                        searchText={searchText}
                                    />
                                ) : (
                                    <MiniComment
                                        key={index}
                                        id={result._source.reviewId}
                                        searchText={searchText}
                                        createdAt={formatDate(result._source.createdAt)}
                                        text={result._source.text}
                                    />
                                )
                        ))}
                    </Card>
            )}

        </Box>
    );
};

export default Search;
