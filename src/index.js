class Runner {
    constructor(fn) {
        this.fn = fn;
        this.dependencies = {};
    }

    run() {
        this.fn(this.dependencies);
    }

    addDependency(dep) {
        this.addDependencies(dep);
    }

    addDependencies(deps) {
        for (let name in deps) {
            this.dependencies[name] = deps[name];
            deps[name].addRunner(this);
        }
    }

    removeDependency(dep) {
        this.removeDependencies(dep);
    }

    removeDependencies(deps) {
        for (let name in this.dependencies) {
            for (let otherName in deps) {
                if (name === otherName) {
                    delete this.dependencies[name];
                    deps[otherName].removeRunner(this);
                }
            }
        }
    }
}

class Dependency {
    constructor(val) {
        this.val = val;
        this.runners = [];
    }

    addRunner(runner) {
        this.runners.push(runner);
    }

    removeRunner(r) {
        this.runners.forEach((runner, k) => {
            if (runner === r) {
                delete this.runners[k];
            }
        });
    }

    get value() {
        return this.val;
    }

    set value(val) {
        if (val !== this.val) {
            this.val = val;
            if (this.runners.length) {
                this.runners.forEach((runner) => {
                    if (runner) {
                        runner.run();
                    }
                });
            }
        }
    }
}

export {Runner, Dependency};
