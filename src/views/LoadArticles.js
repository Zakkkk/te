import yaml from 'js-yaml';
import axios from 'axios';
import clamp from '@/util/clamp';

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

async function loadArticles(amount, startingIndex) {
  // The startingIndex refers to the first index of the names[] variable. startingIndex of 3 does not necessarily mean the third article, just the third indexed article under the names array.
  const response = await axios.get(`/data/articles/list.json`);
  const names = await response.data.names;
  
  const articles = [];

  for (let i = startingIndex; articles.length < amount; i++) {
    if (i >= names.length) break;

    articles.push(await loadArticleById(
      parseInt(names[i]),
      () => console.log(`article id (${names[i]}) not found`))
    );
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