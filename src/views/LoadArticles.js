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

async function loadArticles(amount, startingIndex, names, startAtStart=true) {
  // The startingIndex refers to the first index of the names[] variable. startingIndex of 3 does not necessarily mean the third article, just the third indexed article under the names array.
  if (!exists(names)) {
    const listResponse = await axios.get(`/data/articles/list.json`);
    names = await listResponse.data.names;
  }
  
  const articles = [];

  if (!startAtStart) names.reverse(); // less efficient method but im gonna kms if i keep spending more time on this. Ill save this for future backend zak

  for (
    let i = startingIndex;
    articles.length < amount;
    i += 1
  ) {
    if (i >= names.length) break;
    if (amount < articles.length) break; // do i need this?

    articles.push(await loadArticleById(
      parseInt(names[i]),
      () => console.log(`article id (${names[i]}) not found`),
      names
    ));
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

  const listResponse = await axios.get(`/data/articles/list.json`);
  const names = await listResponse.data.names;

  const articles = [];
  let remaining = 1;
  let numberOfArticlesEvaluated = 0;

  let i = 0;
  while (articles.length < amount) {
    console.log(`${articles.length} < ${amount}`);
    console.log(articles.length)

    await loadArticles(
      amount - articles.length,
      startingIndex+numberOfArticlesEvaluated,
      names, false
    ).then(response => {
      response.articles.forEach(async article => {
        if (article.author == id)  articles.push(article);
        numberOfArticlesEvaluated++;
      });

      remaining = response.remaining;
    });

    if (numberOfArticlesEvaluated >= names.length) break;

    // console.log(`${numberOfApprovedArticles} >= ${amount}`)
    // if (numberOfApprovedArticles >= amount) break;

    i++;
    if (i >= 20) { console.log('needed to break'); break; }
  }

  // let i = 0;
  // while (articles.length < amount) {
  //   i++;

  //   console.log(`i: ${i}. articles.length < amount -> ${articles.length} < ${amount}`)

  //   loadArticles(amount-articles.length, startingIndex, startAtStart).then(response => {
  //     console.log(response.articles)
  //     // articles.push(...response.articles);
  //     // console.log(articles.length);

  //     // remaining = response.remaining;
  //   });

  //   if (remaining <= 0) { break; };
  //   if (i >= 100) { console.log('ive passed over 100 iteraions bro'); break; }
  // }

  return {
    articles: articles,
    remaining: remaining
  };
}

export {
  loadArticleById,
  loadArticles,
  loadArticlesByAuthorId
};