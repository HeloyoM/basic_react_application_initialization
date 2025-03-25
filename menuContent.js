export const menuContent = `import { JSX } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    openMenu: boolean
    close: () => void
    menuBody: JSX.Element[]
    variant?: 'permanent' | 'persistent' | 'temporary'
}

const drawerWidth = 350;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Menu = (props: Props) => {
    const { close, menuBody, openMenu, variant = 'temporary' } = props

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant={variant}
            anchor="right"
            open={openMenu}
        >

            <DrawerHeader>
                <IconButton onClick={close}>
                    <CloseIcon className="menu-btn" />
                </IconButton>
            </DrawerHeader>

            {menuBody}
        </Drawer>
    )
}

export default Menu`