import { Box, Stack } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from 'react';
import { useMutation } from "../hooks/useMutation";
import { LeftBar } from "./left-bar/left-bar";
import { TopBar } from './top-bar/TobBar';


export const SwaggerHell = () => {
    const [_addSwaggerValue, setAddSwaggerValue] = useState<string>("")
    const [open, setOpen] = useState<boolean>(true);
    const { addSwagger } = useMutation();

    useEffect(() => {
        const enablePlugin = () => {
            invoke('start_node');
        }

        void enablePlugin();
    }, [])

    const handleAddSwaggerClick = async (value: string) => {
        setAddSwaggerValue(value)
        const res = await addSwagger(value);
        console.log(res)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <TopBar onAddSwaggerButtonClick={handleAddSwaggerClick} onClickOpen={() => setOpen(true)}/>
            <Stack direction={'row'} sx={{ width: '100%', border: '1px solid pink' }}>        
                <LeftBar open={open} setOpen={setOpen}/>
                <Box sx={{ width: '100%' }} onClick={() => setOpen(true)}>
                    <Box sx={{ border: '1px solid blue', width: '100%', height: '100%' }}>Right</Box>
                </Box>
            </Stack>
        </Box >
    )
}