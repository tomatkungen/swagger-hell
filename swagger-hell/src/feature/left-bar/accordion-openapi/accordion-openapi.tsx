import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useQuery } from '../../../hooks/useQuery';
import { SyntheticEvent, useEffect } from 'react';
import { useEvent } from '../../../hooks/useEvent';

type AccordionOpenApiProps = {
    name: string;
}

export const AccordionOpenApi = ({ name }: AccordionOpenApiProps) => {
    const { getSwaggerEndpointsByName } = useQuery()
    const data = useEvent('GetSwaggerEndpointsByName');

    useEffect(() => {
        console.log('changed', data);
    },[data]);

    const handleAccordionChange = (_event: SyntheticEvent<Element, Event>, expanded: boolean) => {
        if (expanded)
            getSwaggerEndpointsByName(name)
    }

    console.log('data>>', data);

    return (
        <Accordion onChange={handleAccordionChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {(!data || !data.getSwaggerEndpointsByName.length) && "no datas"}
                <List>
                    {data?.getSwaggerEndpointsByName.map((endpoints) =>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={endpoints} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}

