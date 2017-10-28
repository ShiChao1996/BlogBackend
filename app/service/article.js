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
 *     Initial: 2017/09/18        ShiChao
 */

'use strict';

module.exports = app => {
  class ArticleService extends app.Service {
    * upsert(req) {
      const { copyAttr } = this.ctx.helper;
      try {
        const article = yield this.ctx.model.Articles.findOne({ _id: req._id });
        if (article) {
          copyAttr(article, req, true);
          article.save();
          return true;
        }
        yield this.ctx.model.Articles.create(req);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
      return true;
    }

    * getList(index) {
      try {
        const res = yield this.ctx.model.Articles.find({});
        return res.slice(index * 10, index * 10 + 9);
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * getAll() {
      try {
        return yield this.ctx.model.Articles.find({});
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * remove(req) {
      try {
        yield this.ctx.model.Articles.findOneAndRemove({ _id: req.id });
        return true;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * getDetail(req) {
      try {
        return yield this.ctx.model.Articles.findOne({ _id: req.id });
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }
  }

  return ArticleService;
};
