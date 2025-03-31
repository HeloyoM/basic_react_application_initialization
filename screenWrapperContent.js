export const screenWrapperContent= `import { Container } from "@mui/material";
import { FC, ReactNode } from "react";
import '../App.css';

const ScreenWrapper: FC<{ children?: ReactNode }> = ({ children }) => {
    return (
        <Container maxWidth='xl' className="screen">
            {children}
        </Container>
    )
}

export default ScreenWrapper;`