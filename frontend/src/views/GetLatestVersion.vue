<template>
  <div class="latest-version-container">
    <h2>获取最新版号</h2>
    <div class="content">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="代码存放路径">
          <el-input v-model="formData.basePath" placeholder="请输入代码存放路径" />
        </el-form-item>

        <el-form-item label="BUILD文件路径">
          <el-input 
            v-model="formData.buildPath" 
            placeholder="请输入BUILD文件相对路径，默认为根目录" 
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
          >
            获取版本号
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 版本信息展示区域 -->
      <div class="version-container" v-if="logs.length">
        <h3>版本信息</h3>
        <el-scrollbar height="300px">
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
  init()
})
const mockAsyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('初始化失败：模拟的异步错误'))
    }, 1000)
  })
}
const init = async () => {
  try {
    loading.value = true
    throw new Error('初始化失败：模拟的异步错误')
    await mockAsyncOperation()
    console.log('初始化成功')
    // 如果异步操作成功，可以在这里添加其他初始化逻辑
  } catch (error) {
    ElMessage.error(error.message)
    addLog({ message: error.message, type: 'error' })
  } finally {
    loading.value = false
  }
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
  margin: 60px auto;
  padding: 20px;
}

.content {
  margin-top: 20px;
}

.version-container {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;

  h3 {
    margin-bottom: 16px;
    color: #303133;
  }
}

.version-item {
  padding: 8px 12px;
  margin: 4px 0;
  border-radius: 4px;
  font-family: monospace;
  
  &.info {
    color: #909399;
  }

  &.error {
    color: #f56c6c;
    background-color: #fef0f0;
  }

  &.warning {
    color: #e6a23c;
    background-color: #fdf6ec;
  }

  &.version {
    background-color: #f5f7fa;
  }

  &.success {
    color: #67c23a;
  }

  .version-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .app-name {
      font-weight: bold;
      min-width: 80px;
    }

    .branch {
      color: #409eff;
    }

    .version {
      color: #67c23a;
      font-weight: bold;
    }
  }

  .message {
    line-height: 1.4;
  }
}

.tip-text {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.2;
}
</style> 