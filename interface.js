$(document).ready(function(){
  var thermostat = new Thermostat;
  $( "#temperature" ).text( `${thermostat.getTemp()}`);
  $( "#temperature-up ").click(function(){
    thermostat.up();
    $( "#temperature" ).text( `${thermostat.getTemp()}`);
  });
  $( "#temperature-down").click(function(){
    thermostat.down();
    $( "#temperature" ).text( `${thermostat.getTemp()}`);
  });
  $( "#powersaving-on").click(function(){
    thermostat.psOn();
    $( "#power-saving-status" ).text( "on" );
  });
  $( "#powersaving-off").click(function(){
    thermostat.psOff();
    $( "#power-saving-status" ).text( "off" );
  });
  $( "#temperature-reset").click(function(){
    thermostat.reset();
    $( "#temperature" ).text( `${thermostat.getTemp()}`);
  });

});
