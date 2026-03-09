import { invoke } from "@tauri-apps/api/core";

export const useMutation = () => {
    const addSwagger = async (url: string) => {
        return await invoke('send_to_node', {
            message: JSON.stringify({
                query: mutaion,
                variables: { url },
                event: 'addSwagger'
            })
        })
    }

    return {
        addSwagger
    }
}

const mutaion = /* GraphQL */ `
  mutation AddSwaggerUrl($url: String!) {
    addSwaggerUrl(url: $url)
  }
`