var map = L.map('map').fitWorld();  // shows the whole world.

L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d5aae97cbf674c4e89e1d5c82d548dba', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'd5aae97cbf674c4e89e1d5c82d548dba',
	maxZoom: 22
}).addTo(map);

var flagsUrl = "https://countryflagsapi.com/svg/" + $('#cntry').val();
$('#flags').html("<img width=100 height=45 src=" + flagsUrl + ">");

$('#cntry').change(function(){
    getOtherData();
});


function onLocationFound(e) {

    var positn = e.latlng;
    console.log(positn);  

    plat = positn.lat;
    plng = positn.lng;  
    
    function getCntryCode(clat, clng){
        $.ajax({
              url: "libs/php/getCntryCode.php",       // access OpenCage API - for country code
              type: 'POST',
              dataType: 'json',
              data: {
                  'q': clat + ',' + clng
                  },  
              success: function(result){ 
                  console.log(result.status.code);  
    
                  if ((result.status.name).toUpperCase() == "OK"){
                      var dat = result.data[0];                        // Extract country code info
    
                      var ctrcd = dat.components.country_code;
                    //   var tmzn = dat.annotations.timezone.offset_string;
                    //   var drvStyl = dat.annotations.roadinfo.drive_on;          
                    //   var currNotes = dat.annotations.currency.name;
                    //   var currCoins = dat.annotations.currency.subunit;
                    //   var areacd = dat.annotations.callingcode;                   
                  }              
    
                  ctrcd = ctrcd.toUpperCase();
    
                  $('#cntry').val(ctrcd);
                  getOtherData();
    
              },
              error: function(jqXHR){
                  console.log(jqXHR, "Something is wrong");     // error for getCountryCode ajax.
              }       
        });  
    }
    
    getCntryCode(plat, plng);   

}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});




function getOtherData(){                    
    var ccode = $('#cntry').val();
    console.log(ccode);

    var flagsUrl = "https://countryflagsapi.com/svg/" + ccode;
        
    // API data sourcing:
    $.ajax({
        url: "libs/php/getCountryInfo.php",       // access Geonames API - countryInfo
        type: 'POST',
        dataType: 'json',     
        data: {
            country: ccode
        },       
        success: function(result){
            console.log(result.status.code);
            console.log(result);

            if (result.status.name.toUpperCase() == "OK"){
                var cntrydat = result.data[0]; 

                var cntrynm = cntrydat.countryName;
                var cpcity = cntrydat.capital;
                var cnti = cntrydat.continentName;
                var cpop = cntrydat.population;
                var gnmId = cntrydat.geonameId;
                var ctrcd2 = ccode;
                var ctrcd3 = cntrydat.isoAlpha3
                // cWiki = {{ctrcd3}};
                var cntryArea = cntrydat.areaInSqKm;
                var cbn = cntrydat.north;
                var cbs = cntrydat.south;
                var cbe = cntrydat.east;
                var cbw = cntrydat.west;
                clat = Number.parseFloat(((cbn - cbs) / 2) + cbs).toFixed(2);
                clng = Number.parseFloat(((cbe - cbw) / 2) + cbw).toFixed(2);
                // $('#flags').html("<img width=100 height=45 src=" + flagsUrl + ">");
                $('#flags').html("<img width=100 height=45 src=" + flagsUrl + " alt=\"flag of \"" + cntrynm + ">");
             
                $.ajax({
                    url: "libs/php/getWeather.php",             // access OpenWeather API using clat, clng values
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        lat: clat,
                        lon: clng
                    },
                    success: function(result){
                        if (result.status.name.toUpperCase() == "OK"){
                            console.log(result.status.code);
                            var dat = result.data;

                            wDescrp = dat.weather[0].description;
                            wIcon = dat.weather[0].icon;
                            wIconUrl = "http://openweathermap.org/img/w/" + wIcon + ".png";
                            nowTemp = dat.main.temp;
                            vizi = Number.parseFloat(dat.visibility / 1000).toFixed(2);           // distance in km                                        
                            
                            var clatt = Number.parseFloat(clat + 0.001).toFixed(3);
                            var clngg = Number.parseFloat(clng + 0.001).toFixed(3);

                            var weatherPop = L.popup()
                                .setLatLng([clatt, clngg])
                                .setLatLng(map.getCenter())
                                .setContent("<br><p><center><big><big><b>" + cpcity + ", " + ctrcd2.toUpperCase() + "</b></big></big></center></p><hr><p><center><big><big><big><img src=" + wIconUrl + "><b>&ensp;&nbsp;<big>" + nowTemp + 
                                "&nbsp;&degC</big></big></big></big></b></center></p><hr><p><center><b><i>Expected Today:</i></b></center></p><p><center><b>" + wDescrp + "</b></center></p><p><center>Visibility: " + vizi + " km(s)</center></p>")
                                .openOn(map);                                                
                            
                            var wtoggle = L.easyButton({
                                states: [{
                                    stateName: 'show-weather',
                                    icon: 'fa-cloud-sun',
                                    title: 'view weather report',
                                    onClick: function(control){
                                        weatherPop.openOn(map);
                                        control.state('hide-weather');
                                    }
                                }, 
                                {
                                    stateName: 'hide-weather',
                                    icon: 'fa-close',
                                    title: 'close weather report',
                                    onClick: function(control) {
                                        // map.remove(weatherPop);      when I use this, it removes the whole map
                                        control.state('show-weather')
                                    }
                                }]
                            });

                            wtoggle.addTo(map);


                            $.ajax({
                                url: "libs/php/getPOIs.php",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    lat: clatt,
                                    lng: clngg
                                },
                                success: function(result){
                                    if (result.status.code == "200"){
                                        console.log(result.status.code);
                                        console.log(result.data[0]);
                                        
                                        var pois = result.data;
                                        
                                        pointList = [];
                                        for (let i = 0; i < pois.length; i++){
                                            ltt = pois[i].lat;
                                            lgg = pois[i].lng;
                                            L.marker([lat, lng]).addTo(map).bindPopup("<p>" + pois.name + "</p><p>" + pois.typeName + "</p>");
                                        }
                                    };   
                                    
                                    

                                    // map.setLatLng([clatt, clngg]);
                                    // map.locate({setView: true, maxZoom: 16});
                                },
                                error: function(jqXHR){
                                  console.log(jqXHR);             // error for getPOIs ajax
                                }
                            });          

                        }                            

                    },
                    error: function(jqXHR){
                        console.log(jqXHR);                   // error for getWeather ajax
                    }

                });  
               
            }

        },
        error: function(jqXHR){
            console.log("Sorry no data available for this position.");        // error for getCountryInfo ajax
            console.log(jqXHR);
        }
    });
    
    // map.setLatLng([clatt, clngg]);
    // map.locate({setView: true, maxZoom: 16});
}



