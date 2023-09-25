import { createTheme } from '@mui/material/styles';


export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#FFFFFF',
        },
        secondary:{
            main: '#3B3C4A',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        h2: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        h3: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        h4: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        h5: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        h6: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#97989F',
        },
        body2: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#97989F',
        },
    },
    components: {
        MuiBadge: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4B6BFB',
                    background: '#f6f8ff',
                    borderRadius:'6px'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    background: '#fff',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: 'none'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '1px solid #E8E8EA'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    background: '#F4F4F5',
                    border: 'none'
                }
            }
        },

    }
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#fff',
        },
        secondary:{
            main: '#181a2a',
        },
    },
    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontSize: '36px',
            fontWeight: 600,
            color: '#FFF',
            lineHeight: '40px',
        },
        h2: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
        },
        h3: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
        },
        h4: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
        },
        h5: {
            fontSize: '20px',
            fontWeight: 600,
            color: '#fff',
        },
        h6: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#97989F',
        },
        body2: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#97989F',
        },
    },
    components: {
        MuiBadge: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4b6bfb',
                    background: '#1b1e34',
                    borderRadius:'6px'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    background: '#181a2a',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: '#181a2a',
                    boxShadow: 'none',
                    border: 'none'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: '#181a2a',
                    boxShadow: 'none',
                    border: '1px solid #242535'
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                root: {
                    background: '#242535',
                    borderRadius:'10px',
                    border: 'none'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4b6bfb',
                    background: '#1b1e34',
                    border:'none',
                    borderRadius:'6px'
                }
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4b6bfb',
                    background: '#1b1e34',
                    border:'none',
                    borderRadius:'6px'
                }
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {

                }
            }
        }
    }
});
