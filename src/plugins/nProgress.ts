import * as nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
    ease: 'linear',      // 动画方式
    speed: 500,          // 递增进度条的速度
    showSpinner: false,  // 是否使用进度环
    minimum: 0.3,        // 初始化最小百分比
    false: false,        // 自动递增行为
    trickleRate: 0.02,   // 自动递进间隔速率
    trickleSpeed: 200,   // 自动递进间隔速度
    parent: 'body'       // 指定父容器
})

export default nProgress