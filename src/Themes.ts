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
        fontFamily: 'Work Sans, Lato',
        h1: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        h2: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        h3: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        h4: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        h5: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        h6: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#181A2A',
            fontFamily: 'Work Sans'
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#97989F',
            fontFamily: 'Work Sans'
        },
        body2: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#97989F',
            fontFamily: 'Work Sans'
        },
    },
    components: {
        MuiBadge: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4B6BFB',
                    fontFamily: 'Work Sans',
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
        fontFamily: 'Work Sans, Roboto, sans-serif',
        h1: {
            fontSize: '36px',
            fontWeight: 600,
            color: '#FFF',
            lineHeight: '40px',
            fontFamily: 'Work Sans'
        },
        h2: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Work Sans'
        },
        h3: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Work Sans'
        },
        h4: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Work Sans'
        },
        h5: {
            fontSize: '20px',
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Work Sans'
        },
        h6: {
            fontSize: '24px',
            fontWeight: 600,
            color: '#fff',
            fontFamily: 'Work Sans'
        },
        body1: {
            fontSize: '16px',
            fontWeight: 400,
            color: '#97989F',
            fontFamily: 'Work Sans'
        },
        body2: {
            fontSize: '16px',
            fontWeight: 500,
            color: '#97989F',
            fontFamily: 'Work Sans'
        },
    },
    components: {
        MuiBadge: {
            styleOverrides: {
                root: {
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#4b6bfb',
                    fontFamily: 'Work Sans',
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
                    fontFamily: 'Work Sans',
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
                    fontFamily: 'Work Sans',
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
