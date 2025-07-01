import { JSX } from "react";
import Navbar from "../../components/Navbar";
import DashboardProps from "../../types/DashboardProps";
import { Container } from "@mui/material";

export default function Dashboard({ toggleTheme, isDarkMode }: DashboardProps): JSX.Element {
    return (
        <Container>
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            Dashboard
        </Container>
    )
}