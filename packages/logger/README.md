# @workspace/logger

一个基于 Pino 的通用日志框架，支持前端和后端使用。

## 特性

- 🚀 高性能：基于 Pino 的高性能日志记录
- 🌐 通用：同时支持前端和后端
- 🎨 美观：支持彩色输出和格式化
- 🔧 可配置：支持自定义日志级别、名称等
- 📦 轻量：零依赖，体积小
- 📁 文件日志：支持按日轮换的日志文件

## 安装

```bash
pnpm add @workspace/logger
```

## 使用方法

### 基本使用

```typescript
import createLogger from '@workspace/logger';

const logger = createLogger();

logger.info('Hello, World!');
logger.error('Something went wrong', { error: new Error('Oops!') });
```

### 自定义配置

```typescript
import createLogger from '@workspace/logger';

const logger = createLogger({
  level: 'debug', // 日志级别：'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'
  name: 'my-app', // 应用名称
  pretty: true, // 是否美化输出
  browser: true, // 是否在浏览器环境中运行
  file: {
    enabled: true, // 启用文件日志
    path: 'logs/app.log', // 日志文件路径
    retention: 30, // 保留天数
  },
});

logger.debug('Debug message');
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message');
```

## API

### createLogger(options?: LoggerOptions)

创建一个新的日志实例。

#### 选项

- `level`: 日志级别，默认为 'info'
- `name`: 应用名称，默认为 'app'
- `pretty`: 是否美化输出，默认为开发环境下 true
- `browser`: 是否在浏览器环境中运行，默认为自动检测
- `file`: 文件日志配置
  - `enabled`: 是否启用文件日志
  - `path`: 日志文件路径，默认为 'logs/app.log'
  - `retention`: 日志保留天数，默认为 30 天

### Logger 实例方法

- `fatal(message: string, ...args: unknown[])`
- `error(message: string, ...args: unknown[])`
- `warn(message: string, ...args: unknown[])`
- `info(message: string, ...args: unknown[])`
- `debug(message: string, ...args: unknown[])`
- `trace(message: string, ...args: unknown[])` 