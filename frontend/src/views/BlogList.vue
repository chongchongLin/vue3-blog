<template>
  <div class="blog-list">
    <h1 class="page-title">我的博客</h1>
    <div class="articles">
      <article v-for="article in articles" :key="article.id" class="article-card" @click="goToDetail(article.id)">
        <h2 class="article-title">{{ article.title }}</h2>
        <div class="article-meta">
          <span class="date">{{ article.date }}</span>
          <span class="category">{{ article.category }}</span>
        </div>
        <p class="article-summary">{{ article.summary }}</p>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const articles = ref([
      {
        id: 1,
        title: '示例文章标题1',
        date: '2024-03-20',
        category: '前端开发',
        summary: '这是一篇示例文章的摘要内容...'
      },
      // 可以添加更多文章
    ])

    const goToDetail = (id: number) => {
      router.push(`/blog/${id}`)
    }

    return {
      articles,
      goToDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-list {
  padding: 2rem;

  .page-title {
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .articles {
    display: grid;
    gap: 2rem;
  }

  .article-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    .article-title {
      margin: 0 0 1rem;
      font-size: 1.5rem;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #888;
    }

    .article-summary {
      color: #ccc;
      line-height: 1.6;
    }
  }
}
</style>