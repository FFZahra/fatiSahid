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
                pgList = '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">' + currLett + '</h5></div></div>';
                for (i = 0; i < names.length; i++){
                    surnameInitial = names[i].lastName.slice(0,1).toUpperCase();
                    if (surnameInitial === currLett) {
                        pgList = pgList + '<div class="row"><div class="clickable recRow col-4 col-xl-2" id="' + names[i].id + '"><h5>' + names[i].firstName + "&emsp;" + '</h5></div><div class="col-3 col-xl-2"><h5>' + names[i].lastName + '</h5></div><div class="col d-xs-none d-md-block"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + names[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + names[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delMain delBtn" id="' + names[i].id + '"  data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + names[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                    } else {
                        currLett = surnameInitial;
                        pgList = pgList + '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">' + currLett + '</h5></div></div>';
                        
                        pgList = pgList + '<div class="row"><div class="clickable recRow col-4 col-xl-2" id="' + names[i].id + '"><h5>' + names[i].firstName + "&emsp;" + '</h5></div><div class="col-3 col-xl-2"><h5>' + names[i].lastName + '</h5></div><div class="col d-xs-none d-md-block"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + names[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + names[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delMain delBtn" id="' + names[i].id + '"  data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + names[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                    }
                }

            } else {
                pgList = 'Sorry no Employee records.';
            }

            $('#mainList').html('');
            $('#mainList').html(pgList);
            $('#srchBx').val('');

            resetLocs('main');
            $('#depFilterMain').attr('disabled', true);

            // $(".recRow").on('click', '.editBtn', function() {
            $(".recRow").on('click', function(){
                var recID = $(this).attr('id');
                clickNshow(recID);
            });
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong'); 
        }
    });
} // end stfReset()

// function clickNshow(radionm){
function clickNshow(num){
    // var stfId = $('input[name=' + radionm + ']:checked').val();
    var stfId = num;

    $.ajax({
        url:"libs/php/getPersonnelProfileByID.php",
        type: "POST",
        dataType: 'json',
        data: {
            id: stfId
        },
        success: function(response){
            var dat = response.data[0];
            // console.log(dat.firstName, dat.lastName);

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
            
            $('#delStfBtn').attr('data-id', stfId);
            $('#editStfBtn').attr('data-id', stfId);
            // console.log($('#delStfBtn').attr('data-id'), 'profile del btn data-id');

            var getNames = dat.firstName + '&emsp;' + dat.lastName;
            $('#delStfBtn').attr('name', getNames);
            $('#editStfBtn').attr('name', getNames);
            
            $('#profile').show();
            
            $('#prof2mainBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
                stfReset();
                resetLocs('main');
            });   
            
            $('#pfDepBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#locPg').hide();
                $('#deptPg').show();
                resetDepts();
                resetLocs('dep');
            });

            $('#pfLocBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#deptPg').hide();
                $('#locPg').show();
                resetLocs('loc');
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

            $('#delStfBtn').attr('data-id', idnum);
            // console.log($('#delStfBtn').attr('data-id'), 'profile del btn data-id');
            $('#editStfBtn').attr('data-id', idnum);

            var getNames = pdat.firstName + '&emsp;' + pdat.lastName;
            $('#delStfBtn').attr('name', getNames);
            $('#editStfBtn').attr('name', getNames);
            
            $('#profile').show();
            
            $('#prof2mainBtn').click(function(){
                $('#profile').hide();
                $('#deptPg').hide();
                $('#locPg').hide();
                $('#mainPg').show();
                stfReset();
                resetLocs('main');
            });   
            
            $('#pfDepBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#locPg').hide();
                $('#deptPg').show();
                resetDepts();
                resetLocs('dep');
            });

            $('#pfLocBtn').click(function(){
                $('#profile').hide();
                $('#mainPg').hide();
                $('#deptPg').hide();
                $('#locPg').show();
                resetLocs('loc');
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
            $('#dsfeedbk').html('Record successfully deleted.');                  

            $('#deleteModal').on('hidden.bs.modal', function(){ 
                $('#dsfeedbk').html('');
                if (delType === 'profilePg') {   
                    $('#profile').hide();
                    $('#mainPg').show();
                    stfReset(); 
                    resetLocs('main');              
                };
            });    
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
            if (response.status.description === "success"){
                var dat = response.data.personnel[0];
                var dpdat = response.data.department;
                $('#ufnm').val(dat.firstName);
                $('#ulnm').val(dat.lastName);
                $('#udsgnm').val(dat.jobTitle);
                $('#ueml').val(dat.email);
                var dpid = dat.departmentID;
                console.log(dpid, 'dept id');

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
                $('#dipnm').val(dpid); 

                $('#editFmStf').on("submit", function(e) {
                    // stop the default browser behviour                
                    e.preventDefault();

                    var fval = $('#ufnm').val();
                    var lval = $('#ulnm').val();
                    var dsgval = $('#udsgnm').val();
                    var emval = $('#ueml').val();
                    var dipval = $('#dipnm').val();

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
                            // console.log('idee is ', idnum);

                            // console.log('Tracker is ', track);
                            if (track === 'repaint'){
                                redoProfile(idnum);
                            }                        

                            $('#editModal').on('hidden.bs.modal', function(){
                                $('#usfeedbk').html('');
                                stfReset();
                                resetLocs('main');
                            });
                        },
                        error: function(jqXHR){
                            console.log(jqXHR, 'Something is wrong');
                        }
                    });
                });
                       
            } else {

                $('#editModal.modal-title').replaceWith("Error retrieving data");
        
                }            
                    
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#editModal.modal-title').replaceWith("Error retrieving data");
        }
    });
}  // end updateStaff()

function resetDepts(){
    // var source = caller;
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
                depts = depts + '<div class="row"><div class="col-7 col-xl-5"><p id="' + dat[i].id + '"><h5>' + dat[i].name + '</h5></p></div><div class="col"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#eDepModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delBtn" id="' + dat[i].id + '" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
            }   

            $('#deptList').html(depts); 
                     
        },
        error: function(jqXHR){
            console.log(jqXHR, 'Something is wrong');                 
        }
    });        
} // end resetDepts()

function resetLocs(caller){
    var source = caller;
    $.ajax({
        url: "libs/php/getLocations.php",
        type: "GET",
        dataType: 'json',    
        success: function(response){
            var dat = response.data;  

            // clear current table contents:
            if (dat.length > 0) {
                if (source === 'main'){
                    $('#locFilterMain').html(''); 
                }

                if (source === 'dep'){
                    $('#locFilterDeptPg').html(''); 
                }

                if (source === 'loc'){
                    $('#locList').html(''); 
                }                               
            }            

            if (source === 'main'){
                var loks = "<option>Locations ...</option>";
                for (var i = 0; i < dat.length; i++){
                    loks = loks + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }

                $('#locFilterMain').html(loks);
            }

            if (source === 'dep'){
                var loks = "<option>Locations ...</option>";
                for (var i = 0; i < dat.length; i++){
                    loks = loks + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }

                $('#locFilterDeptPg').html(loks); 
            }

            if (source === 'loc'){
                var sites = "";
                for (var i = 0; i < dat.length; i++){
                    sites = sites + '<div class="row"><div class="col-7 col-xl-5"><p id="' + dat[i].id + '"><h5>' + dat[i].name + '</h5></p></div><div class="col"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#eLocModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delBtn" id="' + dat[i].id + '" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                }

                $('#locList').html(sites);
            } 
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
    resetLocs('main');

    $('#resetList').click(function(){
        stfReset();
        $('#depFilterMain').attr('disabled', true);
    });

    // ******************************* side filter functions: *************************************************
    $('#locFilterMain').change(function(){
        var getLocID = $('#locFilterMain').val();
    
        $.ajax({
            url: "libs/php/getDepartmentsByLoc.php",
            type: "POST",
            dataType: 'json',   
            data: {
                locationID: getLocID
            }, 
            success: function(response){
                var dat = response.data;            

                var depis = '<option>Departments ...</option>';
                for (var i = 0; i < dat.length; i++){
                    depis = depis + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }

                $('#depFilterMain').html('');
                $('#depFilterMain').html(depis);

                $('#depFilterMain').attr('disabled', false);

            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });
    });

    $('#applyFilterSide').click(function(){
        $('#srchBx').val('');
            var sideDepID = $('#depFilterMain').val();
            var depTxt = $('#depFilterMain option:selected').text();

            if (depTxt === 'Departments ...'){
                filteredStf = '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">No departments in this location</h5></div></div>'; 

                $('#mainList').html(''); 
                $('#mainList').html(filteredStf); 
            
            } else {
                $.ajax({
                    url:"libs/php/getPersonnelByDep.php",
                    type: "POST",
                    dataType: 'json',
                    data: {
                        departmentID: sideDepID                
                    },
                    success: function(response){
                        var dat = response.data;  

                        var selectStfList = '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">' + depTxt + '&emsp;Department&emsp;Employees</h5></div></div>';                            
                        if (dat.length > 0) {
                            for (let i = 0; i < dat.length; i++){
                                selectStfList = selectStfList + '<div class="row"><div class="clickable recRow col-4 col-xl-2" id="' + dat[i].id + '"><h5>' + dat[i].firstName + "&emsp;" + '</h5></div><div class="col-3 col-xl-2"><h5>' + dat[i].lastName + '</h5></div><div class="col d-xs-none d-md-block"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delMain delBtn" id="' + dat[i].id + '"  data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                            }
                            
                            $('#mainList').html('');
                            $('#mainList').html(selectStfList);
                        } else {
                            selectStfList = selectStfList + '<div class="row"><div class="col"><h5>Sorry, no employees in this department.</h5></div></div>'
                            $('#mainList').html('');
                            $('#mainList').html(selectStfList);
                        }
                        
                        $(".recRow").on('click', function(){
                            var recID = $(this).attr('id');
                            clickNshow(recID);
                        });
                    },
                    error: function(jqXHR){
                        console.log(jqXHR, 'Something is wrong');
                    }
                });  
            }
    });
    // ************** end side filter functions ************************************************

    // filtering by department and location (Collapse filter):
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
            $('#srchBx').val('');
            var getDepID = $('#depFilterSelect').val();
            var depTxt = $('#depFilterSelect option:selected').text();

            if (depTxt === 'Department filter ...'){
                selectStfList = '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">No departments in this location</h5></div></div>'; 

                $('#mainList').html(selectStfList); 
                
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

                        var selectStfList = '<div class="row"><div class="col-12 text-left font-weight-bold"><h5 class="listHdr">' + depTxt + '&emsp;Department&emsp;Employees</h5></div></div>';                            
                        if (dat.length > 0) {
                            for (let i = 0; i < dat.length; i++){                                    
                                selectStfList = selectStfList + '<div class="row"><div class="clickable recRow col-4 col-xl-2" id="' + dat[i].id + '"><h5>' + dat[i].firstName + "&emsp;" + '</h5></div><div class="col-3 col-xl-2"><h5>' + dat[i].lastName + '</h5></div><div class="col d-xs-none d-md-block"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delMain delBtn" id="' + dat[i].id + '"  data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                            }
                            
                            $('#mainList').html('');
                            $('#mainList').html(selectStfList);
                        } else {
                            selectStfList = selectStfList + '<div class="row"><div class="col"><h5>Sorry, no employees in this department.</h5></div></div>'
                            $('#mainList').html('');
                            $('#mainList').html(selectStfList);
                        }
                            
                        $('.trio-collapse').collapse('hide');

                        $(".recRow").on('click', function(){
                            var recID = $(this).attr('id');
                            clickNshow(recID);
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
                            nmMatches = nmMatches + '<div class="row"><div class="clickable recRow col-4 col-xl-2" id="' + names[i].id + '"><h5>' + names[i].firstName + "&emsp;" + '</h5></div><div class="col-3 col-xl-2"><h5>' + names[i].lastName + '</h5></div><div class="col d-xs-none d-md-block"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + names[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal" data-id="' + names[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delMain delBtn" id="' + names[i].id + '"  data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + names[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                        };
                    }
        
                    if (nmMatches.length === 0){
                        $('#mainList').html('');
                        $('#mainList').html('<br><h5>Sorry, no such record found.</h5>');
                    } else {
                        $('#mainList').html('');
                        $('#mainList').html('<br>' + nmMatches);
                        
                        $(".recRow").on('click', function(){
                            var recID = $(this).attr('id');
                            clickNshow(recID);
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
     $('#editModal').on('show.bs.modal', function(e) {
        var eydee = $(e.relatedTarget).attr('data-id');
        var btnID = $(e.relatedTarget).attr('id');
        // console.log(eydee, 'edit-stf id');
        // console.log(btnID, 'edit btn id');

        if (btnID === 'editStfBtn'){
            updateStaff(eydee, 'repaint');
        } else {
            updateStaff(eydee, 'no-repaint'); 
        }
    });
});

// to remove a row from table or profile page
$(document).ready(function(){
    $('#deleteModal').on('show.bs.modal', function(e) {
        var eydee = $(e.relatedTarget).attr('data-id');
        console.log('id: ', eydee);

        var btnID = $(e.relatedTarget).attr('id');
        console.log('btn id:', btnID);

        if (btnID === 'delStfBtn'){
            // var stfNms = $("input[type='radio']:checked").parents('div[class="row"]').text();
            var stfNms = $(e.relatedTarget).attr('name');
            stfNms = stfNms.trim();
            console.log('delete from profile stfNms', stfNms);

            $('#delSpan').html('Delete&emsp; ' + stfNms + ' ?');
            
            $('#delStfYes').click(function(){
                deleteStaff(eydee, 'profilePg');            
            }); 
            
            $('#delStfNo').click(function(){
                $('#deleteModal').modal("hide");
            }); 
        } else {
            var stfNm = $(e.relatedTarget).parents('div[class="row"]').text();        
            stfNm = stfNm.trim();  
            // console.log('stfNm', $(stfNm));

            var rmRow = $(e.relatedTarget).parents('div[class="row"]');             
            $(rmRow).hide();            

            $('#delSpan').html('Delete&emsp; ' + stfNm + ' ?');

            $('#delStfYes').click(function(){
                $(rmRow).remove();   
                deleteStaff(eydee, 'main'); 
                stfReset();
            }); 
            
            $('#delStfNo').click(function(){
                $(rmRow).show();   
                $('#deleteModal').modal("hide");
                stfReset();
            }); 
        }

        

    });
});

$(document).ready(function(){    
    // Add Employee:
    $('#addModal').on('show.bs.modal', function(e) {
        // $('#addStaff').click(function(){
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
                // $('#addModal').modal('show');                

                $('#addStfFm').on('submit', function(e){
                    e.preventDefault();

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
                        stfReset();
                        resetLocs('main');
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
        resetLocs('dep');
    });

    
    $('#toLocBtn').click(function(){
        $('#profile').hide();
        $('#mainPg').hide();
        $('#deptPg').hide();
        $('#locPg').show();
        resetLocs('loc');
    });

    $('#toMainBtn').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
        resetLocs('main');
    }); 

    $('#resetDeptList').click(function(){
        resetDepts();
        resetLocs('dep');
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
                            depsByLoc = depsByLoc + '<div class="row"><div class="col-7 col-xl-5"><p id="' + dat[i].id + '"><h5>' + dat[i].name + '</h5></p></div><div class="col"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#eDepModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delBtn" id="' + dat[i].id + '" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
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

    // *********************** side filter function ******************************************************
    $('#doFilterSide').click(function(){
        var sideLocID = $('#locFilterDeptPg').val();

        $.ajax({
            url: "libs/php/getDepartmentsByLoc.php",
            type: "POST",
            dataType: 'json',   
            data: {
                locationID: sideLocID
            }, 
            success: function(response){
                var dat = response.data; 
                
                if (dat.length > 0) {
                    var sideDeps = '';
                    for (var i = 0; i < dat.length; i++){
                        sideDeps = sideDeps + '<div class="row"><div class="col-7 col-xl-5"><p id="' + dat[i].id + '"><h5>' + dat[i].name + '</h5></p></div><div class="col"></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-success editBtn" id="' + dat[i].id + '" data-bs-toggle="modal" data-bs-target="#eDepModal" data-id="' + dat[i].id + '"><i class="fa-solid fa-pen-to-square fa-fw"></i></button></div><div class="col-1"><button type="button" class="btn btn-sm btn-outline-warning delBtn" id="' + dat[i].id + '" data-id="' + dat[i].id + '"><i class="fa-regular fa-trash-can"></i></button></div></div><br>';
                    }
                    
                    $('#deptList').html('');
                    $('#deptList').html(sideDeps);
                } else {
                    $('#deptList').html('');
                    $('#deptList').html('<br><h5>Sorry, no departments for this location.</h5>');
                }

            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');
            }
        });
    });
    // ****************************************** end side filter functions ************************************************************
    
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

        $('#aDepForm').on('submit', function(e){
            e.preventDefault();
            // $('#newDep').click(function(){
            var dnam = $('#aDep').val();
            var locid = $('#addLocSelect').val();

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

                    resetDepts();
                    resetLocs('dep');
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
        });
    });

    // to edit a record from the dept list table, on edit button click:
    $('#eDepModal').on('show.bs.modal', function(e) {
        // $("#deptTbl").on('click', '.editBtn', function() {
        var depID = $(e.relatedTarget).attr('data-id');
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
                var locId = dat.locationID;

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
                        $('#places').val(locId);
                        console.log(locId, $('#places').val(), $('#places').text());
                    },
                    error: function(jqXHR){
                        console.log(jqXHR, 'Something is wrong');
                    }
                });

                $('#eDepForm').on('submit', function(e){
                    e.preventDefault();
                    
                    var nmval = $('#depnm').val();
                    var locval = $('#places').val();

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

                            resetDepts();
                            resetLocs('dep');
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
    $("#deptList").on('click', '.delBtn', function() {  
        var eydee = $(this).attr('data-id');
        // console.log('id: ', eydee);

        var depNm = $(this).parents('div[class="row"]').text();
        depNm = depNm.trim(); 
        console.log(depNm, 'depNm');

        var delRow = $(this).parents('div[class="row"]');

        // find out if the record has any employee dependencies first: 
        
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
                    var delChk = 'ties';  // department not cleared, has dependencies

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
                    $('#line1').html('Employees exist under this department');
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
            
                                        $('#delDepSpan').html('Delete ' + depNm + ' ?');
                                        $('#delDepModalLabel').html('Delete Department');
                                
                                        $('#delDepModal').modal("show");
                                
                                        $('#delDepNo').click(function(){
                                            $(delRow).show();
                                            $('#delDepModal').modal("hide");
                                        });
                                
                                        $('#delDepYes').click(function(){
                                            $(delRow).remove();
                                            $.ajax({
                                                url:"libs/php/deleteDepartmentByID.php",
                                                type: "POST",
                                                dataType: 'json',
                                                data: {
                                                    id: eydee
                                                },
                                                success: function(response){  
                                
                                                    $('#ddfeedbk').html('Department successfully deleted.');    
                                                    
                                                    $('#delDepModal').on('hidden.bs.modal', function(){
                                                        $('#ddfeedbk').html('');
                                                    });

                                                    resetDepts();
                                                    resetLocs('dep');
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
                        stfReset();
                        resetLocs('main');
                    }); 

                } else {
                    delChk = 'okay'; // department cleared for deletion

                    $(delRow).hide();
        
                    $('#delDepSpan').html('Delete ' + depNm + ' ?');
                    $('#delDepModalLabel').html('Delete Department');

                    $('#delDepModal').modal("show");

                    $('#delDepNo').click(function(){
                        $(delRow).show();
                        $('#delDepModal').modal("hide");
                    });

                    $('#delDepYes').click(function(){
                        $(delRow).remove();
                        $.ajax({
                            url:"libs/php/deleteDepartmentByID.php",
                            type: "POST",
                            dataType: 'json',
                            data: {
                                id: eydee
                            },
                            success: function(response){  

                                $('#ddfeedbk').html('Department successfully deleted.');    
                                
                                $('#delDepModal').on('hidden.bs.modal', function(){
                                    $('#ddfeedbk').html('');
                                });

                                resetDepts();
                                resetLocs('dep');
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
        resetLocs('loc');
    });

    $('#resetLocList').click(function(){
        resetLocs('loc');
    });

    $('#viewStfBtn2').click(function(){
        $('#profile').hide();
        $('#deptPg').hide();
        $('#locPg').hide();
        $('#mainPg').show();
        resetLocs('main');
    });

    $('#deptBtn').click(function(){
        $('#profile').hide();
        $('#locPg').hide();
        $('#mainPg').hide();
        $('#deptPg').show()
        resetDepts();
        resetLocs('dep');
    });

    // adding a location:
    $('#aLocModal').on('show.bs.modal', function(e) {
        // $('#addLoc').click(function(){                
        // $('#aLocModal').modal('show');

        $('#addLocForm').on("submit", function(e) {
         
            // stop the default browser behviour                
            e.preventDefault();
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

                    resetLocs('loc');
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });
        });
    });

    // to edit a record from the location list table, on edit button click:
    $('#eLocModal').on('show.bs.modal', function(e) {
        var locID = $(e.relatedTarget).attr('data-id');
        console.log('Locations: ', locID);

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

                // $('#eLocModal').modal('show');

                $('#eLocForm').on("submit", function(e) {
                    e.preventDefault();
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

                            resetLocs('loc');
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
    $("#locList").on('click', '.delBtn', function() { 
        // $('#delLocModal').on('show.bs.modal', function(e) {
        var locID = $(this).attr('data-id');
        console.log('id: ', locID);

        var locTxt = $(this).parents('div[class="row"]').text();
        locTxt = locTxt.trim();

        var delLoc = $(this).parents('div[class="row"]');

        // find out if the record has any department dependencies first:
        var chkLoc;
        $.ajax({
            url:"libs/php/getDepartmentsByLoc.php",
            type: "POST",
            dataType: 'json',
            data: {
                locationID: locID
            },
            success: function(response){                                    
               var dat = response.data;
               console.log(dat);

               if (dat.length > 0){
                    chkLoc = 'ties';
                    console.log(chkLoc, 'chkLoc');
                    
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
                    $('#setNew').text('Set new location');
                    $('#setNew').hide();
                    $('#line1').html('Departments exist under this location');
                    $('#line2').html('<strong>Move</strong> to new location &ensp;<b>OR</b>&ensp; <strong>Go Back</strong> to edit new locations separately');
                    $('#hasDependModal').modal('show');

                    $('#moveBtn').click(function(){
                        $('#newOtherSelect').show();
                        $('#setNew').show();

                        $('#setNew').click(function(){
                            var newLocID = $('#newOtherSelect').val();
                            // update the affected location ids with the new one:
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

                                        $('#delLocSpan').html('Delete ' + locTxt + ' ?');
                                        $('#delLocModalLabel').html('Delete Location');
                                
                                        $('#delLocModal').modal("show");
                                
                                        $('#delLocNo').click(function(){
                                            $(delLoc).show();
                                            $('#delLocModal').modal("hide");
                                        });
                                
                                        $('#delLocYes').click(function(){
                                            $(delLoc).remove();
                                
                                            $.ajax({
                                                url:"libs/php/deleteLocation.php",
                                                type: "POST",
                                                dataType: 'json',
                                                data: {
                                                    id: locID
                                                },
                                                success: function(response){                                    
                                                    $('#dlfeedbk').html('Location successfully deleted.');  
                                                    
                                                    $('#delLocModal').on('hidden.bs.modal', function(){
                                                        $('#dlfeedbk').html('');
                                                    });

                                                    resetLocs('loc');
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
                        resetLocs('dep');
                    });                

               } else {
                    chkLoc = 'okay';

                    $(delLoc).hide();

                    $('#delLocSpan').html('Delete ' + locTxt + ' ?');
                    $('#delLocModalLabel').html('Delete Location');
            
                    $('#delLocModal').modal("show");
            
                    $('#delLocNo').click(function(){
                        $(delLoc).show();
                        $('#delLocModal').modal("hide");
                    });
            
                    $('#delLocYes').click(function(){
                        $(delLoc).remove();
            
                        $.ajax({
                            url:"libs/php/deleteLocation.php",
                            type: "POST",
                            dataType: 'json',
                            data: {
                                id: locID
                            },
                            success: function(response){                                    
                                $('#dlfeedbk').html('Location successfully deleted.');  
                                
                                $('#delLocModal').on('hidden.bs.modal', function(){
                                    $('#dlfeedbk').html('');
                                });

                                resetLocs('loc');
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
        // ************************************************** end dependency check *****************************
    });     
});