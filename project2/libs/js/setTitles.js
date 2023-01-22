$(window).on('load', function(){
    $('.preloader').hide();
});

// ********************************************

$(document).ready(function(){
    $('body').html("<br><br><h1 class='text-center my-5 font-weight-bold'><p>Salaamu 'alaykum</p><p> Setting in titles ... </p><p> Please wait.</p></h1>");

    var dsgpIDs = [    
    [[15, 33, 1, 8, 30, 72, 96, 62, 48, 68, 31], ['Director', 'Snr. Personnel Officer', 'Recruitment Manager', 'Personnel Officer II', 'Administrator', 'Administrator', 'Administrator', 'Administrator', 'Administrator', 'Administrator', 'Administrator']],    
    [[2, 3, 27, 57, 83, 90, 91], ['Director', 'Sales Manager', 'Sales Administrator', 'Salesperson', 'Salesperson', 'Salesperson', 'Salesperson']],
    [[4, 54, 55, 56, 58, 66, 82, 88, 95], ['Director', 'Marketing Manager', 'Administrator', 'Marketing Officer', 'Marketing Officer', 'Marketing Officer', 'Marketing Officer', 'Marketing Officer', 'Marketing Officer']],    
    [[5, 7, 28, 39, 40, 42, 50, 60, 67, 71, 81], ['Director', 'Administrator', 'Legal Counsellor', 'Solicitor', 'Lawyer', 'Lawyer', 'Lawyer', 'Lawyer', 'Lawyer', 'Lawyer', 'Lawyer']],
    [[6, 9, 14, 32, 79, 97], ['Director', 'Customer Services Manager', 'Administrator', 'Customer Service Officer', 'Customer Service Officer', 'Customer Service Officer']],
    [[10, 21, 35, 37, 52, 63, 70, 85, 99], ['Director', 'Research Analyst', 'Research Analyst', 'Research Analyst', 'Research Administrator', 'Research Administrator', 'Research Administrator', 'Research Administrator', 'Research Administrator' ]],
    [[11, 34, 36, 53, 65, 69, 76], ['Director', 'Production Manager', 'Stakeholder Liaision Officer', 'Administrator', 'Administrator', 'Administrator', 'Administrator']],
    [[12, 22, 45, 64, 73, 86, 87], ['Director', 'Learning & Development Manager', 'Training Development Officer', 'Trainer', 'Trainer', 'Trainer', 'Trainer']],
    [[13, 23, 25, 29, 43, 47, 59, 92], ['Director', 'IT Manager', 'Administrator', 'IT Technician', 'IT Technician', 'IT Technician', 'IT Technician', 'IT Technician']],
    [[16, 17, 18, 41, 49, 51, 74, 80, 89, 93, 94, 98, 100], ['Director', 'Administrator', 'Development Engineer', 'Development Engineer', 'Development Engineer', 'Development Engineer', 'Development Engineer', 'Development Engineer', 'Development Engineer', 'Project Engineer', 'Project Engineer', 'Project Engineer', 'Project Engineer']],
    [[19, 26, 44, 61, 77, 78, 84], ['Director', 'Accounting Manager', 'Finance Assistant', 'Accountant', 'Accountant', 'Accountant', 'Accountant']],
    [[20, 24, 38, 46, 75], ['Director', 'Business Development Officer', 'Business Analyst', 'Data Analyst', 'Administrator']]
    ];    

    for (i = 0; i < dsgpIDs.length; i++){
        var done = [];
        j = dsgpIDs[i][0].length;
        while (j > 0 ){
            var pidx = Math.floor(Math.random() * dsgpIDs[i][0].length);
            var jbdx = Math.floor(Math.random() * dsgpIDs[i][0].length);    
            
            var persId = dsgpIDs[i][0][pidx];
            var titl = dsgpIDs[i][1][jbdx];

            $.ajax({
                url: "libs/php/setTitles.php",
                type: 'POST',
                dataType: 'json',
                data: {
                    job: titl,
                    pID: persId
                },
                success: function(){
                    console.log('Designation successfully updated for id no: ' + persId);
                    
                },
                error: function(jqXHR){
                    console.log('Something is wrong.');
                }
            });      

            done.push(persId);
            done.push(titl);

            dsgpIDs[i][0].splice(pidx,1);
            dsgpIDs[i][1].splice(jbdx,1);

            console.log(dsgpIDs[i][0].length);
            console.log(done, j);
            j = j - 1;
        };
    };

    $('body').html("<br><br><h1 class='text-center my-5 font-weight-bold'><p>Salaamu 'alaykum</p><p> Setting in titles ... </p><p> Please wait.</p></h1><br><br><h1 class='text-center my-5 font-weight-bold'><p>Salaamu 'alaykum</p><p> Finished now. </p><p> Thank you.</p></h1>");

});
