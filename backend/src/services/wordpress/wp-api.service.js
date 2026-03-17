const axios = require('axios');

const getClient = (wpUrl, user, password) => {
  const token = Buffer.from(`${user}:${password}`).toString('base64');
  return axios.create({
    baseURL: `${wpUrl}/wp-json/wp/v2`,
    headers: { Authorization: `Basic ${token}` }
  });
};

// PÁGINAS
exports.getPages = async (wpUrl, user, password) => {
  const client = getClient(wpUrl, user, password);
  const { data } = await client.get('/pages?per_page=50');
  return data;
};

exports.createPage = async (wpUrl, user, password, { title, content, status }) => {
  const client = getClient(wpUrl, user, password);
  const { data } = await client.post('/pages', { title, content, status: status || 'publish' });
  return data;
};

exports.updatePage = async (wpUrl, user, password, pageId, { title, content, status }) => {
  const client = getClient(wpUrl, user, password);
  const { data } = await client.put(`/pages/${pageId}`, { title, content, status });
  return data;
};

exports.deletePage = async (wpUrl, user, password, pageId) => {
  const client = getClient(wpUrl, user, password);
  const { data } = await client.delete(`/pages/${pageId}?force=true`);
  return data;
};

// POSTS
exports.getPosts = async (wpUrl, user, password) => {
  const client = getClient(wpUrl, user, password);
  const { data } = await client.get('/posts?per_page=50');
  return data;
};
