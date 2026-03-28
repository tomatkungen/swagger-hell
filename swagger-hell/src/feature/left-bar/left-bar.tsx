import { Box } from "@mui/material"
import { listen } from "@tauri-apps/api/event"
import { useEffect, useState } from "react"

export const LeftBar = () => {
    const [_payload, setPayload] = useState<any>();

    useEffect(() => {
        listen('node:stdout', (event) => {
            console.log('yollo', event.payload);
            setPayload(event.payload)
        })
    }, [])

    return (
        <Box sx={{ border: '1px solid green', width: '50%', height: '100%' }}>
        </Box>
    )
}