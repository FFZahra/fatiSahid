$('#answerArea').html("This is where results get displayed");

const cntryCodesArr = {"AT": 'Austria', "AU": 'Australia', "AX": 'Aland Islands', "CC": 'Cocos Islands', "CH": 'Switzerland', "CX": 'Christmas Island', "CZ": 'Czech Republic', "DK": 'Denmark', "EE": 'Estonia', "ES": 'Spain', "FI": 'Finland', "FR": 'France', "GF": 'French Guiana', "GP": 'Guadeloupe', "IS": 'Iceland', "LU": 'Luxembourg', "MQ": 'Martinique', "NF": 'Norfolk Island', "NL": 'Netherlands', "NO": 'Norway', "PL": 'Poland', "PR": 'Puerto Rico', "RE": 'Reunion', "SG": 'Singapore', "SI": 'Slovenia', "SJ": 'Svalbard and Jan Mayen', "SK": 'Slovakia', "US": 'United States', "YT": 'Mayotte'};

$(document).ready(function(){
    $("#btn1").click(function(){
        $("#api2").hide();
        $("#api3").hide();
        $('#answerArea').html("");
        $("#api1").show();
        $("#cntrycd").focus();
    })
})
$('#form1btn').click(function() {

    $.ajax({url: "libs/php/getPostals.php",
    type: 'POST',
    dataType: 'json',
    data: {
        postalcode: $('#postcd').val(),
        country: $('#cntrycd').val(),
        radius: $('#radius').val()
    },

    success: function(result) {

        console.log(result); 

        if (result.status.name == "ok") {
            const innerList = result.data;

            if (innerList.length == 0) {
                $('#answerArea').html("Sorry, no data available for this request.\n");
            } else {
                let innerStrg = `Nearby Postal Codes: \nPlacenames\t\tPostal Codes\n`;
                innerList.forEach(itm => {
                    innerStrg = innerStrg + `${itm.placeName}\t\t${itm.postalCode}\n`;                
                });

                $('#answerArea').html(innerStrg);
            };

        };            
    },

    error: function(jqXHR, textStatus, errorThrown) {
        $('#answerArea').html("System Error: \n " + `${jqXHR} ${textStatus} ${errorThrown}`);
        console.log(jqXHR);
        }  
    })
})

$(document).ready(function(){
    $("#btn2").click(function(){
        $("#api1").hide();
        $("#api3").hide();
        $("#api2").show();
        $("#addr").focus();
        $('#answerArea').html("");
    })
})
$('#form2btn').click(function() {
    $.ajax({
        url: "libs/php/getLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: $("#addr").val()
        },
        success: function(result) {
            console.log(result);

            if (Object.keys(result.data).length == 0){
                $('#answerArea').html("Sorry, no data available for this request. ");
            } else {                  
                rsltArr = result.data;       
                $('#answerArea').html(`For address: ${rsltArr.houseNumber} ${rsltArr.street}, ${rsltArr.locality}, ${rsltArr.postalcode}\n Latitude is: ${rsltArr.lat}\n Longitude is: ${rsltArr.lng}\n Country: ${cntryCodesArr[rsltArr.countryCode]}.`);                    
            };
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#answerArea').html("System Error: \n " + `${jqXHR} ${textStatus} ${errorThrown}`);
            console.log(jqXHR);        
        }
 
    });
});


$(document).ready(function(){
    $("#btn3").click(function(){
        $("#api1").hide();
        $("#api2").hide();
        $("#api3").show();
        $('#answerArea').html("");
        $("#latd").focus();
    })
})
$('#form3btn').click(function() {      
    $.ajax({
        url: "libs/php/getAddress.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: $('#latd').val(),
            lng: $('#longtd').val()
        },
        success: function(result) {
            console.log(result);

            if (Object.keys(result.data).length == 0){
                $('#answerArea').html("Sorry, no data available for this request.")
            } else {            
                rsltArr = result.data;
                if (result.status.name == "ok") {
                    $('#answerArea').html(`The nearest address is: ${rsltArr.houseNumber} ${rsltArr.street}, ${rsltArr.locality}, ${rsltArr.postalcode}, ${cntryCodesArr[rsltArr.countryCode]}.`);  // ${rsltArr.countryCode}              
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#answerArea').html("System Error: \n " + `${jqXHR} ${textStatus} ${errorThrown}`);
            console.log(jqXHR);
        }
        
    })
})


