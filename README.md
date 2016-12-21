# reactive-runner

A reactive (auto)-runner inspired by Meteor Tracker.

# Usage

	npm install reactive-runner --save
	

or even better

	yarn add reactive-runner
	


# Sample

	import {Runner, Dependency} from 'reactive-runner'
	
    const greeter = new Runner(({name}) => {
    	alert(`Hi there ${name.value)!`);
	});
	
    let name = new Dependency("Some default value - Won't get autorun");
    greeter.addDependencies({name});
    
	name.value = "Francis"; // will alert 
	name.value = "Carlos"; // will alert
	
	greeter.removeDependencies({name});
	
	name.value = "Carol"; // won't alert
	
# Features

- Simple dependency tracking
- Modern ES6-oriented usage
- Runners can have multiple dependencies
- Dependencies can have multiple runners

# Todo

- Figure out how to use this in my own workflow :)
