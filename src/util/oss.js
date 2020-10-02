let OSS = require('ali-oss');

let client = new OSS({
    region: 'oss-cn-shanghai',
    accessKeyId: 'LTAI4GAJb9YTNGFvGGzUEsQC',
    accessKeySecret: '1OpxixPluW3Yk1UFBAemJmHdEV1xjz',
    bucket: 'wollpic',
});

export default client