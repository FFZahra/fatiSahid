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

// **** hasDepend modal  **********
var hasDepend = new bootstrap.Modal(document.getElementById('hasDependModal'));

// ******************************
function getStfID(){
    // capture the personnel id:
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
            var pgList, currLett, surnameInitial;
            
            if (names.length > 0){
                currLett = names[0].lastName.slice(0,1).toUpperCase();
                pgList = '<tr><td class="text-left font-weight-bold"><h5 class="listHdr">' + currLett + '</h5></td></tr>';
                for (i = 0; i < names.length; i++){
                    surnameInitial = names[i].lastName.slice(0,1).toUpperCase();
                    if (surnameInitial === currLett) {
                        pgList = pgList + '<tr><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="mainListRadio" id="mainListRadio" value=' + names[i].id + '><label class="form-check-label" for="mainListRadio">&ensp;' + names[i].firstName + '&ensp;' + names[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';
                    } else {
                        currLett = surnameInitial;
                        pgList = pgList + '<tr><td class="text-left font-weight-bold"><h5 class="listHdr">' + currLett + '</h5></td></tr>';
                        pgList = pgList + '<tr><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="mainListRadio" id="mainListRadio" value=' + names[i].id + '><label class="form-check-label" for="mainListRadio">&ensp;' + names[i].firstName + '&ensp;' + names[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';
                    }
                }

            } else {
                pgList = 'Sorry no Employee records.';
            }

            $('#mainList').html('');
            $('#mainList').html(pgList);
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
            
            $('#prof2mainBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
            });   
            
            $('#pfDepBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#locPg').hide();
                $('#deptPg').show();
                resetDepts();
            });

            $('#pfLocBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#deptPg').hide();
                $('#locPg').show();
                resetLocs();
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
            
            $('#prof2mainBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
            });   
            
            $('#pfDepBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#locPg').hide();
                $('#deptPg').show();
                resetDepts();
            });

            $('#pfLocBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#deptPg').hide();
                $('#locPg').show();
                resetLocs();
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
} // end deleteStaff()

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

            // ---------------------- Fill in dropdown values: ----------------
            // clear current dropdown contents:
            if (dpdat.length > 0) {
                $('#dipnm').html('');                
            }

            var choices = "<option>&emsp;</option>";
            for (var i = 0; i < dpdat.length; i++){
                choices = choices + '<option value = "' + dpdat[i].id + '">' + dpdat[i].name + '</option>';
            }
            
            $('#dipnm').html(choices);
            var dpnam = $('#udip').val(); 
            $('#dipnm').val(dpnam); 

            $('#editModal').modal("show"); 

            $('#dipnm').change(function(){
                var newID = $('#dipnm').val();
                $('#udip').val(newID);
            });

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
}  // end updateStaff()

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
} // end resetDepts()

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

    $('#resetList').click(function(){
        stfReset();
    });

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
                        // --------------------------------------------------------
                        
                            var selectList = "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + depTxt + "&emsp;Department&emsp;Employees</h5></td></tr>";
                        if (dat.length > 0) {
                            for (let i = 0; i < dat.length; i++){     
                                selectList = selectList + '<tr><td class="form-check">&emsp;<input class="form-check-input tblRadio" type="radio" name="stfFilterRadio" id="stfFilterRadio" value=' + dat[i].id + '><label class="form-check-label" for="stfFilterRadio">&ensp;' + dat[i].firstName + '&ensp;' + dat[i].lastName + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></label></td></tr>';                            
                            }
                            
                            $('#mainList').html('');
                            $('#mainList').html(selectList);
                        } else {
                            selectList = selectList + '<tr><td>Sorry, no employees in this department.</td></tr>'
                            $('#mainList').html('');
                            $('#mainList').html(selectList);
                        }
                            
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
});
    
$(document).ready(function(){                
    // Using the name search :
    // var nmMatches = "";
    $('#srchBtn').click(function(){
        var nmMatches = "";
        var srchTxt = $('#srchBx').val();                    
        srchTxt = srchTxt.trim().toUpperCase();
        var srchLen = srchTxt.length;

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
}); 

$(document).ready(function(){
    // to remove a row from table on trash-can button click:
    $("#mainTbl").on('click', '.delBtn', function() {
        var eydee = $(this).parents('td').children('input[type="radio"]').val();        
        var stfNm = $(this).parent().text();
        stfNm = stfNm.trim();        
        $(this).closest('tr').remove();  // or, $(this).parents('tr').remove();           
        deleteStaff(eydee, 'no-show');        
    });
});

$(document).ready(function(){
    // to edit a record from the table, on edit button click:
    $("#mainTbl").on('click', '.editBtn', function() {
        var eydee = $(this).parents('td').children('input[type="radio"]').val();

        updateStaff(eydee, 'no-repaint');        
    });
});

$(document).ready(function(){  
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
        
        $('#delStfNo').click(function(){
            $('#deleteModal').modal("hide");
        }); 
    });
});

$(document).ready(function(){    
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

$(document).ready(function(){
    // ******************** Manage departments *************************************** 
    $('#mngDepBtn').click(function(){
        $('#profile').hide();
        $('#locPg').hide();
        $('#mainPg').hide();
        $('#deptPg').show();        
        resetDepts();
    });

    
    $('#toLocBtn').click(function(){
        $('#profile').hide();
        $('#mainPg').hide();
        $('#deptPg').hide();
        $('#locPg').show();
        resetLocs();
    });

    $('#toMainBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
    }); 

    $('#resetDeptList').click(function(){
        resetDepts();
    });



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
                    
                    if (dat.length > 0) {
                        var depsByLoc = '';
                        for (var i = 0; i < dat.length; i++){
                            depsByLoc = depsByLoc + '<tr><td><p id="' + dat[i].id + '">' + dat[i].name + '&emsp;<button class="button editBtn"><i class="fa-solid fa-pen-to-square fa-fw"></i></button>&emsp;<button class="button delBtn"><i class="fa-regular fa-trash-can"></i></button></p></td></tr>';
                        }
                        
                        $('#deptList').html('');
                        $('#deptList').html(depsByLoc);
                    } else {
                        $('#deptList').html('');
                        $('#deptList').html(' Sorry, no departments for this location.');
                    }

                    $('.multi-collapse').collapse('hide');

                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });

        });
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
                        console.log($('#locId').val(), $('#places').val(), $('#places').text());

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
        var eydee = $(this).parents('p').attr('id');
        console.log('id', eydee);

        var depNm = $(this).parents('p').text();
        depNm = depNm.trim(); 

        var delRow = $(this).closest('tr'); 
        // find out if the record has any employee dependencies first:   

        var delChk;
        $.ajax({
            url:"libs/php/getPersonnelByDep.php",
            type: "POST",
            dataType: 'json',
            data: {
                departmentID: eydee
            },
            success: function(response){                                    
                var dat = response.data;

                if (dat.length > 0){
                    delChk = 'ties';  // department not cleared, has dependencies

                    $.ajax({
                        url:"libs/php/getDepartmentsExcept.php", // brings up list of all departments except the one to be deleted
                        type: "POST",
                        dataType: 'json',
                        data: {
                            id: eydee
                        },
                        success: function(response){
                            var dat = response.data;            

                            // clear current dropdown contents:
                            if (dat.length > 0) {
                                $('#newOtherSelect').html('');                
                            }
            
                            var choices = "<option>Select new department ...</option>";
                            for (var i = 0; i < dat.length; i++){
                                choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                            }
                            
                            $('#newOtherSelect').html(choices);
                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });

                    $('#newOtherSelect').hide();
                    $('#setNew').text('Set new department');
                    $('#setNew').hide();
                    $('#line1').html('Employees exist under this location');
                    $('#line2').html('<strong>Move</strong> to new department &ensp;<b>OR</b>&ensp; <strong>Go Back</strong> to edit new departments separately');
                    $('#hasDependModal').modal('show');

                    $('#moveBtn').click(function(){
                        $('#newOtherSelect').show();
                        $('#setNew').show();

                        $('#setNew').click(function(){
                            var newDepID = $('#newOtherSelect').val();
                            // update the affected department ids with the new one:
                            $.ajax({
                                url:"libs/php/updateBatchStf.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    newID: newDepID,
                                    oldID: eydee
                                },
                                success: function(response){
                                                                    
                                    $('#newOtherFeedbk').html(' New department set successfully.');

                                    $('#hasDependModal').on('hidden.bs.modal', function(){
                                        $('#newOtherFeedbk').html('');

                                        $(delRow).hide();
            
                                        $('#delSpan').html('Delete ' + depNm + ' ?');
                                        $('#deleteModalLabel').html('Delete Department');
                                
                                        $('#deleteModal').modal("show");
                                
                                        $('#delStfNo').click(function(){
                                            $(delRow).show();
                                            $('#deleteModal').modal("hide");
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
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });
                        });

                    });

                    $('#goBkBtn').click(function(){
                        $('#hasDependModal').modal('hide');
                        $('#deleteModal').modal("hide");
                        $('#deptPg').hide();
                        $('#mainPg').show();
                    }); 

                } else {
                    delChk = 'okay'; // department cleared for deletion

                    $(delRow).hide();
        
                    $('#delSpan').html('Delete ' + depNm + ' ?');
                    $('#deleteModalLabel').html('Delete Department');

                    $('#deleteModal').modal("show");

                    $('#delStfNo').click(function(){
                        $(delRow).show();
                        $('#deleteModal').modal("hide");
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
                };
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });
    });
});

$(document).ready(function(){
    // ******************* Manage locations ****************************************
    $('#mngLocBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#mainPg').hide();
        $('#locPg').show();
        resetLocs();
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

    $('#deptBtn').click(function(){
        $('#profile').hide();
        $('#locPg').hide();
        $('#mainPg').hide();
        $('#deptPg').show()
        resetDepts();
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

    // to delete a record from the location list table:
    $("#locTbl").on('click', '.delBtn', function() {
        var locID = $(this).parents('p').attr('id');
        var locTxt = $(this).parents('p').text();
        locTxt = locTxt.trim();        
        var delLoc = $(this).closest('tr');

        // find out if the record has any department dependencies first:
        var delChk;
        $.ajax({
            url:"libs/php/getDepartmentsByLoc.php",
            type: "POST",
            dataType: 'json',
            data: {
                locationID: locID
            },
            success: function(response){                                    
               var dat = response.data;

               if (dat.length > 0){
                    delChk = 'ties';
                    
                    $.ajax({
                        url:"libs/php/getLocationsExcept.php", // brings up list of all locations except the one to be deleted
                        type: "POST",
                        dataType: 'json',
                        data: {
                            id: locID
                        },
                        success: function(response){
                            var dat = response.data;            

                            // clear current dropdown contents:
                            if (dat.length > 0) {
                                $('#newOtherSelect').html('');                
                            }
            
                            var choices = "<option>Select new location ...</option>";
                            for (var i = 0; i < dat.length; i++){
                                choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                            }
                            
                            $('#newOtherSelect').html(choices);
                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });

                    $('#newOtherSelect').hide();
                    $('#setNew').hide();
                    $('#hasDependModal').modal('show');

                    $('#moveBtn').click(function(){
                        $('#newOtherSelect').show();
                        $('#setNew').show();

                        $('#setNew').click(function(){
                            var newLocID = $('#newOtherSelect').val();
                            // update the affected department ids with the new one:
                            $.ajax({
                                url:"libs/php/updateBatchDept.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    newID: newLocID,
                                    oldID: locID
                                },
                                success: function(response){
                                                                    
                                    $('#newOtherFeedbk').html(' New location set successfully.');

                                    $('#hasDependModal').on('hidden.bs.modal', function(){
                                        $('#newOtherFeedbk').html('');

                                        $(delLoc).hide();

                                        $('#delSpan').html('Delete ' + locTxt + ' ?');
                                        $('#deleteModalLabel').html('Delete Location');
                                
                                        $('#deleteModal').modal("show");
                                
                                        $('#delStfNo').click(function(){
                                            $(delLoc).show();
                                            $('#deleteModal').modal("hide");
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
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });
                        });

                    });

                    $('#goBkBtn').click(function(){
                        $('#hasDependModal').modal('hide');
                        $('#deleteModal').modal("hide");
                        $('#locPg').hide();
                        $('#deptPg').show();
                        resetDepts();
                    });                

               } else {
                    delChk = 'okay';

                    $(delLoc).hide();

                    $('#delSpan').html('Delete ' + locTxt + ' ?');
                    $('#deleteModalLabel').html('Delete Location');
            
                    $('#deleteModal').modal("show");
            
                    $('#delStfNo').click(function(){
                        $(delLoc).show();
                        $('#deleteModal').modal("hide");
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
               } // end else               
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });  
        // **************************************************************************** end dependency check
    });     
});
 
