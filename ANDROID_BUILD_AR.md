# تحويل المشروع إلى APK على AndroidIDE (Samsung Galaxy M14)

**تنبيه:** الملف الأصلي تطبيق React/Vite وليس مشروع Android جاهزاً، لذلك لا يحتوي على APK حالياً. أُضيف إعداد Capacitor لتحويله إلى تطبيق Android. يلزم تنفيذ البناء على AndroidIDE أو حاسوب مجهز بـ Android SDK.

## الخطوات
1. فك ضغط الملف داخل مجلد في AndroidIDE.
2. افتح Terminal داخل مجلد المشروع، وتأكد من توفر Node.js وJava وAndroid SDK/Gradle.
3. نفّذ الأوامر بالترتيب:

```bash
npm install
npm run build
npx cap add android
npx cap sync android
```

4. افتح مجلد `android` كمشروع Gradle في AndroidIDE وانتظر المزامنة.
5. اختر بناء `assembleDebug` من قائمة Build.
6. مكان APK غالباً: `android/app/build/outputs/apk/debug/app-debug.apk`
7. انقل APK إلى الهاتف وثبّته بعد السماح بالتثبيت من هذا المصدر.

## ملاحظات
- أول تثبيت للحزم ومكونات Android يحتاج إنترنت ومساحة تخزين.
- لا تضع مفتاح Gemini أو أي مفتاح API سري داخل التطبيق المنشور؛ يمكن استخراج مفاتيح الواجهة الأمامية.
- اختبر مواقيت الصلاة والقبلة والصوت والإشعارات على الهاتف قبل النشر.
- APK الناتج من `assembleDebug` للتجربة. للنشر على Google Play يلزم توقيع إصدار Release وتجهيز AAB وفق متطلبات المتجر.
