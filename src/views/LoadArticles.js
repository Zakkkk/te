import yaml from 'js-yaml';
import axios from 'axios';
import exists from '@/util/exists';

async function loadArticleById(id, articleNotFound, names) {
  if (!exists(names)) {
    const listResponse = await axios.get(`/data/articles/list.json`);
    names = await listResponse.data.names;
  }

  // console.log(`names: ${names}, names.includes(${id}) = ${names.includes(id)}`)
  if (names.includes(parseInt(id))) {
    const articleResponse = await axios.get(`/data/articles/${id}.yml`);

    return yaml.load(articleResponse.data);
  } else {
    articleNotFound();
  }
}

async function loadArticles(amount, startingIndex, startAtStart=true) {
  // The startingIndex refers to the first index of the names[] variable. startingIndex of 3 does not necessarily mean the third article, just the third indexed article under the names array.
  const response = await axios.get(`/data/articles/list.json`);
  const names = await response.data.names;
  
  const articles = [];

  for (let i = startingIndex; articles.length < amount; i += (2*startAtStart - 1)) {
    if (i >= names.length) break;
    if (amount < articles.length) break;

    articles.push(await loadArticleById(
      parseInt(names[i]),
      () => console.log(`article id (${names[i]}) not found`),
      names)
    );
  }

  return {
    articles: articles,
    remaining: names.length-startingIndex-articles.length
  };
}

async function loadArticlesByAuthorId(id, amount, startingIndex, startAtStart) {
  // startAtStart = false -> we will load in reverse
  // the method:
  //  lets say we need 10 articles and 2 have already been loaded. we'll load 8 and see how many match the id we need until we've either searched all the articles, or gotten the number of articles we need

  const articles = [];

  while (articles.length < amount) {
    loadArticles(amount-articles.length, startingIndex, startAtStart).then(article => {
      if (article.authorId == id) {
        articles.push(article);
      }
    })
  }
}

export {
  loadArticleById,
  loadArticles,
  loadArticlesByAuthorId
};