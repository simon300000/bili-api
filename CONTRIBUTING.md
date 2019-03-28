# Contribution

### 插件本身

我对代码风格要求不是很严格，写不写分号`;`可以按照自己的习惯，当然最好还是遵守`eslintrc`，大部分问题可以用`npm run lint`指令直接修复。

增加什么功能的话，建议把单元测试也一起写了：`test/test.js`

单元测试指令：`npm run unit`

### README.md

请不要直接修改 README.md 文件，README.md 文件是由 `updateReadme.js` 生成的，模版是 README.template.md 和 DOC.template.md，

上面提到的Markdown模版都存在`md`目录里面。

想要修改的话可以根据 `updateReadme.js` 修改 README.template.md 和 DOC.template.md，然后用指令 `npm run readme` 更新 README.md 文件。
