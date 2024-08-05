import { useEffect, useState } from 'react'
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import React from 'react';
import Stack from '@mui/joy/Stack';

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

function ThemeSwitch() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.body.classList.remove('light', 'dark')
        document.body.classList.add(theme);
        console.log(theme);
    }, [theme])

    const [enabled, setEnabled] = useState(false)

    const handleThemeChange = () => {
        setEnabled(!enabled);
        setTheme(enabled ? 'light' : 'dark')
    }

    return (
        <Stack>
            <Switch
                onChange={handleThemeChange}
                slotProps={{
                    track: {
                        children: (
                            <React.Fragment>
                                <Typography component="span" level="inherit" sx={{ ml: '10px' }}>
                                    On
                                </Typography>
                                <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                                    Off
                                </Typography>
                            </React.Fragment>
                        ),
                    },
                }}
                sx={{
                    '--Switch-thumbSize': '27px',
                    '--Switch-trackWidth': '64px',
                    '--Switch-trackHeight': '31px',
                }}
            />
        </Stack>

    )
}

export default ThemeSwitch