// export function toMoney(money) {
//     let newMoney = money;
//     if (newMoney) {
//         newMoney = newMoney.toFixed(2)
//     } else {
//         newMoney = 0
//         newMoney = newMoney.toFixed(2)
//     }
//     return newMoney
// }
// 代码优雅 ES6语法：函数参数默认值
export function toMoney(money = 0) {
    return money.toFixed(2)
}