'use strict'

class Thermostat{

  constructor() {
    this.MAX_TEMP = 25;
    this.MAX_TEMP_NO_PS = 32;
    this.MIN_TEMP = 10;
    this.LOW_USAGE_THRESH = 18;
    this.HIGH_USAGE_THRESH = 25;
    this.DEFAULT_TEMP = 20;
    this.temp = this.DEFAULT_TEMP;
    this.ps = true;
  }

  getTemp() {
    return this.temp;
  }

  isMinTemp() {
    return this.temp === this.MIN_TEMP
  }

  isMaxTemp() {
    if (this.isPowerSaving()) {
      return this.temp >= this.MAX_TEMP;
    }
    else {
      return this.temp >= this.MAX_TEMP_NO_PS;
    }
  };

  isPowerSaving() {
    return this.ps;
  }

  up(){
    if(this.isMaxTemp() && this.isPowerSaving()) {
      throw new Error(`Cannot set above ${this.MAX_TEMP} degreeeees in power save mode`);
    }
    if(this.isMaxTemp() && !this.isPowerSaving()) {
      throw new Error(`Cannot set above ${this.MAX_TEMP_NO_PS} degreeeees in power save mode off`);
    }
      this.temp ++;
  };

  down(){
    if(this.isMinTemp()) {
      throw new Error(`Cannot set below ${this.MIN_TEMP} degreeeees`);
    }
    this.temp --;
  }


  psOff(){
    this.ps = false;
  }

  psOn(){
    this.ps = true;
  }

  reset() {
    this.temp = this.DEFAULT_TEMP;
  }

  readUsage() {
    if(this.temp < this.LOW_USAGE_THRESH) {
      return 'low-usage';
    }
    if(this.temp <= this.HIGH_USAGE_THRESH) {
      return 'medium-usage';
    }
    else {
      return 'high-usage';
    };
  };


};
