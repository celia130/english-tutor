import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT,
  },
};

export default nextConfig;
