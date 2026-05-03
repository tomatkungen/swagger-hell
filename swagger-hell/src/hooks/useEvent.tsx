import { useEffect, /*useRef,*/ useState } from "react"
import { EventListener, EventName } from "../utils/event-listener"

export const useEvent = <T extends keyof EventName>(eventName: T) => {
    const [data, setData] = useState<EventName[T] | null>(null);
    // const data = useRef<EventName[T] | null>(null)

    useEffect(() => {
        const handler = (payload: object) => {
            setData(payload as EventName[T]);
            // data.current = payload as EventName[T]
            console.log('handler', eventName, payload, data); //data.current)
        };
console.log('addListener', eventName)
        EventListener.addListener(eventName, handler)
        
        return () => {
            EventListener.removeListener(eventName, handler);
        };
    }, [])

    // return data.current;
    return data;
}