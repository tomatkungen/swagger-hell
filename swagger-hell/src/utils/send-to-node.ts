import { invoke } from "@tauri-apps/api/core";
import { EventName } from "./event-listener";


export const sendToNode = async (event: keyof EventName, operator: string, variables?: object) => {
    console.log('operator', event, variables)
    const res = await invoke('send_to_node', {
        message: JSON.stringify({
            query: operator,
            event,
            ...(variables ? { variables } : {})
        })
    })

    console.log('send to node:', res)
}