import { AppEventListenerObject } from "./package-src/index";

export class TestEventArg {
    private _n: number = 0;
    inc() {
        this._n++;
    }

    get value(): number {
        return this._n;
    }
}

export class TestEventHandler implements AppEventListenerObject {
    handleEvent(sender: any, args: TestEventArg): void {
        args.inc();
    }
}