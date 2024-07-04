import yaml, { load } from 'js-yaml';
import axios from 'axios';

async function loadArticleById(id) {
  const response = await axios.get(`/data/articles/${id}.yml`);
  return yaml.load(response.data);
}

async function loadAuthors() {
  const response = await axios.get(`/data/authors.json`);
  return response.data;
}

async function loadArticles(amount) {
  const response = await axios.get(`/data/articles/list.json`);
  const names = await response.data.names;
  
  const articles = []

  for (let i = 0; i < names.length; i++) {
    if (i > amount-1) break;

    articles.push(await loadArticleById(parseInt(names[i])));
  }

  return articles;
}

async function loadArticlesByAuthorId(id, amount) {
}

export {
  loadArticleById,
  loadArticles,
  loadAuthors,
  loadArticlesByAuthorId
};