"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";

interface CodeExample {
  name: string;
  original: string;
  compressed: string;
  originalSize: number;
  compressedSize: number;
}

const codeExamples: CodeExample[] = [
  {
    name: "JavaScript",
    original: `// 计算数组总和
function calculateSum(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
  }
  return total;
}

// 使用示例
const result = calculateSum([1, 2, 3, 4, 5]);
console.log("总和:", result);`,
    compressed: `function calculateSum(n){let t=0;for(let l=0;l<n.length;l++)t+=n[l];return t}const result=calculateSum([1,2,3,4,5]);console.log("总和:",result);`,
    originalSize: 287,
    compressedSize: 147,
  },
  {
    name: "CSS",
    original: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 10px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16px;
}`,
    compressed: `.container{display:flex;justify-content:center;align-items:center;padding:20px;margin:10px auto;background-color:#fff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,.1)}.title{font-size:24px;font-weight:700;color:#333;margin-bottom:16px}`,
    originalSize: 353,
    compressedSize: 244,
  },
  {
    name: "HTML",
    original: `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例页面</title>
  </head>
  <body>
    <!-- 主要内容区域 -->
    <div class="container">
      <h1>欢迎访问</h1>
      <p>这是一个示例页面。</p>
    </div>
  </body>
</html>`,
    compressed: `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>示例页面</title></head><body><div class="container"><h1>欢迎访问</h1><p>这是一个示例页面。</p></div></body></html>`,
    originalSize: 409,
    compressedSize: 264,
  },
];

export const CompressionComparisonDemo = () => {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(
    codeExamples[0]
  );
  const [showCompressed, setShowCompressed] = useState(false);

  const reductionPercentage = (
    ((selectedExample.originalSize - selectedExample.compressedSize) /
      selectedExample.originalSize) *
    100
  ).toFixed(1);

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">代码压缩对比演示</h3>
        <div className="flex gap-2">
          {codeExamples.map((example) => (
            <Button
              key={example.name}
              type={selectedExample.name === example.name ? "primary" : "default"}
              onClick={() => {
                setSelectedExample(example);
                setShowCompressed(false);
              }}
            >
              {example.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700">压缩前</h4>
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
              {selectedExample.originalSize} 字节
            </span>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm">
            <code>{selectedExample.original}</code>
          </pre>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700">压缩后</h4>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              {selectedExample.compressedSize} 字节
            </span>
          </div>
          <div className="relative">
            {!showCompressed ? (
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                <Button type="primary" onClick={() => setShowCompressed(true)}>
                  查看压缩结果
                </Button>
              </div>
            ) : (
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm"
              >
                <code>{selectedExample.compressed}</code>
              </motion.pre>
            )}
          </div>
        </div>
      </div>

      {showCompressed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">压缩效果</p>
              <p className="text-2xl font-bold text-green-600">
                减少 {reductionPercentage}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">节省空间</p>
              <p className="text-xl font-semibold text-blue-600">
                {selectedExample.originalSize - selectedExample.compressedSize}{" "}
                字节
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-gray-700">
        <p className="font-medium">压缩原理:</p>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>移除空白字符(空格、换行、制表符)</li>
          <li>移除注释内容</li>
          <li>缩短变量名(JavaScript)</li>
          <li>简化颜色代码(CSS: #ffffff → #fff)</li>
        </ul>
      </div>
    </div>
  );
};
