$(document).on('click', '#selectNumberOfRooms', function(){
  var selected_value = this.value;
  var html = "";

  for(var i=1; i<=selected_value; i++){
    html+= '<div class="hotel-guest-numbers-add-room-row">' +
                 '<div class="col-md-2">' +
                   '<div class="room-number-label">' +
                      'Room '+ i + 
                   '</div>' +
                 '</div>' +
                 '<div class="col-md-2">' +
                     '<label>Adult</label>' +
                       '<select id="adults'+i+'" class="form-element hotel-guest-in">'+
                         '<option value="1">1</option>' +
                         '<option value="2">2</option>' +
                         '<option value="3">3</option>' +
                         '<option value="4">4</option>' +
                         '<option value="5">5</option>' +
                         '<option value="6">6</option>' +
                       '</select>' +
                 '</div>' +

                 '<div class="col-md-2">' +
                     '<label>Children</label>' +
                       '<select id="children'+i+'" class="form-element hotel-guest-in children-number-selector">' +
                         '<option value="0">0</option>' +
                         '<option value="1">1</option>' +
                         '<option value="2">2</option>' +
                         '<option value="3">3</option>' +
                         '<option value="4">4</option>' +
                         '<option value="5">5</option>' +
                       '</select>' +
                 '</div>' +
                 '<div class="col-md-6">'+
                  '<div class="guest-children"  id="childage'+i+'">'+
                  '</div>'+
                 '</div>' +
               '</div>';
 }
    document.getElementById('populateRoomGuest').innerHTML = html; 

 });// end AddHotelRooms


  //print child age form fields
 $(document).on('change', '.children-number-selector', function(){
  
  var selected_value = this.value;

  var print_field = "";

  if(selected_value <= 1){
     var print_field = '<label>Child age</label>'+
                    '<div class="hotel-guest-numbers-child-age">';
    } else {
     var print_field = '<label>Children ages</label>'+
                    '<div class="hotel-guest-numbers-child-age">';
    }
  
    for( var i=1; i<=selected_value; i++){
    
    print_field += '<div class="col-md-3">'+
                     '<div class="row">'+
                        '<div class="hotel-guest-child-age">'+                          
                          '<select class="form-element">'+
                             '<option value="1">1</option>'+
                             '<option value="2">2</option>'+
                             '<option value="3">3</option>'+
                             '<option value="4">4</option>'+
                          '</select>'+
                        '</div>'+
                     '</div>'+
                   '</div>';
  }

  print_field += '</di>';

  $id = $(this).parent().parent().find('.guest-children').attr('id');

  if(selected_value == 0 ){
    document.getElementById($id).innerHTML = "";
  }
  else{
    document.getElementById($id).innerHTML = print_field;
  }

  
 });// end AddChildAge


 // sum of hotel guests display in form field
 $(document).on('change', '.hotel-room-number', function(){
  var total = 0;
  var roomTotal = this.value; 

  $('.hotel-guest-in').each(function(){
    total += parseFloat(this.value);
  })
  var string = (total+1)+' Guest, '+roomTotal+' Rooms';

  document.getElementById('complete-hotel-guests').setAttribute("value", string);
 })


 $(document).on('change', '.hotel-guest-in', function(){
  var total = 0;
  var roomTotal = document.getElementById('selectNumberOfRooms').value; 

  $('.hotel-guest-in').each(function(){
    total += parseFloat(this.value);
  })

  var string = total+' Guest, '+roomTotal+' Rooms';
  document.getElementById('complete-hotel-guests').setAttribute("value", string);
 })
 
// pull down/up div used to input guest information on the search form
 $(document).on('click', '#complete-hotel-guests', function(){
    $('.hotel-guest-numbers').toggleClass('hotel-guest-numbers-open')
 })



 //stop dropdown from propagating
 //

 $(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation(); 
});


//sum of passengers to travel on the flight search form

$(document).on('change', '.passenger-info,.passenger-flight-class', function(){
  var total = 0;
  var flightType = document.getElementById('flightClass').value;

  $('.passenger-info').each(function(){
    total += parseFloat(this.value);
  })

  var string = total+' Passengers, '+flightType;

  document.getElementById('complete-passenger-info').setAttribute("value", string);
 })


// print 0ut star ratings

function hotelStarRating(num){

  var html ="";
  var wholeNumber = 0;
  var unratedWholeNumber = 0;

  if(isNaN(num)){
    html += 'no rating';
  }

  else{

      if(num%1 !=0){
        wholeNumber = (Math.round(num))-1;

        for(var i=1; i<=wholeNumber; i++){
            html += '<label class="full"></label>';
        }

            html += '<label class="half"></label>';

            unratedWholeNumber = 5-(wholeNumber+1);

        for(var j=1; j<=unratedWholeNumber; j++){
           html += '<label class="unrated"></label>';
        }
      }

      else{
          for(var i =1; i<=num; i++){
            html += '<label class="full"></label>';
          }
          unratedWholeNumber = 5-num;

          for(var j=1;j<=unratedWholeNumber; j++){
            html += '<label class="unrated"></label>';
          }
      }      
  }

  document.write(html);
}


$(document).on('click','.open-package-info', function(){
  $('.package-item-selected-info').toggleClass('package-item-selected-info-open');
})


$(document).on('change', '.package-children', function(){

      var numOfChildren = this.value;
      var adultFee = $('input[name=package-payment-option]:checked').val();
      var numOfAdults = $('.package-adults').val();
      var numOfInfants = $('.package-infants').val();
      var childFee = $('.package-children-fee').val();
      var totalPrice = 0;

    if(this.value > 0){
      $('.child-pricing').fadeIn();
        totalPrice = (numOfChildren*childFee)+(numOfAdults*adultFee);
     }

    else{
      $('.child-pricing').hide();
      totalPrice = (adultFee*numOfAdults);
    }
    document.getElementById('packageItemPrice').innerHTML = totalPrice;
    document.getElementById('numberOfChildren').innerHTML = '<span>Children: </span>'+numOfChildren;
    document.getElementById('combinedNumberOfGuests').innerHTML = 'for '+numOfAdults+' adults, '+numOfChildren+' child(ren), '+numOfInfants+' infant(s)';
});

$(document).on('change','.package-adults', function(){

      var numOfAdults = this.value;
      var adultFee = $('input[name=package-payment-option]:checked').val();
      var numOfChildren = $('.package-children').val();
      var numOfInfants = $('.package-infants').val();
      var childFee = $('.package-children-fee').val();
      var totalPrice = 0;
      var numOfInfants = $('.package-infants').val();
      totalPrice = (numOfAdults*adultFee)+(numOfChildren*childFee);

      document.getElementById('packageItemPrice').innerHTML = totalPrice;
      document.getElementById('numberOfAdults').innerHTML = '<span>Adult(s): </span>'+numOfAdults;
      document.getElementById('combinedNumberOfGuests').innerHTML = 'for '+numOfAdults+' adults, '+numOfChildren+' child(ren), '+numOfInfants+' infant(s)';
})

$(document).on('change','.package-children-fee', function(){

      var numOfAdults = $('.package-adults').val();
      var adultFee = $('input[name=package-payment-option]:checked').val();
      var numOfChildren = $('.package-children').val();
      var childFee = this.value;
      var totalPrice = 0;

      totalPrice = (numOfAdults*adultFee)+(numOfChildren*childFee);
      document.getElementById('packageItemPrice').innerHTML = totalPrice;
})

$(document).on('change','.payment-option', function(){
      
      var adultFee = this.value;
      var numOfAdults = $('.package-adults').val();
      var numOfChildren = $('.package-children').val();
      var childFee = $('.package-children-fee').val();
      var totalPrice = 0;

      totalPrice = (adultFee*numOfAdults)+(numOfChildren*childFee);      
      document.getElementById('packageItemPrice').innerHTML = totalPrice;
})


$(document).on('change','.payment-option', function(){
      
      var adultFee = this.value;
      var numOfAdults = $('.package-adults').val();
      var numOfChildren = $('.package-children').val();
      var childFee = $('.package-children-fee').val();
      var totalPrice = 0;

      totalPrice = (adultFee*numOfAdults)+(numOfChildren*childFee);      
      document.getElementById('packageItemPrice').innerHTML = totalPrice;
})


$(document).on('change','.package-infants', function(){  

      var numOfInfants = this.value;
      var numOfAdults = $('.package-adults').val();
      var numOfChildren = $('.package-children').val();

      document.getElementById('numberOfInfants').innerHTML = '<span>Infants(s): </span>'+numOfInfants;
      document.getElementById('combinedNumberOfGuests').innerHTML = 'for '+numOfAdults+' adults, '+numOfChildren+' child(ren), '+numOfInfants+' infant(s)';
})














