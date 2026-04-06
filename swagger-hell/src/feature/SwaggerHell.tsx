import { Box, Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { TopBar } from './top-bar/TobBar';
import { LeftBar } from "./left-bar/left-bar";
import { useMutation } from "../hooks/useMutation";
import { invoke } from "@tauri-apps/api/core";

export const SwaggerHell = () => {
    const [_addSwaggerValue, setAddSwaggerValue] = useState<string>("")
    const { addSwagger } = useMutation();

    useEffect(() => {
        const enablePlugin = async () => {
            await invoke('start_node');
        }

        enablePlugin();
    }, [])

    const handleAddSwaggerClick = async (value: string) => {
        setAddSwaggerValue(value)
        const res = await addSwagger(value);
        console.log(res)
    }

    return (
        <Box sx={{ height: '100%' }}>
            <TopBar onAddSwaggerButtonClick={handleAddSwaggerClick} />
            <Stack direction={'row'} sx={{ height: 'calc(100% - 88px)' }}>
                <LeftBar/>
                <Box sx={{ border: '1px solid blue', width: '50%', height: '100%' }}>Right</Box>
            </Stack>
        </Box>
    )
}