import {Badge} from "@mui/material";
import {FC} from "react";

interface ITagProp {
    title: string
}

const Tag: FC<ITagProp> = ({ title }) => {
    return(
        <Badge component={"span"} sx={{
            padding:'4px 10px',
            mr:'5px'
        }}>
            <span>{ title }</span>
        </Badge>
    )
}

export default Tag