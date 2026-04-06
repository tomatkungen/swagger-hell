import { useEffect, useState } from "react"
import { EventListener, EventName } from "../utils/event-listener"

export const useEvent = <T extends keyof EventName>(eventName: T) => {
    const [data, setData] = useState<EventName[T] | null>(null);

    useEffect(() => {
        const handler = (payload: object) => {
            setData(payload as EventName[T]);
        };

        EventListener.addListener(eventName, handler)
        
        return () => {
            EventListener.removeListener(eventName, handler);
        };
    }, [])

    return data;
}