/*
 * MIT License
 *
 * Copyright (c) 2017 SmartestEE Co,Ltd..
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2017/11/1        ShiChao
 */

'use strict';

const moment = require('moment');
const fs = require('fs');

// TODO:
const savePicPath = '/Users/lovae/Desktop/Images/'; // '/upload/images/';
let increamentId = 1;

function createFolder(path) {
  if (fs.existsSync(path)) {
    return;
  }
  fs.mkdirSync(path);
}

function saveAsync(imgData, picUrl) {
  const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
  const dataBuffer = new Buffer(base64Data, 'base64');

  return new Promise(function(resolve, reject) {
    fs.writeFile(picUrl, dataBuffer, function(err) {
      if (err) reject(err);
      resolve();
    });
  });
}

function delAsync(filePath) {
  if (fs.existsSync(filePath)) {
    return new Promise(function(resolve, reject) {
      fs.unlink(filePath, err => {
        if (err) reject(err);
        resolve();
      });
    });
  }
  return {};
}

function uniqueName() {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  let ret = '';

  ret += timestamp;

  increamentId = Number(increamentId);
  increamentId += 1;
  if (increamentId === 100000) {
    increamentId = 1;
  }

  // 调整 increamentId 为 XXXXXX 的结构
  increamentId += 100000;
  increamentId = '0' + increamentId.toString().slice(1, 6);
  // 添加 increamentId
  ret += increamentId;

  return ret;
}

module.exports = app => {
  class PicService extends app.Service {
    path() {
      return savePicPath;
    }

    * save(image, suffix = 'jpg') {
      const basePath = savePicPath;
      createFolder(basePath);
      const path = basePath + uniqueName() + '.' + suffix;
      yield saveAsync(image, path);
      return path;
    }

    * unlink(path) {
      if (path !== undefined) {
        delAsync(path);
      }
    }
  }

  return PicService;
};
