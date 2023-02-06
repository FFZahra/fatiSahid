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

// $(document).ready(function(){
//     function downloadDiv(filename, elementId, mimeType) {
//         var elementHtml = document.getElementById(elementId).innerHTML;
//         var link = document.createElement('a');
//         mimeType = mimeType || 'text/plain';
    
//         link.setAttribute('download', filename);
//         link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elementHtml));
//         link.click(); 
//     }
    
//     var fileName =  'cv2023.html';
//     $('#dwnldCV').click(function(){
//         downloadDiv(fileName,'resume', 'text/html');
//     });
// })