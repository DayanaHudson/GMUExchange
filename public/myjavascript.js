//Set up starter data
var users = [{ first_name: "Joe", last_name: "Smith", email: "jsmith@gmu.edu", password: "123"},
    { first_name: "Jane", last_name: "Doe", email: "jdoe@gmu.edu", password: "123"},
    { first_name: "Lisa", last_name: "Johnson", email: "ljohnson@gmu.edu", password: "123"},
    { first_name: "Mary", last_name: "Walter", email: "mwalter@gmu.edu", password: "123"}];

var features = [{name: "Feature 1", detail: "Feat 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {name: "Feature 2", detail: "Feat 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {name: "Feature 3", detail: "Feat 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}];

var items = [{image: "IMAGE 1", description: "Research Methods and Statistics - 5th edition ISBN13: 978-1305257795", price: "$144.48"},
 {image: "IMAGE 2", description: "Principles of Anatomy and Physiology -Text Only - 14th edition\nISBN13: 978-1118345009", price: "$150.96"},
 {image: "IMAGE 3", description: "Power System Analysis and Design - 6th edition\nISBN13: 978-1305632134", price: "$148.49"},
 {image: "IMAGE 4", description: "Anatomy and Physiology - With Mastering A and P - 6th edition\nISBN13: 978-0134201665", price: "$249.90"}];


$(document).ready(function() {
    //push state onto history.
    //https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
    history.pushState({activePane: 'Home'},'');
    //show main heading, hide section heading
    $('.mainHeading').show();
    $('.sectionHeading').hide();
    //Collect information from starter data; populate bottomColumns with Features
    var temp = '<div class = "bottomColumns"><h1 class = "features">Features</h1><table><tr>';
    for (feature of features) {
        temp = temp.concat('<td><h3>' + feature.name + '</h3>' + feature.detail + '</td>');
    }
    temp = temp.concat('</tr></table></div>');
    $('#content').html(temp);


    //Home Link tab
    $('#homeLink').click(function(){
        history.pushState({activePane: 'Home'},'');
        //window.alert(history.state.activePane + ' ' + history.length);
        //window.history.go(-2);
        document.title = 'GMUExchange - Home';
        $('#subtitle').html('<h2 class="subtitle">Tag line</h2>');
        $('.mainHeading').show();
        $('.sectionHeading').hide();
        //Collect information from starter data; populate bottomColumns with Features
        var temp = '<div class = "bottomColumns" data-list-size="3"><h1 class = "features">Features</h1><table><tr>';
        for (feature of features) {
            temp = temp.concat('<td><h3>' + feature.name + '</h3>' + feature.detail + '</td>');
        }
        temp = temp.concat('</tr></table></div>');
        $('#content').html(temp);

    });

    //quick login button behavior - home page
    $('#quickLoginButton').click(quickLogInUser);


    function quickLogInUser(){
        //get values
        var username = $('#quickLoginEmail').val();
        var password = $('#quickLoginPassword').val();
        //Collect information from starter data; check username and password credentials
        for( var user of users) {
            //check validity, update page
            if (user.email == username && user.password == password) {
                $('.rightMenuLinks').hide();
                $('#userName').html('Welcome, ' + user.first_name + '!');
                $('.mainHeading').hide();
                $('.sectionHeading').show();
                $('#subtitle').html('<h2 class="subtitle">Tag line</h2>');
                $('#logOut').css({"visibility": "visible"}); //http://stackoverflow.com/questions/3730035/how-to-change-css-using-jquery
            }
        }
    }

    //log in page
    $('#logInLink').click(function(){
        history.pushState({activePane: 'logIn'},'');
        document.title = 'GMUExchange - Log In';
        $('#subtitle').html('<h2 class="subtitle">Log In</h2>');
        $('.mainHeading').hide();
        $('.sectionHeading').show();
        $('#content').html(
            '<form class = "creds"><br>Email:<br>' +
            '<input type="text" placeholder="GMU e-mail" id = "regularLogInEmail" pattern="[a-z0-9]*@(masonlive\\.)?gmu\\.edu" />' +
            '<br><br>Password:<br><input type="password" placeholder = "password" id = "regularLogInPassword" /><br><br>' +
            '<button class = "button" id = "regularLogInButton">Log In</button></form>'
        );
    });

    //button in log in page - hehavior
    $(document).on("click",'#regularLogInButton',function(){
        var username = $('#regularLogInEmail').val();
        var password = $('#regularLogInPassword').val();
        //Collect information from starter data; check username and password credentials
        for( var user of users) {
            if (user.email == username && user.password == password) {
                $('.rightMenuLinks').hide();
                $('#userName').html('Welcome, ' + user.first_name + '!');
                $('.mainHeading').hide();
                $('.sectionHeading').show();
                $('#subtitle').html('<h2 class="subtitle">Tag line</h2>');
                $('#logOut').css({"visibility": "visible"}); //http://stackoverflow.com/questions/3730035/how-to-change-css-using-jquery
            }
        }
    });

    //page to sign up
    $('#signUpLink').click(function(){
        history.pushState({activePane: 'signUp'},'');
        document.title = 'GMUExchange - Sign Up';
        $('#subtitle').html('<h2 class="subtitle">Sign Up</h2>');
        $('.mainHeading').hide();
        $('.sectionHeading').show();
        $('#content').html(
            '<form class = "creds">' +
            '<br>Email:<br><input type="text" id = "email" placeholder="GMU e-mail" pattern="[a-z0-9]*@(masonlive\\.)?gmu\\.edu"><br>' +
            '<br>Password:<br><input type="password" id = "password" placeholder = "password"><br>' +
            '<br>First name:<br><input type="text" placeholder = "First Name" id="firstName"><br>' +
            '<br>Last name:<br><input type="text" id="lastName" placeholder = "Last Name"><br>' +
            '<br><button class = "button" id = "signUpButton" onlick = "createUser();">Sign Up</button></form>'
        );
        function createUser(){             //this takes data entered into the sign up fields and creates a new user and add its to the user list
            var user = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                first_name: document.getElementById('nameFirst').value,
                last_name: document.getElementById('nameLast').value
            };
            users.push(user);
        }
    });

    //search page
    $('#searchLink').click(function(){
        history.pushState({activePane: 'Search'},'');
        document.title = 'GMUExchange - Search';
        $('#subtitle').html('<h2 class="subtitle">Search</h2>');
        $('.mainHeading').hide();
        $('.sectionHeading').show();

        //Collect information from starter data; populate searchBoxTable with Items
        var temp =
            '<div class = "search" data-list-size="4">' + '<table class = "searchBoxTable">' +
            '<tr><td><input class = "input" type = "text" placeholder = "Search by keywords" id = "searchBox"/></td>' +
            '<td><button class = "button filterButton" id = "filterButton">Filters</button></td>' +
            '<td><button class = "button" id = "searchButton">Search</button></td>' +
            '</tr></table><div class = "searchFilters"><table>' +
            '<tr><td>Category</td><td>Class</td><td>Professor</td><td>Maximum Price</td><td>Date</td></tr>' +
            '<tr><td><select name="searchTermSelection">' +
            '<option name = "category" value="all">All</option>' +
            '<option name = "category" value="textbook">Textbook</option>' +
            '<option name = "category" value="classNotes">Class Notes</option>' +
            '<option name = "category" value="classMaterials">Class Materials</option>' +
            '<option name = "category" value="misc">Miscellaneous</option></select></td>' +
            '<td><input class = "input" type = "text" placeholder = "Search terms" id = "classSearchTermInput"/></td>' +
            '<td><input class = "input" type = "text" placeholder = "Search terms" id = "professorSearchTermInput"/></td>' +
            '<td><input type="range" value="50" min="0" max="500" id="priceSearchTermInput" />' +
            '<div id = "maxPriceDisplay"></div></td>' +
            '<td><input class = "input" type = "text" placeholder = "Search terms" id = "dateSearchTermInput"/></td>' +
            '</tr><tr><td colspan = "5">Hit enter or search to add term(s) to the search (REPLACED BY SEARCH CRITERIA)</td></tr>' +
            '</table></div>' +
            '<table class = "searchResultTable"><tr><th>Image</th><th>Description</th><th>Price</th><th>Seller Contact</th></tr></div>';

        for (item of items) {
            temp = temp.concat('<tr><td>' + item.image + '</td><td>'+ item.description +
                '</td><td>'+ item.price+'</td></tr>');
        }
        temp = temp.concat('</table></div>');
        $('#content').html(temp);

    $('#postLink').click(function(){
        $('.mainHeading').hide();
        $('.sectionHeading').show();
        $('#subtitle').html('<h2 class="subtitle">Post New Item</h2>');
        var temp = '<div class = "search" data-list-size="4">'+
            '<form class = newItemForm" action = "">' +
        '<br>Description:<br><input type = "text" id = "newItemDescription" placeholder = "Description"/>'+
        '<br>Price:<br><input type = "text" id = "newItemPrice" placeholder = "Price"/>' +
        '<br>Contact Info:<br><input type = "text" id = "newItemSellerContact" placeholder = "Contact Info"/>' +
        '<button class = "button" id = "postItem">Submit Item</button></form></div>';
        $('#content').html(temp);
        $('#postItem').click(function(){
            var item = {
                image: "SUBMITTED IMAGE", description: $('#newItemDescription').val(),price: '$'+$('#newItemPrice').val()};
            //use ajax to get amazon prices for textbooks
            //$(document).ready(function(){
                /*var currentdate = new Date();
                var datetime = { currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)  + "-"
                    + currentdate.getDate() + " T "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds() + "Z"}*/

                var url = { "https://webservice.amazon.com/onca/xml?Service=AWSECommerceService&Operation=ItemLookup&ResponseGroup=Offers": + "&IDType=ISBN&ItemID=0471785970&AssociateTag=7737-9891-0887&AWSAccessKeId=AKIAI5SPVRJQIMS36LPA&Timestamp="+ newDate()};
                $.ajax({
                    type: "GET",
                    url: url
                });
                document.getElementById("prices").innerHTML = this.responseText;
            items.push(item);
            console.log(items);
            //var price = '<div>Suggested price is </div><div class = "prices" id = "prices"></div>'
            //$('#newItem').css({"display": "none"});
        });
        for (item of items) {
            temp = temp.concat('<tr><td>' + item.image + '</td><td>'+ item.description +
                '</td><td>'+ item.price + '</td></tr>' + item.sellerContact+'</td><tr>');
        }
    });

    //use ajax to send email to seller
    //$(document).ready(function() {
        $('#contactSeller').click(function () {
            var name = $('description').val();
            var email = $('#sellerContact').val();
            var message = $("placeholder").val();

            varData = 'name = ' + name + '&email = ' + email + 'message = ' + message;
            $.ajax({
                type: "POST",
                url: 'email.php',
                data: varData
            });
        });
        //provide search function
        $('#searchButton').click(function(){
            var temp = '<div class = "search" data-list-size="4"><table class = "searchBoxTable"><tr><td><label>' +
                '<p>Search: <input type = "text" placeholder = "Search terms" id = "searchBox"/></p></label></td><td>' +
                '<button class = "button" id = "searchButton">Search</button></td></tr></table>' +
                '<table class = "searchResultTable"><tr><th>Image</th><th>Description</th><th>Price</th></tr>';
            var results = "";
            for (item of items) {
                var searchRegex = new RegExp('.*'+$('#searchBox').val()+'.*');
                if (item.description.match(searchRegex) != null) {
                    results = results.concat('<tr><td>' + item.image + '</td><td>' + item.description +
                        '</td><td>' + item.price + '</td></tr>');
                }
            }
            if(results == ""){
                results = results.concat('<tr><td>' + '</td><td>' + 'No Items Found matching search: ' +
                    $('#searchBox').val() + '</td><td>' + '</td></tr>');
            }
            results = results.concat('</table></div>');
            temp = temp.concat(results);
            $('#content').html(temp);
        });
    });

    //log out page
    $('#logOut').click(function(){
        $('.rightMenuLinks').show();
        $('.mainHeading').show();
        $('.sectionHeading').hide();
        $('#userName').css({"visibility": "hidden"});
        $('#logOut').css({"visibility": "hidden"}); //http://stackoverflow.com/questions/3730035/how-to-change-css-using-jquery
    });

    //handling of back button
    $('#backLink').click(function(){
        history.back(1);
    });
});
