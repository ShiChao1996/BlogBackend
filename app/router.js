'use strict';

module.exports = app => {
  app.post('/admin/login', 'admin.login');
  app.post('/article/update', 'article.update');
  app.get('/article/getlist', 'article.getList');
  app.get('/article/getdetail', 'article.getDetail');
};
