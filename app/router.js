'use strict';

module.exports = app => {
  app.post('/admin/login', 'admin.login');
  app.post('/article/upsert', 'article.upsert');
  app.post('/article/remove', 'article.remove');
  app.post('/article/getslice', 'article.getSlice');
  app.post('/article/getcontent', 'article.getContentById');
  app.post('/article/getdetail', 'article.getDetail');
  app.get('/article/getall', 'article.getAll');
  app.get('/article/gettags', 'tags.getTags');
  app.post('/article/getbytag', 'article.getByTag');

  app.post('/flutter/articles/upsert', 'flutter.upsert');
  app.post('upload', 'article.upload');
  app.get('/flutter/articles/list', 'flutter.list');
};
