$(window).on('load', function(){
    $('.preloader').hide();
});

// -------------------------------------------------------------------------------------------- 


// **** Edit Staff modal *********
var editModal = new bootstrap.Modal(document.getElementById('editModal'));

// **** The Delete modal ********
var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

// **** Add Staff modal **********
var addModal = new bootstrap.Modal(document.getElementById('addModal'));

// **** Edit Dept modal  **********
var eDepModal = new bootstrap.Modal(document.getElementById('eDepModal'));

// **** Add Dept modal  **********
var aDepModal = new bootstrap.Modal(document.getElementById('aDepModal'));

// **** Edit Location modal  **********
var eLocModal = new bootstrap.Modal(document.getElementById('eLocModal'));

// **** Add Location modal  **********
var aLocModal = new bootstrap.Modal(document.getElementById('aLocModal'));

// ******************************

$('#resetList').click(function(){
    stfReset();
});

// ******************************

function getStfID(){
    // capture the personnel id:

    // var stfId = $('input[name=' + radionm + ']:checked').val();
    var stfId = $('input[type="radio"]:checked').val();
    console.log(stfId); 
    return stfId;
}
    
function stfReset(){
    // clear any null recs:
    $.ajax({
        url: "libs/php/delNulls.php",
        type: "POST",
        dataType: 'json',    
        success: function(response){
            console.log('Response outcomes:', response.status.description);
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');
        }
    });

    $.ajax({
        url: "libs/php/getPersonnelAlphabetic.php",
        type: "GET",
        dataType: 'json',    
        success: function(response){
            var names = response.data;
            
            // add in initial list of staff alphabetically ***
            pglist = "";
            var currLett;
            var i = 0;
            // var nullKount = 0;
            while (i < 20){
                if (names[i].lastName === null){
                    i++;
                    // nullKount++;
                    continue;
                }
                surnameInitial = names[i].lastName.slice(0,1);
                
                currLett = surnameInitial.toUpperCase();

                pglist = pglist + "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + currLett + "</h5></td></tr>";

                while (names[i].lastName.slice(0,1) === currLett){
                    pglist = pglist + '<tr id="recRw"><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="mainListRadio" id="mainListRadio" value=' + names[i].id + '><label class="form-check-label" for="mainListRadio">&ensp;' + names[i].firstName + '&ensp;' + names[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';                                                       
                    i++;    
                    if (i === names.length){                        
                        // console.log('null recs1: ', nullKount);
                        break;
                    };                            
                };                
                // console.log('null recs2: ', nullKount);
            };
            
            // console.log('null recs3: ', nullKount);

            $('#mainList').html('');
            $('#mainList').html(pglist);
            $('#srchBx').val('');

            $('input[name="mainListRadio"]').click(function(){
                $('input[name="snmListRadio"]').checked = false;
                $('input[name="stfFilterRadio"]').checked = false;
                $('input[name="mainListRadio"]').checked = true;
                clickNshow("mainListRadio");
            });
            
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong'); 
        }
    });
} // end stfReset()

function clickNshow(radionm){
    var stfId = $('input[name=' + radionm + ']:checked').val();

    $.ajax({
        url:"libs/php/getPersonnelProfileByID.php",
        type: "POST",
        dataType: 'json',
        data: {
            id: stfId
        },
        success: function(response){
            var dat = response.data[0];
            console.log(dat.firstName, dat.lastName);

            $('#deptPg').hide();
            $('#locPg').hide();
            $('#mainPg').hide();
            // $('#profile').show();
            // var cookie = cookienm;

            var thm = Math.floor(Math.random() *5 ) + 1;
            var profileThm;
            switch(thm){
                case 1:
                    profileThm = "theme1";
                    $('.circleBox').html('<button class="btn" type="button" id="theme1"></button>');
                    break;
                case 2:
                    profileThm = "theme2";
                    $('.circleBox').html('<button class="btn" type="button" id="theme2"></button>');
                    break;
                case 3:
                    profileThm = "theme3";
                    $('.circleBox').html('<button class="btn" type="button" id="theme3"></button>');
                    break;
                case 4:
                    profileThm = "theme4";
                    $('.circleBox').html('<button class="btn" type="button" id="theme4"></button>');
                    break;
                case 5:
                    profileThm = "theme5";
                    $('.circleBox').html('<button class="btn" type="button" id="theme5"></button>');
                    break;
            }
            profileThm = '#' + profileThm;
            $(profileThm).html(dat.firstName.slice(0,1).toUpperCase() + dat.lastName.slice(0,1).toUpperCase());
            $('#pfnmLst').html(dat.firstName + ' ' + dat.lastName);
            $('#pDsg').html(dat.designation);
            $('#pDep').html(dat.department + ' Department');
            $('#pEmail').html(dat.email);
            $('#pLoc').html(dat.location);  
            
            $('#profile').show();
            
            $('#profileBkBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
            });                                        
        },
        error: function(jqXHR){
            console.log('Sorry, something is wrong.')
        }                                       
    });

} // end clickNshow() 

function redoProfile(idnum){
    $.ajax({
        url:"libs/php/getPersonnelProfileByID.php",
        type: "POST",
        dataType: 'json',
        data: {
            id: idnum
        },
        success: function(response){
            var pdat = response.data[0];
            console.log(pdat.firstName, pdat.lastName);

            var thm = Math.floor(Math.random() *5 ) + 1;
            var profileThm;
            switch(thm){
                case 1:
                    profileThm = "theme1";
                    $('.circleBox').html('<button class="btn" type="button" id="theme1"></button>');
                    break;
                case 2:
                    profileThm = "theme2";
                    $('.circleBox').html('<button class="btn" type="button" id="theme2"></button>');
                    break;
                case 3:
                    profileThm = "theme3";
                    $('.circleBox').html('<button class="btn" type="button" id="theme3"></button>');
                    break;
                case 4:
                    profileThm = "theme4";
                    $('.circleBox').html('<button class="btn" type="button" id="theme4"></button>');
                    break;
                case 5:
                    profileThm = "theme5";
                    $('.circleBox').html('<button class="btn" type="button" id="theme5"></button>');
                    break;
            }
            profileThm = '#' + profileThm;
            $(profileThm).html(pdat.firstName.slice(0,1).toUpperCase() + pdat.lastName.slice(0,1).toUpperCase());
            $('#pfnmLst').html(pdat.firstName + ' ' + pdat.lastName);
            $('#pDsg').html(pdat.designation);
            $('#pDep').html(pdat.department + ' Department');
            $('#pEmail').html(pdat.email);
            $('#pLoc').html(pdat.location);  
            
            $('#profile').show();
            
            $('#profileBkBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
            });                                        
        },
        error: function(jqXHR){
            console.log('Sorry, something is wrong.')
        }                                       
    });
} // end redoProfile()

function deleteStaff(idnum, delTrack){
    var delType = delTrack;
    $.ajax({
        url:"libs/php/delPersonnel.php",
        type: "POST",
        dataType: 'json',
        data: {
            id: idnum
        },
        success: function(response){      
            if (delType === 'show') {
                $('#dsfeedbk').html('Record successfully deleted.');                  

                $('#deleteModal').on('hidden.bs.modal', function(){ 
                    $('#dsfeedbk').html('');
                });
            };
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');
        }
    }); 
}

function updateStaff(idnum, hint){
    var track = hint;
    $.ajax({
        url:"libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: 'json',
        data: {
            id: idnum
        },
        success: function(response){         
            var dat = response.data.personnel[0];
            var dpdat = response.data.department;
            $('#ufnm').val(dat.firstName);
            $('#ulnm').val(dat.lastName);
            $('#udsgnm').val(dat.jobTitle);
            $('#ueml').val(dat.email);
            $('#udip').val(dat.departmentID);
            
            var dpnam;
            for (i = 0; i < dpdat.length; i++){
                if (dpdat[i].id === $('#udip').val()){
                    dpnam = dpdat[i].name;
                    break;
                }                    
            }  

            $('#dipnm').val(dpnam); // change this to a dropdown box: 

            $('#editModal').modal("show"); 

            $('#updstf').click(function(){
                var fval = $('#ufnm').val();
                var lval = $('#ulnm').val();
                var dsgval = $('#udsgnm').val();
                var emval = $('#ueml').val();
                var dipval = $('#udip').val();

                $.ajax({
                    url:"libs/php/updatePersonnel.php",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        firstName: fval,
                        lastName: lval,
                        jobTitle: dsgval,
                        email: emval,
                        departmentID: dipval,
                        id: idnum
                    },
                    success: function(response){
                        $('#usfeedbk').html('Record successfully updated.');
                        console.log('idee is ', idnum);

                        console.log('Tracker is ', track);
                        if (track === 'repaint'){
                            redoProfile(idnum);
                        }                        

                        $('#editModal').on('hidden.bs.modal', function(){
                            $('#usfeedbk').html('');
                        });
                    },
                    error: function(jqXHR){
                        console.log(jqXHR, 'Something is wrong');
                    }
                });
            });                                                                                        
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');
        }
    });
}

function resetLocs(){
    $.ajax({
        url: "libs/php/getLocations.php",
        type: "GET",
        dataType: 'json',    
        success: function(response){
            var dat = response.data;  

            // clear current table contents:
            if (dat.length > 0) {
                $('#locList').html('');                
            }

            var sites = "";
            for (var i = 0; i < dat.length; i++){
                sites = sites + '<tr><td><p id="' + dat[i].id + '">' + dat[i].name + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></p></td></tr>';
            }
            
            $('#locList').html(sites);
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');
        }
    });
} // end resetLocs

$(document).ready(function(){
    $('#profile').hide();
    $('#deptPg').hide();
    $('#locPg').hide();
    $('#mainPg').show();    

    stfReset();

    // filtering by department and location:
    $('#filterBtn2').click(function(){
        $('.trio-collapse').collapse('show');   

        $.ajax({
            url: "libs/php/getLocations.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            
    
                // clear current location dropdown contents:
                if (dat.length > 0) {
                    $('#locFilter2Select').html('');                
                }
    
                var locos = "<option>Location filter ...</option>";
                for (var i = 0; i < dat.length; i++){
                    locos = locos + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#locFilter2Select').html(locos);                 
                
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });

        $('#depFilterSelect').attr('disabled', true);

        $('#locFilter2Select').change(function(){
            var getLocID = $('#locFilter2Select').val();
    
            $.ajax({
                url: "libs/php/getDepartmentsByLoc.php",
                type: "POST",
                dataType: 'json',   
                data: {
                    locationID: getLocID
                }, 
                success: function(response){
                    var dat = response.data;            
    
                    var depos = '<option>Department filter ...</option>';
                    for (var i = 0; i < dat.length; i++){
                        depos = depos + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                    }
    
                    $('#depFilterSelect').html('');
                    $('#depFilterSelect').html(depos);

                    $('#depFilterSelect').attr('disabled', false);
    
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
        });
       
        $('#applyFilterBtn2').click(function(){
            var getDepID = $('#depFilterSelect').val();
            var depTxt = $('#depFilterSelect option:selected').text();

            if (depTxt === 'Department filter ...'){
                selectList = "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>No departments in this location</h5></td></tr>";

                $('#mainList').html(selectList); 
                // $('.trio-collapse').collapse('hide');
                $('.trio-collapse').collapse('toggle'); 
            } else {
                $.ajax({
                    url:"libs/php/getPersonnelByDep.php",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        departmentID: getDepID                
                    },
                    success: function(response){
                        var dat = response.data;                                     
                        
                        selectList = "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + depTxt + "&emsp;Department&emsp;Employees</h5></td></tr>";
    
                        for (let i = 0; i < dat.length; i++){     
                            selectList = selectList + '<tr><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="stfFilterRadio" id="stfFilterRadio" value=' + dat[i].id + '><label class="form-check-label" for="stfFilterRadio">&ensp;' + dat[i].firstName + '&ensp;' + dat[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';                            
                        }
                          
                        console.log(depTxt);
    
                        $('#mainList').html(selectList); 
                        $('.trio-collapse').collapse('hide');
                        
                        $('input[name="stfFilterRadio"]').click(function(){
                            $('input[name="mainListRadio"]').checked = false;
                            $('input[name="snmListRadio"]').checked = false;
                            $('input[name="stfFilterRadio"]').checked = true;
                            clickNshow("stfFilterRadio");
                        }); 
                    },
                    error: function(jqXHR){
                        console.log(jqXHR, 'Something is wrong');
                    }
                });  
            }
        });        

    });  // end filtering
    
                
    // Using the name search :
    nmMatches = "";
    $('#srchBtn').click(function(){
        nmMatches = "";
        var srchTxt = $('#srchBx').val();                    
        srchTxt = srchTxt.trim().toUpperCase();
        var srchLen = srchTxt.length;

        // bring ajax in here:
        $.ajax({
            url: "libs/php/getPersonnelAlphabetic.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var names = response.data;
                
                if (srchLen !== 0){
                    for (i = 0; i < names.length; i++){
                        var lnm = names[i].lastName.toUpperCase();
                        if (lnm.slice(0,srchLen) === srchTxt){
                            nmMatches = nmMatches + '<tr><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="snmListRadio" id="snmListRadio" value=' + names[i].id + '><label class="form-check-label" for="snmListRadio">&ensp;' + names[i].firstName + '&ensp;' + names[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';
                        };
                    }
        
                    if (nmMatches.length === 0){
                        $('#mainList').html('');
                        $('#mainList').html('Sorry, no such record found.');
                    } else {
                        $('#mainList').html('');
                        $('#mainList').html(nmMatches);
                        
                        $('input[name="snmListRadio"]').click(function(){
                            $('input[name="mainListRadio"]').checked = false;
                            $('input[name="stfFilterRadio"]').checked = false;
                            $('input[name="snmListRadio"]').checked = true;
                            clickNshow("snmListRadio");
                        });                       
                    };                        
                };     
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong'); 
            }
        });                      
    });    

    // to remove a row from table on trash-can button click:
    $("#mainTbl").on('click', '.delBtn', function() {
        var eydee = $(this).parents('td').children('input[type="radio"]').val();        
        var stfNm = $(this).parent().text();
        stfNm = stfNm.trim();        
        $(this).closest('tr').remove();  // or, $(this).parents('tr').remove();           
        deleteStaff(eydee, 'no-show');        
    });


    // to edit a record from the table, on edit button click:
    $("#mainTbl").on('click', '.editBtn', function() {
        var eydee = $(this).parents('td').children('input[type="radio"]').val();

        updateStaff(eydee, 'no-repaint');        
    });

    // edit from profile page:
    $('#editStfBtn').click(function(){        
        var idee = getStfID();

        updateStaff(idee, 'repaint');      
    });           
    
    // delete from profile page:
    $('#delStfBtn').click(function(){        
        var idee = getStfID();

        var stfNms = $("input[type='radio']:checked").parent().text();
        stfNms = stfNms.trim();

        $('#delSpan').html('Delete ' + stfNms + ' ?');

        $('#deleteModal').modal("show");

        $('#delStfYes').click(function(){
            deleteStaff(idee, 'show');
        });                             
    });  
    
    // Add Employee;
    $('#addStaff').click(function(){
        // ---------------------- Fill in dropdown values: ----------------
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            

                // clear current dropdown contents:
                if (dat.length > 0) {
                    $('#depts').html('');                
                }

                var choices = "<option>&emsp;</option>";
                for (var i = 0; i < dat.length; i++){
                    choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#depts').html(choices);
                $('#addModal').modal('show');                

                $('#aStf').click(function(){
                    var fval = $('#afnm').val();
                    var lval = $('#alnm').val();
                    var dsgval = $('#adsgnm').val();
                    var emval = $('#aeml').val();
                    var dipval = $('#depts').val();                    
                    $.ajax({
                        url:"libs/php/addStaff.php",
                        type: "POST",
                        dataType: 'json',
                        data: {
                            firstName: fval,
                            lastName: lval,
                            jobTitle: dsgval,
                            email: emval,
                            departmentID: dipval
                        },
                        success: function(response){
                            $('#asfeedbk').html('New record successfully added.');
                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });

                    $('#addModal').on('hidden.bs.modal', function(){
                        $('#afnm').val('');
                        $('#alnm').val('');
                        $('#adsgnm').val('');
                        $('#aeml').val('');
                        $('#asfeedbk').html('');
                    });
                
                });
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong'); 
            }
        });   
    });
    
});

// ******************** Manage departments ***************************************
$('.vwDep').click(function(){
    $('#profile').hide();
    $('#locPg').hide();
    $('#mainPg').hide();
    $('#deptPg').show();

    function resetDepts(){
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            
    
                // clear current table contents:
                if (dat.length > 0) {
                    $('#deptList').html('');                
                }
    
                var depts = "";
                for (var i = 0; i < dat.length; i++){
                    depts = depts + '<tr><td><p id="' + dat[i].id + '">' + dat[i].name + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></p></td></tr>';                
                }
                
                $('#deptList').html(depts);            
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong'); 
            }
        });        
    }
    
    resetDepts();

    $('#filterBtn').click(function(){
        $('.multi-collapse').collapse('show');   // $('.multi-collapse').on("show.bs.collapse", function(){

        $.ajax({
            url: "libs/php/getLocations.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            
    
                // clear current dropdown contents:
                if (dat.length > 0) {
                    $('#locFilter1Select').html('');                
                }
    
                var choices = "<option>&emsp;</option>";
                for (var i = 0; i < dat.length; i++){
                    choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#locFilter1Select').html(choices);                 
                
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });

        $('#applyFilterBtn1').click(function(){
            var getLocID = $('#locFilter1Select').val();
    
            $.ajax({
                url: "libs/php/getDepartmentsByLoc.php",
                type: "POST",
                dataType: 'json',   
                data: {
                    locationID: getLocID
                }, 
                success: function(response){
                    var dat = response.data;            
    
                    var depsByLoc = '';
                    for (var i = 0; i < dat.length; i++){
                        depsByLoc = depsByLoc + '<tr><td><p id="' + dat[i].id + '">' + dat[i].name + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></p></td></tr>';
                    }
    
                    $('#deptList').html('');
                    $('#deptList').html(depsByLoc);

                    $('.multi-collapse').collapse('hide');
    
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
    
        });
    });

    // to edit a record from the dept list table, on edit button click:
    $("#deptTbl").on('click', '.editBtn', function() {
        var depID = $(this).parents('p').attr('id');
        console.log(depID);

        $.ajax({
            url:"libs/php/getDepartmentByID.php",
            type: "POST",
            dataType: 'json',
            data: {
                id: depID
            },
            success: function(response){         
                var dat = response.data[0];
                $('#depnm').val(dat.name);
                $('#locId').val(dat.locationID);

                $.ajax({
                    url: "libs/php/getLocations.php",
                    type: "GET",
                    dataType: 'json',    
                    success: function(response){
                        var dat = response.data;            
        
                        // clear current dropdown contents:
                        if (dat.length > 0) {
                            $('#places').html('');                
                        }
        
                        var choices = "<option>&emsp;</option>";
                        for (var i = 0; i < dat.length; i++){
                            choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                        }
                        
                        $('#places').html(choices);
                        $('#places').val($('#locId').val());

                        $('#eDepModal').modal('show');

                        $('#places').change(function(){
                            $('#locId').val($('#places').val());
                        });
                    },
                    error: function(jqXHR){
                        console.log(jqXHR, 'Something is wrong');
                    }
                });

                $('#updept').click(function(){
                    var nmval = $('#depnm').val();
                    var locval = $('#locId').val();

                    $.ajax({
                        url:"libs/php/updateDepartment.php",
                        type: "POST",
                        dataType: 'json',
                        data: {
                            name: nmval,
                            locationID: locval,
                            id: depID
                        },
                        success: function(response){

                            $('#udfeedbk').html('Department successfully updated.');  

                            $('#eDepModal').on('hidden.bs.modal', function(){
                                $('#udfeedbk').html('');
                            });                                  

                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });
                });                                                                                        
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });                   
    });

    // to remove a row from dept list table on trash-can button click:
    $("#deptTbl").on('click', '.delBtn', function() {
        // var eydee = $(this).parents('td').children('input[type="radio"]').val();  
        var eydee = $(this).parents('p').attr('id');
        console.log('id', eydee);

        var depNm = $(this).parents('p').text();
        console.log('modified dept1: ', depNm);
        depNm = depNm.trim();    
        console.log('modified dept2: ', depNm);

        var delRow = $(this).closest('tr');     // or, $(this).parents('tr').remove();   
        $(delRow).hide();
        
        $('#delSpan').html('Delete ' + depNm + ' ?');
        $('#deleteModalLabel').html('Delete Department');

        $('#deleteModal').modal("show");

        $('#delStfNo').click(function(){
            $(delRow).show();
        });

        $('#delStfYes').click(function(){
            $(delRow).remove();
            $.ajax({
                url:"libs/php/deleteDepartmentByID.php",
                type: "POST",
                dataType: 'json',
                data: {
                    id: eydee
                },
                success: function(response){  

                    $('#dsfeedbk').html('Department successfully deleted.');    
                    
                    $('#deleteModal').on('hidden.bs.modal', function(){
                        $('#dsfeedbk').html('');
                    });
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });                    
        }); 

    });

    $('#resetDeptList').click(function(){
        resetDepts();
    });

    $('#viewStfBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
    });

    // $('#viewLocsBtn').click(function(){
    //     $('#profile').hide();
    //     $('#deptPg').hide();
    //     $('#mainPg').hide();
    //     $('#locPg').show();
    // });
    
    $('#depBkBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
    }); 

    // adding a department:
    $('#addDept').click(function(){
        
        // fill in the locations dropdown:
        $.ajax({
            url: "libs/php/getLocations.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            

                // clear current dropdown contents:
                if (dat.length > 0) {
                    $('#addLocSelect').html('');                
                }

                var choices = "<option>&emsp;</option>";
                for (var i = 0; i < dat.length; i++){
                    choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#addLocSelect').html(choices);                
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });
        
        $('#aDepModal').modal('show');
        $('#aDep').focus();

        $('#addLocSelect').change(function(){
            $('#aLocID').val($('#addLocSelect').val());
        });

        $('#newDep').click(function(){
            var dnam = $('#aDep').val();
            var locid = $('#aLocID').val();

            $.ajax({
                url:"libs/php/insertDepartment.php",
                type: "POST",
                dataType: 'json',
                data: {
                    name: dnam,
                    locationID: locid
                },
                success: function(response){

                    $('#adfeedbk').html('New department successfully added.');

                    $('#aDepModal').on('hidden.bs.modal', function(){
                        $('#adfeedbk').html('');
                        $('#aDep').val('');
                        $('#aLocID').val('');
                    });

                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
        });
    });

});

// ******************* Mange locations ****************************************
$('.vwLoc').click(function(){
    $('#profile').hide();
    $('#deptPg').hide();
    $('#mainPg').hide();
    $('#locPg').show();

    resetLocs();

    // to edit a record from the location list table, on edit button click:
    $("#locTbl").on('click', '.editBtn', function() {
        var locID = $(this).parents('p').attr('id');
        // console.log('Locations: ', locID);

        $.ajax({
            url:"libs/php/getLocationByID.php",
            type: "POST",
            dataType: 'json',
            data: {
                id: locID
            },
            success: function(response){         
                var dat = response.data[0];
                $('#locnm').val(dat.name);

                $('#eLocModal').modal('show');

                $('#upLoc').click(function(){
                    var locval = $('#locnm').val();

                    $.ajax({
                        url:"libs/php/updateLocation.php",
                        type: "POST",
                        dataType: 'json',
                        data: {
                            name: locval,
                            id: locID
                        },
                        success: function(response){

                            $('#ulfeedbk').html('Location successfully updated.');
                            
                            $('#eLocModal').on('hidden.bs.modal', function(){
                                $('#ulfeedbk').html('');
                            });

                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });
                });                                                                                        
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });

    }); 

    // to delete a record from the location list table, on edit button click:
    $("#locTbl").on('click', '.delBtn', function() {
        var locID = $(this).parents('p').attr('id');
        var locTxt = $(this).parents('p').text();
        locTxt = locTxt.trim();

        var delLoc = $(this).closest('tr');
        $(delLoc).hide();

        $('#delSpan').html('Delete ' + locTxt + ' ?');
        $('#deleteModalLabel').html('Delete Location');

        $('#deleteModal').modal("show");

        $('#delStfNo').click(function(){
            $(delLoc).show();
        });

        $('#delStfYes').click(function(){
            $(delLoc).remove();

            $.ajax({
                url:"libs/php/deleteLocation.php",
                type: "POST",
                dataType: 'json',
                data: {
                    id: locID
                },
                success: function(response){                                    
                    $('#dsfeedbk').html('Location successfully deleted.');  
                    
                    $('#deleteModal').on('hidden.bs.modal', function(){
                        $('#dsfeedbk').html('');
                    });
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });                         
        });
    });     
    
    // adding a location:
    $('#addLoc').click(function(){                
        $('#aLocModal').modal('show');
        $('#aLoc').focus();

        $('#saveLoc').click(function(){
            var lnam = $('#aLoc').val();

            $.ajax({
                url:"libs/php/addLocation.php",
                type: "POST",
                dataType: 'json',
                data: {
                    name: lnam
                },
                success: function(response){

                    $('#alfeedbk').html('New location successfully created.');

                    $('#aLocModal').on('hidden.bs.modal', function(){
                        $('#aLoc').val('');
                        $('#alfeedbk').html('');
                    });
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
        });
    });

    $('#resetLocList').click(function(){
        resetLocs();
    });

    $('#viewStfBtn2').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
    });

    // $('#viewDeptsBtn').click(function(){
    //     $('#locPg').hide();
    //     $('#mainPg').hide();
    //     $('#profile').hide();
    //     $('#deptPg').show();
    // });

    $('#locBkBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
    }); 
});
 
