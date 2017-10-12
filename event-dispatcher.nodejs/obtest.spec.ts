import { EventDispatcher, AppEventListenerObject } from "./package-src/index";
import { EventDispatcherTestBase } from "./test-base";

class ObjListenerProvider {
    addE1(d: EventDispatcher): AppEventListenerObject {
        let l = {
            handleEvent: (s: EventDispatcherTestBase, e: any) => {
                s.e1++;
            }
        };
        d.subscribe(l);
    
        return l;
    
    }
    
    addE2(d: EventDispatcher): AppEventListenerObject {
        let l = {
            handleEvent: (s: EventDispatcherTestBase, e: any) => {
                s.e2++;
            }
        };
        d.subscribe(l);
    
        return l;    
    }        
}

EventDispatcherTestBase.GenerateTest("Object Listener", new ObjListenerProvider());
