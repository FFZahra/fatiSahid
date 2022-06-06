// $('#resultBox').html("This is where results get displayed");

$('#form1btn').click(function() {
    $.ajax({url: "../php/getPostals.php",
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
            $('#answerArea1').html(function() {
                `${"Placenames " + "\t\t" + "Postal Codes\n" +  innerList.filter(i, placeName, postalCode => innerList[i]["placeName"] + "\t\t" + innerList[i]["postalCode"] + "\n")}`;
            });             
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $('#answerArea1').html("Sorry, no data available for this request.");
    }
    
    })
})

$('#form2btn').click(function() {
    $.ajax({url: "../php/getLocation.php",
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

            $('#uAddr').html(result["address"]["houseNumber"] + " " + result["address"]["street"] + " " + result["address"]["locality"] + " " + result["address"]["postalcode"]);
            $('#ansLat').html(result["address"]["lat"]);
            $('#ansLng').html(result["address"]["lng"]);
            $('#ctry').html(cntryCodesArr[result["address"]["countryCode"]]);             
        };
    },
    error: function(jqXHR, textStatus, errorThrown) {
        $('#answerArea2').html("Sorry, no data available for this request.");
    }
    
    })
})


$('#form3btn').click(function() {
    //$testarr = {"address":{"adminCode2":"0363","sourceId":"0363010012084818","adminCode3":"","adminCode1":"07","lng":"4.88132","distance":"0.02","houseNumber":"6","locality":"Amsterdam","adminCode4":"","adminName2":"Gemeente Amsterdam","street":"Museumplein","postalcode":"1071 DJ","countryCode":"NL","adminName1":"North Holland","lat":"52.35792"}};
    
    $.ajax({
        url: "../php/getAddress.php",
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
                $('#answerArea3').html("The nearest address is: " + rsltArr["houseNumber"] + ' ' + rsltArr["street"] + ', ' + rsltArr["locality"] + ', ' + rsltArr["postalCode"] + ', ' + rsltArr["countryCode"]);                
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('answerArea3').html("Sorry, no data available for this request.");
        }
        
    });
});


