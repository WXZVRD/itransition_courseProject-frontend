import { Stack, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewServices from "../services/ReviewServices";
import Skeleton from "@mui/material/Skeleton";
import Tag from "../components/Tag";
import {FormattedMessage} from "react-intl";

interface Tag {
    title: string;
}

const TagCloud = () => {
    const [tags, setTags] = useState<Tag[] | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            const tagList = await ReviewServices.getTags();
            setTags(tagList);
        };

        fetchTags();
    }, []);

    return (
        <Paper sx={{ width: "100%", p: "20px", mt: "20px" }}>
            <Typography variant={"h5"} sx={{ mb: "25px" }}>
                <FormattedMessage id={"tag.cloud"}/>
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: "20px" }} >
                {tags ? (
                    tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <Tag key={index} title={tag.title} />
                        ))
                    ) : (
                        <Typography variant="body1">Nothing to show.</Typography>
                    )
                ) : (
                    new Array(20).fill("").map((_, index) => (
                        <Skeleton key={index} sx={{ mr: "20px" }} width="40px" height={40} />
                    ))
                )}
            </Stack>
        </Paper>
    );
};

export default TagCloud;
