import React from 'react';
import { Switch} from '@mui/material';

const MySwitch = () => {

    const [toggled, setToggled] = React.useState(false);

    return (
        <div>
            <Switch
                checked={toggled}
                onChange={e => setToggled(e.target.checked)}
            />
        </div>
    );
};

export default MySwitch;
