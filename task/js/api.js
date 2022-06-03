$('#resultBox').html("This is where results get displayed");


$('#form1btn').click(function() {
    /*alert($('#cntrycd').val());
    alert($('#radius').val());
    alert($('#postcd').val());*/
    $.ajax({
        url: "../php/postal.php",
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
                $('resultBox').html(result['data'][0]['placeName'] + ' ' + result['data'][0]['postalCode'] + ' ' + result['data'][0]['lat'] + ' ' + result['data'][0]['lng']);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            $('resultBox').html("Sorry, no data available for this request.");
        }
        
    });
});

$('#form2btn').click(function() {
    $.ajax({
        
    })
})

$('#form3btn').click(function() {
    $.ajax({
        
    })
})