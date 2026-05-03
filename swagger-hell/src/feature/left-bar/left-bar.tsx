import { Drawer } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useEvent } from "../../hooks/useEvent";
import { useQuery } from "../../hooks/useQuery";
import { AccordionOpenApi } from "./accordion-openapi/accordion-openapi";

type LeftBar = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const LeftBar = ({ setOpen, open }: LeftBar) => {
    const { getSwaggerNames } = useQuery();

    const data = useEvent('GetSwaggerNames')

    // Init data
    useEffect(() => {
        getSwaggerNames();
    }, [])

    return (
        <Drawer open={open} anchor={'left'} onClose={() => setOpen(false)}
            slotProps={{
                'paper': {
                    sx: {
                        border: '1px solid yellow',
                    }
                },
            }}>
            {data?.getSwaggerNames.current.map((name, index) => (
                <AccordionOpenApi name={name} key={index} />
            ))}
        </Drawer>

    )
}