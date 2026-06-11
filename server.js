
const express = require('express');
const app = express();
const path = require('path');

// تمكين قراءة البيانات المرسلة من الواجهة
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// إجبار السيرفر على قراءة مجلد public أولاً وقبل كل شيء
app.use(express.static(path.join(__dirname, 'public')));

// توجيه الرابط الرئيسي للموقع لفتح الملف الموجود داخل public حتماً
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// إعداد المنفذ المتوافق تلقائياً مع Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
