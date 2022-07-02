var map = L.map('map').fitWorld();  // shows the whole world.

L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=d5aae97cbf674c4e89e1d5c82d548dba', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: 'd5aae97cbf674c4e89e1d5c82d548dba',
	maxZoom: 22
}).addTo(map);

function onLocationFound(e) {

    var positn = e.latlng;
    console.log(positn);

    var plat = positn.lat;
    var plng = positn.lng;

    // API data sourcing:
//  $(document).ready(function(){

//     })
    $.ajax({
        url: "libs/php/getCntryCode.php",
        type: 'POST',
        dataType: 'json',
        data: {
            'key': '87d21371a2e74dffb29193dbbda7b9d2',
            'q': plat + ', ' + plng,
            },  
        success: function(info){
            console.log(info);

            if (info.status.name.upper() == "OK"){
                const dat = info.data[0];

                var ctrcd = dat.components.country_code;
                var ctrnm = dat.components.country;
                var tmzn = dat.annotations.timezone.offset_string;
                var drvstyl = dat.annotations.roadinfo.drive_on;
                var qbl = dat.annotations.qibla;
                var flg = dat.annotations.flag;
                var currNotes = dat.annotations.currency.name;
                var currcoins = dat.annotations.currency.subunit;
                var areacd = dat.annotations.callingcode;

                $.ajax({})  // to collect weather info from openweather; using plat $ plng

                $('#cntrnm').val(ctrcd);
                $('#cntrm').change(function(){
                    $.ajax({
                        url: "libs/php/getCountryInfo.php",
                        type: 'GET',
                        dataType: 'json',                   
                        success: function(result){
                            if (result.status.name.upper() == "OK"){

                            }
                            
                        },
                        error: function(jqXHR){
                            console.log(jqXHR)
                        }
                    });
                });

                

            }

        },
        error: function(jqXHR){
            console.log("Sorry no data available for this position.");
            console.log(ereport.status.code, ereport.status.name, ereport.status.description);
            console.log(jqXHR);
        }
     });
}

map.on('locationfound', onLocationFound);

map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});


