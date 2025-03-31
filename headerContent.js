export const headerContent = (auth) => (`import React, { useMemo } from 'react';
import { Button, Typography } from "@mui/material";
import '../App.css';
import Menu from './Menu';
import MenuIcon from '@mui/icons-material/Menu';
${auth && `import { Login as ConnectIcon } from '@mui/icons-material';`}

const Header = () => {
    const [openMenu, setOpenMenu] = React.useState(false);

    const openMenuModal = () => { setOpenMenu(true) }
    const closeMenuModal = () => { setOpenMenu(false) }

    const optionsListItems = useMemo(() => ([
        <Button sx={[
            {
                height: '100px',
                fontSize: '30px',
                fontFamily: "Sora, sens-serif",
                '&:hover': {
                    color: 'white',
                    backgroundColor: '#244545',
                },
            },]}>section</Button>
    ]), [])

    return (
            <Typography className={'sticky title'}>

                ${auth && <ConnectIcon />}

                    <Typography
                        style={{
                            margin: 'auto auto',
                            fontSize: '22px'
                        }}>Website name
                    </Typography>

                {!openMenu && <MenuIcon onClick={openMenuModal} className="menu-btn" />}

                <Menu menuBody={optionsListItems} close={closeMenuModal} openMenu={openMenu} />

            </Typography>
    )
}

export default Header;`)