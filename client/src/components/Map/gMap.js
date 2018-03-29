function initMap() {
      //Pin Location
        //Our Mutual Friend
        var myLatLng1 = {lat: 39.7605, lng: -104.9824};
        //Ratio Beerworks
        var myLatLng2 = {lat: 39.7615, lng: -104.9811};
        //Spangalang Brewery
        var myLatLng3 = {lat: 39.755217, lng: -104.977019};
        //Woods Boss Brewing
        var myLatLng4 = {lat: 39.7510, lng: -104.9846};
        //Epic Brewing Company
        var myLatLng5 = {lat: 39.7632, lng: -104.9813};
        //Great Divide Brewing Co
        var myLatLng6 = {lat: 39.753786, lng: -104.988500};
        //Jagged Mountain Craft Brewing
        var myLatLng7 = {lat: 39.7523, lng: -104.9914};
        //TRVE Brewing Co
        var myLatLng8 = {lat: 39.7199, lng: -104.9877};
        //Crazy Mountain Brewery Tap Room
        var myLatLng9 = {lat: 39.7237, lng: -105.0006};
        //Black Sky Brewery
        var myLatLng10 = {lat: 39.7239, lng: -104.9985};
        //Renegade Brewing Company
        var myLatLng11 = {lat: 39.7306, lng: -104.9993};

        //Map default location and append to html
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: 39.7393, lng: -104.9848},
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        //Pin location
        var marker1 = new google.maps.Marker({
          position: myLatLng1,
          map: map,
          title: 'Our Mutual Friend',
          url: "http://www.google.com/",
        });
        var marker2 = new google.maps.Marker({
          position: myLatLng2,
          map: map,
          title: 'Ratio Beerworks',
          url: "http://www.google.com/",
        });
        var marker3 = new google.maps.Marker({
          position: myLatLng3,
          map: map,
          title: 'Spangalang Brewery',
          url: "http://www.google.com/",
        });
        var marker4 = new google.maps.Marker({
          position: myLatLng4,
          map: map,
          title: 'Woods Boss Brewing',
          url: "http://www.google.com/",
        });
        var marker5 = new google.maps.Marker({
          position: myLatLng5,
          map: map,
          title: 'Epic Brewing Company',
          url: "http://www.google.com/",
        });
        var marker6 = new google.maps.Marker({
          position: myLatLng6,
          map: map,
          title: 'Great Divide Brewing Co',
          url: "http://www.google.com/",
        });
        var marker7 = new google.maps.Marker({
          position: myLatLng7,
          map: map,
          title: 'Jagged Mountain Craft Brewing',
          url: "http://www.google.com/",
        });
        var marker8 = new google.maps.Marker({
          position: myLatLng8,
          map: map,
          title: 'TRVE Brewing Co',
          url: "http://www.google.com/",
        });
        var marker9 = new google.maps.Marker({
          position: myLatLng9,
          map: map,
          title: 'Crazy Mountain Brewery Tap Room',
          url: "http://www.google.com/",
        });
        var marker10 = new google.maps.Marker({
          position: myLatLng10,
          map: map,
          title: 'Black Sky Brewery',
          url: "http://www.google.com/",
        });
        var marker11 = new google.maps.Marker({
          position: myLatLng11,
          map: map,
          title: 'Renegade Brewing Company',
          url: "http://www.google.com/",
        });

        //Pin click events
        marker1.addListener('click', function() {
          window.location.href = marker1.url;
        });
        marker2.addListener('click', function() {
          window.location.href = marker2.url;
        });
        marker3.addListener('click', function() {
          window.location.href = marker3.url;
        });
        marker4.addListener('click', function() {
          window.location.href = marker4.url;
        });
        marker5.addListener('click', function() {
          window.location.href = marker5.url;
        });
        marker6.addListener('click', function() {
          window.location.href = marker6.url;
        });
        marker7.addListener('click', function() {
          window.location.href = marker7.url;
        });
        marker8.addListener('click', function() {
          window.location.href = marker8.url;
        });
        marker9.addListener('click', function() {
          window.location.href = marker9.url;
        });
        marker10.addListener('click', function() {
          window.location.href = marker10.url;
        });
        marker11.addListener('click', function() {
          window.location.href = marker11.url;
        });
      };


