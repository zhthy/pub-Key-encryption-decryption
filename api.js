var publicKey = null; // 变量用于保存公钥

document.getElementById('fileInput').addEventListener('change', function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        publicKey = reader.result;
        document.getElementById('keyContent').value = publicKey;
    };
    reader.readAsText(file);
});

// 用提供的公钥模拟加密的函数
function encryptWithPublicKey(data, publicKey) {
    // 这是一个简化的模拟，请用实际的加密逻辑替换它
    return publicKey + ": " + data; // 只是将公钥添加到数据前以模拟加密
}

// 用提供的私钥模拟解密的函数
function decryptWithPrivateKey(encryptedData, privateKey) {
    // 这是一个简化的模拟，请用实际的解密逻辑替换它
    var parts = encryptedData.split(": ");
    if (parts.length === 2 && parts[0] === privateKey) {
        return parts[1];
    } else {
        return "解密失败。私钥或加密数据不正确。";
    }
}

function encryptData() {
    var data = document.getElementById('dataInput').value;
    if (!publicKey) {
        alert("请先上传公钥。");
        return;
    }
    var encryptedData = encryptWithPublicKey(data, publicKey);
    document.getElementById('result').value = encryptedData;
}

function decryptData() {
    var encryptedData = document.getElementById('dataInput').value;
    if (!publicKey) {
        alert("请先上传公钥。");
        return;
    }
    var decryptedData = decryptWithPrivateKey(encryptedData, publicKey);
    document.getElementById('result').value = decryptedData;
}
