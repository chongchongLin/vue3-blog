<template>
  <div class="latest-version-container">
    <h2>获取最新版号</h2>
    <div class="content">
      <el-form :model="formData" label-width="120px" class="version-form">
        <el-form-item label="代码存放路径">
          <el-input 
            v-model="formData.basePath" 
            placeholder="请输入代码存放路径"
            class="custom-input"
          />
        </el-form-item>

        <el-form-item label="BUILD文件路径">
          <el-input 
            v-model="formData.buildPath" 
            placeholder="请输入BUILD文件相对路径，默认为根目录" 
            class="custom-input"
          >
            <template #append>BUILD</template>
          </el-input>
          <div class="tip-text">相对于项目根目录的路径，例如：build/</div>
        </el-form-item>

        <el-form-item label="应用名称">
          <el-select 
            v-model="formData.appNames" 
            multiple 
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择应用名称" 
            style="width: 100%"
            class="custom-select"
          >
            <el-option 
              label="全选" 
              value="all" 
              @click="handleSelectAll" 
            />
            <el-option 
              v-for="app in appOptions" 
              :key="app.value" 
              :label="app.label" 
              :value="app.value" 
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button 
            type="primary" 
            @click="handleGetVersions" 
            :loading="loading"
            class="custom-button"
          >
            获取版本号
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 版本信息展示区域 -->
      <div class="version-container" v-if="logs.length">
        <h3>版本信息</h3>
        <el-scrollbar height="300px" class="custom-scrollbar">
          <div 
            v-for="(log, index) in logs" 
            :key="index" 
            class="version-item" 
            :class="[log.type]"
          >
            <template v-if="log.type === 'version'">
              <div class="version-info">
                <span class="app-name">{{ log.appName }}</span>
                <span class="branch">分支: {{ log.branch }}</span>
                <span class="version">版本: {{ log.version }}</span>
              </div>
            </template>
            <template v-else>
              <div class="message">{{ log.message }}</div>
            </template>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive ,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import versionService from '@/services/versionService'

const loading = ref(false)
const logs = ref([])

const appOptions = [
  { label: 'BSP系统', value: 'bsp' },
  { label: 'PCT系统', value: 'pct' },
  { label: 'DSA系统', value: 'dsa' },
  { label: 'ISA系统', value: 'isa' },
  { label: 'CRS系统', value: 'crs' },
  { label: 'SSM系统', value: 'ssm' },
  { label: 'PPU系统', value: 'ppu' },
  { label: 'KBS系统', value: 'kbs' },
  { label: 'WEB系统', value: 'web' }
]

const formData = reactive({
  basePath: '',
  buildPath: '',
  appNames: []
})
onMounted(()=>{
  
})
const mockAsyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('初始化失败：模拟的异步错误'))
    }, 1000)
  })
}



const addLog = (log) => {
  if (log.type === 'version') {
    logs.value.push({
      ...log,
      timestamp: new Date().toLocaleTimeString()
    })
  } else {
    logs.value.push({
      message: log.message,
      type: log.type,
      timestamp: new Date().toLocaleTimeString()
    })
  }
}

const handleSelectAll = () => {
  if (formData.appNames.length === appOptions.length) {
    formData.appNames = []
  } else {
    formData.appNames = appOptions.map(option => option.value)
  }
}

const validateForm = () => {
  if (!formData.appNames.length) {
    throw new Error('请选择至少一个应用')
  }

  if (!formData.basePath) {
    throw new Error('请填写代码存放路径')
  }
}

const handleGetVersions = async () => {
  try {
    validateForm()
    
    loading.value = true
    logs.value = []
    
    addLog({ message: '开始获取版本号...', type: 'info' })
    
    await versionService.getLatestVersions({
      basePath: formData.basePath,
      buildPath: formData.buildPath,
      appNames: formData.appNames
    }, addLog)
    
  } catch (error) {
    ElMessage.error(error.message)
    addLog({ message: error.message, type: 'error' })
  } finally {
    loading.value = false
  }
}

// 添加格式化应用名称的方法

</script>

<style lang="scss" scoped>
.latest-version-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  color: #ffffff;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.content {
  background: linear-gradient(145deg, #2a2a2a, #333333);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.version-form {
  :deep(.el-form-item__label) {
    color: rgba(255, 255, 255, 0.9);
  }

  :deep(.custom-input) {
    .el-input__wrapper {
      background-color: #2d2d2d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none;

      &.is-focus {
        border-color: #409eff;
      }

      input {
        color: #ffffff;
        
        &::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }

  :deep(.custom-select) {
    .el-input__wrapper {
      background-color: #2d2d2d;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: none;

      input {
        color: #ffffff;
      }
    }
  }

  :deep(.custom-button) {
    background: linear-gradient(145deg, #409eff, #3a8ee6);
    border: none;
    padding: 12px 24px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
    }
  }
}

.version-container {
  margin-top: 2rem;
  background: rgba(45, 45, 45, 0.5);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    padding: 1rem;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .custom-scrollbar {
    padding: 1rem;
  }
}

.version-item {
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  border-radius: 6px;
  font-family: 'Fira Code', monospace;
  background: rgba(255, 255, 255, 0.05);
  
  &.info {
    color: #909399;
  }

  &.error {
    color: #ff4d4f;
    background: rgba(255, 77, 79, 0.1);
  }

  &.warning {
    color: #faad14;
    background: rgba(250, 173, 20, 0.1);
  }

  &.version {
    background: rgba(64, 158, 255, 0.1);
  }

  &.success {
    color: #52c41a;
    background: rgba(82, 196, 26, 0.1);
  }

  .version-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    .app-name {
      font-weight: 600;
      min-width: 80px;
      color: #409eff;
    }

    .branch {
      color: rgba(255, 255, 255, 0.8);
    }

    .version {
      color: #52c41a;
      font-weight: 600;
    }
  }

  .message {
    line-height: 1.5;
  }
}

.tip-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
  line-height: 1.2;
}

// 响应式调整
@media (max-width: 768px) {
  .latest-version-container {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  .content {
    padding: 1rem;
  }

  .version-form {
    :deep(.el-form-item__label) {
      padding: 0 0 8px;
      line-height: 1.2;
    }
  }
}
</style> 