$(document).ready(function(){
  var thermostat = new Thermostat;
  updateTemperature();
  $( "#temperature-up ").click(function(){
    thermostat.up();
    updateTemperature();
  });
  $( "#temperature-down").click(function(){
    thermostat.down();
    updateTemperature();
  });
  $( "#powersaving-on").click(function(){
    thermostat.psOn();
    $( "#power-saving-status" ).text( "on" );
    updateTemperature();
  });
  $( "#powersaving-off").click(function(){
    thermostat.psOff();
    $( "#power-saving-status" ).text( "off" );
    updateTemperature();
  });
  $( "#temperature-reset").click(function(){
    thermostat.reset();
    updateTemperature();
  });
  function updateTemperature() {
    $( "#temperature" ).text( `${thermostat.getTemp()}`);
    $( "#temperature" ).attr('class', thermostat.readUsage());
  };
});
