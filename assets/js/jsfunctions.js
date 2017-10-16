// stop drop-down from disappearing when clicked inside


 function more_fields_multi_selection(){


    var printField = '<div class="sub_group">'+

                     '<div class="row_wrap">'+
                      '<div class="col-md-6">'+
                        '<div class="form_item">'+
                         '<label>Flying from</label>'+
                          '<div class="f__iconItem">'+
                            '<span><i class="icon-location"></i></span>'+
                            '<input type="text" name="" class="form-control" placeholder="Enter airport, city or country" id="location">'+
                          '</div><!-- end f__iconItem -->'+
                        '</div><!-- end form-item -->'+
                      '</div><!-- -->'+

                      '<div class="col-md-6">'+
                        '<div class="form_item">'+
                         '<label>Flying to</label>'+
                          '<div class="f__iconItem">'+
                            '<span><i class="icon-location"></i></span>'+
                            '<input type="text" name="" class="form-control" placeholder="Enter airport, city or country">'+
                          '</div><!-- end f__iconItem -->'+
                        '</div><!-- end form-item -->'+
                      '</div><!-- -->'+
                     '</div><!-- row_wrap -->'+

                     '<div class="row_wrap">'+
                        '<div class="date">'+
                            '<div class="col-md-3">'+
                              '<div class="form_item">'+
                                '<label>Departing on</label>'+
                                   '<div class="f__iconItem">'+
                                     '<span class="f__iconItem"><i class="icon-calendar"></i></span>'+
                                      '<input type="text" name="start" class="form-control dpicker" placeholder="MM/DD/YYYY">'+
                                   '</div><!-- end f__iconItem -->'+
                               '</div><!-- end form-item -->'+
                               '</div>'+
                            '</div><!-- end date-->'+
                       '</div><!-- row_wrap -->'+
                       '</div><!-- end sub_group -->';


      var el = document.getElementById('flight_type');
      el.insertAdjacentHTML('beforeend', printField);
  }


  function more_rooms(){
    var printRooms = '<div class="room-wrapper">'+
                       '<div class="row_wrap">'+
                         '<div class="col-md-3 no-padding">'+
                           '<div class="form_item">'+
                             '<label>Adults</label>'+
                               '<div class="select-box">'+
                                   '<span class="sb_arrow"><i class="icon-angle-down"></i></span>'+
                                     '<select class="form-control">'+
                                        '<option>0</option>'+
                                        '<option>1</option>'+
                                        '<option>2</option>'+
                                        '<option>3</option>'+
                                        '<option>4</option>'+
                                        '<option>5</option>'+
                                        '<option>6</option>'+
                                        '<option>7</option>'+
                                        '<option>8</option>'+
                                        '<option>9</option>'+
                                        '<option>10</option>'+
                                      '</select>'+
                                '</div><!-- end select-box -->'+
                            '</div><!-- end form-item -->'+
                          '</div><!-- -->'+

              '<div class="col-md-3 no-padding">'+
             '<div class="form_item">'+
                '<label>Children</label>'+
                '<div class="select-box">'+
                '<span class="sb_arrow"><i class="icon-angle-down"></i></span>'+
                '<select name="fan" class="form-control select_no_children" id="mySelect">'+
                  '<option value="0">0</option>'+
                  '<option value="1">1</option>'+
                  '<option value="2">2</option>'+
                  '<option value="3">3</option>'+
                  '<option value="4">4</option>'+
                '</select>'+
                '</div><!-- end select-box -->'+
              '</div><!-- end form-item -->'+
              '</div><!-- -->'+
              '</div><!-- end row_wrap -->'+
              '<div id="demo">'+
              '</div><!-- end row_wrap -->'+
              '</div><!-- end room-wrapper -->';

              var rl = document.getElementById('room-wrap');
               rl.insertAdjacentHTML('beforeend', printRooms);
  }

 //show percentage on side menu icons (flight, package, hotel booking process)
 $(function(){
    if(1){
      $('.progress__bar').css('stroke-dashoffset', '128.1768')
    }
 })

 //print child age form fields
 function AddChildAge(select,div){
  var select_value = document.getElementById(select).value;
  var print_field = "";

  if(select_value <= 1){
    var print_field ='<label>child age</label>'+
                    '<div class="childno-wrap">';
    } else {
      var print_field ='<label>children ages</label>'+
                    '<div class="childno-wrap">';
    }


  for( var i=1; i<=select_value; i++){
    print_field += '<div class="c-item">'+
                     '<div class="form_item">'+
                        '<div class="select-box">'+
                          '<span class="sb_arrow"><i class="icon-angle-down"></i></span>'+
                          '<select class="form-control">'+
                             '<option value="1">1</option>'+
                          '</select>'+
                        '</div>'+
                     '</div>'+
                   '</div>';
  }

  print_field += '</di>';

  if(select_value == 0){
  document.getElementById(div).innerHTML = "";
  }
  else {
    document.getElementById(div).innerHTML = print_field;
  }
 }// end AddChildAge


 $(document).ready(function(){
   $('#more_plus').click(function(){
    $('#more_sign').toggleClass('icon-angle-down');
    $('.hotel_reveal_info').toggleClass('hide');
   })
 })


 //print child age form fields
 function AddRoom(select, div){
  var select_value = document.getElementById(select).value;
  var print_room = "";
  var guest = 1;
  var room = 1;

  for( var i=1; i<=select_value; i++){
    print_room += '<div class="room-wrap">' +
                 '<div class="col-md-1 no-padding">' +
                   '<div class="room-label">' +
                      'Room '+ i +
                   '</div><!-- end room-label -->' +
                 '</div><!-- end col-md-1 -->' +

                 '<div class="col-md-2 no-padding">' +
                   '<div class="form_item">' +
                     '<label>Adult</label>' +
                     '<div class="select-box">' +
                       '<span class="sb_arrow"><i class="icon-angle-down"></i></span>' +
                       '<select id="adults'+i+'"class="form-control hotelRoomAdultsSelector" onchange="addUpGuests();">' +
                         '<option value="1">1</option>' +
                         '<option value="2">2</option>' +
                         '<option value="3">3</option>' +
                         '<option value="4">4</option>' +
                         '<option value="5">5</option>' +
                         '<option value="6">6</option>' +
                       '</select>' +
                     '</div><!-- end select-box -->' +
                   '</div><!-- end form_item -->' +
                 '</div><!-- end col-md-1 -->' +

                 '<div class="col-md-2 no-padding">' +
                   '<div class="form_item">' +
                     '<label>Children</label>' +
                     '<div class="select-box">' +
                       '<span class="sb_arrow"><i class="icon-angle-down"></i></span>' +
                       '<select id="children'+i+'" class="form-control " onchange="AddChildAge(\'children'+i+'\',\'childage'+i+'\'); addUpGuests();">' +
                         '<option value="0">0</option>' +
                         '<option value="1">1</option>' +
                         '<option value="2">2</option>' +
                         '<option value="3">3</option>' +
                         '<option value="4">4</option>' +
                         '<option value="5">5</option>' +
                       '</select>' +
                     '</div><!-- end select-box -->' +
                   '</div><!-- end form_item -->' +
                 '</div><!-- end col-md-1 -->' +
                 '<div class="col-md-7" id="childage'+i+'"></div>' +
               '</div><!-- end room-wrap -->';
 }
    document.getElementById(div).innerHTML = print_room;

 }// end AddRoom

    function addUpGuests(){
      var romno = document.getElementById('roomSelect').value;
      var adulty = 0;
      var childreny =0;
      var totx = 0;
      for(var x=1; x<=romno; x++){
         adulty += parseInt(document.getElementById('adults'+x).value);
         childreny += parseInt(document.getElementById('children'+x).value);
      }
      totx = parseInt(adulty+childreny);

    if(totx > 1){
      guests = " Guests";
    } else { guests = " Guest";  }


    if(romno > 1){
       rooms = " Rooms";
    } else { rooms = " Room"; }

    var rValue =  totx + guests + " , " + romno + rooms ;
    document.getElementById('drop-room').setAttribute("value", rValue);
  }

  function addUpPassengers(){
    var adultPassenger = parseInt(document.getElementById('adultPassenger').value);
    var childPassenger = parseInt(document.getElementById('childPassenger').value);
    var flightClass = document.getElementById('flightClass').value;
    var passenger = parseInt(adultPassenger + childPassenger);
    var passengerStr = "";

    if(passenger > 0){
      var passengerStr = "Passenger";
    } else {
      passengerStr = "Passengers";
    }

    var passengerChoice = passenger + " " +passengerStr + ", " + flightClass;

    document.getElementById('drop-flight').setAttribute("value", passengerChoice);

  }



 function goBack(){
  window.history.back();
 }

 function goForward(){
  window.history.forward();
 }
