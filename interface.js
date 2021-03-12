  var thermostat = new Thermostat;

  // $( "#weather" ).load("api.openweathermap.org/data/2.5/weather?q=London&appid=a7d354904dff270ea0aa8d64e7791ab2");

  $.get('http://api.openweathermap.org/data/2.5/weather?q=London&appid=a7d354904dff270ea0aa8d64e7791ab2&units=metric',
  function(data) {
    $( "#city" ).text(data.name);
    $( "#current_temp" ).text(data.main.temp);
  });

  $( "#change-city" ).submit(function(event) {
    event.preventDefault();
    var city = $( "#city_name").val();
    $.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a7d354904dff270ea0aa8d64e7791ab2&units=metric",
    function(data) {
      $( "#city" ).text(data.name);
      $( "#current_temp" ).text(data.main.temp);
    });
  });


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
    $( "#power-saving-status" ).text( "on 🌳" );
    updateTemperature();
  });
  $( "#powersaving-off").click(function(){
    thermostat.psOff();
    $( "#power-saving-status" ).text( "off 🔥" );
    updateTemperature();
  });
  $( "#temperature-reset").click(function(){
    thermostat.reset();
    updateTemperature();
  });
  function updateTemperature() {
    $( "#temperature" ).text( `${thermostat.getTemp()}°`);
    $( "#thermostat" ).attr('class', thermostat.readUsage() + '-light');
    $( "#emoji" ).attr('class', thermostat.readUsage() + '-emoji');
    $( "body" ).attr('class', thermostat.readUsage() + '-dark');
    $( "button" ).attr('class', thermostat.readUsage() + '-dark');
    $( "input" ).attr('class', thermostat.readUsage() + '-dark');
    $( "#emoji" ).attr( 'class', thermostat.readUsage() + '-emoji')
  };
