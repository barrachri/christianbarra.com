// Random quote

$(document).ready(function()
{

// Random number
var min = Math.ceil(1)
var max = Math.floor(3)
var page = Math.floor(Math.random() * (max - min + 1) + min);

if (page == 1) {
	var min = Math.ceil(1)
	var max = Math.floor(155)
	var quote = Math.floor(Math.random() * (max - min + 1) + min);
} else if (page == 2) {
	var min = Math.ceil(156)
	var max = Math.floor(312)
	var quote = Math.floor(Math.random() * (max - min + 1) + min);
} else {
	var min = Math.ceil(312)
	var max = Math.floor(468)
	var quote = Math.floor(Math.random() * (max - min + 1) + min);
}

$.getJSON("/quote_" + page  + ".json", function(json) {
    console.log(json); // this will show the info it in firebug console
$( ".quote_author" ).append(json[quote].author);
$( ".quote_body" ).append(json[quote].body);
}).fail(function(jqXHR, textStatus){

$( ".quote_author" ).append("HAL 9000");
$( ".quote_body" ).append("Some errors (this is not a quote)"); });

});