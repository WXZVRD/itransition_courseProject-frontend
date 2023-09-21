import {Button} from "@mui/material";
import {FC, ReactElement} from "react";

import {Link} from "react-router-dom";

interface IAuthProps {
    socialIcon: ReactElement,
    socialTitle: 'google' | 'github',
}

const AuthButton: FC<IAuthProps> = ({socialIcon, socialTitle }) => {

    return(
            <Link to={`https://itransition-courseproject-backend.onrender.com/${socialTitle}`}>
                <Button
                    component="button"
                    size={"small"}
                    variant="contained"
                    startIcon={socialIcon}
                    sx={{
                        fontSize:'14px',
                        mr:'10px',
                    }}>
                    Auth by { socialTitle }
                </Button>
            </Link>
    )
}

export default AuthButton