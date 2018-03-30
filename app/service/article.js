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
    * update(req) {
      const { save, unlink } = this.ctx.service.picture;
      const { content, title, tags, image, comments, _id } = req;
      let oldPic;
      let picPath;

      try {
        const article = yield this.ctx.model.Articles.findOne({ _id });
        let articleContent;
        if (image) {
          picPath = yield save(image);
          oldPic = article.image;
        }
        article.title = title;
        article.image = picPath;
        article.tags = tags;

        if (content) {
          articleContent = yield this.ctx.model.ArticleContent.findOne({ _id: article.contentId });
          articleContent.comments = comments;
          articleContent.content = content;
        }
        article.save();
        articleContent && articleContent.save();
        if (oldPic) {
          yield unlink(oldPic);
        }
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    }

    * insert(req) {
      const { save, unlink } = this.ctx.service.picture;
      const { content, title, tags, image, comments } = req;
      let picPath;
      try {
        if (image) {
          picPath = yield save(image);
        }
        const articleContent = yield this.ctx.model.ArticleContent.create({
          content,
          comments,
        });
        this.ctx.model.Articles.create({
          title,
          tags,
          image: picPath,
          contentId: articleContent._id,
        });
      } catch (err) {
        yield unlink(picPath);
        console.log(err);
        return false;
      }
      return true;
    }

    * getSlice(index) {
      try {
        const res = yield this.ctx.model.Articles.find({});
        const ret = {};
        ret.length = res.length;
        ret.list = res.slice(index * 10, index * 10 + 9);
        return ret;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * getById(_id) {
      const article = yield this.ctx.model.Articles.findOne({ _id });
      return !!article;
    }

    * getAll() {
      try {
        return yield this.ctx.model.Articles.find({});
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * getContentById(req) {
      try {
        return yield this.ctx.model.ArticleContent.findOne({ _id: req._id });
      } catch (err) {
        this.ctx.logger.error(err);
      }
      return false;
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
      const { copyAttr } = this.ctx.helper;
      try {
        const article = yield this.ctx.model.Articles.findOne({ _id: req._id });
        if (!article) return false;
        const content = yield this.ctx.model.ArticleContent.findOne({ _id: article.contentId });
        let art = {
          content: content.content,
        };
        art = copyAttr(art, article._doc);
        return art;
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }

    * getByTag(req) {
      const { tag } = req;
      try {
        return yield this.ctx.model.Articles.find({ tags: tag });
      } catch (e) {
        this.ctx.logger.error(e);
        return false;
      }
    }
  }

  return ArticleService;
};
