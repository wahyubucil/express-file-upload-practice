const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function(req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
            
            callback(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        console.log('No file received');
        return res.send({
            success: false
        });
    } else {
        console.log('File received');
        return res.send({
            success: true
        });
    }
});

app.listen(3000, () => {
    console.log('listening on port 3000!');
});