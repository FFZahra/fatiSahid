var map = L.map('map').fitWorld();  // shows the whole world.

L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d5aae97cbf674c4e89e1d5c82d548dba', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'd5aae97cbf674c4e89e1d5c82d548dba',
	maxZoom: 22
}).addTo(map);

function onLocationFound(e) {

    var positn = e.latlng;
    console.log(positn + ' chk1');  //passed

    plat = positn.lat;
    plng = positn.lng;

    var ctrcd, tmzn, drvStyl, qbl, currNotes, currCoins, areacd;

    function getCntryCode(clat, clng){
      var datt =  $.ajax({
                        url: "libs/php/getCntryCode.php",       // access OpenCage API - for country code
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            'q': clat + ',' + clng
                            },  
                        success: function(result){ 
                            console.log(result.status.code);  // passed - 200

                            if ((result.status.name).toUpperCase() == "OK"){
                                dats = result.data[0];                        // Extract country code info

                                // ctrcd = dat.components.country_code;
                                // tmzn = dat.annotations.timezone.offset_string;
                                // drvStyl = dat.annotations.roadinfo.drive_on;                                
                                // currNotes = dat.annotations.currency.name;
                                // currCoins = dat.annotations.currency.subunit;
                                // areacd = dat.annotations.callingcode;

                                // console.log(ctrcd, tmzn, 'extracted');  // passed                    
                            }
                        },
                        error: function(jqXHR){
                            console.log(jqXHR, "Something is wrong");
                        }
                    }).done(function(dats){
                        return dats;
                    });  
        return datt;
    }

    alert(plat + ", " + plng + 'chk1a');   // passed
    var opcgDat = getCntryCode(plat, plng);

    ctrcd = opcgDat.components.country_code;
    tmzn = opcgDat.annotations.timezone.offset_string;

    console.log(ctrcd, tmzn, ' outside');


    $('#cntry').change(function(){
        ccode = $('#cntry').val();

        // API data sourcing:
        $.ajax({
            url: "libs/php/getCountryInfo.php",       // access Geonames API - countryInfo
            type: 'GET',
            dataType: 'json',            
            success: function(result){
                console.log(result.status.code);

                if (result.status.name.upper() == "OK"){
                    cntrydat = result.data;                    

                    for (let i = 0; i < cntrydat.length(); i++) {
                        if (cntrydat[i].countryCode.upper() == ccode.upper()){
                            cntrnm = cntrydat[i].countryName;
                            cpcity = cntrydat[i].capital;
                            cnti = cntrydat[i].continentName;
                            cpop = cntrydat[i].population;
                            ctrcd2 = ccode;
                            ctrcd3 = cntrydat[i].isoAlpha3
                            // cWiki = {{ctrcd3}};
                            cntryArea = cntrydat[i].areaInSqKm;
                            cbn = cntrydat[i].north;
                            cbs = cntrydat[i].south;
                            cbe = cntrydat[i].east;
                            cbw = cntrydat[i].west;
                            clat = ((cbn - cbs) / 2) + cbs;
                            clng = ((cbe - cbw) / 2) + cbw;
                            console.log("I found the country code for " + cntrnm + " it is: " + ccode, 'chk2');
                            alert("I found the country code for " + cntrnm + " it is: " + ccode + " chk3.");

                            break;
                        }
                    }

                    $.ajax({
                        url: "libs/php/getWeather.php",             // access OpenWeather API using clat, clng values
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            lat: clat,
                            lon: clng
                        },
                        success: function(result){
                            if (result.status.name.upper() == "OK"){
                                var dat = result.data;

                                wDescrp = dat.weather.description;
                                wIcon = dat.weather.icon;
                                wIconUrl = "http://oopenweathermap.org/img/wn/" + wIcon + "@2x.png";
                                nowTemp = dat.main.temp;
                                minTemp = dat.main.temp_min;
                                maxTemp = dat.main.temp_max;
                                vizi = dat.visibility / 1000;           // distance in km

                                var weatherPop = L.popup()
                                    .setLatLng([clat, clng])
                                    .setContent(cpcity + ", " + ctrcd2 + "<br>" + wIcon + "&nbsp;&nbsp;&nbsp;" + nowTemp + "&deg;C" + 
                                    "<br><br>" + "Expected Weather"+
                                    "<br><br>" + wDescrp + "<br><br>" + 
                                    "Temp high: " + maxTemp + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "Temp Low: " + minTemp + "&deg;C" +
                                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visibility: " + vizi + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
                                    .opennOn(map);
                                
                                var wtoggle = L.easyButton({
                                    states: [{
                                        stateName: 'show-weather',
                                        icon: 'fa-cloud-sun',
                                        title: 'view weather report',
                                        onClick: function(control){
                                            weatherPop.show();
                                            control.state('hide-weather');
                                        }
                                    }, 
                                    {
                                        stateName: 'hide-weather',
                                        icon: 'fa-close',
                                        title: 'close weather report',
                                        onClick: function(control) {
                                            weatherPop.hide();
                                            control.state('show-weather')
                                        }
                                    }]
                                });
                                wtoggle.addTo(map);


                                // ajxCallNeighbours();


                            }                            

                        },
                        error: function(jqXHR){
                            console.log(jqXHR);
                        }

                    });  
                    
                    var notesMark = L.marker(plat, plng, {alt: 'General country notes'}).addTo(map)
                    .bindPopup("<h3>Country Info</h3><br><br>Country name: " + ctrnm + "<br>Country Code: " + ctrcd + "<br><br><hr><br>Country's Flag: "+ flg).openPopup();
                    // .bindPopup("<h3>Country Info</h3><br><br>Country name: + ctrnm + <br>Country Code: <br><br> + Country Flag: + ctrcd<br><br>Country's flag: + flg + Area Code: + areacd + &nbsp:&nbsp;&nbspTime zone: +tmzn<br><br><hr><br><br>" + "In " +  ctrnm + ", driving is on the " + drvstyl +".").openPopup();               
                    
                }

            },
            error: function(jqXHR){
                console.log("Sorry no data available for this position.");
                console.log(jqXHR);
            }
        });
    })

    alert(ctrcd + ' is here');
    $('#cntry').val(ctrcd);
}

function onLocationError(e) {
    alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});
// $('#cntry').val(ctrcd);



