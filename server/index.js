const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const allRoutes = require('./routes/allRoutes');
const multer = require('multer');
const path = require('path');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
    origin: 'https://opah.pt',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: false
}));
app.use(express.json());

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'assets')); // Adjusted to absolute path
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const originalName = path.basename(file.originalname, ext);
        const newFileName = `${originalName}${ext}`;
        cb(null, newFileName);
    }
});

const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ filename: req.file.filename });
    } else {
        res.status(400).json({ error: 'File upload failed.' });
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/', allRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
