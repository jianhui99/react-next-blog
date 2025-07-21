export const slugify = (text: string): string =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')      // 移除符号
        .replace(/\s+/g, '-')          // 空格变 -
        .replace(/--+/g, '-')          // 连续 - 简化
        .trim();
