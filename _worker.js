export default {
  async fetch(request, env, ctx) {
    // 从请求的URL中提取路径名
    const { pathname } = new URL(request.url);
    // 创建缓存URL，用于构建缓存键
    const cacheUrl = new URL(request.url);

    // 从缓存中获取默认缓存并构建缓存键
    const cacheKey = new Request(cacheUrl.toString(), request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    // 检查路径是否包含有效的ASN号码
    const asnMatch = pathname.match(/^\/AS(\d+)/);
    if (!asnMatch) {
      // 如果ASN号码无效，返回400错误响应
      return new Response("无效的ASN格式。请使用/AS{ASN_NUMBER}", {
        status: 400,
      });
    }

    // 从路径中提取ASN号码
    const asn = asnMatch[1];

    // 构建查询ASN信息的URL
    const apiUrl = `https://whois.ipip.net/AS${asn}`;
    console.log(apiUrl);

    if (!response) {
      console.log(
        `请求URL的响应: ${request.url} 未在缓存中找到。正在获取并缓存请求。`
      );
      // 发起HTTP请求
      response = await fetch(apiUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        },
      });

      if (!response.ok) {
        // 如果HTTP请求失败，返回500错误响应
        return new Response("获取ASN信息失败", { status: 500 });
      }

      // 从响应中读取文本内容
      const text = await response.text();

      // 使用正则表达式进行文本过滤
      const filteredText = text
        .split("\n")
        .filter((line) => line.match(/\/AS\d+\//))
        .map((line) => {
          // 使用正则表达式匹配带有链接的文本
          const match = line.match(/<a href="\/AS\d+\/(.*?)".*?>(.*?)<\/a>/);
          if (match) {
            // 提取链接和标题中的信息
            const title = match[2];
            // 返回所需的格式
            return `${title}`;
          }
          return null;
        })
        .filter((line) => line !== null)
        .join("\n");

      // 返回经过过滤的ASN信息文本
      response = new Response(filteredText, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });

      // 将响应放入缓存
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
    } else {
      console.log("缓存命中");
    }
    
    return response;
  },
};
