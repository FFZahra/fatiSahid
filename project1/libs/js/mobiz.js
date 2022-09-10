$(window).on('load', function() {
   $('.preloader').hide();
});

/* -------------------------------------------------------------------------------------------- */
$('document').ready(function(){

    $.ajax({
        url: "libs/php/countriesDropdown.php",
        type: "GET",
        dataType: 'json',    
        success: function(response){
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
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');           
        }
    })
});

var map = L.map('map', {
    minZoom: 0,
    zoom: 5
}).fitWorld();  // shows the whole world.

var mapBase = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d5aae97cbf674c4e89e1d5c82d548dba', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'd5aae97cbf674c4e89e1d5c82d548dba',
	maxZoom: 22
}).addTo(map);

var streetvw = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var flagsUrl = "https://countryflagsapi.com/svg/" + $('#cntry').val();

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

var wikiMarker = L.ExtraMarkers.icon({
    icon: 'fa-w',               // for country wiki(s)
    iconColor: '#000080',
    shape: 'square',
    markerColor: 'white',
    prefix: 'fa',
    svg: true
}); 

// Create button controls:
var wBtn = L.easyButton('fa-cloud-sun', function(){
    var weatherModal = new bootstrap.Modal(document.getElementById('weatherModal'));
    weatherModal.show();    
}, 'view weather information', 'wthBtn');

wBtn.addTo(map);

var ctryBtn = L.easyButton('fa-building-flag', function(){                                                         
    var countryModal = new bootstrap.Modal(document.getElementById('countryModal'));
    countryModal.show(); 
}, 'view country information', 'ctryBtn');

ctryBtn.addTo(map);


var wikiBtn = L.easyButton('fa-bullhorn', function(){                            
    var wikiModal = new bootstrap.Modal(document.getElementById('wikiModal'));
    wikiModal.show();       
}, 'view country wiki', 'wikiBtn');

wikiBtn.addTo(map);


// Setup event handlers for modal close buttons:
$('.ctryCls').click(function(){
    $('#countryModal').modal("hide");
});

$('.wthCls').click(function(){
    $('#weatherModal').modal("hide");
});

$('.wikiCls').click(function(){
    $('#wikiModal').modal("hide");
});


// Create layer control:
map.layers = [mapBase, streetvw];
var baseMap = {
    "ThunderForestMap": mapBase
};

var overMap = {};

var neighbours, earthquakes, nearbyCities;

var ctryOutline = L.geoJSON().addTo(map);

var layCtrl = L.control.layers(baseMap, overMap, {position: 'topleft'}).addTo(map);
var ctClusters = L.markerClusterGroup();
var eqClusters = L.markerClusterGroup();
var nghbClusters = L.markerClusterGroup();
var wkClusters = L.markerClusterGroup();

layCtrl.addBaseLayer(streetvw, "Satellite View");

ctClusters;
eqClusters;
nghbClusters;
wkClusters;

map.on('baselayerchange', function(){
    var sLbl = $('#selectLbl');

    if(sLbl.css('color') == 'rgb(0, 0, 128)'){
        $('#selectLbl').css('color', 'ivory');
    } else{
        $('#selectLbl').css('color', 'navy');
    }
});


$('#cntry').change(function(){
    // Clear previous country's controls from map:
    layCtrl.removeLayer(neighbours);
    layCtrl.removeLayer(earthquakes);
    layCtrl.removeLayer(nearbyCities);
    map.removeLayer(neighbours);
    map.removeLayer(earthquakes);
    map.removeLayer(nearbyCities);

    if (map.hasLayer(ctClusters) || map.hasLayer(eqClusters) || map.hasLayer(nghbClusters) || map.hasLayer(wkClusters)){
        map.removeLayer(ctClusters);
        map.removeLayer(eqClusters);
        map.removeLayer(nghbClusters);
        map.removeLayer(wkClusters);
        ctClusters = L.markerClusterGroup();
        eqClusters = L.markerClusterGroup();
        nghbClusters = L.markerClusterGroup();
        wkClusters = L.markerClusterGroup();
    }
    
    ctryOutline.remove(map);      

    getOtherData();
});


function onLocationFound(e) {

    var positn = e.latlng;

    var plat = positn.lat;
    var plng = positn.lng;  
    
    function getCntryCode(clat, clng){
        $.ajax({
              url: "libs/php/getCntryCode.php",       // access OpenCage API - for country code
              type: 'POST',
              dataType: 'json',
              data: {
                  'q': clat + ',' + clng
                  },  
              success: function(result){ 
                  if ((result.status.name).toUpperCase() == "OK"){                    
                    var dat = result.data[0];                        // Extract country code info

                    var ctrcd = dat.components.country_code;                   
                    //   }              

                    ctrcd = ctrcd.toUpperCase();
                    
                    $('#cntry').val(ctrcd);
                    getOtherData();
                  }
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
            if (result.status.name.toUpperCase() == "OK"){
                var cntrydat = result.data[0]; 

                var cntrynm = cntrydat.countryName;
                var cpcity = cntrydat.capital;
                var cnti = cntrydat.continentName;
                var cpop = cntrydat.population;
                var gnmId = cntrydat.geonameId;
                var ctrLang = cntrydat.languages.slice(0,2);
                var cntryArea = cntrydat.areaInSqKm;
                var cbn = cntrydat.north;
                var cbs = cntrydat.south;
                var cbe = cntrydat.east;
                var cbw = cntrydat.west;
                var clat = Number.parseFloat(((cbn - cbs) / 2) + cbs).toFixed(2);
                var clng = Number.parseFloat(((cbe - cbw) / 2) + cbw).toFixed(2);

                // map out the country bounds:
                $.ajax({
                    url: 'libs/php/countriesBorder.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        country_code: ccode
                    },
                    success: function(response) {
                        // set country borders:
                        var ctryOutlineStyle = {
                            "color": '#800080',
                            "weight": 3,
                            'fillOpacity': 0.2
                        }

                        ctryOutline = L.geoJSON(response.data, {
                            style: ctryOutlineStyle                      
                        }).addTo(map);   

                        map.fitBounds(ctryOutline.getBounds());;


                        $.ajax({
                            url: "libs/php/getNeighbours.php",
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                geonameid: gnmId
                            },
                            success: function(result){
                                if (result.status.name.toUpperCase() == "OK"){
                                    var nghbDat = result.data;
                                    var nghbs = [];

                                    for (let i = 0; i < nghbDat.length; i++){
                                        var nlat = nghbDat[i].lat;
                                        var nlng = nghbDat[i].lng;
                                        var nghbNm = nghbDat[i].name;                               
                                        var nghbCode = nghbDat[i].countryCode;

                                        var nghbMrk = L.marker([nlat, nlng], {icon: ngbhrMarker}).bindPopup('<center><big><b>' + nghbNm + '</b></big></center><br><center><big>' + nghbCode + '</big></center>').openPopup();
                                        nghbs.push(nghbMrk);

                                        nghbClusters.addLayer(nghbMrk);
                                    }

                                    neighbours = L.layerGroup(nghbs);         
                                    
                                    map.layers.push(neighbours);
                                    overMap = {"Neighbouring Countries": neighbours};

                                    layCtrl.addOverlay(neighbours, "Neighbouring Countries");  

                                    // add cluster to map:
                                    map.addLayer(nghbClusters);                                    

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
                                                var qkDat = result.data;                                               
                                                var quakes = [];

                                                for (let i = 0; i < qkDat.length; i++){
                                                    var eqDtm = new Date(qkDat[i].datetime);
                                                    var eqDate = eqDtm.toDateString();
                                                    
                                                    var eqLat = qkDat[i].lat;
                                                    var eqLng = qkDat[i].lng;
                                                    var eqSize = qkDat[i].magnitude;                               
                                                    var eqDepth = qkDat[i].depth;
                    
                                                    var eqMrk = L.marker([eqLat, eqLng], {icon: eqkMarker}, 'eqks').bindPopup('<b>Occurred on: ' + eqDate + '<br>Magnitude: ' + eqSize + '<br>Depth: ' + eqDepth + '</b>');

                                                    quakes.push(eqMrk);
                                                    eqClusters.addLayer(eqMrk);
                                                }
                    
                                                earthquakes = L.layerGroup(quakes);
                    
                                                // include in layer control:                                                
                                                layCtrl.addOverlay(earthquakes, "Earthquake history"); 

                                                // add cluster to map:
                                                map.addLayer(eqClusters);

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
                                                            var dat = result.data;
                                                                                      
                                                            // For weather info:
                                                            var sunrise = dat.city.sunrise;
                                                            var sunset = dat.city.sunset;                                                
                                                                                                                      
                                                            var rise = new Date(sunrise * 1000);
                                                            var down = new Date(sunset * 1000);

                                                            function setZero(mins){
                                                                if (mins < 10){
                                                                    mins = '0'+ mins;
                                                                };
                                                                return mins;
                                                            }

                                                            riseMins = setZero(rise.getMinutes());
                                                            downMins = setZero(down.getMinutes());
                                                            riseHr = setZero(rise.getHours());
                                                            downHr = setZero(down.getHours());

                                                            function getBracket2End(strg){
                                                                var idx = strg.indexOf('(');
                                                                return strg.slice(idx);
                                                            }
                                                            
                                                            $('#capCd').html(cpcity + ", " + ccode.toUpperCase());
                                                            $('#riseImg').html('<i class="fa-solid fa-arrow-up fa-fw"></i><i class="fa-solid fa-sun fa-fw"></i>');
                                                            $('#riseTm').html(riseHr + ':' + riseMins);
                                                            $('#stdTmTxt').html(getBracket2End(rise.toTimeString()));
                                                            $('#downImg').html('<i class="fa-solid fa-arrow-down fa-fw"></i><i class="fa-solid fa-sun fa-fw"></i>');
                                                            $('#downTm').html(downHr + ':' + downMins);

                                                                var wDescrp = dat.list[0].weather[0].description;
                                                                var wDate = dat.list[0].dt;
                                                                wDate = new Date(wDate * 1000);
                                                                var wIcon = dat.list[0].weather[0].icon;
                                                                var wIconUrl = "http://openweathermap.org/img/w/" + wIcon + ".png";
                                                                var nowTemp = dat.list[0].main.temp;

                                                                $('#wDescrp').html(wDescrp);
                                                                $('#tmpImg').html("<img id=\"wthImg\" src=" + wIconUrl + ">&ensp;&nbsp;" + nowTemp.toFixed(0) + "&deg;C");
                                                                $('#tday').html(wDate.toDateString());   

                                                            // For country info:
                                                            $('#conti').html(cnti);
                                                            $('#ctrNm').html(cntrynm);
                                                            $('#capCty').html(cpcity);

                                                            cpop = parseInt(cpop).toLocaleString("en-GB");
                                                            $('#pop').html(cpop);

                                                            cntryArea = parseFloat(cntryArea).toLocaleString("en-GB");
                                                            $('#area').html(cntryArea);

                                                            $.ajax({
                                                                url: "libs/php/getCntryCode.php",       // access OpenCage API - for additional country info
                                                                type: 'POST',
                                                                dataType: 'json',
                                                                data: {
                                                                    'q': clat + ',' + clng
                                                                    },  
                                                                success: function(result){                                                     
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
                                                                    $('#drvg').html(drv + ' hand drive');
                                                                    $('#tmzn').html(tmzn + ' GMT/UTC');
                                                                    $('#notes').html(currNotes);
                                                                    $('#coins').html(currCoins);
                                                                    $('#phnCd').html('+' + areacd);
                                                                    $('#qbl').html(qbl);

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
                                                                            if ((result.status.name).toUpperCase() == "OK"){
                                                                                var cityDat = result.data;
                                                                                var cities = [];

                                                                                for (let i = 0; i < cityDat.length; i++){
                                                                                    
                                                                                    var ctLat = Number.parseFloat(cityDat[i].lat).toFixed(3);
                                                                                    var ctLng = Number.parseFloat(cityDat[i].lng).toFixed(3);
                                                                                    var cityNm = cityDat[i].name;  
                                                    
                                                                                    var ctMrk = L.marker([ctLat, ctLng], {icon: citiesMarker}).bindPopup('<b>' + cityNm + '</b>');
                                                                                    
                                                                                    cities.push(ctMrk);
                                                                                    ctClusters.addLayer(ctMrk);
                                                                                }
                                                    
                                                                                nearbyCities = L.layerGroup(cities);
                                                    
                                                                                // include in layer control:                                                                                
                                                                                layCtrl.addOverlay(nearbyCities, "Nearby Cities"); 

                                                                                // add cluster to map:
                                                                                map.addLayer(ctClusters);
                                                                            }
                                                                         },
                                                                        error: function(jqXHR){
                                                                            console.log(jqXHR, "Something is wrong");     // error for getCities ajax.
                                                                        }       
                                                                    }); 
                                                                    // ********************************************************************************************

                                                                    $.ajax({
                                                                        url: "libs/php/getWikis.php",       // access Geonames API - for country wikipedia
                                                                        type: 'POST',
                                                                        dataType: 'json',
                                                                        data: {
                                                                            'north': cbn,
                                                                            'south': cbs,
                                                                            'east': cbe,
                                                                            'west': cbw
                                                                            },  
                                                                        success: function(result){ 
                                                                            if ((result.status.name).toUpperCase() == "OK"){
                                                                                var wikiDat = result.data;
                                                                                var wikis = [];
                                                                                var wkHtml = '<table id="wkTable"><tbody>';

                                                                                for (let i = 0; i < wikiDat.length; i++){  
                                                                                    if (wikiDat[i].countryCode == ccode){
                                                                                        var wikiSummary = wikiDat[i].summary;
                                                                                        var wikiUrl = wikiDat[i].wikipediaUrl; 
                                                                                        var wkTitle = wikiDat[i].title;
                                                                                        var wkLat = wikiDat[i].lat;
                                                                                        var wkLng = wikiDat[i].lng; 
                                                                                        
                                                                                        wkHtml = wkHtml + '<tr><td class="wkTtl"><h5>' + wkTitle + '</h5></td>';
                                                                                        wkHtml = wkHtml + '<tr><td class="summary">' + wikiSummary + '</td></tr>';
                                                                                        wikiUrl = "https://" + wikiUrl;
                                                                                        wkHtml = wkHtml + '<tr><td class="wikiLnk"><a href=' + wikiUrl + '>continue reading ...</a>&emsp;&emsp;</td></tr>';
                                                        
                                                                                        var wikiMrk = L.marker([wkLat, wkLng], {icon: wikiMarker}).bindPopup('<table><tr><td class="wkTtl" id="wkPopTtl">' + wkTitle + '</td><tr><td class="summary">' + wikiSummary + '</td></tr><tr><td class="wikiLnk"><a href=' + wikiUrl + '>continue reading ...</a>&emsp;&emsp;</td></tr></table>');
                                                                                        wikis.push(wikiMrk);

                                                                                        wkClusters.addLayer(wikiMrk);
                                                                                    }                                                                                                                  
                                                                                }

                                                                                wkHtml = wkHtml + '</tbody></table>';

                                                                                // add cluster to map:
                                                                                map.addLayer(wkClusters);

                                                                                // for Wiki modal:
                                                                                $('#wikiModalLabel').html(cntrynm + ' Wikipedia&emsp;<span class="px-0 mx-0 w-100 flg"></span>');
                                                                                $('.flg').html("<img height=25 src=" + flagsUrl + " alt=\"flag of \"" + cntrynm + ">");
                                                                                $('#wikiBd').html(wkHtml);
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
                    },
                    error: function(jqXHR) {
                        console.log(jqXHR, "Something is wrong");     // error for countriesBound ajax.
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