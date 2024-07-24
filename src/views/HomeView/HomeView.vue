<script setup>
  import './style.scss';

  import SimpleContentWrapper from '@/components/SimpleContentWrapper.vue';
  import SimpleArticleGallery from '@/components/SimpleArticleGallery/SimpleArticleGallery.vue';

  import { loadArticles } from '@/api/LoadArticles';

  import { onMounted, ref } from 'vue';

  const recentArticles = ref([]);

  onMounted(async () => {
    loadArticles(6,0,null,false).then(response => {
      recentArticles.value.push(...response.articles);
    });
  });
</script>

<template>
  <div class="hero">
    <SimpleContentWrapper>
      <h1>The Thought Exchange</h1>
      <p>We're building a platform to amplify voices and exchange perspectives</p>
      <br>
      <div class="hero-button-spacing">
        <RouterLink to="/mission"><button class="button-large">Read Our Mission Statement</button></RouterLink>
        
        <RouterLink to="/articles"><button class="button-large">Search Our Catalogue</button></RouterLink>
      </div>
    </SimpleContentWrapper>
  </div>

  <br>

  <SimpleContentWrapper>
    <h2>Recent Articles</h2>
    <br>
    <SimpleArticleGallery :articles="recentArticles" />
  </SimpleContentWrapper>

  <div style="background: #efefef; padding: 30px 0">
    <SimpleContentWrapper>
      <div class="sf-grid">
        <div class="col-6">
          <h2>Why do we exist?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae voluptas optio harum quaerat vel hic consectetur eligendi aliquid quisquam molestiae quis saepe, eaque velit placeat corporis.
          </p>
          <br>
          <RouterLink bold to='/mission'>Read Our Mission Statement</RouterLink>
        </div>
        <div class="col-6 sf-grid-end-item">
          <h2>Who are we?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id soluta, accusantium, odio itaque tempore ipsa porro expedita fugiat deleniti culpa harum. Sequi est non, beatae dolor voluptatibus, atque natus pariatur expedita voluptas error dolorem eligendi totam magnam deleniti architecto exercitationem, vero cupiditate! Optio quidem nobis sequi rem odit incidunt qui.
          </p>
        </div>
      </div>
    </SimpleContentWrapper>
  </div>
</template>