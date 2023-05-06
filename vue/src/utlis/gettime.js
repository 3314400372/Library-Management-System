function gettime(){
    // 获取当前时间
const now = new Date();

// 格式化成指定时间格式
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hour = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');

// 输出时间字符串2023-05-04 21:30:56
const timeString = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
return timeString
}
module.exports = gettime