"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";

interface ModuleFunction {
  name: string;
  code: string;
  size: number;
}

const utilityFunctions: ModuleFunction[] = [
  {
    name: "formatDate",
    code: "export function formatDate(date) { return date.toLocaleDateString(); }",
    size: 68,
  },
  {
    name: "formatCurrency",
    code: "export function formatCurrency(amount) { return `$${amount.toFixed(2)}`; }",
    size: 79,
  },
  {
    name: "validateEmail",
    code: "export function validateEmail(email) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email); }",
    size: 96,
  },
  {
    name: "debounce",
    code: "export function debounce(fn, delay) { let timer; return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); }; }",
    size: 144,
  },
  {
    name: "deepClone",
    code: "export function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }",
    size: 75,
  },
];

const BASE_BUNDLE_SIZE = 50; // 基础打包开销

export const TreeShakingDemo = () => {
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [showBundle, setShowBundle] = useState(false);

  const toggleFunction = (functionName: string) => {
    setSelectedFunctions((prev) =>
      prev.includes(functionName)
        ? prev.filter((name) => name !== functionName)
        : [...prev, functionName]
    );
    setShowBundle(false);
  };

  const totalBundleSize =
    BASE_BUNDLE_SIZE +
    utilityFunctions
      .filter((fn) => selectedFunctions.includes(fn.name))
      .reduce((sum, fn) => sum + fn.size, 0);

  const unusedSize = utilityFunctions
    .filter((fn) => !selectedFunctions.includes(fn.name))
    .reduce((sum, fn) => sum + fn.size, 0);

  const totalModuleSize =
    BASE_BUNDLE_SIZE +
    utilityFunctions.reduce((sum, fn) => sum + fn.size, 0);

  const handleBuildBundle = () => {
    setShowBundle(true);
  };

  const handleReset = () => {
    setSelectedFunctions([]);
    setShowBundle(false);
  };

  return (
    <div className="card space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tree Shaking 演示</h3>
        <p className="text-sm text-gray-600">
          选择你需要导入的工具函数,Tree Shaking 会自动移除未使用的代码
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-3 font-medium text-gray-700">
              工具库模块 (utils.js)
            </h4>
            <div className="space-y-2">
              {utilityFunctions.map((fn) => (
                <div
                  key={fn.name}
                  className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                    selectedFunctions.includes(fn.name)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  onClick={() => toggleFunction(fn.name)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">
                      {fn.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {fn.size} bytes
                      </span>
                      <input
                        type="checkbox"
                        checked={selectedFunctions.includes(fn.name)}
                        onChange={() => toggleFunction(fn.name)}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                  <code className="mt-1 block text-xs text-gray-600">
                    {fn.code}
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="mb-2 font-medium text-gray-700">导入代码</h4>
            <pre className="overflow-x-auto rounded bg-white p-3 text-xs">
              <code>
                {selectedFunctions.length > 0
                  ? `import { ${selectedFunctions.join(", ")} } from './utils';`
                  : "// 请选择需要导入的函数"}
              </code>
            </pre>
          </div>

          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={handleBuildBundle}
              disabled={selectedFunctions.length === 0}
            >
              打包构建
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h4 className="mb-3 font-medium text-gray-700">打包结果</h4>
            {!showBundle ? (
              <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white">
                <p className="text-sm text-gray-500">
                  选择函数后点击&quot;打包构建&quot;查看结果
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">最终打包体积</span>
                    <span className="text-2xl font-bold text-green-600">
                      {totalBundleSize} bytes
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>基础开销:</span>
                      <span>{BASE_BUNDLE_SIZE} bytes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>已导入函数:</span>
                      <span>
                        {totalBundleSize - BASE_BUNDLE_SIZE} bytes
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-green-800">
                      Tree Shaking 移除
                    </span>
                    <span className="text-xl font-bold text-green-600">
                      {unusedSize} bytes
                    </span>
                  </div>
                  <div className="text-sm text-green-700">
                    移除了 {utilityFunctions.length - selectedFunctions.length}{" "}
                    个未使用的函数
                  </div>
                </div>

                <div className="rounded-lg bg-yellow-50 p-4">
                  <div className="mb-2 text-sm font-medium text-yellow-800">
                    对比:如果不使用 Tree Shaking
                  </div>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div className="flex justify-between">
                      <span>完整模块体积:</span>
                      <span className="font-semibold">
                        {totalModuleSize} bytes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>体积减少:</span>
                      <span className="font-semibold">
                        {(
                          ((totalModuleSize - totalBundleSize) /
                            totalModuleSize) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedFunctions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-lg bg-white p-4 shadow-sm"
                    >
                      <h5 className="mb-2 text-sm font-medium text-gray-700">
                        已包含的函数:
                      </h5>
                      <ul className="space-y-1">
                        {selectedFunctions.map((fnName) => (
                          <li
                            key={fnName}
                            className="flex items-center gap-2 text-sm"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                            <span className="font-mono">{fnName}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-purple-50 p-4 text-sm">
        <p className="font-medium text-purple-900">Tree Shaking 工作原理:</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-purple-800">
          <li>依赖 ES Module 的静态结构分析</li>
          <li>构建工具追踪每个导入的具体使用情况</li>
          <li>未被引用的导出会在打包时被自动移除</li>
          <li>大幅减少最终打包文件的体积</li>
        </ul>
      </div>
    </div>
  );
};
