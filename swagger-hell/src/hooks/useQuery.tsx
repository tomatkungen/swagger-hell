import { invoke } from "@tauri-apps/api/core";

export const useQuery = () => {
    const getSwaggerNames = async (): Promise<void> => {
        const res = await invoke('send_to_node', {
            message: JSON.stringify({
                query: queryGetSwaggerNames,
                event: 'getSwaggerNames'
            })
        })

        console.log('res', res);
    }

    return {
        getSwaggerNames
    }
}

const queryGetSwaggerNames = /* GraphQL */ `
    query GetSwaggerNames {
        getSwaggerNames {
            current
            previous
        }
    }
`;