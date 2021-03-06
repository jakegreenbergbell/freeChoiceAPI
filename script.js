//Star Wars program that lets user input name and displays info
// -------------- by Jake Greenberg-Bell

//Placeholder values for different names, films, etc.
function placeholder(){
    $("#message").html("");
    var resource = $("#resource").val();
    var name = $("#name");
    switch(resource){
        case "films":
            $(name).attr("placeholder", "i.e. Return of the Jedi");
            break;
        case "planets":
            $(name).attr("placeholder", "i.e. Endor");
            break;
        case "people":
            $(name).attr("placeholder", "i.e. Jar Jar Binks");
            break;
        case "species":
            $(name).attr("placeholder", "i.e. Droid");
            break;
        case "starships":
            $(name).attr("placeholder", "i.e. Death Star");
            break;
        case "vehicles":
            $(name).attr("placeholder", "i.e. X-34 Landspeeder");
            break;
    }
}


$(document).ready(function(){
    //Gives title coolness
    $("h1").css("transition","2000ms").delay(300).addClass("slide");

    //Plays and pauses music
    $("#pauser").on("click", function(){
        var pauser = document.getElementById("pauser");
        var song = document.getElementById("song");
        if(pauser.innerHTML == "Pause Music") {
            song.pause();
            pauser.innerHTML = "Play Music";
        }else{
            song.play();
            pauser.innerHTML = "Pause Music";
        }
    });

    //Enlarges images when clicked
    $("#detailImage").on("click", function(){
        $("#mask").css("display", "block");
        var imgsrc = $("#detailImage").attr("src");
        $("#bigImage").attr("src", imgsrc);
        var width = $("#bigImage").width()/2;
        var screenW = $("body").width()/2;
        var W = screenW - width + "px";
        $("#bigImage").css("left", W);
        $("#bigImage").css("display", "block");

    });

    //When they click side of enlarged image it disappears
    $("#mask").on("click", function(){
       $("#mask").hide();
       $("#bigImage").hide();
    });

    //Gathers resource location from user and makes API call
    $("#button").on("click", function(){
    var resource = $("#resource").val();
    var name = $("#name").val();
    $.ajax({
        url: "https://swapi.co/api/" + resource + "/" + search(name, resource) + "/?format=json",
        //url: "https://swapi.co/api/vehicles/7/",
        type: 'GET',
        success: function (result) {
            console.log(result);
            switch (resource){
                case "films":
                    pushToArrayFILM(result);
                    break;
                case "planets":
                    pushToArrayPLANETS(result);
                    break;
                case "people":
                    pushToArrayPEOPLE(result);
                    break;
                case "species":
                    pushToArraySPECIES(result);
                    break;
                case "starships":
                    pushToArraySTARSHIPS(result);
                    break;
                case "vehicles":
                    pushToArrayVEHICLES(result);
                    break;
            }
        }
    });
});

    //When searched thing has attributes that must be searched again
function specialCall(arr, type, completion) {
    var name = "";
    for( var i = 0; i < arr.length; i++){
        runCall(arr[i], type, function (result) {
            name += (result + ", ");
            i--;
            if(i == 0){
                completion(name);
            }
        });
    }
}
    function runCall(url, type, completion) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (result) {
                var name = result[type];
                completion(name);
            }
        });

    }

    //pushes info into the Page
function pushToArrayFILM(result) {
    var masterArray = [{
        resource: $("#resource").val(),
        output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5"],
        labels: ["MOVIE INFO", "Episode: ", "Director: ", "Title: ", "Producer(s): ", "Characters: "],
        values: ["", result.episode_id, result.director, result.title, result.producer]
    }];
    specialCall(result.characters, "name", function (result) {
        masterArray[0].values.push(result);
            for (var i = 0; i < masterArray[0].output.length; i++) {
                $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
            }

    });
}

function pushToArrayPLANETS(result){
    var masterArray = [{
        resource: $("#resource").val(),
        output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5", "#info6", "#info7"],
        labels: ["PLANET INFO", "Name: ", "Climate: ", "Terrain: ", "Diameter: ", "Orbital Period: ", "Population: ", "Residents: "],
        values: ["", result.name, result.climate, result.terrain, result.diameter, result.orbital_period, result.resident]
    }];

    specialCall(result.residents, "name", function (result) {
        masterArray[0].values.push(result);
            for (var i = 0; i < masterArray[0].output.length; i++) {
                $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
            }
    });
}

function pushToArrayPEOPLE(result) {
    var masterArray = [{
        resource: $("#resource").val(),
        output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5", "#info6", "#info7"],
        labels: ["PERSON INFO", "Name: ", "Gender: ", "Height(cm): ", "Hair Color: ", "Skin Color: ", "Weight(kg): ", "Films: "],
        values: ["", result.name, result.gender, result.height, result.hair_color, result.skin_color, result.mass]
    }];

    specialCall(result.films, "title", function (result) {
        masterArray[0].values.push(result);
            for (var i = 0; i < masterArray[0].output.length; i++) {
                $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
            }
    });
}

function pushToArraySPECIES(result) {
    var masterArray = [{
        resource: $("#resource").val(),
        output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5", "#info6", "#info7"],
        labels: ["SPECIE INFO", "Name: ", "Language: ", "Classification: ", "Average Height: ", "Average Lifespan: ", "Hair Colors: ", "Films: "],
        values: ["", result.name, result.language, result.classification, result.average_heights, result.average_lifespan, result.hair_colors]
    }];

    specialCall(result.films, "title", function (result) {
        masterArray[0].values.push(result);
        for (var i = 0; i < masterArray[0].output.length; i++) {
            $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
        }
    });
}

function pushToArraySTARSHIPS(result) {
        var masterArray = [{
            resource: $("#resource").val(),
            output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5", "#info6", "#info7"],
            labels: ["STARSHIP INFO", "Name: ", "Model: ", "Passengers: ", "Manufacturer: ", "Crew: ", "Hyperdrive Rating: ", "Films: "],
            values: ["", result.name, result.model, result.passengers, result.manufacturer, result.crew, result.hyperdrive_rating]
        }];
    specialCall(result.films, "title", function (result) {
        masterArray[0].values.push(result);
        for (var i = 0; i < masterArray[0].output.length; i++) {
            $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
        }
    });
}

function pushToArrayVEHICLES(result) {
    var masterArray = [{
        resource: $("#resource").val(),
        output: ["#header1", "#info1", "#info2", "#info3", "#info4", "#info5", "#info6", "#info7"],
        labels: ["VEHICLE INFO", "Name: ", "Model: ", "Passengers: ", "Manufacturer: ", "Consumables: ", "Vehicle Class: ", "Films: "],
        values: ["", result.name, result.model, result.passengers, result.manufacturer, result.consumables, result.vehicle_class]
    }];

    specialCall(result.films, "title", function (result) {
        masterArray[0].values.push(result);
        for (var i = 0; i < masterArray[0].output.length; i++) {
            $(masterArray[0].output[i]).html(masterArray[0].labels[i] + masterArray[0].values[i]);
        }
    });
}

    //matches searched thing with place in API and shows image
function search(name,resource) {
    name = name.toLowerCase();
    var films = ["a new hope", "the empire strikes back", "return of the jedi", "the phantom menace", "attack of the clones",
        "revenge of the sith", "the force awakens"];
    var planets = ["tatooine", "alderaan", "yavin iv", "hoth", "dagobah", "bespin", "endor", "naboo", "coruscant", "kamino", +
        "geonosis", "utapau", "mustafar", "kashyyyk", "polis massa", "mygeeto", "felucia", "cato neimoidia", "saleucami", +
        "stewjon", "eriadu", "corellia", "rodia", "nal hutta", "dantooine", "bestine iv", "ord mantell", "undefined", +
        "trandosha", "socorro", "mon cala", "chandrila", "sullust", "toydaria", "malastare", "dothomir", "ryloth", +
        "aleen minor", "vulpter", "troiken", "tund"];
    var people = ["luke skywalker", "c-3p0", "r2-d2", "darth vader", "leia organa", "owen lars", "beru whitesun lars", "r5-d4", +
        "biggs darklighter", "obi-wan kenobi", "anakin skywalker", "wilhuff tarkin", "chewbacca", "han solo", "greedo", +
        "jabba desilijic tiure", "", "wedge antilles", "jek tono porkins", "yoda", "palpatine", "boba fett", "ig-88", +
        "bossk", "lando calrissian", "lobot", "ackbar", "mon mothma", "arvel crynyd", "wicket systri warrick", "nien nub", +
        "qui-gon jinn", "nute gunray", "finis valorum", "padme amidala", "jar jar binks", "roos tarpals", "rugor nass", +
        "ric olie", "watto", "sebulba", "quarsh panaka", "shmi skywalker", "darth maul", "bib fortuna", "ayla secura", +
        "ratts tyerell", "dud bolt", "gasgano", "ben quadinaros", "mace windu", "ki-adi-mundi", "kit fisto"];
    var species = ["human", "droid", "wookiee", "rodian", "hutt", "yoda's species", "trandoshan", "mon calamari", "ewok", "sullustan", +
        "neimodian", "gungan", "toydarian", "dug", "twi'lek"];
    var starships = ["", "cr90 corvette", "star destroyer", "", "sentinel-class landing craft", "", "", "", "death star", +
        "millennium falcon", "y-wing", "x-wing", "tie advanced x1", "", "executor", "", "rebel transport", "", +
        "", "", "slave1", "imperial shuttle", "ef76 nebulon-b escort frigate"];
    var vehicles = ["", "", "", "sand crawler", "", "t-16 skyhopper", "x-34 landspeeder", "tie/ln starfighter", "", "", "", +
        "", "", "snowspeeder"];


    var location = 0;
    switch (resource) {
        case "films":
            location = films.indexOf(name);
            break;
        case "planets":
            location = planets.indexOf(name);
            break;
        case "people":
            location = people.indexOf(name);
            break;
        case "species":
            location = species.indexOf(name);
            break;
        case "starships":
            location = starships.indexOf(name);
            break;
        case "vehicles":
            location = vehicles.indexOf(name);
            break;
    }

    location += 1;
    if (location == 0) {
        $("#message").html("Nothing matches your search");
        $(".empty").html("");

    } else {
        $("#message").html("");
        var changedName = name.replace(" ", "%20");
        $("#detailImage").attr("src", "img/" + changedName + ".jpg").fadeIn(8000);
        $("#imageMessage").fadeIn(4000);
        return location;
    }
}});
