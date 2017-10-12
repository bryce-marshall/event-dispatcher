# @brycemarshall/event-dispatcher

A library for dispatching events to subscriber clients.

## Installation

npm install @brycemarshall/event-dispatcher

## The module exports the following types:

```ts
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
export declare class EventDispatcher implements AppEventDispatcher {
    private _h;
    /**
     * Returns an AppEventSource object which can be used to manage subscriptions associated with this instance, but which cannot be used to dispatch events.
     */
    getTarget(): AppEventSource;
    /**
     * Raises an event which is dispatched to all subscribers in this instance's subscriber collection.
     * @param sender The object that raised or is otherwise associated with the event.
     * @param args Optional event arguments.
     */
    dispatch(sender: any, args?: any): void;
    /**
     * Adds the specified event listener to this instances subscriber collection.
     * @param listener The event listener to be added.
     */
    subscribe(listener: AppEventListener | AppEventListenerObject): void;
    /**
     * Removes the specified event listener from this instance's subscriber collection.
     * @param listener The event listener to be removed.
     */
    unsubscribe(listener: AppEventListener | AppEventListenerObject): void;
}

```

## Contributors

 - Bryce Marshall

## MIT Licenced
