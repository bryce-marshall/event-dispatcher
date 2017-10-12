import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { EventDispatcher, AppEventListener, AppEventListenerObject } from "./package-src/index";

export abstract class ListenerProvider {
    abstract addE1(d: EventDispatcher): AppEventListener | AppEventListenerObject;
    abstract addE2(d: EventDispatcher): AppEventListener | AppEventListenerObject;
}

export class EventDispatcherTestBase {
    e1: number = 0;
    e2: number = 0;

    static GenerateTest(title: string, p: ListenerProvider) {
        @suite(`Event Dispatcher Test -- ${title}`) class GeneratedTestClass extends EventDispatcherTestBase {
            @test SingleListener() {
                let d = new EventDispatcher();
                p.addE1(d);
                d.dispatch(this, {});
                expect(this.e1).to.equal(1);
                d.dispatch(this, {});
                d.dispatch(this, {});
                expect(this.e1).to.equal(3);
            }

            @test RemoveOneSingleListener() {
                let d = new EventDispatcher();
                let l = p.addE1(d);
                d.dispatch(this, {});
                expect(this.e1).to.equal(1);
                d.dispatch(this, {});
                expect(this.e1).to.equal(2);
                d.unsubscribe(l);
                d.dispatch(this, {});
                expect(this.e1).to.equal(2);
            }

            @test MultipleListeners() {
                let d = new EventDispatcher();
                p.addE1(d);
                d.dispatch(this, {});
                expect(this.e1).to.equal(1);
                expect(this.e2).to.equal(0);
                p.addE2(d);
                d.dispatch(this, {});
                expect(this.e1).to.equal(2);
                expect(this.e2).to.equal(1);
                d.dispatch(this, {});
                expect(this.e1).to.equal(3);
                expect(this.e2).to.equal(2);
            }
        }
    }
}