let express = require('express')
let router = express.Router()
let fs = require('fs')
const fetch = require('node-fetch')
let request = require('request')
let multer = require('multer')
let bodyParser = require('body-parser')
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'public/upload/temp')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})
let upload = multer({storage: storage}).array('userImageUpload', 1)


router.get('/', function (req, res, next) {
    res.render('image-rotation', {
        title: 'image-rotation'
    })

})
router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");

        }
        res.render('image-rotation', {userImageUpload: res.req.files[0].path.substring(7)})
    })
})
router.post('/imageTransformation', function (req, res) {
    const path = "./public/" + req.body.userImageUpload.substring(22)
    const encodedImage = base64_encode(path)
    const transformation = req.body.transformation
    const body = {
        data: encodedImage,
        name: path,
        transformation: transformation
    }
    fetch('http://localhost:8080/api/image-transformation', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(image => {
            saveImage(image)
            res.send(JSON.stringify(image.name))
        })
        .catch(err =>
            console.log(err)
        )


})

router.post('/delete', function (req, res) {
    let path = "./public/" + req.body.userImageUpload.substring(22)
    fs.unlink(path, (error) => {
        if (error) {
            throw error;
        }
        console.log('Deleted' + path)
    })
})

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function saveImage(image) {
    fs.writeFile(image.name, new Buffer(image.data, "base64"), function (err) {
    })
}

module.exports = router