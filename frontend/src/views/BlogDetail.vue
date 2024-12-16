<template>
  <div class="blog-detail">
    <div class="article-header">
      <h1 class="title">{{ article.title }}</h1>
      <div class="meta">
        <span class="date">{{ article.date }}</span>
        <span class="category">{{ article.category }}</span>
      </div>
    </div>
    <div class="content" v-html="article.content"></div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const article = ref({
      title: '',
      date: '',
      category: '',
      content: ''
    })

    onMounted(async () => {
      const id = route.params.id
      // 这里可以添加获取文章详情的接口
      // 示例数据
      article.value = {
        title: '示例文章标题',
        date: '2024-03-20',
        category: '前端开发',
        content: '<p>这是文章的详细内容...</p>'
      }
    })

    return {
      article
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-detail {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  .article-header {
    margin-bottom: 2rem;
    
    .title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .meta {
      display: flex;
      gap: 1rem;
      color: #888;
      font-size: 0.9rem;
    }
  }

  .content {
    line-height: 1.8;
    font-size: 1.1rem;

    :deep(p) {
      margin-bottom: 1.5rem;
    }

    :deep(h2) {
      margin: 2rem 0 1rem;
    }
  }
}
</style> 