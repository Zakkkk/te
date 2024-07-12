import yaml from 'js-yaml';
import axios from 'axios';

async function loadArticleById(id, articleNotFound) {
  const listResponse = await axios.get(`/data/articles/list.json`);
  const names = await listResponse.data.names;

  // console.log(`names: ${names}, names.includes(${id}) = ${names.includes(id)}`)
  if (names.includes(parseInt(id))) {
    const articleResponse = await axios.get(`/data/articles/${id}.yml`);

    return yaml.load(articleResponse.data);
  } else {
    articleNotFound();
  }
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
  loadArticlesByAuthorId
};