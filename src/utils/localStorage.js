//保存到这里来

const authorization = window.localStorage.getItem('authorization');
console.log(authorization);
let whoAmI;
if (!authorization) {
    whoAmI = null;
} else {
    whoAmI = authorization;
}
//这里可以没有这个属性不就为空了吗，帮我改下就好了这些过后再说了，先部署行不行
//判断是否有请求头
//读取
// window.localStorage.getItem('key')
export default {
    whoAmI
}