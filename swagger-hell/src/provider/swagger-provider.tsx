import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { createContext, useEffect } from "react";

type QueryEvent = 
| "SwaggerUrl"
| "SwaggerByUrl"
| "SwaggerNames"
| "SwaggerByName"
| "SwaggerEndpointsByName"
| "SwaggerInfoByName";

type SwaggerContextType = {
    QueryOperator: (event: QueryEvent, operator: object) => Promise<void>
}

type SwaggerProvider = React.PropsWithChildren<{}>

const SwaggerContext = createContext<SwaggerContextType | undefined>(undefined)

export const SwaggerProvider = ({ children }: SwaggerProvider) => {

    // Start the child process
    useEffect(() => {
        const startNode = async (): Promise<void> => {
            await invoke('start_node')
        }

        void startNode()
    }, []);

    const QueryOperator = async (event: QueryEvent, operator: object): Promise<void> => {
        try {
        await invoke(JSON.stringify({
            event,
            query: operator
            //  variables:{"a":5,"b":2},
        }))
    } catch (e) {
      console.log('Provider.QueryOperator.error: ', e);
    }
    }

    return <SwaggerContext.Provider value={{ QueryOperator }}>{children}</SwaggerContext.Provider>
}