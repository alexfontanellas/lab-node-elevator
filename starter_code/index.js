/*jshint esversion: 6 */
const Elevator = require('./elevator.js');
const Person = require('./person.js');

var myElevator = new Elevator();
var person = new Person("Julia",2,3);
var person2 = new Person("John",3,8);

var person3 = new Person("John",6,2);



myElevator.call(person);
myElevator.call(person2);
myElevator.call(person3);
