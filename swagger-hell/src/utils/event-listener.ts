export type EventName = {
    'GetSwaggerNames': {
        getSwaggerNames: {
            current: string[];
            previous: string[];
        }
    };
    'GetSwaggerEndpointsByName': {
        getSwaggerEndpointsByName: string[]
    };
    'Empty': {}
}

export class EventListener {
    private static listeners: { [index: string]: ((obj: object) => void)[] }
    private static latestEventName: keyof EventName;

    public static addListener(eventName: keyof EventName, cb: (obj: object) => void) {
        if (!this.listeners)
            this.listeners = {};

        if (!this.listeners[eventName])
            this.listeners[eventName] = [];

        // if cb already exist dont add it
        if (this.listeners[eventName].some((callback) => callback === cb))
            return;

        this.listeners[eventName].push(cb);
    }

    public static notifyListener(eventName: keyof EventName, data: object) {
        if (!this.listeners[eventName] || this.latestEventName === eventName) {
            console.log('prevent event', eventName)
            return;
        }
        console.log('notifyListener', eventName, data)
        EventListener.listListener();

        // Prevent event trigger again while update listeners
        this.latestEventName = eventName;
        
        (this.listeners[eventName] || []).forEach(fn => fn(data))
        
        // Reset event trigger
        this.latestEventName = 'Empty';
    }

    public static removeListener(eventName: keyof EventName, cb: (obj: object) => void) {
        this.listeners[eventName] = (this.listeners[eventName] || [])
            .filter((callback) => callback !== cb)
    }

    public static listListener() {
        if (!this.listeners)
            return;

        console.log('length', Object.entries(this.listeners).length);
        Object.entries(this.listeners).forEach(([key, value]) => {
            console.log('obj: ', key, value.length)
        })
    }
}