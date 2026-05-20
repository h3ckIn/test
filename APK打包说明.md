
# 光学解锁 - APK打包指南

## 准备工作

在打包APK之前，你需要安装以下工具：

### 1. 安装 Android Studio
- 下载地址：https://developer.android.com/studio
- 安装后，打开 Android Studio，安装 Android SDK

### 2. 安装 JDK (Java Development Kit)
- 通常 Android Studio 会自带 JDK，或者你可以单独安装 JDK 11 或更高版本

---

## 快速开始：构建APK

### 方式一：使用命令行（推荐）

在项目根目录执行：

```bash
# 1. 重新构建Web应用
npm run build

# 2. 同步到Android项目
npx cap sync android

# 3. 打开Android Studio进行构建
npx cap open android
```

Android Studio打开后：

1. 等待 Gradle 同步完成
2. 点击菜单：`Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
3. 构建完成后，点击通知里的 `locate` 找到APK文件
4. APK文件位置通常在：`android/app/build/outputs/apk/debug/app-debug.apk`

### 方式二：使用 Gradle 命令（无需 Android Studio）

如果你已经配置好了 Android SDK 和 JDK，可以直接：

```bash
# 进入android目录
cd android

# 构建 Debug APK
./gradlew assembleDebug

# 构建 Release APK（需要签名）
./gradlew assembleRelease
```

APK文件会生成在：
- Debug: `android/app/build/outputs/apk/debug/`
- Release: `android/app/build/outputs/apk/release/`

---

## 开发流程详解

### 每次修改代码后：

```bash
# 1. 重新构建Web
npm run build

# 2. 同步到Android
npx cap copy android

# 3. 如果修改了Capacitor配置或插件
npx cap sync android
```

---

## 生成签名的 Release APK (发布用)

### 1. 生成签名密钥
```bash
# 在项目根目录执行
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### 2. 配置签名

编辑 `android/app/build.gradle`，添加签名配置，或者使用 Android Studio 的生成签名 APK 功能。

### 3. 构建 Release APK
```bash
cd android
./gradlew assembleRelease
```

---

## 安装 APK 到手机

### 方法一：通过 USB
```bash
# 确保手机开启了USB调试
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 方法二：直接传输
1. 将APK文件传到手机
2. 在手机上打开APK文件进行安装

---

## 快速命令汇总

```bash
# 完整的构建和同步
npm run build &amp;&amp; npx cap sync android

# 仅同步Web代码
npx cap copy android

# 打开Android Studio
npx cap open android
```

---

## 提示

- Debug APK 适合测试使用
- 如果要发布到应用商店，需要生成签名的 Release APK
- 游戏图标等资源可以在 `android/app/src/main/res/` 中替换

祝你打包顺利！🎉
