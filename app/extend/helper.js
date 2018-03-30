/*
 * MIT License
 *
 * Copyright (c) 2017 ShiChao Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/09/18      ShiChao
 */

'use strict';

// const moment = require('../../admin-api/node_modules/moment');

module.exports = {
  error: {
    Succeed: 0x0,
    InvalidRequest: 0x1,

    LoginRequired: 0x400, // 需要登录
    PermissionDenied: 0x401, // 权限不足

    Mongo: 0x600,
    Internal: 0x700,
  },

  formatErrorResp(err) {
    return {
      status: err,
    };
  },

  formatSucceedResp(resp = undefined) {
    if (resp === undefined) {
      return {
        status: 0x0,
      };
    }
    return {
      status: 0x0,
      resp,
    };
  },

  generateRequestToken(app, id) {
    return app.jwt.sign({ id }, app.config.jwt.secret);
  },

  copyAttrExcept(source, ...args) {
    let res = {};
    for (const attr in source) {
      if (source.hasOwnProperty(attr) && args.every((ele) => ele !== attr)) {
        res[ attr ] = source[ attr ];
      }
    }
    return res;
  },

  zeroArr(length) {
    return [ ...Array(length) ].map(_ => 0);
  },

  // 生成随机字符串
  randomStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const max = chars.length;
    let str = '';

    for (let i = 0; i < len; i++) {
      str += chars.charAt(Math.floor(Math.random() * max));
    }

    return str;
  },

  getCorrectTime(time) {
    return moment(time).add(8, 'hour');
  },

  howManyDaysAgo(date) {
    const now = moment().dayOfYear();
    const days = helper.getCorrectTime(date).dayOfYear();
    return now - days;
  },

  isOutOfDate(date, duration = 60) { // duration 单位默认为 天
    const days = helper.howManyDaysAgo(date);
    return days > duration;
  },

  isOutOfTime(date, expire) { // expire 默认为分钟
    const now = Date.now();
    const time = new Date(date).getTime();
    console.log(now - time - expire * 60 * 1000);
    return now - time - expire * 60 * 1000 > 0;
  },

  copyAttr(target, source, cover, ...except) {
    for (const attr in source) {
      if (source.hasOwnProperty(attr) && !except.includes(attr)) {
        if (!target.hasOwnProperty(attr)) {
          target[ attr ] = source[ attr ];
        } else if (cover) {
          target[ attr ] = source[ attr ];
        }
      }
    }
    return target;
  },

  validatePath(path) {
    const length = 39;
    return path.length === length && path.startsWith('/upload/image');
  },
};
