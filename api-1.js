var publicKey = null; // 用于保存公钥的变量

// 监听文件输入框的变化事件
document.getElementById('fileInput').addEventListener('change', function() {
    var file = this.files[0]; // 获取选择的文件
    var reader = new FileReader(); // 创建一个文件读取器
    reader.onload = function() {
        publicKey = reader.result; // 将读取的文件内容保存到公钥变量中
        document.getElementById('keyContent').value = publicKey; // 将公钥内容显示在界面上
    };
    reader.readAsText(file); // 以文本形式读取文件
});

// 使用提供的公钥模拟加密的函数
function encryptWithPublicKey(data, publicKey) {
    var key = publicKey; // 使用公钥
    var timeSeconds = new Date().getSeconds().toString(); // 获取当前时间的秒数，并转换为字符串
    var padding = ""; // 用于填充的字符串

    // 如果密钥长度不是时间秒数长度的倍数，则用字符'a'填充
    if (key.length % timeSeconds.length !== 0) {
        var numPaddingChars = timeSeconds.length - (key.length % timeSeconds.length);
        for (var i = 0; i < numPaddingChars; i++) {
            key += 'a';
        }
        padding = 'a' + numPaddingChars; // 记录填充字符和填充长度
    }

    // 按照规则拆分和反转密钥
    var splitKey = "";
    for (var i = 0; i < key.length; i++) {
        splitKey += key[i];
        if (i < timeSeconds.length) {
            splitKey += timeSeconds[i];
        }
    }

    // 在偶数位置上反转内容
    var reversedKey = "";
    for (var i = 0; i < splitKey.length; i++) {
        if (i % 2 === 0) {
            reversedKey += splitKey[i];
        } else {
            reversedKey += splitKey[timeSeconds.length - i - 1];
        }
    }

    // 使用反转后的密钥加密数据
    var encryptedData = "";
    for (var i = 0; i < data.length; i++) {
        var charCode = data.charCodeAt(i);
        encryptedData += String.fromCharCode(charCode ^ reversedKey.charCodeAt(i % reversedKey.length));
    }

    // 在加密数据末尾添加填充记录
    encryptedData += padding;

    return encryptedData;
}

// 使用提供的私钥模拟解密的函数
function decryptWithPublicKey(encryptedData, publicKey) {
    // 从加密数据末尾获取填充长度
    var paddingLength = parseInt(encryptedData.charAt(encryptedData.length - 1));

    // 从加密数据中移除填充
    encryptedData = encryptedData.slice(0, -1 - paddingLength);

    // 获取当前时间的秒数
    var timeSeconds = new Date().getSeconds().toString();

    // 按照相同的规则拆分和反转密钥
    var splitKey = "";
    for (var i = 0; i < publicKey.length; i++) {
        splitKey += publicKey[i];
        if (i < timeSeconds.length) {
            splitKey += timeSeconds[i];
        }
    }

    // 在偶数位置上反转内容（与加密时相同）
    var reversedKey = "";
    for (var i = 0; i < splitKey.length; i++) {
        if (i % 2 === 0) {
            reversedKey += splitKey[i];
        } else {
            reversedKey += splitKey[timeSeconds.length - i - 1];
        }
    }

    // 使用反转后的密钥解密数据（与加密时相同）
    var decryptedData = "";
    for (var i = 0; i < encryptedData.length; i++) {
        var charCode = encryptedData.charCodeAt(i);
        decryptedData += String.fromCharCode(charCode ^ reversedKey.charCodeAt(i % reversedKey.length));
    }

    return decryptedData;
}

// 加密数据的函数
function encryptData() {
    var data = document.getElementById('dataInput').value; // 获取输入的数据
    if (!publicKey) {
        alert("请先上传公钥。"); // 如果没有上传公钥，则提示用户
        return;
    }
    var encryptedData = encryptWithPublicKey(data, publicKey); // 使用公钥加密数据
    document.getElementById('result').value = encryptedData; // 将加密结果显示在界面上
}

// 解密数据的函数
function decryptData() {
    var encryptedData = document.getElementById('dataInput').value; // 获取输入的加密数据
    if (!publicKey) {
        alert("请先上传公钥。"); // 如果没有上传公钥，则提示用户
        return;
    }
    var decryptedData = encryptWithPublicKey(encryptedData, publicKey); // 使用公钥解密数据
    document.getElementById('result').value = decryptedData; // 将解密结果显示在界面上
}

// 复制结果到剪贴板的函数
function copyResult() {
    var resultTextarea = document.getElementById('result'); // 获取结果文本框
    resultTextarea.select(); // 选择文本
    document.execCommand('copy'); // 执行复制命令
    alert("结果已复制到剪贴板！"); // 提示用户复制成功
}
