import { Box } from "@mui/material";
import { useEffect } from "react";
import { useEvent } from "../../hooks/useEvent";
import { useQuery } from "../../hooks/useQuery";

export const LeftBar = () => {
    const { getSwaggerNames } = useQuery();

    const data = useEvent('GetSwaggerNames')

    // Init data
    useEffect(() => {
        getSwaggerNames();
    }, [])

    return (
        <Box sx={{ border: '1px solid green', width: '50%', height: '100%' }}>
            {data && JSON.stringify(data)}
        </Box>
    )
}