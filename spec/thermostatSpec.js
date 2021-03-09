'use strict'

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat;
  }) ;

  it('starts at default temp', function() {
    expect(thermostat.getTemp()).toEqual(thermostat.DEFAULT_TEMP);
  });

  it('can increase he temp with an up function', function() {
    thermostat.up();
    expect(thermostat.getTemp()).toEqual(thermostat.DEFAULT_TEMP + 1);
  });

  it('can decrease the temp, with a down function', function() {
    thermostat.down();
    expect(thermostat.getTemp()).toEqual(thermostat.DEFAULT_TEMP - 1);
  });

  it('cannot be set at a temp lower than mintemp ', function() {
    var i;
    for(i = 0; i < (thermostat.DEFAULT_TEMP - thermostat.MIN_TEMP); i++){
      thermostat.down();
    };
    expect(function(){thermostat.down();}).toThrow(new Error(`Cannot set below ${thermostat.MIN_TEMP} degreeeees`));
  });
  it('cannot be set at a temp higher than maxtemp when power saving mode on ', function() {
    var i;
    for(i = 0; i < (thermostat.MAX_TEMP - thermostat.DEFAULT_TEMP); i++){
      thermostat.up();
    };
    expect(function(){thermostat.up();}).toThrow(new Error(`Cannot set above ${thermostat.MAX_TEMP} degreeeees in power save mode`));
  });
  it('cannot be set at a temp higher than maxtemp_no_ps when power saving mode off ', function() {
    thermostat.psOff();
    var i;
    for(i = 0; i < (thermostat.MAX_TEMP_NO_PS - thermostat.DEFAULT_TEMP); i++){
      thermostat.up();
    };
    expect(function(){thermostat.up();}).toThrow(new Error(`Cannot set above ${thermostat.MAX_TEMP_NO_PS} degreeeees in power save mode off`));
  });

  describe('power saving mode', function() {
    it('is on by default', function() {
      expect(thermostat.isPowerSaving()).toBe(true);
    });
    it('can be switched off', function() {
      thermostat.psOff();
      expect(thermostat.isPowerSaving()).toBe(false);
    });
    it('can be switched back on', function() {
      thermostat.psOff();
      thermostat.psOn();
      expect(thermostat.isPowerSaving()).toBe(true);
    });
  });
  describe('reset', function() {
    it('sets the temperature back to default temp', function() {
      thermostat.up();
      thermostat.reset();
      expect(thermostat.getTemp()).toEqual(thermostat.DEFAULT_TEMP);
    });
  });
  describe('read usage', function() {
    it('returns low-usage when temperature below low usage threshold', function() {
      var i;
      for(i = 0; i < ((thermostat.DEFAULT_TEMP - thermostat.LOW_USAGE_THRESH) + 1); i++){
        thermostat.down();
      };
      expect(thermostat.readUsage()).toEqual('low-usage');
    });
    it('returns medium-usage when temperature between low and high thresholds', function() {
      expect(thermostat.readUsage()).toEqual('medium-usage');
    });
    it('returns high-usage when temperature higher than high usage threshold', function() {
      thermostat.psOff()
      var i;
      for(i = 0; i < ((thermostat.HIGH_USAGE_THRESH - thermostat.DEFAULT_TEMP) + 1); i++){
        thermostat.up();
      };
      expect(thermostat.readUsage()).toEqual('high-usage');
    });
  });

});
