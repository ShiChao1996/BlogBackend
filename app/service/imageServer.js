/*
 * MIT License
 *
 * Copyright (c) 2017 ShiChao Co,Ltd..
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
 *     Initial: 2018/03/13        ShiChao
 */

'use strict';

module.exports = app => {
  class ImageService extends app.Service {
    * add(req) {
      const { save, unlink } = this.ctx.service.picture;
      const { image } = req;
      let path;
      try {
        path = yield save(image);
        return path;
      } catch (e) {
        if (path !== '') {
          yield unlink(path);
        }
        this.ctx.logger.error(e);
        return false;
      }
    }

    * remove(req) {
      const { unlink, validatePath } = this.ctx.service.picture;
      const { path } = req;
      if (!validatePath(path)) return false;
      try {
        yield unlink(path);
        return true;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * list() {
      const { read } = this.ctx.service.picture;
      const prefix = 'http://image.littlechao.top/';
      try {
        let images = yield read();
        images = images.map(image => {
          return image.trim();
        }).filter(image => image !== '').map(image => prefix + image);
        return images;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }
  }

  return ImageService;
};
