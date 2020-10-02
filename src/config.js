
const isServer = true;

const config = {
    baseUrl: isServer ? 'http://47.103.124.76:3000':'http://192.168.1.6:3000',//'http://192.168.10.7:3000'
    tmpImgBase: isServer ? 'https://wollpic.oss-cn-shanghai.aliyuncs.com':'http://192.168.1.6:7777'//'http://172.171.2.211:7777'//'http://192.168.10.7:7777/'
};
export default config
