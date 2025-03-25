export const footerContent = `import { Box, Typography } from "@mui/material";
import Grid2 from '@mui/material/Grid2';
import { MOBILE_WIDTH, useWindowWidth as useMobile } from "../utils/useMobile";

const Footer = () => {
    const windowWidth = useMobile();

    const isMobile = MOBILE_WIDTH >= windowWidth;

    return (
        <Box
            component="footer"
            sx={{
                height: 600,
                color: 'black',
                p: 3,
                mt: 'auto'
            }}
        >
            <Grid2 container spacing={2}>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    © {new Date().getFullYear()} 0587769313 | All Rights Reserved Meir Juli
                </Typography>
            </Grid2>
        </Box>
    )
}

export default Footer;`