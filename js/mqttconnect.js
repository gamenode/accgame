

    //  Variables
    var WebSocket_MQTT_Broker_URL = "";
    var MQTT_Client_ID = "";
    var MQTT_Topic = "";
    var MQTT_Client = "";
    var isConnected = false;
    var button_clicked = false;
	var firstconnect = true;
   
    var startgame = document.getElementById("startgame");

    startgame.addEventListener("click", Start);
	
	function MQTTconnect() {	
			//Connect to the broker
			    // Set variables
      WebSocket_MQTT_Broker_URL = "wss://test.mosquitto.org:8081/mqtt"; // SSL  connection websocket //document.getElementById("txt_MQTT_Broker_URL").value;
      MQTT_Client_ID = document.getElementById("txt_MQTT_Client_ID").value;

      // Create a MQTT Client nstance 
      MQTT_Client = new Paho.MQTT.Client(WebSocket_MQTT_Broker_URL, MQTT_Client_ID);
	    
	    
      // set callback handlers
      MQTT_Client.onConnectionLost = onConnectionLost;
      MQTT_Client.onMessageArrived = onMessageArrived;

      //MQTT_Client.connect(options);
	    MQTT_Client.connect({onSuccess:onConnect});
	}
	
	//window.onload = MQTTconnect;

function Start(){
	
	
		MQTTconnect();
	

	
	                    document.getElementById("winer1").innerHTML = "";
						document.getElementById("winer2").innerHTML = "";
						document.getElementById("winer3").innerHTML = "";
						document.getElementById("result1").innerHTML = "";
						document.getElementById("result2").innerHTML = "";
						document.getElementById("result3").innerHTML = "";
    console.log("Started");
    startgame.removeEventListener("click", Start);
    startgame.addEventListener("click", Stop);
    startgame.value = "Stop";
	
	button_clicked  = true;
	tb.style.display = "none";
		
		
	
		
		// Send MQTT Message 

/*
    setInterval(function() {
  //Your code
  //Send data
  //var x=Math.floor(Math.random() * 10000);
  var ClientID = document.getElementById("txt_MQTT_Client_ID").value;
  if (isConnected && button_clicked) {
  var payload = {
				//"d": {
					
					
					"x": parseFloat(acl.x.toFixed(2)),
					"y": parseFloat(acl.y.toFixed(2)),
					"z": parseFloat(acl.z.toFixed(2)),
			        "idClients": ClientID.toString()
				//}
			};
  var message = new Paho.MQTT.Message(JSON.stringify(payload));
  message.destinationName = "Game";
  try {
	  
          
           //Set_New_Console_Msg("Published " + "\"" + document.getElementById("txt_MQTT_Msg").value + "\"" + "to MQTT Topic: " + "\"" +  document.getElementById("txt_MQTT_Publish_Topic").value + "\"");
	        changeConnectionStatusImage("images/connected.svg");
			document.getElementById("connection").innerHTML = "connected";
			
			MQTT_Client.send(message);
				
			} catch (err) {
				
				console.error(err);
				isConnected = false;
				//MQTTconnect();
				changeConnectionStatusImage("images/disconnected.svg");
				document.getElementById("connection").innerHTML = "disconnected";
				//setTimeout(connectDevice(), 1000);
			}
       }
}, 100); //Every 1000ms = 1sec

*/

	  //console.log(MQTT_Subscribe_Topic);
	//document.getElementById("winer1").innerHTML = MQTT_Subscribe_Topic;
}

function Stop(){
	//MQTT_Client.disconnect();
    console.log("Stopped");
    startgame.removeEventListener("click", Stop);
    startgame.addEventListener("click", Start);
    startgame.value = "Start";
	button_clicked = false;
	
}

    // Subscribe to MQTT Topic
    function mqtt_Subscribe_to_Topic(){
      MQTT_Subscribe_Topic = "Result";
      MQTT_Client.subscribe(MQTT_Subscribe_Topic);
	  console.log(MQTT_Subscribe_Topic);
	  
      //Set_New_Console_Msg("Subscribed to MQTT Topic: " + "\"" + MQTT_Subscribe_Topic + "\"" );
    }

   
function showresults()
{
	
	if (isConnected) {
		
		if(button_clicked)
		{
						alert("please stop the game first");
						tb.style.display = "none";
		}
		else
		{
			tb.style.display = "block";
			var payload = "showresult";
			var message = new Paho.MQTT.Message(payload);
			message.destinationName = "showresult";
			try 
			{
				changeConnectionStatusImage("images/connected.svg");
				document.getElementById("connection").innerHTML = "connected";
			    MQTT_Client.send(message);
			}
			catch (err) 
			{
				console.error(err);
				isConnected = false;
				MQTTconnect();
				changeConnectionStatusImage("images/disconnected.svg");
				document.getElementById("connection").innerHTML = "disconnected";
				//setTimeout(connectDevice(), 1000);
			}
		}
	}
		
		
  	
}	
  	

    // called when the client connects
    function onConnect() {
	isConnected = true;
	
	 changeConnectionStatusImage("images/connected.svg");
			document.getElementById("connection").innerHTML = "connected";
			
		MQTT_Subscribe_Topic = "Result";
      MQTT_Client.subscribe(MQTT_Subscribe_Topic);
      // Once a connection has been made, make a subscription and send a message.
      //Set_New_Console_Msg("Connected with MQTT Broker: " + "\"" + document.getElementById("txt_MQTT_Broker_URL").value + "\"");
    }
	function onDisonnect() {
	isConnected = false;
	console.log("disconnected");
	 changeConnectionStatusImage("images/disconnected.svg");
			document.getElementById("connection").innerHTML = "disconnected";
      // Once a connection has been made, make a subscription and send a message.
      //Set_New_Console_Msg("Connected with MQTT Broker: " + "\"" + document.getElementById("txt_MQTT_Broker_URL").value + "\"");
    }

    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
		 
        //Set_New_Console_Msg("Connection Lost with MQTT Broker. Error: " + "\"" +responseObject.errorMessage + "\"");
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
		//document.getElementById("winer1").innerHTML = message.payloadString;
		console.log(message.payloadString);
		const obj = JSON.parse(message.payloadString);
		console.log(obj.Winer1);
						document.getElementById("winer1").innerHTML = obj.Winer1;
						document.getElementById("winer2").innerHTML = obj.Winer2;
						document.getElementById("winer3").innerHTML = obj.Winer3;
						document.getElementById("result1").innerHTML = obj.Result1.toFixed(2);
						document.getElementById("result2").innerHTML = obj.Result2.toFixed(2);
						document.getElementById("result3").innerHTML = obj.Result3.toFixed(2);

      //Set_New_Console_Msg("MQTT Message Recieved. "  + " Message: " + "\"" +  message.payloadString + "\"" + " MQTT Topic: " + "\"" + message.destinationName + "\"" + " QoS Value: " + "\"" + message.qos + "\"");
    } 


    // Document Ready Event
    $(document).ready( function() {
      //Set default MQTT Broker WebSocket URL
      //document.getElementById("txt_MQTT_Broker_URL").value = "ws://borker.hivemq.com:8000/mqtt";

      //Generate Random MQTT Clinet ID
      gen_MQTT_Client_ID();

    })


    // Set MQTT Messages to TextArea
    function Set_New_Console_Msg(text) {
      //document.getElementById("txtAr_Console").value = document.getElementById("txtAr_Console").value + get_Fromatted_Time().toString() + ":  " + text + "\n";
      //document.getElementById("txtAr_Console").scrollTop = document.getElementById("txtAr_Console").scrollHeight;
    }

    //Clear Console
    function clear_Console(){
      //document.getElementById("txtAr_Console").value = "";
    }

    // Get Formatted time in Hour:Minute:Seconds AM/PM format
    function get_Fromatted_Time() {
      var dt = new Date();
      var hours = dt.getHours() == 0 ? "12" : dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours();
      var minutes = (dt.getMinutes() < 10 ? "0" : "") + dt.getMinutes();
      var seconds = dt.getSeconds();
      var ampm = dt.getHours() < 12 ? "AM" : "PM";
      var formattedTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
      return formattedTime;
    }

    // Randomly generate Client ID
    function gen_MQTT_Client_ID(){
      document.getElementById("txt_MQTT_Client_ID").value = Math.floor(10000 + Math.random() * 90000);
    }
    function changeConnectionStatusImage(image) {
		document.getElementById("connectionImage").src = image;
	}

