import { suite, test } from "mocha-typescript";
import { expect } from "chai";
import { EventDispatcher, AppEventListener, AppEventListenerObject } from "./package-src/index";
import { TestEventArg, TestEventHandler } from "./test-event-args";

@suite class EventArgTest {
    @test SingleListener() {
        let e = new TestEventArg();
        let d = new EventDispatcher();
        d.subscribe(new TestEventHandler());
        d.dispatch(this, e);
        expect(e.value).to.equal(1);
        d.dispatch(this, e);
        expect(e.value).to.equal(2);
    }

    @test MultipleListeners() {
        let e = new TestEventArg();
        let d = new EventDispatcher();
        d.subscribe(new TestEventHandler());
        d.dispatch(this, e);
        expect(e.value).to.equal(1);
        d.dispatch(this, e);
        expect(e.value).to.equal(2);
        d.subscribe(new TestEventHandler());
        d.dispatch(this, e);
        expect(e.value).to.equal(4);
        d.dispatch(this, e);
        expect(e.value).to.equal(6);
        d.subscribe(new TestEventHandler());
        d.dispatch(this, e);
        expect(e.value).to.equal(9);
        d.dispatch(this, e);
        expect(e.value).to.equal(12);
    }
}