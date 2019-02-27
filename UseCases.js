// example using jQueryGreet()
var greeting1 = function () {

    //grab name values from inputs
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    //Greetr takes first and last name as arguments
    let name = G$(firstname, lastname);

    //determine the language
    const lang = $('#lang').val();

    /* chaining the language, jQueryGreet and log functions to set the language,
    call the greeting and log which language is being used + the fullname inputted */
    name.setLang(lang).jQueryGreet('#greeting', true).log();
    console.log(name);

}


//example using vanillaGreet() 
var greeting2 = function () {
    
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    let name = G$(firstname, lastname);

    const lang = document.getElementById('lang').value;

    //leave out the second argument in vanillaGreet() to output an informal greeting
    name.setLang(lang).vanillaGreet('#greeting').log();

}

$('#login').click(greeting1);

