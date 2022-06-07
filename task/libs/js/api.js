$('#answerArea').html("This is where results get displayed");

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
            const innerList = result["postalCodes"][0];
            $('#answerArea').html(function() {
                `Placenames\t\tPostal Codes\n ${innerList.filter(i, placeName, postalCode => innerList[i]["placeName"] + "\t\t" + innerList[i]["postalCode"] + "\n")}`;
            });      
        }
    },

    error: function(jqXHR, textStatus, errorThrown) {
        $('#answerArea').html("Sorry, no data available for this request.\n " + `${jqXHR} ${textStatus} ${errorThrown}`);
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
    $.ajax({url: "libs/php/getLocation.php",
    type: 'POST',
    dataType: 'json',
    data: {
        q: $("#addr").val()
    },
    success: function(result) {
        console.log(result);
    
        if (result.status.name == "ok") {
            const cntryCodesArr = {"AT": 'Austria', "AU": 'Australia', "AX": 'Aland Islands', "CC": 'Cocos Islands', "CH": 'Switzerland', "CX": 'Christmas Island', "CZ": 'Czech Republic', "DK": 'Denmark', "EE": 'Estonia', "ES": 'Spain', "FI": 'Finland', "FR": 'France', "GF": 'French Guiana', "GP": 'Guadeloupe', "IS": 'Iceland', "LU": 'Luxembourg', "MQ": 'Martinique', "NF": 'Norfolk Island', "NL": 'Netherlands', "NO": 'Norway', "PL": 'Poland', "PR": 'Puerto Rico', "RE": 'Reunion', "SG": 'Singapore', "SI": 'Slovenia', "SJ": 'Svalbard and Jan Mayen', "SK": 'Slovakia', "US": 'United States', "YT": 'Mayotte'
    };
            $('#answerArea').html(`For address: ${result["address"]["houseNumber"]} ${result["address"]["street"]}, ${result["address"]["locality"]}, ${result["address"]["postalcode"]}\n Latitude is: ${result["address"]["lat"]}\n Longitude is: ${result["address"]["lng"]}\n Country: ${cntryCodesArr[result["address"]["countryCode"]]}.}`);            
        };
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $('#answerArea').html("Sorry, no data available for this request.\n " + `${jqXHR} ${textStatus} ${errorThrown}`);
        console.log(jqXHR);        
        }
 
    })
})


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
            
            rsltArr = result["address"];
            if (result.status.name == "ok") {
                $('#answerArea').html(`The nearest address is: ${rsltArr["houseNumber"]} ${rsltArr["street"]}, ${rsltArr["locality"]}, ${rsltArr["postalCode"]}, ${rsltArr["countryCode"]}.`);                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('#answerArea').html("Sorry, no data available for this request.\n " + `${jqXHR} ${textStatus} ${errorThrown}`);
            console.log(jqXHR);
        }
        
    })
})


