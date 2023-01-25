$('document').ready(function(){
    console.log('hi');
  
      /**
     * Contact form submission
     */
    function isNotEmpty(inputBx){
      if (inputBx.val() === ""){
        inputBx.css('border', '1px solid orange');
        return false;
      }
      else {
        inputBx.css('border', '');
        return true;
      }
    }
  
    // $('#contactFlower').on('submit', function(e){
    $('#myFormBtn').click(function(){
      // e.preventDefault();
      // var dForm = $(this);
  
      var sndName = $('#name').val();
      var sndEmail = $('#email').val();
      var sndSubject = $('#subject').val();
      var sndMessage = $('#message').val();
  
      if(isNotEmpty(sndName) && isNotEmpty(sndEmail) && isNotEmpty(sndMessage)){
        $.ajax({
          url: "assets/forms/contact2.php",
          method: "POST",
          dataType: 'json',
          data: {
            name: sndName,
            email: sndEmail,
            subject: sndSubject,
            message: sndMessage
          },
          success: function(response){
            $('#contactFlower')[0].reset();
            $('.sent-notification').html('Message sent successfully.');
            $('.sent-message').show();
          }
          // error: function(jqXHR){
          //     console.log(jqXHR, 'Something is wrong');
          // }
        });
      }    
    });  
  }) 