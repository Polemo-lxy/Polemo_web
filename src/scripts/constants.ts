
// 判断是否为生产环境
export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const host: string = `${IS_PROD?'//pomelo.liangxiaoyang.top':'//localhost:3005'}`
export const websocketHost: string = `${IS_PROD?'pomelo.liangxiaoyang.top':'localhost:8080'}`