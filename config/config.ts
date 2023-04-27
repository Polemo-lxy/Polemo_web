import { defineConfig } from 'umi';
import routes from './routes'
import proxy from './proxy';
import { GenerateSW } from 'workbox-webpack-plugin';

export default defineConfig({
  hash: true,
  // history: {
  //   type: 'hash'
  // },
  // base: './',
  // publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  devServer: {
    port: 8005
  },
  dva: {
    hmr: true
  },
  routes,
  fastRefresh: {},
  qiankun: {
    master:{}
  },
  proxy,
  // chainWebpack(memo) {
  //   // workbox 配置
  //   memo.plugin('workbox').use(GenerateSW, [
  //     {
  //       cacheId: 'webpack-pwa', // 设置前缀
  //       skipWaiting: true, // 强制等待中的 Service Worker 被激活
  //       clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
  //       cleanupOutdatedCaches: true, //删除过时、老版本的缓存
  //       swDest: 'service-wroker.js', // 输出 Service worker 文件
  //       include: ['**/*.{html,js,css,png.jpg}'], // 匹配的文件
  //       exclude: ['service-wroker.js', '/json/*.json'], // 忽略的文件
  //       // importScripts:[path.join(__dirname,'../src/service-worker.js')],
  //       runtimeCaching: [
  //         {
  //           urlPattern: /.*\.js$/i,
  //           handler: 'CacheFirst',
  //           options: {
  //             cacheName: 'seed-js',
  //             expiration: {
  //               maxEntries: 20, //最多缓存20个，超过的按照LRU原则删除
  //               maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
  //             },
  //           },
  //         },
  //         {
  //           urlPattern: /.*css.*/,
  //           handler: 'CacheFirst',
  //           options: {
  //             cacheName: 'seed-css',
  //             expiration: {
  //               maxEntries: 30, //最多缓存30个，超过的按照LRU原则删除
  //               maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
  //             },
  //           },
  //         },
  //         {
  //           urlPattern: /.*(png|svga).*/,
  //           handler: 'CacheFirst',
  //           options: {
  //             cacheName: 'seed-image',
  //             expiration: {
  //               maxEntries: 30, //最多缓存30个，超过的按照LRU原则删除
  //               maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ]);
  // },
  // metas: [
  //   {
  //     name: 'referrer',
  //     content: 'no-referrer'
  //   }
  // ]
  // 插件构建期配置子应用
  // qiankun: {
  //   // 注册子应用信息
  //   master: {
  //     apps: [
  //       {
  //         // 子应用id，和 MicroApp中name 保持一致
  //         name: 'childApp1',
  //         // 子应用地址
  //         entry: '//localhost:3005'
  //       },
  //       {
  //         name: 'childApp2',
  //         entry: '//localhost:3006'
  //       }
  //     ]
  //   }
  // }
});
