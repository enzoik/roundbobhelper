
$(document).on('click','#helperIcon', function(){

	var template = '<div class="col-md-8 col-md-offset-2">'+
						'<div  class="helper-item-white-board">'+
							'<div class="header" id="header"><span>what would you like bob to find for you?<span></div>'+
								'<div id="traverse-content">'+
									'<div class="item-icons">'+
										'<div class="icon" id="flightIcon"><img src="img/flights.png"> <small>flights</small></div>'+
										'<div class="icon" id="hotelIcon"><img src="img/hotels.png"> <small>hotels</small></div>'+
										'<div class="icon" id="packageIcon"><img src="img/packages.png"> <small>packages</small></div>'+
									'</div>'+
						    	'</div>'+
						'</div>'+
					'</div>';
	document.getElementById('bobhelper-content').innerHTML = template;
})

$(document).on('mouseover','.icon', function(){
	var id = $(this).attr('id');

	if(id == "flightIcon"){
		document.getElementById('header').innerHTML = "<span>Ooh! a flight? that's easy</span>";
	}

	else if(id == "hotelIcon"){
		document.getElementById('header').innerHTML = "<span>Bob has so many hotels to choose from!</span>";
	}

	else if(id == "packageIcon"){
		document.getElementById('header').innerHTML = "<span>Packages are our thing</span>";
	}

	else {
		document.getElementById('header').innerHTML = "<span>what would you like bob to find for you?</span>";
	}
});

$(document).on('mouseout','.icon', function(){
	document.getElementById('header').innerHTML = "<span>what would you like bob to find for you?</span>";
});

$(document).on('click', '#flightIcon', function(){
	var flightTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="Where are you flying from?">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getDest">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = flightTemplate;
	document.getElementById('header').innerHTML = "<span>cool!..lets find you a flight..</span>";
})

$(document).on('click', '#hotelIcon', function(){
	var hotelTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="Whats your destination?">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getFee">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = hotelTemplate;
	document.getElementById('header').innerHTML = "<span>Amazing!..We find the best hotels in the world.</span>";
})

$(document).on('click', '#packageIcon', function(){
	var packageTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="What Kind of package?">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getFee">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = packageTemplate;
	document.getElementById('header').innerHTML = "<span>nice! Bob loves creating packages..</span>";
})


$(document).on('click','#getDest', function(){
		var DestTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="and flying to?">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getFee">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = DestTemplate;
});

$(document).on('click','#getFee', function(){
		var FeeTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="How much do you usuall pay for this item?">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getContacts">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = FeeTemplate;
	document.getElementById('header').innerHTML = "<span>Lets keep it within your budget...</span>";
});

$(document).on('click','#getContacts', function(){
		var contactTemplate = '<div class="traverse-form">'+
							'<div class="traverse-form-row">'+
								'<div class="input-el">'+
									'<input type="text" class="form-element" placeholder="Enter your phone number (include country code)">'+
								'</div>'+
								'<div class="btn-el">'+
									'<button type="submit" class="button-primary" id="getCaller">submit</button>'+
								'</div>'+
							'</div>'+
						'</div>';


	document.getElementById('traverse-content').innerHTML = contactTemplate;
	document.getElementById('header').innerHTML = "<span>Great, Bob would like to call you back about this...</span>";
});

$(document).on('click','#getCaller', function(){
		var callerTemplate = '<div class="caller">'+
								'<div class="loader"><i class="icon-phone"></i></div>'+
								'<div class="text">calling 256772123456 ....</div>'							
							  '</div>';


	document.getElementById('traverse-content').innerHTML = callerTemplate;
	document.getElementById('header').innerHTML = "<span>Thank you. Please hold on as Bob calls you back...</span>";
});

