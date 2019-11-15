const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

const login = require('./routes/loginRouter');

connectDB();

//Init middleware
app.use(express.json({ extended: false }));
//Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

login(app);

// app.use('/api/photos', require('./routes/api/photos'));


// app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//       return filename;
//     },
//    }));

// Serve static in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT =  process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
