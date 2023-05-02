
// 判断是否为生产环境
export const IS_PROD: boolean = process.env.NODE_ENV === 'production';
export const host: string = `${IS_PROD?'//polemo.liangxiaoyang.top':'//localhost:3005'}`