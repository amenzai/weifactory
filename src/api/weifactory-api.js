import http from 'common/js/ajax.js';

export const getInfo = params => http.get('device/deviceList', params).then(res => res);