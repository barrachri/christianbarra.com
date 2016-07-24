$(document).ready(function()
{

// Random number

var page = 2, // quote page 1,2,3
quote = 161;

$.getJSON("quote_" + page  + ".json", function(json) {
    console.log(json); // this will show the info it in firebug console
$( ".quote_author" ).append(json[quote].author);
$( ".quote_body" ).append(json[quote].body);
}).fail(function(jqXHR, textStatus){

$( ".quote_author" ).append("HAL 9000");
$( ".quote_body" ).append("Some errors (this is not a quote)"); });

});
