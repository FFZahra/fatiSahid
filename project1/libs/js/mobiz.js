$('document').ready(function(){

    $.ajax({
        url: "libs/php/countriesDropdown.php",
        type: "GET",
        dataType: 'json',    
        success: function(response){
            console.log(response.status.name);
            console.log(response.data);
            var dat = response.data;            

            // clear current dropdown contents:
            if (dat.length > 0) {
                $('#cntry').html('');                
            }

            var choices = "";
            for (var i = 0; i < dat.length; i++){
                choices = choices + '<option value = "' + dat[i].iso_a2 + '">' + dat[i].name + '</option>';
            }
            
            $('#cntry').html(choices);           
            
        },
        error: function(error){
            console.log(error.status);
        }
    })
});

var map = L.map('map').fitWorld();  // shows the whole world.

var mapBase = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d5aae97cbf674c4e89e1d5c82d548dba', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'd5aae97cbf674c4e89e1d5c82d548dba',
	maxZoom: 22
}).addTo(map);



var flagsUrl = "https://countryflagsapi.com/svg/" + $('#cntry').val();
$('#flags').html("<img width=100 height=45 src=" + flagsUrl + ">");


$('#cntry').change(function(){
    // clear Controls from map;
    // ( code to go here)

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
                var ctrLang = cntrydat.languages.slice(0,2);
                var cntryArea = cntrydat.areaInSqKm;
                var cbn = cntrydat.north;
                var cbs = cntrydat.south;
                var cbe = cntrydat.east;
                var cbw = cntrydat.west;
                var clat = Number.parseFloat(((cbn - cbs) / 2) + cbs).toFixed(2);
                var clng = Number.parseFloat(((cbe - cbw) / 2) + cbw).toFixed(2);

                // set in the flag wtih accessibility note:
                $('#flags').html("<img width=100 height=45 src=" + flagsUrl + " alt=\"flag of \"" + cntrynm + ">");

                // map out the country bounds:
                var ctryBounds = [
                    [cbn, cbw],
                    [cbn, cbe],
                    [cbs, cbe],
                    [cbs, cbw]
                ];
                var ctryOutline = L.polygon(ctryBounds, {color: 'purple', fillColor: 'purple', fillOpacity: 0.25});
               
                // map.fitBounds([[cbn, cbe], [cbs, cbw]]);
                map.setView([clat, clng], 5);
                

                // Create markers:

                var eqkMarker = L.ExtraMarkers.icon({
                    icon: 'fa-explosion',               // for earthquakes    
                    iconColor: 'black',
                    shape: 'star',
                    markerColor: 'yellow',
                    prefix: 'fa'
                });

                var citiesMarker = L.ExtraMarkers.icon({
                    icon: 'fa-tree-city',               // for cities   
                    iconColor: 'green',
                    shape: 'circle',
                    markerColor: '#87cefa',
                    prefix: 'fa',
                    svg: true                   
                });

                var ngbhrMarker = L.ExtraMarkers.icon({
                    icon: 'fa-flag',               // for neighbouring countries    
                    iconColor: 'white',
                    shape: 'penta',
                    markerColor: 'pink',
                    prefix: 'fa'
                });
                

                $.ajax({
                    url: "libs/php/getNeighbours.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        geonameid: gnmId
                    },
                    success: function(result){
                        if (result.status.name.toUpperCase() == "OK"){
                            console.log(result.status.code);
                            
                            var nghbDat = result.data;
                            var nghbs = [];

                            for (let i = 0; i < nghbDat.length; i++){
                                var nlat = nghbDat[i].lat;
                                var nlng = nghbDat[i].lng;
                                var nghbNm = nghbDat[i].name;                               
                                var nghbCode = nghbDat[i].countryCode;

                                var nghbMrk = L.marker([nlat, nlng], {icon: ngbhrMarker}).bindPopup('<center><big><b>' + nghbNm + '</b></big></center><br><center><big>' + nghbCode + '</big></center>').openPopup();
                                nghbs.push(nghbMrk);
                            }
                            nghbs.push(ctryOutline);
                            

                            var neighbours = L.layerGroup(nghbs);                                                    

                            // create layer control:
                            map.layers = [mapBase, neighbours];
                            var baseMap = {"ThunderForestMap": mapBase};
                            var overMap = {"Neighbouring Countries": neighbours};

                            var layCtrl = L.control.layers(baseMap, overMap).addTo(map);
                            

                            $.ajax({
                                url: "libs/php/getEarthqks.php",             
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    north: cbn,
                                    south: cbs,
                                    east: cbe,
                                    west: cbw
                                },
                                success: function(result){
                                    if (result.status.name.toUpperCase() == "OK"){
                                        console.log(result.status.code);
                                        var qkDat = result.data;

                                        var mnthDik = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'}
                                        
                                        var quakes = [];

                                        for (let i = 0; i < qkDat.length; i++){
                                            var eqDtm = qkDat[i].datetime;
                                            var mnth = eqDtm.substring(5,7);
                                            var yr = eqDtm.substring(0,4);
                                            var day = eqDtm.substring(8,10);
                                            var eqm = mnthDik[mnth];
                                            var eqDate = day + ' ' + eqm + ' ' + yr;

                                            var eqLat = qkDat[i].lat;
                                            var eqLng = qkDat[i].lng;
                                            var eqSize = qkDat[i].magnitude;                               
                                            var eqDepth = qkDat[i].depth;
            
                                            var eqMrk = L.marker([eqLat, eqLng], {icon: eqkMarker}, 'eqks').bindPopup('<b>Occurred on: ' + eqDate + '<br>Magnitude: ' + eqSize + '<br>Depth: ' + eqDepth + '</b>');

                                            quakes.push(eqMrk);
                                        }
            
                                        var earthquakes = L.layerGroup(quakes);
            
                                        // include in layer control:
                                        
                                        layCtrl.addOverlay(earthquakes, "Earthquake history");       


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
                                                    
                                                    // For weather info:
                                                    $('#capCd').html(cpcity + ", " + ctrcd2.toUpperCase());
                                                    $('#tmpImg').html("<img src=" + wIconUrl + ">&ensp;&nbsp;" + nowTemp);
                                                    $('#wDescrp').text(wDescrp);
                                                    $('#vizi').text('Visibility: ' + vizi + ' km(s)');

                                                    var wBtn = L.easyButton('fa-cloud-sun', function(){
                                                        $("#weatherModal").modal("show");
                                                      }, 'view weather information', 'weatherBtn');

                                                    wBtn.addTo(map);

                                                    // For country info:
                                                    $('#conti').html('<span class="text-dark">Continent:&emsp;</span>' + cnti);
                                                    $('#ctrNm').html('<span class="text-dark">Country:&emsp;</span>' + cntrynm);
                                                    $('#capCty').html('<span class="text-dark">Capital City:&emsp;</span>' + cpcity);

                                                    cpop = parseInt(cpop).toLocaleString("en-GB");
                                                    $('#pop').html('<span class="text-dark">Estimated Population:&emsp;</span>' + cpop);
                                                    $('#area').html('<span class="text-dark">Area(sq/km):&emsp;</span>' + cntryArea);

                                                    var wikiCtrnm = cntrynm;
                                                    while (wikiCtrnm.indexOf(' ') !== -1){
                                                        wikiCtrnm = wikiCtrnm.replace(' ', '_');
                                                    }
                                                    var wikiUrl = "https://en.wikipedia.org/wiki/" + wikiCtrnm;
                                                    $('#ctryWiki').html('More about&ensp;' + cntrynm + '<span id="wikiSpan">&emsp;.&emsp;.&emsp;.&emsp;</span><a id="wikiLnk" href=' + wikiUrl + '>here</a>');

                                                    var ctryBtn = L.easyButton('fa-building-flag', function(){
                                                        $("#countryModal").modal("show");                                                        
                                                      }, 'view country information', 'ctryBtn');
                                                      
                                                    ctryBtn.addTo(map);

                                                      $.ajax({
                                                        url: "libs/php/getCntryCode.php",       // access OpenCage API - for additional country info
                                                        type: 'POST',
                                                        dataType: 'json',
                                                        data: {
                                                            'q': clat + ',' + clng
                                                            },  
                                                        success: function(result){ 
                                                            console.log(result.status.code);  
                                              
                                                            if ((result.status.name).toUpperCase() == "OK"){
                                                                var dat = result.data[0];                        
                                                                
                                                                var tmzn = dat.annotations.timezone.offset_string;
                                                                var drvStyl = dat.annotations.roadinfo.drive_on;          
                                                                var currNotes = dat.annotations.currency.name;
                                                                var currCoins = dat.annotations.currency.subunit;
                                                                var areacd = dat.annotations.callingcode; 
                                                                var qbl =  dat.annotations.qibla;   
                                                                
                                                                var drv = drvStyl[0].toUpperCase() + drvStyl.slice(1);
                                                            }    
                                                            
                                                            // More country info:
                                                            $('#drvg').html('<span class="text-dark">Driving Style:&emsp;</span>' + drv + ' hand drive&emsp;<i class="fa-solid fa-car fa-fw text-dark"></i>');
                                                            $('#tmzn').html('<span class="text-dark">Time zone:&emsp;</span>' + tmzn + ' GMT/UTC&emsp;<i class="fa-solid fa-globe fa-fw text-dark"></i>');
                                                            $('#currency').html('<span class="text-dark">Currency&ensp;<i class="fa-solid fa-money-bill-wave fa-fw"></i><i class="fa-solid fa-coins fa-fw"></i></span>');
                                                            $('#notes').html('<span class="text-dark">Notes:&emsp;</span>' + currNotes);
                                                            $('#coins').html('<span class="text-dark">Coins:&emsp;</span>' + currCoins);
                                                            $('#phnCd').html('<i class="fa-solid fa-phone fa-fw text-success"></i>&ensp;<span class="text-dark">Area Code:&emsp;+</span>' + areacd);
                                                            $('#flg').html("<img width=50 height=25 src=" + flagsUrl + " alt=\"flag of \"" + cntrynm + ">");
                                                            $('#qbl').html('<span class="text-dark">Qibla direction:&ensp;&nbsp;</span>' + qbl + '&ensp;<i class="fa-solid fa-kaaba fa-fw text-dark"></i>');

                                                            $.ajax({
                                                                url: "libs/php/getCities.php",       // access Geonames API - for country cities
                                                                type: 'POST',
                                                                dataType: 'json',
                                                                data: {
                                                                    'north': cbn,
                                                                    'south': cbs,
                                                                    'east': cbe,
                                                                    'west': cbw,
                                                                    'lang': ctrLang
                                                                    },  
                                                                success: function(result){ 
                                                                    console.log(result.status.code);  
                                                      
                                                                    if ((result.status.name).toUpperCase() == "OK"){
                                                                        var cityDat = result.data;

                                                                        var cities = [];

                                                                        for (let i = 0; i < cityDat.length; i++){
                                                                            
                                                                            var ctLat = Number.parseFloat(cityDat[i].lat).toFixed(3);
                                                                            var ctLng = Number.parseFloat(cityDat[i].lng).toFixed(3);
                                                                            var cityNm = cityDat[i].name;  
                                            
                                                                            var ctMrk = L.marker([ctLat, ctLng], {icon: citiesMarker}).bindPopup('<b>' + cityNm + '</b>');
                                
                                                                            cities.push(ctMrk);
                                                                        }
                                            
                                                                        var nearbyCities = L.layerGroup(cities);
                                            
                                                                        // include in layer control:
                                                                        
                                                                        layCtrl.addOverlay(nearbyCities, "Nearby Cities"); 

                                                                    }
                                                            
                                                                },
                                                                error: function(jqXHR){
                                                                    console.log(jqXHR, "Something is wrong");     // error for getCities ajax.
                                                                }       
                                                          }); 
                                                    
                                                        },
                                                        error: function(jqXHR){
                                                            console.log(jqXHR, "Something is wrong");     // error for 2nd OpenCage ajax.
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
                                    console.log(jqXHR); 
                                }                                            // error for getEarthqks
                            });
                        }
                    },
                    error: function(jqXHR){
                        console.log(jqXHR);             // error for getNeighbours ajax
                    }
                });                  
            }
        },
        error: function(jqXHR){
            console.log("Sorry no data available for this position.");        // error for getCountryInfo ajax
            console.log(jqXHR);
        }
    });
}



