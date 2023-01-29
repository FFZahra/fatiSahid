$(document).ready(function(){

    $('.folio-form').on('submit', function(e){      
        e.preventDefault();        

        var dformData = $(this).serialize();
        
        $.ajax({
            url: "folioContact.php",
            method: "POST",
            // dataType: 'json',
            data: dformData,
            success: function(response){
                        
                $('.sent-notification').html('Message sent successfully.');

                // reset form:
                $('#name').val('');
                $('#email').val('');
                $('#subject').val('');
                $('#message').val('');     

                $('.form-group').change(function(){
                    $('.sent-notification').html('');
                });
            }
        });  
    });  
})