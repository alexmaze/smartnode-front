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
        let fakeSeed = Math.random()
        if(fakeSeed > 0.5){
          let fakeAllConnection = true
          console.log('fake allConnection:', fakeAllConnection)
          resolve(fakeAllConnection)
        }
      }, 100)
    })
  },
  checkHardware() {
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        let fakeSeed = Math.random()
        if(fakeSeed > 0.5){
          let fakeHardwareConn = true
          console.log('fakeHardwareConn: ' + fakeHardwareConn)
          resolve(fakeHardwareConn)
        }
      }, 100)
    })
  }
}
