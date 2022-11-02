$(window).on('load', function(){
    $('.preloader').hide();
});
 
/* -------------------------------------------------------------------------------------------- */
function clickNshow(radionm, cookienm){
    $('input[type="radio"]').click(function(){
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

                $('#home').hide();
                $('#depSrch').hide();
                $('#dsgSrch').hide();
                $('#nmSrch').hide();
                $('#locSrch').hide();
                $('#menu').hide();
                $('.admWelcome').hide();
                $('#adminPort').hide();                
                $('.depsNLocs').hide();
                $('.contactHR').hide();
                $('.mngDepLocs').hide();
                $('.mngStf').hide();
                $('.addStf').hide();
                $('.updtStf').hide();
                $('.delStf').hide();
                $('.addLoc').hide();
                $('.delLoc').hide();
                $('.addDep').hide();
                $('.updtDep').hide();
                $('.delDep').hide();
                $('#profile').show();
                var cookie = cookienm;

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
                
                $('#profileCls').click(function(){
                    $('#profile').hide();
                });
                                
                $('#profileBkBtn').click(function(){
                    if (cookie === 'depCookie'){
                        $('#home').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('#profile').hide();                        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('#depSrch').show();
                    }

                    if (cookie === 'dsgCookie'){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('#profile').hide();                        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('#dsgSrch').show();
                    }

                    if (cookie === 'snmCookie'){
                        $('#home').hide();
                        $('#dsgSrch').hide();
                        $('#depSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('#profile').hide();                        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('#nmSrch').show();
                    };

                    if (cookie === 'locCookie'){
                        $('#home').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#depSrch').hide();
                        $('#menu').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('#profile').hide();                        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('#locSrch').show();
                    };
                });                                        
            },
            error: function(jqXHR){
                console.log('Sorry, something is wrong.')
            }                                       
        });
    });
} // end clickNshow() 

$('#homeCls').click(function(){
    $('#home').hide();
});

$('#contactCls').click(function(){
    $('.contactHR').hide();
});

function goHome(){
    $('#depSrch').hide();
    $('#dsgSrch').hide();
    $('#nmSrch').hide();
    $('#locSrch').hide();
    $('#profile').hide();
    $('#menu').hide();
    $('.admWelcome').hide();
    $('#adminPort').hide();                    
    $('.depsNLocs').hide();
    $('.contactHR').hide();
    $('.mngDepLocs').hide();
    $('.mngStf').hide();
    $('.addStf').hide();
    $('.updtStf').hide();
    $('.delStf').hide();
    $('.addLoc').hide();
    $('.delLoc').hide();
    $('.addDep').hide();
    $('.updtDep').hide();
    $('.delDep').hide();
    $('#home').show();
} // end goHome()

function goMenu(){
    $('.depsNLocs').hide();
    $('#depSrch').hide();
    $('#dsgSrch').hide();
    $('#nmSrch').hide();
    $('#locSrch').hide();
    $('#profile').hide();
    $('.admWelcome').hide();
    $('#adminPort').hide();
    $('.contactHR').hide();
    $('.mngDepLocs').hide();
    $('.mngStf').hide();
    $('.addStf').hide();
    $('.updtStf').hide();
    $('.delStf').hide();
    $('.addLoc').hide();
    $('.delLoc').hide();
    $('.addDep').hide();
    $('.updtDep').hide();
    $('.delDep').hide();
    $('#home').hide();                
    $('#menu').show();
} // end goMenu()

function goAdmWelkom(){
    $('#home').hide();
    $('#depSrch').hide();
    $('#dsgSrch').hide();
    $('#nmSrch').hide();
    $('#locSrch').hide();
    $('#adminPort').hide();
    $('#menu').hide();        
    $('.depsNLocs').hide();
    $('.contactHR').hide();
    $('.mngDepLocs').hide();
    $('.mngStf').hide();
    $('.addStf').hide();
    $('.updtStf').hide();
    $('.delStf').hide();
    $('.addLoc').hide();
    $('.delLoc').hide();
    $('.addDep').hide();
    $('.updtDep').hide();
    $('.delDep').hide();
    $('.admWelcome').show();
}   // end goAdmWelkom()

function goMngStff(){
    $('#home').hide();
    $('#depSrch').hide();
    $('#dsgSrch').hide();
    $('#nmSrch').hide();
    $('#locSrch').hide();
    $('#menu').hide();        
    $('.depsNLocs').hide();
    $('.contactHR').hide();
    $('.mngDepLocs').hide();
    $('.addStf').hide();
    $('.updtStf').hide();
    $('.delStf').hide();
    $('.addLoc').hide();
    $('.delLoc').hide();
    $('.addDep').hide();
    $('.updtDep').hide();
    $('.delDep').hide();
    $('.admWelcome').hide();
    $('#adminPort').hide();
    $('.mngStf').show();
}   // end goMngStff()

function goMngLoc(){
    $('#home').hide();
    $('#depSrch').hide();
    $('#dsgSrch').hide();
    $('#nmSrch').hide();
    $('#locSrch').hide();
    $('#menu').hide();        
    $('.depsNLocs').hide();
    $('.contactHR').hide();
    $('.addStf').hide();
    $('.updtStf').hide();
    $('.delStf').hide();
    $('.addLoc').hide();
    $('.delLoc').hide();
    $('.addDep').hide();
    $('.updtDep').hide();
    $('.delDep').hide();
    $('.admWelcome').hide();
    $('#adminPort').hide();
    $('.mngStf').hide();
    $('.mngDepLocs').show();    
}   // end goMngLoc()

$(document).ready(function(){   
    goHome();

    $('#byDep').click(function(){
        $('#home').hide();
        $('#dsgSrch').hide();
        $('#nmSrch').hide();
        $('#locSrch').hide();
        $('#menu').hide();
        $('.admWelcome').hide();
        $('#adminPort').hide();
        $('#profile').hide();        
        $('.depsNLocs').hide();
        $('.contactHR').hide();
        $('.mngDepLocs').hide();
        $('.mngStf').hide();
        $('.addStf').hide();
        $('.updtStf').hide();
        $('.delStf').hide();
        $('.addLoc').hide();
        $('.delLoc').hide();
        $('.addDep').hide();
        $('.updtDep').hide();
        $('.delDep').hide();
        $('#depSrch').show();

        var prelist, listContent;

        // ---------------------- Fill in dropdown values: ----------------
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            

                // clear current dropdown contents:
                if (dat.length > 0) {
                    $('#depSelect').html('');                
                }

                var choices = "";
                for (var i = 0; i < dat.length; i++){
                    choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#depSelect').html(choices);

                $('#depBkBtn').click(function(){
                    prelist = "";
                    listContent = "";
                    // $('input[type="radio"]:checked').prop("checked", false);
                    goHome();
                });

                // add in initial list of staff by dept ***
                console.log(dat);
                const depDik = {};
                for (i = 0; i < dat.length; i++){
                    depDik[i + 1] = dat[i].name;
                }

                console.log(depDik);

                $.ajax({
                    url:"libs/php/getAllPersonnelByDep.php",
                    type: "POST",
                    dataType: 'json',
                    success: function(response){
                        var preDat = response.data;

                        prelist = "";
                        var currDep, currDid;
                        var i = 0;
                        while (i < 20){
                            currDep = depDik[preDat[i].departmentID];
                            currDid = preDat[i].departmentID;
                            
                            console.log(currDep, preDat[i].departmentID, depDik[preDat[i].departmentID]);

                            prelist = prelist + "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>&emsp;" + currDep + " Department&emsp;&emsp;&emsp;&emsp;<span class='listHdrDepID'>Department ID:&nbsp;" + currDid + "&emsp;</span></h5></td></tr>";

                            while (depDik[preDat[i].departmentID] === currDep){
                                prelist = prelist + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='preDepRadio' id='preDepRadio' value=" + preDat[i].id + "><label class='form-check-label' for='preDepRadio'>" + "&ensp;" + preDat[i].id + "&emsp;" + preDat[i].firstName + "&ensp;" + preDat[i].lastName + "</label></td></tr>";                                                       
                                i++;
                                if (i === preDat.length){
                                    break;
                                }                                 
                            };

                            console.log(currDep, i, preDat[i].departmentID, depDik[preDat[i].departmentID]);
                        };

                        $('#depStfList').html(prelist);
                        clickNshow('preDepRadio', 'depCookie');    

                        $('#depSelect').change(function(){
                            var depID = $('#depSelect').val();
                            var depTxt = $('select option:selected').text();
                                    
                            $.ajax({
                                url:"libs/php/getPersonnelByDep.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    departmentID: depID                
                                },
                                success: function(response){
                                    var dat = response.data;                                     
                                    
                                    listContent = "<tr><td><h5 class='tblTitl'>Staff Name(s)</h5></td></tr><tr><td><h5 class='listHdr'>&emsp;" + depTxt + " Department&emsp;&emsp;&emsp;&emsp;<span class='listHdrDepID'>Department ID:&nbsp;" + depID + "&emsp;</span></h5></td></tr>";
        
                                    for (let i = 0; i < dat.length; i++){
                                        listContent = listContent + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='byDepRadio' id='byDepRadio' value=" + dat[i].id + "><label class='form-check-label' for='byDepRadio'>" + "&ensp;" + dat[i].id + "&emsp;" + dat[i].firstName + "&ensp;" + dat[i].lastName + "</label></td></tr>";    
                                    }
                                                                                                            
                                    $('#depStfList').html(listContent); 
                                    clickNshow('byDepRadio', 'depCookie');     
                                    
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });            
                                                
                        });       
                    },
                    error: function(jqXHR){
                        console.log('Sorry, something is wrong.')
                    }
                });                  
                
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');           
            }
        });
    });

    // ************************************************************

    $('#byDsg').click(function(){
        $('#home').hide();
        $('#depSrch').hide();
        $('#locSrch').hide();
        $('#nmSrch').hide();
        $('#profile').hide();
        $('#menu').hide();
        $('.admWelcome').hide();
        $('#adminPort').hide();        
        $('.depsNLocs').hide();
        $('.contactHR').hide();
        $('.mngDepLocs').hide();
        $('.mngStf').hide();
        $('.addStf').hide();
        $('.updtStf').hide();
        $('.delStf').hide();
        $('.addLoc').hide();
        $('.delLoc').hide();
        $('.addDep').hide();
        $('.updtDep').hide();
        $('.delDep').hide();
        $('#dsgSrch').show();

        var initList, initContent;

        // ---------------------- Fill in dropdown values: ---------------
        $.ajax({
            url: "libs/php/getAllTitles.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dsgDat = response.data;   
                var designations = [];

                for (i =0; i < dsgDat.length; i++){
                    if (designations.includes(dsgDat[i].jobTitle)){
                        continue;
                    }
                    designations.push(dsgDat[i].jobTitle);
                }
                
                // clear current dropdown contents:
                if (designations.length > 0) {
                    $('#dsgSelect').html('');             
                }
                
                var choices = "";
                for (var i = 0; i < designations.length; i++){
                    choices = choices + '<option value = "' + designations[i] + '">' + designations[i] + '</option>';
                }
                
                $('#dsgSelect').html(choices);

                $('#dsgBkBtn').click(function(){
                    initList = "";
                    initContent = "";
                    // $('input[type="radio"]:checked').prop("checked", false);
                    goHome();
                });

                // add in initial list of staff by designation ***

                initList = "";
                var currDsg;
                var i = 0;
                while (i < 20){
                    currDsg = dsgDat[i].jobTitle;

                    initList = initList + "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + currDsg + " Listing</h5></td></tr>";

                    while (dsgDat[i].jobTitle === currDsg){
                        initList = initList + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='preDsgRadio' id='preDsgRadio' value=" + dsgDat[i].id + "><label class='form-check-label' for='preDsgpRadio'>" + "&ensp;" + dsgDat[i].id + "&emsp;" + dsgDat[i].firstName + "&ensp;" + dsgDat[i].lastName + "</label></td></tr>";                                                       
                        i++;
                        if (i === dsgDat.length){
                            break;
                        }                                
                    };

                };

                $('#dsgStfList').html(initList);            
                clickNshow('preDsgRadio','dsgCookie');   
                // console.log( $('input[name="preDsgRadio"]').attr('type'), ' jobTitles3');

                $('#dsgSelect').change(function(){
                    var dsg = $('#dsgSelect').val();
                            
                    $.ajax({
                        url:"libs/php/getPersonnelByDsg.php",
                        type: "POST",
                        dataType: 'json',
                        data: {
                            jobTitle: dsg                
                        },
                        success: function(response){
                            var dat = response.data;                                     
                            
                            initContent = "<tr><td><h5 class='tblTitl'>Staff Name(s)</h5></td></tr><tr><td><h5 class='listHdr'>" + dsg + " Listing</h5></td></tr>";

                            for (let i = 0; i < dat.length; i++){
                                initContent = initContent + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='byDsgRadio' id='byDsgRadio' value=" + dat[i].id + "><label class='form-check-label' for='byDsgRadio'>" + "&ensp;" + dat[i].id + "&emsp;" + dat[i].firstName + "&ensp;" + dat[i].lastName + "</label></td></tr>";    
                            }   
                            
                            $('#dsgStfList').html(initContent); 
                            console.log( $('input:radio[name="byDsgRadio"]').attr('type'), ' jobTitles2b');
                            clickNshow('byDsgRadio','dsgCookie');  
                            console.log( $('input:radio[name="byDsgRadio"]').attr('type'), ' jobTitles3b');
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

    // ************************************************************

    $('#bySnm').click(function(){
        $('#home').hide();
        $('#depSrch').hide();
        $('#dsgSrch').hide();
        $('#locSrch').hide();
        $('#profile').hide();
        $('#menu').hide();
        $('.admWelcome').hide();
        $('#adminPort').hide();        
        $('.depsNLocs').hide();
        $('.contactHR').hide();
        $('.mngDepLocs').hide();
        $('.mngStf').hide();
        $('.addStf').hide();
        $('.updtStf').hide();
        $('.delStf').hide();
        $('.addLoc').hide();
        $('.delLoc').hide();
        $('.addDep').hide();
        $('.updtDep').hide();
        $('.delDep').hide();
        $('#nmSrch').show();

        var pglist, nmMatches;
        
        $('#snmBkBtn').click(function(){
            pglist = "";
            nmMatches = "";
            $('#srchBx').val('');
            // $('input[type="radio"]:checked').prop("checked", false);
            goHome();
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
                while (i < 20){
                    surnameInitial = names[i].lastName.slice(0,1);
                    
                    currLett = surnameInitial.toUpperCase();
                    console.log(currLett, surnameInitial, names[i].lastName); 

                    pglist = pglist + "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + currLett + "</h5></td></tr>";

                    while (names[i].lastName.slice(0,1) === currLett){
                        pglist = pglist + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='pglistRadio' id='pglistRadio' value=" + names[i].id + "><label class='form-check-label' for='pglistRadio'>" + "&ensp;" + names[i].id + "&emsp;" + names[i].firstName + "&ensp;" + names[i].lastName + "</label></td></tr>";                                                       
                        i++;    
                        if (i === names.length){
                            break;
                        };                            
                    };

                    console.log(currLett, i, names[i].lastName, ' alpha');
                };

                $('#snmStfList').html(pglist);               
                clickNshow('pglistRadio', 'snmCookie');   

                nmMatches = "";
                $('#srchBtn').click(function(){
                    var srchTxt = $('#srchBx').val();                    
                    srchTxt = srchTxt.trim().toUpperCase();
                    var srchLen = srchTxt.length;

                    if (srchLen !== 0){
                        for (i = 0; i < names.length; i++){
                            var lnm = names[i].lastName.toUpperCase();
                            if (lnm.slice(0,srchLen) === srchTxt){
                                nmMatches = nmMatches + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='snmListRadio' id='snmlistRadio' value=" + names[i].id + "><label class='form-check-label' for='snmListRadio'>" + "&ensp;" + names[i].id + "&emsp;" + names[i].firstName + "&ensp;" + names[i].lastName + "</label></td></tr>";
                            };
                        }

                        if (nmMatches.length === 0){
                            $('#snmStfList').html('');
                            $('#snmStfList').html('Sorry, no such record found.');
                        } else {
                            $('#snmStfList').html('');
                            $('#snmStfList').html(nmMatches);
                            clickNshow('snmListRadio', 'snmCookie');
                        };                        
                    };                    
                });           
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong'); 
            }
        });
    });

    // ************************************************************

    $('#byLoc').click(function(){
        $('#home').hide();
        $('#depSrch').hide();
        $('#dsgSrch').hide();
        $('#nmSrch').hide();
        $('#adminPort').hide();
        $('.admWelcome').hide();
        $('#menu').hide();        
        $('.depsNLocs').hide();
        $('.contactHR').hide();
        $('.mngDepLocs').hide();
        $('.mngStf').hide();
        $('.addStf').hide();
        $('.updtStf').hide();
        $('.delStf').hide();
        $('.addLoc').hide();
        $('.delLoc').hide();
        $('.addDep').hide();
        $('.updtDep').hide();
        $('.delDep').hide();
        $('#locSrch').show();  
        
        var baseList, chosenContent;

        $('#locBkBtn').click(function(){
            baselist = "";
            chosenContent = "";
            // $('input[type="radio"]:checked').prop("checked", false);
            goHome();
        });

        // ---------------------- Fill in dropdown values: ----------------Ammend for byLoc
        $.ajax({
            url: "libs/php/getLocations.php",
            type: "GET",
            dataType: 'json',    
            success: function(response){
                var dat = response.data;            

                // clear current dropdown contents:
                if (dat.length > 0) {
                    $('#locSelect').html('');                
                }

                var choices = "";
                for (var i = 0; i < dat.length; i++){
                    choices = choices + '<option value = "' + dat[i].id + '">' + dat[i].name + '</option>';
                }
                
                $('#locSelect').html(choices);

                // add in initial list of staff by locations ***

                $.ajax({
                    url:"libs/php/getAllPersonnelByLoc.php",
                    type: "POST",
                    dataType: 'json',
                    success: function(response){
                        var dat = response.data;

                        baseList = "";
                        var currLoc;
                        var i = 0;
                        while (i < 20){
                            currLoc = dat[i].location;
                            console.log(currLoc, dat[i].location);

                            baseList = baseList + "<tr><td class='text-left font-weight-bold'><h5 class='listHdr'>" + currLoc + "</h5></td></tr>";

                            while (dat[i].location === currLoc){
                                baseList = baseList + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='preLocRadio' id='preLocRadio' value=" + dat[i].id + "><label class='form-check-label' for='preLocRadio'>" + "&ensp;" + dat[i].id + "&emsp;" + dat[i].firstName + "&ensp;" + dat[i].lastName + "</label></td></tr>";                                                       
                                i++;
                                if (i === dat.length){
                                    break;
                                }                                 
                            };
                            // if (i === dat.length){
                            //     break;
                            // } 
                            console.log(currLoc, i, dat[i].location);
                        };

                        $('#locStfList').html(baseList);
                        clickNshow('preLocRadio', 'locCookie');    

                        $('#locSelect').change(function(){
                            var locID = $('#locSelect').val();
                            var locTxt = $('select option:selected').text();
                                    
                            $.ajax({
                                url:"libs/php/getPersonnelByLoc.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    locationID: locID                
                                },
                                success: function(response){
                                var locDat = response.data;   
                                console.log(locDat);    
                                
                                if (locDat.length === 0){
                                    $('#locStfList').html('');
                                    $('#locStfList').html('Sorry, no such record found.');
                                } else {                                
                                    chosenContent = "<tr><td><h5 class='tblTitl'>Staff Name(s)</h5></td></tr><tr><td><h5 class='listHdr'>" + locTxt + "</h5></td></tr>";
                                    for (let i = 0; i < locDat.length; i++){
                                        chosenContent = chosenContent + "<tr><td class='form-check pl-3'>&emsp;<input class='form-check-input tblRadio' type='radio' name='byLocRadio' id='byLocRadio' value=" + locDat[i].id + "><label class='form-check-label' for='byLocRadio'>" + "&ensp;" + locDat[i].id + "&emsp;" + locDat[i].firstName + "&ensp;" + locDat[i].lastName + "</label></td></tr>";
                                    }      

                                    $('#locStfList').html('');
                                    $('#locStfList').html(chosenContent); 
                                    clickNshow('byLocRadio', 'locCookie');  

                                };                                       
                                                                   
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });            
                                                
                        });       
                    },
                    error: function(jqXHR){
                        console.log('Sorry, something is wrong.')
                    }
                });                  
                
            },
            error: function(jqXHR){
                console.log(jqXHR, 'Something is wrong');           
            }
        });

    });

    // ************************************************************

    $('#menuBtn').click(function(){  
        goMenu();

        $('#goHome').click(function(){
            goHome();
        });

        $('#goDepLoc').click(function(){
            $('#depSrch').hide();
            $('#dsgSrch').hide();
            $('#nmSrch').hide();
            $('#locSrch').hide();
            $('#profile').hide();
            $('#menu').hide();
            $('.admWelcome').hide();
            $('#adminPort').hide();
            $('.contactHR').hide();
            $('.mngDepLocs').hide();
            $('.mngStf').hide();
            $('.addStf').hide();
            $('.updtStf').hide();
            $('.delStf').hide();
            $('.addLoc').hide();
            $('.delLoc').hide();
            $('.addDep').hide();
            $('.updtDep').hide();
            $('.delDep').hide();
            $('#home').hide();
            $('.depsNLocs').show();

            var tblList;

            $('#depLocBkBtn').click(function(){
                tblList = "";
                goMenu();
            });

            $.ajax({
                url:"libs/php/getDepsNLocs.php",
                type: "POST",
                dataType: 'json',
                success: function(response){
                    var dat = response.data;                                     
                                      
                    tblList = "";
                    var currLoc;
                    var i = 0;
                    while (i < dat.length){
                        currLoc = dat[i].location;
                        
                        console.log(currLoc, dat[i].location, ' location');

                        tblList = tblList + "<tr><td><h5 class='listHdr'>" + currLoc + "</td></tr>";

                        while (dat[i].location === currLoc){
                            tblList = tblList + "<tr><td>" + dat[i].department + "</td></tr>";                                                       
                            i++; 
                            if (i === dat.length){
                                break;
                            }                               
                        };

                        console.log(currLoc, i);
                    };

                    console.log(tblList);

                    $('#depLocList').html(tblList);
                },
                error: function(jqXHR){
                    console.log(jqXHR, 'Something is wrong');
                }
            });          
        });

        $('#goAdminP').click(function(){
            $('#depSrch').hide();
            $('#dsgSrch').hide();
            $('#nmSrch').hide();
            $('#locSrch').hide();
            $('#profile').hide();
            $('#menu').hide();
            $('.admWelcome').hide();
            $('.contactHR').hide();
            $('.mngDepLocs').hide();
            $('.mngStf').hide();
            $('.addStf').hide();
            $('.updtStf').hide();
            $('.addLoc').hide();
            $('.delLoc').hide();
            $('.addDep').hide();
            $('.updtDep').hide();
            $('.delDep').hide();
            $('#home').hide();
            $('.depsNLocs').hide();
            $('#adminPort').show();
                        
            $('#portalBkBtn').click(function(){
                goMenu();
            });

            document.getElementById('loginBtn').disabled = true;
            $('#unm').on('change', function(){
                if ($('#unm').val() !== ""){
                    document.getElementById('loginBtn').disabled = false;
                } 
            });
          
            $('#loginBtn').click(function(){      
                goAdmWelkom();                  

                var username = $('#unm').val();
                $('#welcomeHdr').html('Welcome&emsp;' + username);

                $('#welcomeBkBtn').click(function(){
                    $('#home').hide();
                    $('#depSrch').hide();
                    $('#dsgSrch').hide();
                    $('#nmSrch').hide();
                    $('#locSrch').hide();
                    $('#menu').hide();        
                    $('.depsNLocs').hide();
                    $('.contactHR').hide();
                    $('.mngDepLocs').hide();
                    $('.mngStf').hide();
                    $('.addStf').hide();
                    $('.updtStf').hide();
                    $('.delStf').hide();
                    $('.addLoc').hide();
                    $('.delLoc').hide();
                    $('.addDep').hide();
                    $('.updtDep').hide();
                    $('.delDep').hide();
                    $('.admWelcome').hide();
                    $('#adminPort').show();
                    $('#unm').val('');
                });

                $('#logoutBtn').click(function(){
                    $('.admWelcome').hide();
                    $('#adminPort').show();
                    $('#unm').val('');
                })

                $('.menuLnk').click(function(){
                    goMenu();
                });

                $('#mStf').click(function(){
                    $('#home').hide();
                    $('#depSrch').hide();
                    $('#dsgSrch').hide();
                    $('#nmSrch').hide();
                    $('#locSrch').hide();
                    $('#menu').hide();        
                    $('.depsNLocs').hide();
                    $('.contactHR').hide();
                    $('.mngDepLocs').hide();
                    $('.addStf').hide();
                    $('.updtStf').hide();
                    $('.delStf').hide();
                    $('.addLoc').hide();
                    $('.delLoc').hide();
                    $('.addDep').hide();
                    $('.updtDep').hide();
                    $('.delDep').hide();
                    $('.admWelcome').hide();
                    $('#adminPort').hide();
                    $('.mngStf').show();

                    $('#mstfBkBtn').click(function(){
                        $('#unm').val('');
                        $('#welcomeHdr').html('');
                        goAdmWelkom();
                    });

                    $('#mstfAdd').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngStf').hide();
                        $('.addStf').show();

                        $('#addStfBkBtn').click(function(){
                            // reset form:
                            $('#fnm').val('');
                            $('#lnm').val('');
                            $('#dsgnm').val('');
                            $('#eml').val('');
                            $('#dip').val('');
                            $('#asfeedbk').html('');
                            goMngStff();
                        });

                        $('#adstf').click(function(){
                            var fnam = $('#fnm').val();
                            var lnam = $('#lnm').val();
                            var desg = $('#dsgnm').val();
                            var mail = $('#eml').val();
                            var dID = $('#dip').val();

                            $.ajax({
                                url:"libs/php/addStaff.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    firstName: fnam,
                                    lastName: lnam,
                                    jobTitle: desg,
                                    email: mail,
                                    departmentID: dID
                                },
                                success: function(response){
                                    $('#asfeedbk').html('New record successfully added.');
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });
                    });

                    $('#mstfUpd').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.addStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngStf').hide();
                        $('.updtStf').show();

                        $('#updStfBkBtn').click(function(){
                            // reset form:
                            $('#updID').val('');
                            $('#ufnm').val('');
                            $('#ulnm').val('');
                            $('#udsgnm').val('');
                            $('#ueml').val('');
                            $('#udip').val('');
                            $('#usfeedbk').html('');
                            goMngStff();
                        });

                        $('#updIDBtn').click(function(){
                            var idee = $('#updID').val();
                            console.log(idee);

                            $.ajax({
                                url:"libs/php/getPersonnelByID.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    id: idee
                                },
                                success: function(response){         
                                    var dat = response.data.personnel[0];
                                    $('#ufnm').val(dat.firstName);
                                    $('#ulnm').val(dat.lastName);
                                    $('#udsgnm').val(dat.jobTitle);
                                    $('#ueml').val(dat.email);
                                    $('#udip').val(dat.departmentID);

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
                                                id: idee
                                            },
                                            success: function(response){
                                                $('#usfeedbk').html('Record successfully updated.');

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
                    });

                    $('#mstfDel').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngDepLocs').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.addDep').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngStf').hide();
                        $('.delStf').show();

                        $('#delStfBkBtn').click(function(){
                            // reset form:
                            $('#did').val('');
                            $('#dsfeedbk').html('');
                            goMngStff();
                        });

                        $('#delstf').click(function(){
                            var stID = $('#did').val();

                            $.ajax({
                                url:"libs/php/delPersonnel.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    id: stID
                                },
                                success: function(response){                                    
                                    $('#dsfeedbk').html('Record successfully deleted.');                                   
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });
                    });
                });

                $('#mLoc').click(function(){
                    $('#home').hide();
                    $('#depSrch').hide();
                    $('#dsgSrch').hide();
                    $('#nmSrch').hide();
                    $('#locSrch').hide();
                    $('#menu').hide();        
                    $('.depsNLocs').hide();
                    $('.contactHR').hide();
                    $('.mngStf').hide();
                    $('.addStf').hide();
                    $('.updtStf').hide();
                    $('.delStf').hide();
                    $('.addLoc').hide();
                    $('.delLoc').hide();
                    $('.addDep').hide();
                    $('.updtDep').hide();
                    $('.delDep').hide();
                    $('.admWelcome').hide();
                    $('#adminPort').hide();
                    $('.mngDepLocs').show();

                    $('#mlocBkBtn').click(function(){
                        $('#unm').val('');
                        $('#welcomeHdr').html('');
                        goAdmWelkom();
                    });

                    $('#mDepAdd').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngDepLocs').hide();
                        $('.addDep').show();
    
                        $('#addDepBkBtn').click(function(){
                            // reset form:
                            $('#dnm').val('');
                            $('#lid').val('');
                            $('#adfeedbk').html('');
                            goMngLoc();
                        });

                        $('#aDep').click(function(){
                            var dnam = $('#dnm').val();
                            var locid = $('#lid').val();

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
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });
                    });

                    $('#mDepUpd').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngDepLocs').hide();
                        $('.addDep').hide();
                        $('.updtStf').hide();
                        $('.updtDep').show();
    
                        $('#updtDepBkBtn').click(function(){
                            // reset form:
                            $('#uID').val('');
                            $('#depnm').val('');
                            $('#locId').val('');
                            $('#udfeedbk').html('');
                            goMngLoc();
                        });

                        $('#uIDBtn').click(function(){
                            var idee = $('#uID').val();

                            $.ajax({
                                url:"libs/php/getDepartmentByID.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    id: idee
                                },
                                success: function(response){         
                                    var dat = response.data[0];
                                    $('#depnm').val(dat.name);
                                    $('#locId').val(dat.locationID);

                                    $('#upDep').click(function(){
                                        var nmval = $('#depnm').val();
                                        var locval = $('#locId').val();

                                        $.ajax({
                                            url:"libs/php/updateDepartment.php",
                                            type: "POST",
                                            dataType: 'json',
                                            data: {
                                                name: nmval,
                                                locationID: locval,
                                                id: idee
                                            },
                                            success: function(response){

                                                $('#udfeedbk').html('Department successfully updated.');

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
                    });
    
                    $('#mDepDel').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.delLoc').hide();
                        $('.updtDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngDepLocs').hide();
                        $('.addDep').hide();
                        $('.delDep').show();
    
                        $('#delDepBkBtn').click(function(){
                            // reset form:
                            $('#delD').val('');
                            $('#ddfeedbk').html('');
                            goMngLoc();
                        });

                        $('#dDep').click(function(){
                            var dld = $('#delD').val();

                            $.ajax({
                                url:"libs/php/deleteDepartmentByID.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    id: dld
                                },
                                success: function(response){  

                                    $('#ddfeedbk').html('Department successfully deleted.');                                   
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });

                    });
    
                    $('#mLocAdd').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.delLoc').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngDepLocs').hide();
                        $('.addDep').hide();
                        $('.addLoc').show();
    
                        $('#addLocBkBtn').click(function(){
                            // reset form:
                            $('#locNm').val('');
                            $('#alfeedbk').html('');
                            goMngLoc();
                        });

                        $('#adLoc').click(function(){
                            var locNam = $('#locNm').val();

                            $.ajax({
                                url:"libs/php/addLocation.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    name: locNam
                                },
                                success: function(response){

                                    $('#alfeedbk').html('New location successfully created.');
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });
                    });
    
                    $('#mLocDel').click(function(){
                        $('#home').hide();
                        $('#depSrch').hide();
                        $('#dsgSrch').hide();
                        $('#nmSrch').hide();
                        $('#locSrch').hide();
                        $('#menu').hide();        
                        $('.depsNLocs').hide();
                        $('.contactHR').hide();
                        $('.mngStf').hide();
                        $('.addStf').hide();
                        $('.updtStf').hide();
                        $('.delStf').hide();
                        $('.addLoc').hide();
                        $('.updtDep').hide();
                        $('.delDep').hide();
                        $('.admWelcome').hide();
                        $('#adminPort').hide();
                        $('.mngDepLocs').hide();
                        $('.addDep').hide();
                        $('.delLoc').show();
    
                        $('#delLocBkBtn').click(function(){
                            // reset form:
                            $('#dil').val('');
                            $('#dlfeedbk').html('');
                            goMngLoc();
                        });

                        $('#dLoc').click(function(){
                            var lcID = $('#dil').val();

                            $.ajax({
                                url:"libs/php/deleteLocation.php",
                                type: "POST",
                                dataType: 'json',
                                data: {
                                    id: lcID
                                },
                                success: function(response){                                    
                                    $('#dlfeedbk').html('Location successfully deleted.');                                   
                                },
                                error: function(jqXHR){
                                    console.log(jqXHR, 'Something is wrong');
                                }
                            });

                        });
                    });
                });
            });
        });

        $('#goContact').click(function(){
            $('#depSrch').hide();
            $('#dsgSrch').hide();
            $('#nmSrch').hide();
            $('#locSrch').hide();
            $('#profile').hide();
            $('#menu').hide();
            $('.admWelcome').hide();
            $('.mngDepLocs').hide();
            $('.mngStf').hide();
            $('.addStf').hide();
            $('.updtStf').hide();
            $('.delStf').hide();
            $('.addLoc').hide();
            $('.delLoc').hide();
            $('.addDep').hide();
            $('.updtDep').hide();
            $('.delDep').hide();
            $('#home').hide();
            $('.depsNLocs').hide();
            $('#adminPort').hide();
            $('.contactHR').show();

            $('#contactBkBtn').click(function(){
                goMenu();
            });
        });
    });    
 
    $('.goHomeBtn').click(function(){
        goHome();
    });
});