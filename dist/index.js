"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Runner = function () {
    function Runner(fn) {
        _classCallCheck(this, Runner);

        this.fn = fn;
        this.dependencies = {};
    }

    _createClass(Runner, [{
        key: "run",
        value: function run() {
            this.fn(this.dependencies);
        }
    }, {
        key: "addDependency",
        value: function addDependency(dep) {
            this.addDependencies(dep);
        }
    }, {
        key: "addDependencies",
        value: function addDependencies(deps) {
            for (var name in deps) {
                this.dependencies[name] = deps[name];
                deps[name].addRunner(this);
            }
        }
    }, {
        key: "removeDependency",
        value: function removeDependency(dep) {
            this.removeDependencies(dep);
        }
    }, {
        key: "removeDependencies",
        value: function removeDependencies(deps) {
            for (var name in this.dependencies) {
                for (var otherName in deps) {
                    if (name === otherName) {
                        delete this.dependencies[name];
                        deps[otherName].removeRunner(this);
                    }
                }
            }
        }
    }]);

    return Runner;
}();

var Dependency = function () {
    function Dependency(val) {
        _classCallCheck(this, Dependency);

        this.val = val;
        this.runners = [];
    }

    _createClass(Dependency, [{
        key: "addRunner",
        value: function addRunner(runner) {
            this.runners.push(runner);
        }
    }, {
        key: "removeRunner",
        value: function removeRunner(r) {
            var _this = this;

            this.runners.forEach(function (runner, k) {
                if (runner === r) {
                    delete _this.runners[k];
                }
            });
        }
    }, {
        key: "value",
        get: function get() {
            return this.val;
        },
        set: function set(val) {
            if (val !== this.val) {
                this.val = val;
                if (this.runners.length) {
                    this.runners.forEach(function (runner) {
                        if (runner) {
                            runner.run();
                        }
                    });
                }
            }
        }
    }]);

    return Dependency;
}();

exports.Runner = Runner;
exports.Dependency = Dependency;