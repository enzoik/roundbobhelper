$(document).ready(function(){
  
$('.hotel-item-selected-content-menu a').on('click', function(){
var html = '';

if($(this).attr('class') == 'photos'){

html+='<div class="hotel-item-selected-content-photos">';      
html+='<div class="col-md-5">';
html+='<div class="row">';
html+='<div  id="carousel-bounding-box">';
html+='<div id="myCarousel" class="carousel slide">';
html+='<div class="carousel-inner">';
html+='<div class="active item" data-slide-number="0">';
html+='<img src="http://localhost/bob2/images/vitoria.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="1">';
html+='<img src="http://localhost/bob2/images/8.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="2">';
html+='<img src="http://localhost/bob2/images/10.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="3">';
html+='<img src="http://localhost/bob2/images/atlantis.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="4">';
html+='<img src="http://localhost/bob2/images/balloon.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="5">';
html+='<img src="http://localhost/bob2/images/bangkok.jpg">';
html+='</div>';
html+='<div class="item" data-slide-number="6">';
html+='<img src="http://localhost/bob2/images/banner1.jpg">';
html+='</div>';

html+='</div><!-- end carousel-inner -->';

html+='</div><!-- end myCarousel -->';
html+='</div><!-- end carousel-bounding-box -->';
html+='</div><!-- end row -->';
html+='</div><!-- end col-md-5  -->';

html+='<div class="col-md-7">';
html+='<div class="row">';

html+='<div class="hotel-item-selected-content-photos-nav">';
html+='<ul>';
html+='<li> ';
html+='<a id="carousel-selector-0" class="selected">';
html+='<img src="http://localhost/bob2/images/vitoria.jpg">';
html+='</a>';
html+='</li>';

html+='<li> ';
html+='<a id="carousel-selector-1">';
html+='<img src="http://localhost/bob2/images/8.jpg">';
html+='</a>';
html+='</li>';

html+='<li> ';
html+='<a id="carousel-selector-2">';
html+='<img src="http://localhost/bob2/images/10.jpg">';
html+='</a>';
html+='</li>';

html+='<li> ';
html+='<a id="carousel-selector-3">';
html+='<img src="http://localhost/bob2/images/atlantis.jpg">';
html+='</a>';
html+='</li>';

html+='<li> ';
html+='<a id="carousel-selector-4">';
html+='<img src="http://localhost/bob2/images/balloon.jpg">';
html+='</a>';
html+='</li>';

html+='<li>';
html+='<a id="carousel-selector-5">';
html+='<img src="http://localhost/bob2/images/bangkok.jpg">';
html+='</a>';
html+='</li>';

html+='<li> ';
html+='<a id="carousel-selector-6">';
html+='<img src="http://localhost/bob2/images/banner1.jpg">';
html+='</a>';
html+='</li>';
html+='<li>';
html+='<a id="carousel-selector-6">';
html+='<img src="http://localhost/bob2/images/banner1.jpg">';
html+='</a>';
html+='</li>';
html+='<li>';
html+='<a id="carousel-selector-6">';
html+='<img src="http://localhost/bob2/images/banner1.jpg">';
html+='</a>';
html+='</li>';                 
html+='</ul>';
html+='</div><!-- hotel-item-selected-content-photos-nav -->';
html+='</div><!-- end row -->';
html+='</div> <!-- end col-md-7 --> ';
html+='</div><!-- end hotel-item-selected-content-photos -->';

$(document).ready( function(){
$('#myCarousel').carousel({
    interval: false
});

// handles the carousel thumbnails
$('[id^=carousel-selector-]').on('mouseover', function(){
  var id_selector = $(this).attr("id");
  var id = id_selector.substr(id_selector.length -1);
  id = parseInt(id);
  $('#myCarousel').carousel(id);
  $('[id^=carousel-selector-]').removeClass('selected');
  $(this).addClass('selected');
});

// when the carousel slides, auto update
$('#myCarousel').on('slid', function (e) {
  var id = $('.item.active').data('slide-number');
  id = parseInt(id);
  $('[id^=carousel-selector-]').removeClass('selected');
  $('[id=carousel-selector-'+id+']').addClass('selected');
});

});

}


else if($(this).attr('class') == 'description'){

html+='<div class="hotel-item-selected-content-description">';
html+='<div class="col-md-6">';
html+='<div class="row">';
html+='<h4>Features</h4>';
html+='<p>';
html+='Guest accommodation comprises 100 rooms. Services and facilities at the hotel include a dining area, room service and a laundry service. Wireless internet access is available to guests. Those arriving in their own vehicles can leave them in the car park of the hotel. In addition, a shuttle service is offered.';
html+='</p>';

html+='<h4>Sports/Entertainment</h4>';

html+='<p>';
html+='The hot tub is the perfect place to relax. A range of options are available, including a gym, a spa, a sauna and a steam bath.';
html+='</p>';
html+='</div><!-- end row -->';
html+='</div><!-- end col-md-6 -->';

html+='<div class="col-md-6">';
html+='<h4>Hotel Amenities</h4>';
html+='<p>';
html+='<ul>';
html+='<li>24-Hour Front Desk</li>';
html+='<li>Concierge</li>';
html+='<li>Currency Exchange</li>';
html+='<li>Elevator(s)</li>';
html+='<li>Fitness Center</li>';
html+='<li>Laundry/Valet</li>';
html+='<li>Massage Treatments</li>';
html+='<li>Non Smoking Rooms</li>';
html+='<li>Restaurant(s)</li>';
html+='<li>Sauna</li>';
html+='<li>Tour Desk </li>';
html+='</ul>';
html+='</p>';

html+='<h4>Rooms</h4>';
html+='<p>';
html+='The accommodation features rooms with a bathroom. Most rooms also feature a terrace for relaxation. Amenities in all rooms include WiFi. The bathrooms have a shower and a bathtub.';
html+='</p>';

html+='<h4>Meals</h4>';
html+='<p>';
html+='It is possible to order breakfast.';
html+='</p>';

html+='</div><!-- end col-md-6 -->';

html+='</div><!-- end hotel-item-selected-content-description -->';
}

else if($(this).attr('class') == 'map'){
  html+='<div class="hotel-item-selected-content-map">';
  html+='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7581017418206!2d32.615452014328866!3d0.31479436411504524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc07ea678e37%3A0xfb74afdfff7ed815!2sThe+Brand+House!5e0!3m2!1sen!2sug!4v1501062930729" width="100%" height="350" frameborder="0" style="border:0" allowfullscreen></iframe>';
  html+='</div>';
}

document.getElementById('hotel-content-dump').innerHTML = html;

});
});