<template>
  <div class="resume">
    <div class="resume-container">
      <!-- 基本信息 -->
      <section class="basic-info">
        <div class="contact">
          <span>waiterlin9898@gmail.com</span>
          <span>|</span>
          <span>男</span>
          <span>|</span>
          <span>生日：1998.09</span>
        </div>
        <div class="location-info">
          <span>工作经验：5年</span>
          <span>|</span>
          <span>求职意向：前端开发</span>
        </div>
      </section>

      <!-- 专业技能 -->
      <section class="skills">
        <h2>专业技能</h2>
        <ul class="skill-list">
          <li>熟练掌握以 Vue 框架为底层的衍生框架，如原生微信小程序、uniapp；</li>
          <li>熟练掌握 Angular 框架结合 TypeScript 的使用,并结合响应式编程 RxJS 函数库实践于项目中；</li>
          <li>熟悉框架中相应的打包工具的使用与优化，如针对 webpack 进行置优化以达到前端项目性能提高；</li>
          <li>熟悉微前端开发的相关内容，针对微前端应用的方式工具有深刻的理解；</li>
          <li>熟练掌握 SSE 流式数据返回技术，结合业务需求在 AI 智能对话项目中实现实时响应与动态内容展示功能，提升用户体验；</li>
          <li>熟悉代码开发到上线全流程，对协同开发、git 的分支管理、项目配置等都有较深刻的最佳实践；</li>
          <li>熟悉并掌握 Node.js 的自动化脚本编写，针对繁琐的流程能够以脚本命令行的方式一键执行，如：实现CI/CD的脚本；</li>
        </ul>
      </section>

      <!-- 工作经历 -->
      <section class="work-experience">
        <h2>工作经历</h2>
        
        <!-- 鼎捷软件 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>鼎捷软件股份有限公司</h3>
              <span class="position">前端开发工程师</span>
            </div>
            <span class="period">2023.03-至今</span>
          </div>
          <ul class="responsibility-list">
            <li>负责开发与迭代 售后云Web端（SaaS+ERP）相关业务需求、UX升级、以及微信小程序相关业务需求；</li>
            <li>负责 售后云前端框架的优化，如:针对Web端的9个微前端应用进行了统一的异常错误封装，针对微信小程序的静态资源的过大的优化；</li>
            <li>负责项目框架的迁移，将移动端微信小程序迁移到 uniapp 上并以输出App的方式，推进台湾市场的落地；</li>
            <li>负责 售后云App端的开发与建设，独立完成 ios 端从签名到上架App Store的一整套流程；</li>
            <li>负责 售后云App端 CI/CD 脚本的实现，最终以Node脚本的方式打通 uniapp->本地->蒲公英的渠道，以达到研发效率的显著提升；</li>
            <li>负责组内前端新人的培训 & CodeReview 的工作；</li>
          </ul>
        </div>

        <!-- 汉图信息 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>南京汉图信息技术有限公司</h3>
              <span class="position">前端工程师</span>
            </div>
            <span class="period">2020.12-2023.03</span>
          </div>
          <ul class="responsibility-list">
            <li>负责 慧文旅小程序 底层框架的调研与搭建；</li>
            <li>负责 市县分平台Web端（SaaS）相关业务需求的开发与迭代；</li>
            <li>负责为其他部门前端小组提供问题解决方案；</li>
            <li>负责组内新人前端的培训 & 部门内每周前端代码的 CodeReview；</li>
          </ul>
        </div>

        <!-- 颐忆录 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>南京颜忆录文化传媒有限公司</h3>
              <span class="position">前端工程师</span>
            </div>
            <span class="period">2019.05-2020.12</span>
          </div>
          <ul class="responsibility-list">
            <li>主要负责开发与维护 来闻微信小程序 相关的业务需求；</li>
            <li>次要负责 来闻Web端 基础组件的开发，以及部分功能的重构和迭代；</li>
            <li>完成了发布动态、评论/点赞、文章的编辑 核心模块的开发以及后续迭代和维护工作；</li>
            <li>负责收集用户建议与反馈，以提升微信小程序的用户体验，如：使用骨架屏优化首页加载等；</li>
          </ul>
        </div>
      </section>

      <!-- 项目经历 -->
      <section class="project-experience">
        <h2>项目经历</h2>
        
        <!-- 售后云 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>售后云</h3>
              <span class="position">高级前端工程师</span>
            </div>
            <span class="period">2023.03-至今</span>
          </div>
          <div class="project-desc">
            <p class="desc-title">项目描述：</p>
            <p>售后云是一款面向设备厂商与设备用户的SaaS应用，具有Web端、微信小程序、App端三款产品，产品专注于提升售后服务效率。支持用户轻松完成设备故障报修，实时查询服务进度，并提供服务评价功能。针对设备厂商，应用能自动分派维修工程师，进行维修过程记录，管理配件使用，应用还直接集成ERP系统的优点，来保证ERP系统与售后云系统的数据互通，以方便后续的管理。</p>
          </div>
          <div class="project-content">
            <p class="content-title">主要负责的工作：</p>
            <ul class="responsibility-list">
              <li>基于Angular框架以微前端为核心，负责开发与维护售后云Web端，完整9个微前端+1个单一入口的业务模块，其中独立开发完成模块达到30+；</li>
              <li>负责 售后云设备信息服务 小程序的开发与维护，在开发期间通过使用阿里云OSS链接的方式，将本地的图片资源更改为了线上图片，解决微信小程序包大小超过1.5mb的问题；</li>
              <li>负责 移动端前端的框架 转型，基于原生微信小程序，将原生框架小程序转换到 uniapp 框架并成功产出 Android、ios端，并落地于台湾市场；</li>
              <li>负责 售后云App端的实现，成功能包含对接 SSE、打字机效果、数据的 markdown 方式的渲染，对适配售后自动录屏，并成功接入Web端、APP端、小程序端，并以 npm 源的方式发布到公司内网，供终端门同事使用；</li>
              <li>负责 售后云APP端项目自动化发布建设，结合开发需求，使用 Node 编写了自动化部署脚本，将原先需要30min的流程缩短为5min；</li>
            </ul>
          </div>
          <div class="project-achievement">
            <p class="achievement-title">遇到的挑战：</p>
            <ul class="responsibility-list">
              <li>多语言的问题：为推进台湾市场，需要将应用的文本由简中转化为繁中，其语言的内容包含html中静态的文本以及typescript中定义的文本，总数达到15000+，针对这个数量如果人工手动去配置内部评估需要20人天，最终以正则匹配出目标项+Node自动化脚本的方式实现脚本的自动化处理，将时间由20人天缩短为10人天；</li>
              <li>SSE的处理：由于 数智售后AI功能需要应用于三端（Web、小程序、App），而在实际开发中发现三端的处理方式各不相同，而内部又缺乏借鉴和参考;因此经过调用调研，最终Web端采用fetch、小程序采用RequestTask、App端采用xe-event-source的方式进行解决；</li>
            </ul>
          </div>
        </div>

        <!-- 江苏智慧文旅平台 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>江苏智慧文旅平台——市县分平台</h3>
              <span class="position">前端工程师</span>
            </div>
            <span class="period">2020.12-2023.03</span>
          </div>
          <div class="project-desc">
            <p class="desc-title">项目描述：</p>
            <p>为江苏省、市、区旅游建设提供标准化的智慧旅游板块软件，软件以灵活配置的 SaaS 模式，形成数字化文旅资源管理体系，最终实现旅游数据的数字化。主要功能包括景区业务管理、文物信息统计、资源普查数据的分析与统计，以及其他功能。</p>
          </div>
          <div class="project-content">
            <p class="content-title">主要负责的开发工作：</p>
            <ul class="responsibility-list">
              <li>基于Angular8.x+ TypeScript + RxJS + webpack3.x 开发，实现了智慧文旅平台的基底和业务层的搭建；</li>
              <li>基于 HttpClient +RxJS + Angular/router 封装了 Http 的统一请求与拦截并对未注册的路由进行了路由拦截；</li>
              <li>基于 Html + Less + TypeScript 关于常规业务模块的开发，独立开发模块的数量达到40+，并进行了多次的迭代升级；</li>
              <li>基于依赖注入方式，封装了10多个业务组件达到业务的代码解耦，可以方便地实现模块化的开发与复用；</li>
              <li>基于数据接口的形式，对平台进行了埋点分析，从而能够帮助公司了解用户的偏好和行为，进一步改进产品和提升用户体验；</li>
              <li>负责并开发了以 LowCode 形式的产品监控大屏，涵盖 监控多盒子布局、自定义监控大小、监控一键上屏/清屏以及位置等主要功能，让非技术人员使用可视化工具快速构建监控数据可视化大屏，以及大大提高开发效率，节省开发人员的时间和精力；</li>
            </ul>
          </div>
          <div class="project-achievement">
            <p class="achievement-title">遇到的挑战：</p>
            <ul class="responsibility-list">
              <li>前端性能问题：在打包过程中时间长达8.5min，为优化打包问题，分析打过程，最终调整构建参数数，优化AOT编译，最终将打包时间缩短为1.38min；</li>
            </ul>
          </div>
        </div>

        <!-- 慧文旅小程序 -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>慧文旅小程序</h3>
              <span class="position">前端工程师</span>
            </div>
            <span class="period">2020.12-2023.03</span>
          </div>
          <div class="project-desc">
            <p class="desc-title">项目描述：</p>
            <p>基于标准化的智慧旅游板块软件，提供了一款专为江苏省、市、区旅游建设打造的小程序，该小程序旨在为用户提供更加方便的文化旅游信息查询服务，并提供轻量、快速的加载方式。</p>
          </div>
          <div class="project-content">
            <p class="content-title">主要负责的开发工作：</p>
            <ul class="responsibility-list">
              <li>基于 uniapp 框架，独立开发业务模块达到60多个，其中包含景区监控、资源普查数据分析、图文博美等模块；</li>
              <li>对于复杂的逻辑判断,通过使用ES6中的map结构,进行职责链模式的处理,避免了过多的if else嵌套导致代码紊乱；</li>
              <li>负责并搭建了小程序的业务组件库，实现了业务组件的统一管理与维护，并封装了8个常用的业务组件，以此提高小程序的开发效率和代码复用；</li>
              <li>对小程序项目进行整体的性能优化，如：将全部的静态图片资源采用阿里云 OSS 地址的方式，访问静态资源；</li>
              <li>针对微信小程序2M的限制，根据业务内容将10M的小程序进行分包处理，避免了超过2M而不能发布上线的问题；</li>
            </ul>
          </div>
        </div>

        <!-- 来闻（toC） -->
        <div class="experience-item">
          <div class="company-header">
            <div class="left">
              <h3>来闻（toC）</h3>
              <span class="position">前端工程师</span>
            </div>
            <span class="period">2019.07-2020.08</span>
          </div>
          <div class="project-desc">
            <p class="desc-title">项目描述：</p>
            <p>来闻（toC）是一款带有社交属性的小程序，它具有多种社交功能，包括发布动态，评论文章，分享文章，点赞等。这些功能让用户可以与其他用户进行交流和分享信息，并通过点赞来表达赞同或喜欢。此外，来闻还提供了一些其他功能，例如搜索文章、查看文章详情、关注其他用户等。</p>
          </div>
          <div class="project-content">
            <p class="content-title">主要负责的开发工作：</p>
            <ul class="responsibility-list">
              <li>结合使用 wxss 样式语言 与 Flex 布局技术，实现了设计稿的高度还原，提升了用户体验；</li>
              <li>对于首页运用了骨架屏的技术，达到当接口数据未加载时，能够为用户提供一个良好的交互反馈；</li>
              <li>对于长列表页面，操作按钮分别做了节流、防抖的处理，防止用户频繁操作，导致接口重复调用，进一步优化了用户的体验；</li>
              <li>使用 ES6+ 语法对原生小程序 wx.request 进行封装并对异常进行统一处理；</li>
              <li>对于实时消息通信,应用了 WebSocket 来实时更新动态,以及对 WebSocket 做了心跳重连的处理,防止 WebSocket 不稳定从而断连；</li>
            </ul>
          </div>
          <div class="project-achievement">
            <p class="achievement-title">遇到的挑战：</p>
            <ul class="responsibility-list">
              <li>富文本编辑器：目前关于处理微信小程序富文本编辑器的开源较少，且缺乏借鉴和参考，而官方 editor 组件又存在诸多问题，最终解决方式基于业务需求，以 textarea 组件为底层，实现了一个简易的富文本编辑器；</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 教育经历 -->
      <section class="education">
        <h2>教育经历</h2>
        <div class="education-item">
          <div class="school-header">
            <div class="left">
              <h3>南京航天航空大学</h3>
              <div class="edu-info">
                <span class="degree">本科(自考/非统招)</span>
                <span class="major">计算机科学与技术</span>
              </div>
            </div>
            <span class="period">2020-2024</span>
          </div>
        </div>

        <div class="education-item">
          <div class="school-header">
            <div class="left">
              <h3>南京信息职业技术学院</h3>
              <div class="edu-info">
                <span class="degree">大专</span>
                <span class="major">数字媒体应用技术</span>
              </div>
            </div>
            <span class="period">2016-2019</span>
          </div>
        </div>
      </section>

      <!-- 其他 -->
      <section class="others">
        <h2>其他</h2>
        <div class="other-item">
          <div class="item-title">个人掘金：</div>
          <a href="https://juejin.cn/user/729731452385719" target="_blank" class="item-content">
            https://juejin.cn/user/729731452385719
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Resume'
}
</script>

<style lang="scss" scoped>
.resume {
  color: #ffffff;

  .resume-container {
    max-width: 800px;
    margin: 0 auto;
    
    section {
      margin-bottom: 3rem;
      
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-align: center;
      }
      
      h2 {
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 0.5rem;
      }
    }

    .basic-info {
      text-align: center;
      margin-bottom: 4rem;
      
      .contact, .location-info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin: 1rem 0;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .skills {
      .skill-list {
        list-style-type: disc;
        padding-left: 1.5rem;
        
        li {
          margin: 1rem 0;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          
          &::marker {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }

    .work-experience, .project-experience {
      .experience-item {
        margin-bottom: 2.5rem;
        
        .company-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          
          .left {
            h3 {
              font-size: 1.3rem;
              margin-bottom: 0.5rem;
              color: rgba(255, 255, 255, 0.9);
            }
            
            .position {
              font-size: 1rem;
              color: rgba(255, 255, 255, 0.7);
            }
          }
          
          .period {
            color: rgba(255, 255, 255, 0.6);
          }
        }

        .responsibility-list {
          list-style-type: disc;
          padding-left: 1.5rem;
          
          li {
            margin: 0.8rem 0;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
            
            &::marker {
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
      }
    }
  }
}

.project-desc, .project-content, .project-achievement {
  margin-bottom: 1.5rem;
  
  .desc-title, .content-title, .achievement-title {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.8rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

.education {
  .education-item {
    margin-bottom: 2rem;
    
    .school-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      
      .left {
        h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .edu-info {
          display: flex;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
        }
      }
      
      .period {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}

.others {
  .other-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    
    .item-title {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.1rem;
    }
    
    .item-content {
      color: #1e80ff;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>