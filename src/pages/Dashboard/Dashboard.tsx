import { JSX } from "react";
import Navbar from "../../components/Navbar";
import { Container, Box } from "@mui/material";

export default function Dashboard(): JSX.Element {
    return (
        <Container>
            <Navbar />
            Dashboard
        </Container>
    )
}