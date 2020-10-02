let OSS = require('ali-oss');

let client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: '**',
    accessKeySecret: '**',
    bucket: '**',
});

export default client