import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from 'react';

type TopBarProps = {
    onAddSwaggerButtonClick: (value: string) => void;
}

export const TopBar = ({ onAddSwaggerButtonClick }: TopBarProps) => {
    const [addSwaggerValue, setAddSwaggerValue] = useState<string>("")

    const handleAddSwaggerTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setAddSwaggerValue(event.target.value)

    const handleAddSwaggerButtonClick = () => 
        onAddSwaggerButtonClick(addSwaggerValue)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <TextField
                sx={{ m: 2, width: '30%' }}
                label="Add Swagger URL or yml file"
                defaultValue={""}
                value={addSwaggerValue}
                onChange={handleAddSwaggerTextFieldChange}
                slotProps={{
                    input: {
                        endAdornment:
                            <Button
                                variant={'outlined'}
                                onClick={handleAddSwaggerButtonClick}
                            ><AddIcon />ADD</Button>
                    }
                }}
            />
        </Box>
    )
}