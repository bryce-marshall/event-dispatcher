class Tests {
    static execute() {
        let tests = new Tests();
        for(const t of Object.getOwnPropertyNames(Tests.prototype)){        
            if (t === "constructor") continue;
            console.log("Starting test \"" + t + "\"");
            tests[t]();
            console.log("Completed test \"" + t + "\"");
            console.log("");
        }
    }

    testOne() {
        console.log("Not Implemented");
    }

    static logPassed(message: string) {
        console.log("PASSED: " + message);
    }

    static logFailed(message: string) {
        console.log("FAILED: " + message);
    }
}

Tests.execute();
