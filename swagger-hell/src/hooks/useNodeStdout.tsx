import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { EventListener } from "../utils/event-listener";

export const useNodeStdout = () => {

    useEffect(() => {
        let unListenFn: UnlistenFn;

        const eventListener = async () => {
            unListenFn = await listen('node:stdout', (event) => {
                const res = JSON.parse(typeof event.payload === "string" ? event.payload : "");
                
                console.log('event.payload', res)
                EventListener.notifyListener(res.event, res.data);
            })
        }
        EventListener.listListener();
        eventListener();

        return () => {
            if (unListenFn)
                unListenFn();
        }

    }, [])

}