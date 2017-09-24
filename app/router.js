'use strict';

module.exports = app => {
  app.post('/admin/login', 'admin.login');
  app.post('/article/upsert', 'article.upsert');
  app.post('/article/remove', 'article.remove');
  app.get('/article/getlist', 'article.getList');
  app.post('/article/getdetail', 'article.getDetail');
};
