import { JSX, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Container, Box, Typography, Button, Fade, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowForward, TrendingUp } from "@mui/icons-material";

export default function Homepage(): JSX.Element {
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState("");
    const [showSubtitle, setShowSubtitle] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const MUItheme = useTheme();


    const fullText = "Welcome to Currency Exchange Analytics";
    const subtitle = "Built by Jason Huras";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => setShowSubtitle(true), 500);
                setTimeout(() => setShowButton(true), 1000);
            }
        }, 30);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <Container>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '50vh',
                    textAlign: 'center',
                    gap: 4
                }}
            >
                <Box sx={{ position: 'relative', minHeight: '120px' }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            background: `linear-gradient(45deg, ${MUItheme.palette.primary.main} 30%, ${MUItheme.palette.primary.dark} 90%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2
                        }}
                    >
                        {displayText}
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-block',
                                width: '3px',
                                height: '1.2em',
                                backgroundColor: 'primary.main',
                                ml: 1,
                                animation: 'blink 1s infinite',
                                '@keyframes blink': {
                                    '0%, 50%': { opacity: 1 },
                                    '51%, 100%': { opacity: 0 }
                                }
                            }}
                        />
                    </Typography>

                    <Fade in={showSubtitle} timeout={1000}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'text.secondary',
                                fontWeight: 400,
                                fontStyle: 'italic'
                            }}
                        >
                            {subtitle}
                        </Typography>
                    </Fade>
                </Box>

                <Fade in={showButton} timeout={1200}>
                    <Box>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate('/currency-exchange-rates')}
                            endIcon={<ArrowForward />}
                            startIcon={<TrendingUp />}
                            sx={{
                                py: 2,
                                px: 4,
                                borderRadius: 3,
                                fontWeight: 600,
                                textTransform: 'none',
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                }
                            }}
                        >
                            Explore Currency Rates
                        </Button>
                    </Box>
                </Fade>

                <Fade in={showButton} timeout={1400}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            maxWidth: '600px',
                            lineHeight: 1.7
                        }}
                    >
                        A modern currency exchange rate analytics dashboard featuring historical exchange rates,
                        interactive charts, and comprehensive data visualization tools.
                    </Typography>
                </Fade>
            </Box>
        </Container>
    )
}