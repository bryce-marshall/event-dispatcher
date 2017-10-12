import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { EventDispatcher } from "./package-src/index";
import { TestEventArg, TestEventHandler } from "./test-event-args";

@suite class GetTargetTest {
    @test SingleListener() {
        let e = new TestEventArg();
        let d = new EventDispatcher();
        let t = d.getTarget();
        let h1 = new TestEventHandler();
        t.subscribe(h1);
        d.dispatch(this, e);
        expect(e.value).to.equal(1);
        d.dispatch(this, e);
        expect(e.value).to.equal(2);
        t.unsubscribe(h1);
        d.dispatch(this, e);
        expect(e.value).to.equal(2);
    }

    @test MultipleListeners() {
        let e = new TestEventArg();
        let d = new EventDispatcher();
        let t = d.getTarget();
        let h1 = new TestEventHandler();
        t.subscribe(h1);
        d.dispatch(this, e);
        expect(e.value).to.equal(1);
        d.dispatch(this, e);
        expect(e.value).to.equal(2);
        let h2 = new TestEventHandler();
        t.subscribe(h2);
        d.dispatch(this, e);
        expect(e.value).to.equal(4);
        d.dispatch(this, e);
        expect(e.value).to.equal(6);
        let h3 = new TestEventHandler();
        t.subscribe(h3);
        d.dispatch(this, e);
        expect(e.value).to.equal(9);
        d.dispatch(this, e);
        expect(e.value).to.equal(12);
        t.unsubscribe(h1);
        d.dispatch(this, e);
        expect(e.value).to.equal(14);
        t.unsubscribe(h2);
        d.dispatch(this, e);
        expect(e.value).to.equal(15);
        t.unsubscribe(h3);
        d.dispatch(this, e);
        expect(e.value).to.equal(15);
    }
}