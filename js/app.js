var myData;
var arrayActiveData = [];
var renderList = [];

setKeyEvents();
d3.csv("data/countriesOfTheWorld.csv", function(data) {

    myData = data;


});


function hoverReturn(information) {

    for (var i = 0; i < myData.length; i++) {
        var filteredData = myData[i].Country.substring(0, myData[i].Country.length-1);
        if (information.textContent === filteredData) {

        var currentState = myData[i];

        return currentState;
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setKeyEvents() {

    $('#search').keyup(function(){
        $('#searchPopulation').html('');

        var searchField = $('#search').val();
        var expression = new RegExp(capitalizeFirstLetter(searchField), "g");
        // console.log(countryList);
        retrieveQuery(countryList, expression);

        if(searchField === '') {
            $('#searchPopulation').html('');

        }

    });
}

function retrieveQuery(data, checkExp) {
    var myCurrentArray = [];
    $.each(data, function (key, value) {
        if (value.name.search(checkExp) !== -1) {
            myCurrentArray.push(value);

        }
    });
    populateDropDown(myCurrentArray);
}

function populateDropDown(pushedArray) {

    // console.log(pushedArray);

    for(var i = 0; i < pushedArray.length; i++) {
            $("#searchPopulation").append("<div class='queryResultsHolder' valueID='" + pushedArray[i].id+ "'><p>" + pushedArray[i].name +"</p> <div class='button'> <div style='margin-top: 3px' class='textCollapsed' active='active'>+</div></div></div>");

    }
    listMouseInteractions();
    };

function listMouseInteractions() {
    $(".queryResultsHolder").mouseover(function() {
        var idInf = this.getAttribute("valueid");
        var set = countries.features;


        for (var i = 0; i < set.length; i++) {

            if (countries.features[i].id === idInf) {
                // console.log(countries.features[i]);
                fill(countries.features[i], colorCountry);

            }
        }
    });

    $(".queryResultsHolder").mouseleave(function() {
        var clickedVal = this.childNodes[0].textContent;
        var idInf = this.getAttribute("valueid");
        // console.log(idInf);

        // var country = countryList.find(function(c) {
        //
        //     return c.id === countries.features.find(function(e) {
        //         return 1;
        //     })
        // });

        var set = countries.features;

        for (var i = 0; i < set.length; i++) {
            //
            if (countries.features[i].id === idInf) {
                fill(countries.features[i], colorLand);
            }
        }
    });

    $(".button").click(function() {
        renderList = [];
       var active = this.childNodes[1].getAttribute("active");
       var setTextVal = this.parentElement.getAttribute("valueid");
        if (active === "active") {
            this.childNodes[1].innerHTML = "✓";
            this.childNodes[1].setAttribute("active", "inactive");
            if (arrayActiveData.includes(setTextVal) === false) {
                arrayActiveData.push(setTextVal);

            }
        }

        else if (active === "inactive") {
                this.childNodes[1].innerHTML = "+";
                this.childNodes[1].setAttribute("active", "active");

                if (arrayActiveData.includes(setTextVal) === true) {
                    arrayActiveData.splice(arrayActiveData.indexOf(setTextVal),1);
                    renderList.splice(renderList.indexOf(setTextVal),1);

                }

        }

        console.log(countries.features);

        for (var i = 0; i < countries.features.length; i++) {

               if(arrayActiveData.includes(countries.features[i].id) == true) {

                   renderList.push(countries.features[i]);
                    fill(countries.features[i], colorCountry);

               }
        }
    });
}



function setFocus() {
    var searchFocus = document.getElementById("search");


    $("canvas").click(function() {
        $("#searchPopulation").css({"max-height": "0"})

    });

    $("#search").click(function() {
        $("#searchPopulation").css({"max-height": "800px"})

    });

}

setFocus();



