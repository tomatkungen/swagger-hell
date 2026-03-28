import { invoke } from "@tauri-apps/api/core";

type SwaggerFileNames = {
    current: string[];
    previous: string[];
}

export const useQuery = () => {
    const getSwaggerNames = async (): Promise<SwaggerFileNames> => {
        return await invoke('send_to_node', {
            message: JSON.stringify({
                query,
                event: 'getSwaggerFileNames'
            })
        })
    }

    return {
        getSwaggerNames
    }
}

const query = /* GraphQL */ `
    query GetSwaggerNames {
        getSwaggerNames {
            current
            previous
        }
    }
`;