<template>

</template>

<style lang="scss" scoped>
.resume {
  padding: 4rem 2rem;
  color: #ffffff;

  .resume-container {
    max-width: 800px;
    margin: 0 auto;
    
    section {
      margin-bottom: 3rem;
      
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 0.5rem;
      }
      
      h3 {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
      }
    }

    .basic-info {
      text-align: center;
      
      .title {
        font-size: 1.2rem;
        margin: 1rem 0;
      }
      
      .contact {
        display: flex;
        justify-content: center;
        gap: 2rem;
        
        i {
          margin-right: 0.5rem;
        }
      }
    }

    .experience-item, .project-item {
      margin-bottom: 2rem;
      
      .company, .period {
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 0.5rem;
      }
      
      ul {
        list-style-type: disc;
        padding-left: 1.5rem;
        
        li {
          margin: 0.5rem 0;
          line-height: 1.6;
        }
      }
    }
  }
}
</style> 