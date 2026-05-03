import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from "@mui/material";
import { ChangeEvent, useState } from 'react';

type TopBarProps = {
    onAddSwaggerButtonClick: (value: string) => void;
    onClickOpen: (open: boolean) => void;
}

export const TopBar = ({ onAddSwaggerButtonClick, onClickOpen }: TopBarProps) => {
    const [addSwaggerValue, setAddSwaggerValue] = useState<string>("")

    const handleAddSwaggerTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setAddSwaggerValue(event.target.value)

    const handleAddSwaggerButtonClick = () =>
        onAddSwaggerButtonClick(addSwaggerValue)

    const handleOpenButtonClick = () => {
        onClickOpen(true);
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
                variant={'outlined'}
                sx={{ m: 3 }}
                size={'small'}
                onClick={handleOpenButtonClick}
            >{'open'}</Button>
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
            <Box></Box>
        </Box>
    )
}