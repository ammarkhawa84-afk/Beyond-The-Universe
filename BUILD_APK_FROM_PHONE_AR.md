# بناء APK من الهاتف فقط عبر GitHub Actions

1. افتح https://github.com من المتصفح وأنشئ حساباً أو سجّل الدخول.
2. أنشئ مستودعاً جديداً (New repository)، وسمّه `noor-quran-app` واجعله Private.
3. فك ضغط ملف المشروع على الهاتف إن أمكن، ثم ارفع **محتويات المجلد** إلى المستودع. يجب أن يكون ملف `package.json` في جذر المستودع، ومعه مجلد `.github/workflows`.
4. افتح تبويب Actions في المستودع. وافق على تفعيل GitHub Actions إذا طُلب ذلك.
5. اختر `Build Android APK` ثم `Run workflow` ثم الزر الأخضر `Run workflow`.
6. انتظر حتى تصبح المهمة خضراء. افتح نتيجة التشغيل، وانزل إلى Artifacts، ثم نزّل `noor-quran-debug-apk`.
7. فك ضغط ملف Artifact، ثم ثبّت `app-debug.apk` على هاتف Android.

ملاحظة: هذا APK تجريبي للتثبيت والاختبار، وليس ملف AAB موقّعاً جاهزاً للنشر على Google Play. لا تشارك بيانات دخول GitHub مع أي شخص.
