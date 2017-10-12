/**
 * The interface that must be implemented by an object that can subscribe to events.
 */
export interface AppEventListenerObject {
    /**
     * The method that is invoked when an event is raised.
     * @param sender The object that raised or is otherwise associated with the event.
     * @param args Optional event arguments.
     */
    handleEvent(sender: any, args?: any): void;
}

/**
 * The signature of function can subscribe to events.
 */
export declare type AppEventListener = (sender: any, args?: any) => void;

/**
 * The interface implemented by an event source.
 */
export interface AppEventSource {
    /**
     * Adds the specified event listener to the event source's subscriber collection.
     * @param listener The event listener to be added.
     */
    subscribe(listener: AppEventListener | AppEventListenerObject): void;
    /**
     * Removes the specified event listener from the event source's subscriber collection.
     * @param listener The event listener to be removed.
     */
    unsubscribe(listener: AppEventListener | AppEventListenerObject): void;
}

/**
 * The interface implemented by an event dispatcher.
 */
export interface AppEventDispatcher extends AppEventSource {
    /**
     * Raises an event which is dispatched to all subscribers in the event dispatcher's subscriber collection.
     * @param sender The object that raised or is otherwise associated with the event.
     * @param args Optional event arguments.
     */
    dispatch(sender: any, args?: any): void;
}

/**
 * Manages event subscriptions and dispatching.
 */
export class EventDispatcher implements AppEventDispatcher {
    private _h: _Handler[] = [];

    /**
     * Returns an AppEventSource object which can be used to manage subscriptions associated with this instance, but which cannot be used to dispatch events.
     */
    getTarget(): AppEventSource {
        return {
            subscribe: (l) => { this.subscribe(l); },
            unsubscribe: (l) => { this.unsubscribe(l); }
        };
    }

    /**
     * Raises an event which is dispatched to all subscribers in this instance's subscriber collection.
     * @param sender The object that raised or is otherwise associated with the event.
     * @param args Optional event arguments.
     */
    dispatch(sender: any, args?: any): void {
        for (let h of this._h)
            h.handler(h.listener, sender, args);
    }

    /**
     * Adds the specified event listener to this instances subscriber collection.
     * @param listener The event listener to be added.
     */    
    subscribe(listener: AppEventListener | AppEventListenerObject): void {
        if (listener == null) throw argumentNull();

        for (let h of this._h) {
            if (h.listener === listener) return; // Exists
        }

        this._h.push(
            {
                listener: listener,
                handler: typeof (listener) === "function" ? fnHandler : instanceHander
            }
        );
    }

    /**
     * Removes the specified event listener from this instance's subscriber collection.
     * @param listener The event listener to be removed.
     */    
    unsubscribe(listener: AppEventListener | AppEventListenerObject): void {
        if (listener == null) throw argumentNull();

        this._h = this._h.filter(h => h.listener !== listener);
    }
}

// #region Internal members

interface _Handler {
    readonly listener: AppEventListener | AppEventListenerObject;
    readonly handler: (l: AppEventListener | AppEventListenerObject, s: any, a?: any) => void;
}

function fnHandler(l: AppEventListener, s: any, a?: any) {
    l(s, a);
}

function instanceHander(l: AppEventListenerObject, s: any, a?: any) {
    l.handleEvent(s, a);
}

function argumentNull() : Error {
    let e = new Error('The parameter "listener" cannot be null.');
    e.name = "ArgumentNull";
    (<any>e).isException = true;
    (<any>e).isArgumentNullException = true;
    return e;
}

// #endregion