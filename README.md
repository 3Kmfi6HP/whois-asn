# ASN IP CIDR 查询工具

这是一个基于 Cloudflare Workers & Pages 的工具，用于查询给定 ASN（自治系统号码）的所有 IP CIDR 范围。

https://3kmfi6hp.pages.dev/blog/worker-asn.html

## 功能特点

- 查询指定 ASN 的所有 IP CIDR 范围。
- 将查询结果以文本格式返回。

## 部署到 Cloudflare Pages

你可以将此项目轻松部署到 Cloudflare Pages，以便通过 Web 访问查询工具。以下是部署步骤：

1. 在 Cloudflare 注册一个帐户，如果还没有帐户的话。

2. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 中创建一个 Workers 帐户。

3. 安装 [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)（Cloudflare Workers 命令行工具）。

4. 使用 `wrangler` 命令行工具登录到你的 Cloudflare 帐户：

   ```sh
   wrangler login
   ```

5. 克隆这个 GitHub 仓库：

   ```sh
   git clone https://github.com/yourusername/asn-ip-cidr-tool.git
   ```

6. 进入项目目录：

   ```sh
   cd asn-ip-cidr-tool
   ```

7. 使用编辑器打开 `wrangler.toml` 文件，并根据你的 Cloudflare 帐户配置进行编辑。

8. 使用 `wrangler` 命令行工具发布你的 Workers 项目：

   ```sh
   wrangler publish
   ```

9. Cloudflare Pages 会为你的项目提供一个唯一的 URL。你可以在 Cloudflare Dashboard 中找到它。将这个 URL 添加到 README 中以供用户访问你的查询工具。

## 使用方法

一旦你的项目部署到 Cloudflare Pages，用户可以通过访问提供的 URL 来使用查询工具。

- 在浏览器中访问你的 Cloudflare Pages URL。
- 在 URL 中输入要查询的 ASN，例如 `/AS12345`。
- 查询结果将以文本格式显示在浏览器中。

## 示例

让我们假设你的 Cloudflare Pages URL 是 `https://your-site.pages.dev`，要查询 ASN 为 12345 的所有 IP CIDR 范围，只需访问：

```
https://your-site.pages.dev/AS12345
```

## 许可证

这个项目基于 MIT 许可证。有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## 贡献

如果你想为这个项目做出贡献，请参阅 [CONTRIBUTING](CONTRIBUTING.md) 文件，了解如何参与贡献。

如果你发现任何问题或有改进建议，请在 GitHub 仓库的 Issues 部分提出问题。

感谢你的支持和贡献！
