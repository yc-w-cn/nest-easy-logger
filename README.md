# Nest Easy Logger

Nest Easy Logger is built for print formatted things.

## Installation

```bash
pnpm install @yc-w-cn/nest-easy-logger@latest
```

## Basic Usage

```ts
import { EasyLogger } from "@yc-w-cn/nest-easy-logger";
const logger = new EasyLogger(name);
logger.log('YOUR_KEY', 'YOUR_VALUE') // Output: YOUR_KEY -> YOUR_VALUE
```