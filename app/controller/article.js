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
 *     Initial: 2017/09/18        ShiChao
 */

'use strict';

module.exports = app => {
  class ArticleController extends app.Controller {
    * upload() {
      console.log(this.ctx.request.body);
    }

    * upsert() {
      const { ctx } = this;
      const { error, formatSucceedResp, formatErrorResp } = this.ctx.helper;

      const id = ctx.request.body._id;
      const exist = yield ctx.service.article.getById(id);
      let res;
      if (exist) {
        res = yield ctx.service.article.update(ctx.request.body);
      } else {
        res = yield ctx.service.article.insert(ctx.request.body);
      }
      if (res) {
        ctx.body = formatSucceedResp();
      } else {
        ctx.body = formatErrorResp(error.Mongo);
      }
    }

    * getSlice() {
      const { ctx } = this;
      const { error, formatSucceedResp, formatErrorResp } = this.ctx.helper;
      const { index } = ctx.request.body;

      const res = yield ctx.service.article.getSlice(index);
      if (res) {
        ctx.body = formatSucceedResp(res);
      } else {
        ctx.body = formatErrorResp(error.Mongo);
      }
    }

    * getAll() {
      const { ctx } = this;
      const { error, formatSucceedResp, formatErrorResp } = this.ctx.helper;

      const res = yield ctx.service.article.getAll();
      if (res) {
        ctx.body = formatSucceedResp(res);
      } else {
        ctx.body = formatErrorResp(error.Mongo);
      }
    }

    * getDetail() {
      const { ctx } = this;
      const { error, formatErrorResp, formatSucceedResp } = ctx.helper;
      const res = yield ctx.service.article.getDetail(ctx.request.body);
      if (res) {
        ctx.body = formatSucceedResp(res);
      } else {
        ctx.body = formatErrorResp(error.Mysql);
      }
    }

    * getContentById() {
      const { ctx } = this;
      const { error, formatErrorResp, formatSucceedResp } = ctx.helper;
      const res = yield ctx.service.article.getContentById(ctx.request.body);
      if (res) {
        ctx.body = formatSucceedResp(res);
      } else {
        ctx.body = formatErrorResp(error.Mysql);
      }
    }

    * getByTag() {
      const { ctx } = this;
      const { error, formatErrorResp, formatSucceedResp } = ctx.helper;
      const res = yield ctx.service.article.getByTag(ctx.request.body);
      if (res) {
        ctx.body = formatSucceedResp(res);
      } else {
        ctx.body = formatErrorResp(error.Mysql);
      }
    }

    * remove() {
      const { ctx } = this;
      const { error, formatErrorResp, formatSucceedResp } = ctx.helper;
      const res = yield ctx.service.article.remove(ctx.request.body);
      if (res) {
        ctx.body = formatSucceedResp();
      } else {
        ctx.body = formatErrorResp(error.Mysql);
      }
    }
  }

  return ArticleController;
};
