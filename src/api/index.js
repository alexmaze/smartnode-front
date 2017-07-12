/*
* 外部边界接口
* created : 2017/7/5 下午4:21:47
* by      : 朱嘉业
* updated : 2017/7/5 下午4:21:47
* by      : 朱嘉业
* */
export default {
  checkConnection () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let fakeAllConnection = Math.random() > 0.5
        console.log('fake allConnection:', fakeAllConnection)
        resolve(fakeAllConnection)
      }, 100)
    })
  }
}
