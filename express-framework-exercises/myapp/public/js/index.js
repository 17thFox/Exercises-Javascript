$Container = $('#container');
$Movies = $('.movie_details');
$Movies.hide();

function debounce(func, wait, immediate) {

    var timeout;

    return function() {

        var context = this,
            args = arguments;

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(function() {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);

        if (callNow) func.apply(context, args);
    };
};



$('#searchInput').on('keyup', debounce(function(event) {
    event.preventDefault();
    var mySearchInput = $('#searchInput').val();
    
	// Grab the template script - HANDLEBARS
	var theTemplateScript = $('#my_template').html();

	// Compile the template - HANDLEBARS
	var theTemplate = Handlebars.compile(theTemplateScript);

    if (mySearchInput.length >= 3) {
        $.ajax({
                method: "POST",
                url: "/search/movie/",
                data: {
                    movie: mySearchInput
                },
            })
            .done(function(data) {
            	// This is the default context, which is passed to the template - HANDLEBARS
				var context = data['Search'];
				myLength = context.length;
                $Movies.empty();
                $Container.find('.results').text('You recieved: ' + myLength + ' results.').css('color', 'black');

                for (var i = 0; i < myLength; i++) {
	                if(context[i].Poster == 'N/A'){
	                	context[i].Poster = '';
	                }
	            }

				// Pass our data to the template - HANDLEBARS
				var theCompiledHtml = theTemplate(data);

				// Add the compiled html to the page - HANDLEBARS
				$Movies.html(theCompiledHtml);

                $Movies.show();
            });

    } else {
        $Container.find('.results').text('You must enter at least 3 letters!').css('color', 'red');

    }
}, 400));




// Beginning for dropdown search!


// var changingInput = '';
// var $willChange = $("#searchInput");
// var currentIndex = 0;
// var ddopened = 0;
// var visIndex = 0;


// $("#searchInput").on('keyup', function (event){
// 	changingInput += $('#searchInput').val();
// 	for(var i = 0; i < myLength; i++){
// 		if(data[i].Title.includes(changingInput)){
// 			var li = document.createElement("li");
// 	  		li.appendChild(document.createTextNode(data[i].Title));

// 	  		continue;
// 		}
// 	}
// }