const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// ================= Register API =================
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. فحص إذا كان المستخدم موجود مسبقاً
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            // نرسل كود 400 (طلب خاطئ) مع رسالة واضحة للفرونت آند
            return res.status(400).json({ message: "This email is already registered." });
        }

        // 2. إنشاء مستخدم جديد
        const newUser = new User({ 
            username, 
            email: email.toLowerCase().trim(), 
            password 
        });

        await newUser.save();

        // 3. الرد بالنجاح (كود 201)
        res.status(201).json({ 
            message: "Account created successfully!", 
            user: { id: newUser._id, username: newUser.username, email: newUser.email } 
        });

    } catch (err) {
        console.error("Register Error:", err);
        // توحيد اسم الحقل ليكون message لكي يظهر في الـ Alert
        res.status(500).json({ message: "Server error during registration. Please try again." });
    }
});

// ================= Login API =================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. البحث عن المستخدم
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            // كود 401 (غير مصرح)
            return res.status(401).json({ message: "Email not found. Please register first." });
        }

        // 2. فحص كلمة المرور (بشكل بسيط كما في كودك)
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        // 3. الرد بنجاح تسجيل الدخول
        res.status(200).json({ 
            message: "Login successful", 
            user: { id: user._id, username: user.username, email: user.email } 
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login. Please try again." });
    }
});

module.exports = router;