<template>
    <div class="git-clone-manager">
      <el-form :model="formData" label-width="120px">
        <el-form-item label="操作模式">
          <el-radio-group v-model="formData.mode">
            <el-radio :label="'clone'">克隆仓库</el-radio>
            <el-radio :label="'replace'">替换图标</el-radio>
          </el-radio-group>
        </el-form-item>
  
        <el-form-item label="公司名称(仓库)" v-if="formData.mode === 'clone'">
          <el-input v-model="formData.company" placeholder="请输入公司名称(仓库)" />
        </el-form-item>
  
        <el-form-item label="应用名称">
          <el-select v-model="formData.appNames" 
                     multiple 
                     collapse-tags
                     collapse-tags-tooltip
                     placeholder="请选择应用名称" 
                     style="width: 100%">
            <el-option label="全选" value="all" @click="handleSelectAll" />
            <el-option v-for="app in appOptions" 
                       :key="app.value" 
                       :label="app.label" 
                       :value="app.value" />
          </el-select>
        </el-form-item>
  
        <template v-if="formData.mode === 'clone'">
          <el-form-item label="目标分支">
            <el-input v-model="formData.branch" placeholder="请输入分支名称" />
          </el-form-item>
  
          <el-form-item label="安装依赖">
            <el-switch v-model="formData.installDeps" />
          </el-form-item>
        </template>
  
        <el-form-item label="代码存放路径">
          <el-input v-model="formData.basePath" placeholder="请选择代码存放路径" />
        </el-form-item>
  
        <el-form-item label="图标路径" v-if="formData.mode === 'replace'">
          <el-input v-model="formData.faviconPath" placeholder="请选择图标路径" />
        </el-form-item>
  
        <el-form-item label="自动Push" v-if="formData.mode === 'replace'">
          <el-switch v-model="formData.autoPush" />
          <span class="tip-text">开启后将自动提交并推送到develop分支</span>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="handleExecute" :loading="loading">
            {{ formData.mode === 'clone' ? '开始克隆' : '开始替换' }}
          </el-button>
        </el-form-item>
      </el-form>
  
      <!-- 日志输出区域 -->
      <div class="log-container" v-if="logs.length">
        <h3>操作日志</h3>
        <el-scrollbar height="300px">
          <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.type">
            {{ log.message }}
          </div>
        </el-scrollbar>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import gitService from '@/services/gitService'
  
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
    company: '',
    appNames: [],
    branch: 'develop',
    basePath: '',
    faviconPath: '',
    mode: 'clone',
    installDeps: false,
    autoPush: false
  })
  
  const addLog = (log) => {
    logs.value.push({
      message: log.message,
      type: log.type,
      timestamp: new Date().toLocaleTimeString()
    })
  }
  
  const handleSelectAll = () => {
    if (formData.appNames.length === appOptions.length) {
      formData.appNames = []
    } else {
      formData.appNames = appOptions.map(option => option.value)
    }
  }
  
  const validateForm = () => {
    if (formData.mode === 'clone') {
      if (!formData.company) {
        throw new Error('请填写公司名称(仓库)')
      }
    }
  
    if (!formData.appNames.length) {
      throw new Error('请选择至少一个应用')
    }
  
    if (!formData.basePath) {
      throw new Error('请填写代码存放路径')
    }
  
    if (formData.mode === 'replace' && !formData.faviconPath) {
      throw new Error('请填写图标路径')
    }
  }
  
  const handleExecute = async () => {
    try {
      validateForm()
      
      loading.value = true
      logs.value = [] // 清空之前的日志
      
      if (formData.mode === 'clone') {
        await handleClone()
      } else {
        await handleReplace()
      }
    } catch (error) {
      ElMessage.error(error.message)
      addLog({ message: error.message, type: 'error' })
    } finally {
      loading.value = false
    }
  }
  
  const handleClone = async () => {
    addLog({ message: '开始克隆仓库操作...', type: 'info' })
    
    const params = {
      company: formData.company,
      appNames: formData.appNames,
      branch: formData.branch,
      basePath: formData.basePath,
      installDeps: formData.installDeps
    }
  
    await gitService.cloneRepositories(params, addLog)
  }
  
  const handleReplace = async () => {
    addLog({ message: '开始替换图标操作...', type: 'info' })
    
    const params = {
      basePath: formData.basePath,
      faviconPath: formData.faviconPath,
      appNames: formData.appNames,
      autoPush: formData.autoPush
    }
  
    await gitService.replaceIcons(params, addLog)
  }
  </script>
  
  <style scoped>
  .git-clone-manager {
    max-width: 800px;
    margin: 60px auto;
    padding: 20px;
  }
  
  .log-container {
    margin-top: 20px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
  }
  
  .log-item {
    padding: 5px 10px;
    font-family: monospace;
  }
  
  .log-item.error {
    color: #f56c6c;
  }
  
  .log-item.success {
    color: #67c23a;
  }
  
  .tip-text {
    margin-left: 10px;
    color: #909399;
    font-size: 12px;
  }
  </style>