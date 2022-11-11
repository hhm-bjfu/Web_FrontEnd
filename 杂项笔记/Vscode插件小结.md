# Vscode插件

* `Prettier - Code formatter`

这个插件会让代码更加规范整洁。同时，我们也可以在vscode中配置`Code Actions On Save`选项，使得我们Ctrl + S操作报错时自动使用`Prettier - Code formatter`的格式，具体步骤见[博客](https://juejin.cn/post/7087875868864806926)，摘录json代码如下：

```json
{
  "fileheader.Author": "mikey.lmzhang8",
  "fileheader.LastModifiedBy": "mikey.lmzhang8",
  "editor.detectIndentation": true,
  "editor.renameOnType": true,
  "editor.tabSize": 2,
  "beautify.onSave": true,
  "beautify.JSfiles":[
    "js",
    "json",
    "jsbeautifyrc",
    "jshintrc",
    "ts",
    "css",
    "html"
  ],
"settingsSync.ignoredSettings": [],
"git.confirmSync": false,
"gitlens.gitCommands.closeOnFocusOut": true,
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
},
"window.zoomLevel": 0,
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"workbench.iconTheme": "material-icon-theme",
"[json]": {
  "editor.defaultFormatter": "HookyQR.beautify"
},
"javascript.format.insertSpaceBeforeFunctionParenthesis": true,
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
          "wrap_attributes": "auto",
          "end_with_newline": false,
          "wrap_line_length": 250, //换行长度
          // #vue组件中html代码格式化样式
      }
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
"minapp-vscode.disableAutoConfig": true,
"explorer.confirmDelete": false,
"vetur.format.options.tabSize": 4,
"eslint.autoFixOnSave": true,
"eslint.validate": [
      "javascript",
      "javascriptreact",
      {
          "language": "vue",
          "autoFix": true
      }
  ],
"editor.defaultFormatter": "HookyQR.beautify",
"editor.formatOnPaste": true,
"prettier.vueIndentScriptAndStyle": true,
"vsicons.dontShowNewVersionMessage": true,
"html.format.enable": false,
"workbench.colorTheme": "One Dark Pro",
"editor.formatOnType": true,
"editor.wordWrap": "on",
"editor.formatOnSave": true,
"editor.quickSuggestions": {
  "other": "on",
  "comments": "off",
  "strings": "off"
},
"editor.codeActionsOnSave": {}
}
```

