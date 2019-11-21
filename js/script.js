$(document).ready(function(){
    $('img').svgmagic();
    $('img').Lazy();
 
    //make page divs, then we'll call everything inside here!
    //using this proxy just for ease
    //https://cors-anywhere.herokuapp.com/

    //make main thing
    $('body').append('<h1 id="title">IST Department</h1><div id="main"></div>');

    //
    $('#main').append('<div id="right"></div>');
    $('#main').append('<div id="center"></div>');

    //about
    $('#right').append('<div id="about"><h1>About</h1></div>');

    getText("about");

    //resources
    $('#right').append('<div id="resources"><h1>Resources</h1></div>');
    //getText("https://cors-anywhere.herokuapp.com/http://www.ist.rit.edu/api/resources", displayResources);
    getText("resources");


    //degrees
    $('#center').append('<div id="degrees"><h1>Degrees</h1></div>');
    $('#degrees').append('<h2>Undergraduate</h2><div id="undergraduate"></div>');
    $('#degrees').append('<h2>Graduate</h2><div id="graduate"></div>');

    //getText("https://cors-anywhere.herokuapp.com/http://www.ist.rit.edu/api/degrees", displayMajors);
    getText("degrees");

    //minors
    $('#center').append('<h1>Minors</h1><div id="minors"></div>');

    //getText("https://cors-anywhere.herokuapp.com/http://www.ist.rit.edu/api/minors", displayMinors);
    getText("minors");

    //employment
    $('#center').append('<div id="employment"><h1>Employment</h1></div>');
    getText("employment");

    //map

    //faculty
    $('#center').append('<div id="people"><h1>People</h1></div>');
    $('#people').append('<div id="peoplecontainer"></div>')
    $('#peoplecontainer').append('<div id="faculty"><h2>Faculty</h2></div>');
    $('#peoplecontainer').append('<div id="staff"><h2>Staff</h2></div>');

    //getText("https://cors-anywhere.herokuapp.com/http://www.ist.rit.edu/api/people", displayFaculty);
    getText("people");

    //research

    //news
    //$('#left').append('<div id="news"><h1>News</h1></div>');
    //getText("https://cors-anywhere.herokuapp.com/http://www.ist.rit.edu/api/news", displayNews);

});

function getText(apiPath) {
    $.ajax({
        type: "get",
        url: 'https://serenity.ist.rit.edu/~plgics/proxy.php',
        data: { path: '/' + apiPath + '/' },
        cache: false,
        async: true,
        dataType: "json",	// jQuery AJAX will evaluate the response as JSON and returns a JavaScript object.
        // The “success” and “error” constructs are more commonly used in jQuery AJAX
        success: function (data) {
            //console.log(data);               
            switch (apiPath) {
                case "people":
                    displayFaculty(data);
                    break;
                case "minors":
                    displayMinors(data);
                    break;
                case "degrees":
                    displayMajors(data);
                    break;
                case "resources":
                    displayResources(data);
                    break;
                case "about":
                    displayAbout(data);
                    break;
                case "employment":
                    displayEmployment(data);
                    break;
                default:
                    console.log("hi");
                    break;
            }
        }
    });
}

function displayFaculty(response) {
    //console.log("faculty");
    //console.log(response);

    $(response.faculty).each(function (i) {
        $('#faculty').append(`<div class="human"><h3>${response.faculty[i].name}</h3><img src=${response.faculty[i].imagePath}><p>${response.faculty[i].title}</p><p>${response.faculty[i].email}</p><p>${response.faculty[i].office}</p></div>`);
    });
    $(response.staff).each(function (i) {
        $('#staff').append(`<div class="human"><h3>${response.staff[i].name}</h3><img src=${response.staff[i].imagePath}><p>${response.staff[i].title}</p><p>${response.staff[i].email}</p><p>${response.staff[i].office}</p></div>`);
    });
}

function displayMajors(response) {
    //console.log("majors");
    //console.log(response);

    $(response.undergraduate).each(function (i) {
        $('#undergraduate').append(`<h3>${response.undergraduate[i].title}</h3>`).append(`<div class="minor"<p>${response.undergraduate[i].description}</p></div>`);
    });
    $(response.graduate).each(function (i) {
        if (response.graduate[i].title) {
            $('#graduate').append(`<h3>${response.graduate[i].title}</h3>`).append(`<div class="minor"><p>${response.graduate[i].description}</p></div>`);
        }
    });

    $('#undergraduate').accordion();
    $('#graduate').accordion();
}

function displayAbout(response) {
    //console.log("about");
    //console.log(response);

    $('#about').append(`<h2>${response.title}</h2>`).append(`<p>${response.description}</p>`);
}

function displayMinors(response) {
    //console.log("minors");
    //console.log(response);

    $(response.UgMinors).each(function (i) {
        $('#minors').append(`<h3>${response.UgMinors[i].title}</h3>`).append(`<div class="minor"><p>${response.UgMinors[i].description}</p><p>${response.UgMinors[i].note}</p></div>`);
    });

    $('#minors').accordion();
}

function displayNews(response) {
    //console.log("news");
    ///console.log(response);
}

function displayResources(response) {
    //console.log("resources");
    //console.log(response);

    $('#resources').append(`<h2>${response.title}</h2>`).append(`<p>${response.subTitle}</p>`);

    $('#resources').append('<ul id="resourceList"></ul>');
    const responseArray = Object.keys(response).map(i => response[i]);
    //console.log(responseArray);

    $(responseArray).each(function (i) {
        if (responseArray[i].title)
            $('#resourceList').append(`<li>${responseArray[i].title}</li>`)
    })
}

function displayEmployment(response) {
    //console.log("employment");
    console.log(response);
    $('#employment').append(`<h2>${response.introduction.title}</h2>`);

    $(response.introduction.content).each(function(i){
        $('#employment').append(`<h2>${response.introduction.content[i].title}</h2>`).append(`<p>${response.introduction.content[i].description}</p>`)
    })

    $('#employment').append(`<iframe src="http://ist.rit.edu/api/map.php" scrolling="no"></iframe>`)

}
