import { EventDispatcher, AppEventListener } from "./package-src/index";
import { EventDispatcherTestBase } from "./test-base";

class FnListenerProvider {
    addE1(d: EventDispatcher): AppEventListener {
        let l = (s, e) => { s.e1++; }
        d.subscribe(l);

        return l;
    }

    addE2(d: EventDispatcher): AppEventListener {
        let l = (s, e) => { s.e2++; }
        d.subscribe(l);

        return l;
    }
}

EventDispatcherTestBase.GenerateTest("Function Listener", new FnListenerProvider());
