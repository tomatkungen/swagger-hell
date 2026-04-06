import { listen, type UnlistenFn } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { EventListener } from "../utils/event-listener";

export const useNodeStdout = () => {

    useEffect(() => {
        let unListenFn: UnlistenFn;

        const eventListener = async () => {
            unListenFn = await listen('node:stdout', (event) => {
                console.log('event', event)
                const res = JSON.parse(typeof event.payload === "string" ? event.payload : "");
                
                console.log('event.payload', res)
                
                if (res.event === "getSwaggerNames") {
                    EventListener.notifyListener('GetSwaggerNames', res.data);
                }
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