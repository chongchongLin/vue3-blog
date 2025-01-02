<template>
  <div class="upload-container">
    <div class="upload-card">
      <!-- 添加配置表单 -->
      <div class="config-form" v-if="!isConfigured">
        <h3>配置信息</h3>
        <el-form :model="configForm" label-position="top">
          <el-form-item label="选择环境">
            <el-select 
              v-model="configForm.domain" 
              placeholder="请选择环境"
              class="domain-select"
            >
              <el-option
                v-for="item in domainOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="密码">
            <el-input 
              v-model="configForm.password" 
              type="password" 
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleConfig">确认</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 上传区域，只在配置完成后显示 -->
      <template v-else>
        <div class="config-info">
          <span>当前域名: {{ domain }}</span>
          <el-button type="text" @click="resetConfig">
            重置配置
          </el-button>
        </div>

        <div class="drop-area" 
          :class="{ 'drag-over': isDragging }"
          @dragover.prevent="handleDragOver"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop"
          @click="triggerFileInput">
          <div class="upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <div class="upload-text">
            <h3>拖拽文件至此处上传</h3>
            <p>或点击此区域选择文件</p>
            <span class="file-type">支持: JPG, PNG, SVG 等图片格式</span>
          </div>
          <input 
            type="file" 
            ref="fileInput"
            accept="image/*" 
            class="hidden-input"
            @change="handleFileChange"
            multiple
          >
        </div>

        <div class="file-list" v-if="showFileList">
          <div class="file-list-header">
            <i class="fas fa-images"></i>
            <span>上传列表</span>
          </div>
          <ul>
            <li v-for="(file, index) in uploadFiles" 
                :key="index"
                class="file-item">
              <div class="file-info">
                <i class="fas fa-file-image"></i>
                <span class="file-name">{{ file.name }}</span>
                <span class="file-status" :class="file.status">
                  {{ getStatusText(file.status) }}
                </span>
              </div>
              <div class="file-actions">
                <button 
                  v-if="file.status === 'success'"
                  class="copy-btn" 
                  title="复制链接"
                  @click="copyImageUrl(file.url)">
                  <i class="fas fa-copy"></i>
                </button>
                <button 
                  v-if="file.status === 'pending'"
                  class="delete-btn" 
                  title="取消上传"
                  @click="removeFile(index)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 域名选项
const domainOptions = [
  {
    label: '新麦',
    value: 'https://dmc.sinmag.com'
  },
  {
    label: '云端',
    value: 'https://dmc.digiwincloud.com.cn'
  }
]

// 原有的 UploadFile 接口保持不变
interface UploadFile {
  file: File;
  name: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
}

// 配置相关的响应式变量
const isConfigured = ref(false)
const configForm = ref<ConfigForm>({
  domain: '',
  password: ''
})

// 存储配置信息
const domain = ref('')
const config = ref({
  username: 'ASSC', // 用户名固定为 ASSC
  pwdhash: ''
})

// 处理配置提交
const handleConfig = async () => {
  if (!configForm.value.domain || !configForm.value.password) {
    ElMessage.error('请填写完整配置信息')
    return
  }

  domain.value = configForm.value.domain
  config.value = {
    username: 'ASSC',
    pwdhash: configForm.value.password
  }

  // 尝试登录验证配置
  try {
    await login()
    isConfigured.value = true
    ElMessage.success('配置成功')
  } catch (error) {
    ElMessage.error('配置验证失败，请检查配置信息')
  }
}

// 重置配置
const resetConfig = () => {
  isConfigured.value = false
  configForm.value = {
    domain: '',
    password: ''
  }
  domain.value = ''
  config.value = {
    username: 'ASSC',
    pwdhash: ''
  }
}

const fileInput = ref<HTMLInputElement | null>(null)
const showFileList = ref(false)
const uploadFiles = ref<UploadFile[]>([])
const isDragging = ref(false)

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    pending: '等待上传',
    uploading: '上传中...',
    success: '上传成功',
    error: '上传失败'
  }
  return statusMap[status] || status
}

// 处理拖拽相关事件
const handleDragOver = (e: DragEvent) => {
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  isDragging.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    handleFiles(Array.from(e.dataTransfer.files))
  }
}

// 处理文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    handleFiles(Array.from(target.files))
  }
}

// 处理文件上传
const handleFiles = (files: File[]) => {
  showFileList.value = true
  
  // 添加新文件到上传列表
  const newFiles = files.map(file => ({
    file,
    name: file.name,
    status: 'pending' as const
  }))
  
  uploadFiles.value.push(...newFiles)
  
  // 开始上传新添加的文件
  newFiles.forEach(uploadFile => {
    uploadSingleFile(uploadFile)
  })
}

// 移除文件
const removeFile = (index: number) => {
  uploadFiles.value.splice(index, 1)
  if (uploadFiles.value.length === 0) {
    showFileList.value = false
  }
}

// 登录函数
const login = async () => {
  try {
    const response = await fetch(`${domain.value}/api/dmc/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config.value)
    })
    const data = await response.json()
    window.userToken = data.userToken
    console.log('登录成功')
  } catch (error) {
    console.error('登录失败', error)
  }
}

// 上传单个文件
const uploadSingleFile = async (uploadFile: UploadFile) => {
  const formData = new FormData()
  formData.append('file', uploadFile.file)
  
  // 使用文件名来匹配文件
  const fileIndex = uploadFiles.value.findIndex(f => f.name === uploadFile.name)
  if (fileIndex !== -1) {
    uploadFiles.value = [
      ...uploadFiles.value.slice(0, fileIndex),
      { ...uploadFile, status: 'uploading' },
      ...uploadFiles.value.slice(fileIndex + 1)
    ]
  }

  try {
    const response = await fetch(`${domain.value}/api/dmc/v2/file/ASSC/upload`, {
      method: 'POST',
      headers: {
        'digi-middleware-auth-user': window.userToken
      },
      body: formData
    })
    const { data } = await response.json()
    
    // 更新成功状态，使用文件名匹配
    uploadFiles.value = uploadFiles.value.map(file => 
      file.name === uploadFile.name
        ? { 
            ...file, 
            status: 'success',
            url: `${domain.value}/api/dmc/v2/file/ASSC/preview/${data.id}`
          }
        : file
    )
    console.log('uploadFiles', uploadFiles.value)
    console.log('文件上传成功', data)
  } catch (error) {
    console.error('文件上传失败', error)
    
    // 更新失败状态，使用文件名匹配
    uploadFiles.value = uploadFiles.value.map(file => 
      file.name === uploadFile.name
        ? { ...file, status: 'error' }
        : file
    )
    
    ElMessage.error(`${uploadFile.name} 上传失败`)
  }
}

// 复制图片链接
const copyImageUrl = async (url: string) => {
  try {
    const textArea = document.createElement('textarea')
    textArea.value = url
    textArea.style.position = 'absolute'
    textArea.style.right = '0'
    textArea.style.bottom = '0'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    ElMessage.success('复制成功')
  } catch (err) {
    ElMessage.error('复制失败，请查看控制台')
    console.log(url)
  }
}

// 组件挂载时执行登录
onMounted(() => {
  login()
})
</script>

<style lang="scss" scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
  background-color: #1d1d1d;
}

.upload-card {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(145deg, #2a2a2a, #333333);
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.upload-header {
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h2 {
    color: #ffffff;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
  }
}

.drop-area {
  padding: 3rem 2rem;
  margin: 1.5rem;
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);

  &:hover, &.drag-over {
    border-color: #409eff;
    background: rgba(64, 158, 255, 0.05);

    .upload-icon i {
      color: #409eff;
      transform: translateY(-5px);
    }
  }

  .upload-icon {
    margin-bottom: 1.5rem;

    i {
      font-size: 3rem;
      color: rgba(255, 255, 255, 0.7);
      transition: all 0.3s ease;
    }
  }

  .upload-text {
    h3 {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    p {
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 1rem;
    }

    .file-type {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }
}

.hidden-input {
  display: none;
}

.file-list {
  margin: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;

  .file-list-header {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: #409eff;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .file-info {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      i {
        color: #409eff;
      }

      .file-name {
        color: rgba(255, 255, 255, 0.8);
      }

      .file-status {
        font-size: 0.9rem;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        margin-left: 0.5rem;

        &.pending {
          color: #e6a23c;
          background: rgba(230, 162, 60, 0.1);
        }

        &.uploading {
          color: #409eff;
          background: rgba(64, 158, 255, 0.1);
        }

        &.success {
          color: #67c23a;
          background: rgba(103, 194, 58, 0.1);
        }

        &.error {
          color: #f56c6c;
          background: rgba(245, 108, 108, 0.1);
        }
      }
    }

    .file-actions {
      display: flex;
      gap: 0.5rem;

      .copy-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          color: #409eff;
          background: rgba(64, 158, 255, 0.1);
        }
      }

      .delete-btn {
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;

        &:hover {
          color: #f56c6c;
          background: rgba(245, 108, 108, 0.1);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .upload-container {
    padding: 1rem;
  }

  .upload-card {
    border-radius: 12px;
  }

  .upload-header {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }
  }

  .drop-area {
    padding: 2rem 1rem;
    margin: 1rem;

    .upload-icon i {
      font-size: 2.5rem;
    }

    .upload-text h3 {
      font-size: 1.1rem;
    }
  }
}

.config-form {
  padding: 2rem;

  h3 {
    color: #ffffff;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  :deep(.el-form-item__label) {
    color: rgba(255, 255, 255, 0.9);
  }

  :deep(.el-input) {
    .el-input__wrapper {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      
      &.is-focus {
        box-shadow: 0 0 0 1px #409eff;
      }
    }

    .el-input__inner {
      color: #ffffff;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  :deep(.el-button) {
    width: 100%;
    height: 40px;
    background: #409eff;
    border: none;
    
    &:hover {
      background: #66b1ff;
    }
    
    &:active {
      background: #3a8ee6;
    }
  }

  :deep(.domain-select) {
    width: 100%;
    
    .el-input__wrapper {
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      
      &.is-focus {
        box-shadow: 0 0 0 1px #409eff;
      }
    }

    .el-input__inner {
      color: #ffffff;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.3);
      }
    }
  }

  :deep(.el-select-dropdown) {
    background: #2a2a2a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    .el-select-dropdown__item {
      color: rgba(255, 255, 255, 0.9);
      
      &.selected {
        background: #409eff;
      }
      
      &:hover {
        background: rgba(64, 158, 255, 0.1);
      }
    }
  }
}

.config-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  .el-button {
    color: #409eff;
    padding: 0;
    
    &:hover {
      color: #66b1ff;
    }
  }
}
</style>

<style>
declare global {
  interface Window {
    userToken: string;
  }
}
</style> 