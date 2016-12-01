var express = require('express');
var firebase = require('firebase');

// var gcloud = require('google-cloud');
// var multer = require("multer");
// var uploader = multer({ storage: multer.memoryStorage({}) });
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
var port = process.env.PORT || 4000;

//FIREBASE INTERACTION
firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://gmuexchange.firebaseio.com/"
});

var fireRef = firebase.database().ref('users');
var firePostProduct = firebase.database().ref('products');

//Creating a new user sing up in firebase users
app.post('/singUp', function (req, res) {
    console.log("New req");
    console.log("Client wants to create: '" + req.body.FirstName + "'"
        + req.body.LastName + "'"
        + req.body.Email + "'"
        + req.body.Password + "'"
    );
    var uid = req.body.Email;
    var uidCopy = uid;
    // make the email as key which doesn't allow the "." so I will change that %20 to make the email a key
    uid = uid.replace(/\./g, '%20');
    console.log("Firebased uid "+uid);
    fireRef.once('value', function (snapshot) {
        var data = snapshot.val();
        var checkUser = snapshot.child(uid).exists();

        // if the email already exits as key than don't create a new entry
        if (checkUser) {
            alert('User with ' + uidCopy + ' has an account.\n' + "Sorry, we are not able to register you with this email.");
            return false;
        } else {
            //console.log('Setting up');
            // setting up the firebase with all the necessary fields
            fireRef.child(uid).set(
                {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    Email: req.body.Email,
                    Password: req.body.Password
                });
        }
    }).catch(function(){
        res.status(403);
        res.send();
    });
});

//Posting a new item in firebase products
app.post('/postItem', function (req, res) {
    console.log("New Item request");
    // var date = new Date().toJSON().slice(0, 10);
    console.log("Client wants to create: '" + req.body.category + " \n"
        + req.body.className + " \n"
        + req.body.description + " \n"
        + req.body.price + " \n"
        + req.body.postingDate +" \n"
        + req.body.sellerid +" \n"
    );
    var idToken = req.body.token;

    firebase.auth().verifyIdToken(idToken).then(function (decodedToken) {
        var uid = decodedToken.uid;
        var email = decodedToken.email;
        console.log("Uid: " + uid);
        console.log("Email: " + email);
        // firePostProduct will post the product for each uid on the same category
        // so the same user will have different products post.
        firePostProduct.child(uid).push(
            {
                category: req.body.category,
                className: req.body.className,
                description: req.body.description,
                professor: req.body.professor,
                price: req.body.price,
                isbn: req.body.isbn,
                image: req.body.image,
                postingDate: req.body.postingDate,
                sellerId: email
            }).catch(function(){
            res.status(403);
            res.send();
            });
    });
});

//update URI to display Home page
app.get('/home/', function(req, res){
    res.send(req.params);
});
//update URI to display signUp page
app.get('/signUp/', function(req, res){
});
//update URI to display logIn page
app.get('/logIn/', function(req, res){
});
//update URI to display postItem page
// app.get('/postItem/', function(req, res){
// });
//update URI to display product ID, category
app.get('/category/:category/:id/', function(req, res){
    res.json({"id": req.params.id},{"category":req.params.category});
});
//update URI to display search page
app.get('/search/', function(req, res){
});

//GOOGLE CLOUD INTERACTION
// The code that follows have been based on demo 15 from: https://github.com/gmu-swe432/lecture15demos/blob/master/blobstore/index.js

// var CLOUD_BUCKET="gmuexchange.appspot.com."; //From storage console, list of buckets https://console.cloud.google.com/storage/browser?project=gmuexchange
// var gcs = gcloud.storage({
//     projectId: '191322581126', //from storage console, then click settings, then "x-goog-project-id"
//     keyFilename: 'privkey.json' //the key we already set up
// });
// function getPublicUrl (filename) {
//     return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
// }
//
// var bucket = gcs.bucket(CLOUD_BUCKET);
//
// //From https://cloud.google.com/nodejs/getting-started/using-cloud-storage
// function sendUploadToGCS (req, res, next) {
//     if (!req.file) {
//         return next();
//     }
//
//     var gcsname = Date.now() + req.file.originalname;
//     var file = bucket.file(gcsname);
//
//
//     var stream = file.createWriteStream({
//         metadata: {
//             contentType: req.file.mimetype
//         }
//     });
//
//     stream.on('error', function (err) {
//         req.file.cloudStorageError = err;
//         next(err);
//     });
//
//     stream.on('finish', function () {
//         req.file.cloudStorageObject = gcsname;
//         req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
//         var options = {
//             entity: 'allUsers',
//             role: gcs.acl.READER_ROLE
//         };
//         file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
//     });
//
//     stream.end(req.file.buffer);
// }
//Make a new one
// app.get('/upload', uploader.single("img"), sendUploadToGCS, function (req, res, next) {
//     console.log("Uplaoding");
//     var data =  req.file.cloudStorageObject;
//     console.log("In upload : " + data);
//     if(req.file)
//         console.log("adding new image");
//         data.img = getPublicUrl(req.file.cloudStorageObject);
//     firePostProduct.push(data, function () {
//             res.send("OK!");
//     }).catch(function(){
//         res.status(403);
//         res.send();
//     });
// });


app.use(express.static('public')); // has to be last thing

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});