/*jshint esversion: 6 */

class Elevator {
  constructor(){
    this.floor  = 0;
    this.MAXFLOOR = 10;

    this.requests = [];
    this.passengers = [];

    this.direction = "";

  }

  start() {
    let that = this;
    this.myInterval = setInterval(function(){
      that.update();
      if(that.requests.length !==0 || that.passengers.length !== 0){
        if(that.direction === "up"){
          that.floorUp();
        }
        else{
          that.floorDown();
        }
      }
    },1000);

  }
  stop() {
    clearInterval(this.myInterval);
  }
  update() {
    this.log();
    if(this.passengers.length === 0 && this.requests.length === 0){
      this.stop();
    }
  }
  _passengersEnter() {
    for(let i = 0;i<this.requests.length;i++){
      if(this.requests[i].originFloor === this.floor){
        this.passengers.push(this.requests[i]);
        console.log(this.requests[i].name,"has entered the elevator");
        this.requests.splice(i,1);
        
      }
    }
   }
  _passengersLeave() {

    for(let i = 0;i<this.passengers.length;i++){
      if(this.passengers[i].destinationFloor === this.floor){
        console.log(this.passengers[i].name,"has left the elevator");
        this.passengers.splice(i,1);
      }
    }

    if(this.passengers.length !== 0){
      if(this.passengers[0].destinationFloor > this.passengers[0].originFloor){
        this.direction = "up";
      }
      else{
        this.direction = "down";
      }
    }
    else if(this.requests.length !== 0){
      if(this.floor<this.requests[0].destinationFloor){
        this.direction = "up";
      }
      else{
        this.direction = "down";
      }
    }
    else if(this.passengers.length === 0 && this.requests.length === 0){
      this.stop();
    }

   }
  floorUp() {
    for(let i = 0;i<this.requests.length;i++){
      if(this.requests[i].originFloor === this.floor){
        this._passengersEnter();
      }
    }
    for(let j = 0;j<this.passengers.length;j++){
      if(this.passengers[j].destinationFloor === this.floor){
        this._passengersLeave();
      }
    }

    if(this.floor+1 <=10){
      this.floor +=1;
    }

   }
  floorDown() {
    for(let i = 0;i<this.requests.length;i++){
      if(this.requests[i].originFloor === this.floor){
        this._passengersEnter();
      }
    }
    for(let j = 0;j<this.passengers.length;j++){
      if(this.passengers[j].destinationFloor === this.floor){
        this._passengersLeave();
      }
    }
    if(this.floor+1 <=10){
      this.floor -=1;
    }

  }
  call(person) {
    if(this.requests.length === 0 && this.passengers.length === 0){
      if(this.floor<person.destinationFloor){
        this.direction = "up";
      }
      else{
        this.direction = "down";
      }
      this.requests.push(person);
      this.start();
    }
    else{
      this.requests.push(person);

    }



   }
  log() {
    console.log("Direction:",this.direction,"| Floor:",this.floor);
  }
}

module.exports = Elevator;
