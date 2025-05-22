# 即時聊天室專案規格書

## 專案目標
建立一個基於純前端技術的即時聊天應用，可以讓使用者透過瀏覽器進行即時通訊。專案設計以簡單易用為主，適合部署在 GitHub Pages 上使用。

## 技術架構
- 前端框架：Vue.js 3 (CDN 版本)
- UI 框架：Bootstrap 5
- 後端服務：Firebase Realtime Database
- 部署平台：GitHub Pages

## 目前已實現功能
1. 基礎聊天功能
   - [x] 發送文字訊息
   - [x] 即時接收訊息
   - [x] 訊息時間戳記
   - [x] 左右對齊區分自己和他人的訊息
   - [x] 自動滾動到最新訊息

2. 用戶功能
   - [x] 設定用戶名稱
   - [x] 本地儲存用戶名稱（localStorage）

3. 介面設計
   - [x] 響應式設計（支援手機和桌面）
   - [x] 美化的訊息氣泡
   - [x] 客製化滾動條樣式

## 待開發功能
1. 聊天功能擴充
   - [ ] 表情符號支援
   - [ ] 圖片分享功能
   - [ ] 訊息刪除功能
   - [ ] 私人聊天功能

2. 使用者體驗
   - [ ] 連線狀態指示器
   - [ ] 訊息發送失敗重試機制
   - [ ] 載入中動畫效果
   - [ ] 未讀訊息提示
   - [ ] 聲音通知

3. 安全性
   - [ ] 基本的訊息過濾
   - [ ] 限制訊息長度
   - [ ] 防洪水訊息機制

## 檔案結構
```
├── index.html      # 主要的 HTML 文件
├── style.css       # 樣式表
├── app.js          # Vue 應用程式邏輯
└── SPEC.md         # 專案規格文件
```

## 關鍵配置
1. Firebase 配置
```javascript
const firebaseConfig = {
    databaseURL: "https://simple-chat-demo-2025-default-rtdb.asia-southeast1.firebasedatabase.app"
};
```

2. 資料結構
```javascript
message: {
    sender: string,    // 發送者名稱
    text: string,      // 訊息內容
    time: string      // 發送時間
}
```

## 已知問題
1. Firebase 連線可能不穩定，需要加入錯誤處理機制
2. 訊息量大時可能有效能問題，需要考慮分頁或虛擬滾動
3. 缺乏訊息發送狀態顯示

## 後續優化方向
1. 新增使用者認證系統
2. 實作訊息已讀狀態
3. 加入群組聊天功能
4. 新增訊息搜尋功能
5. 支援更多種類的媒體訊息（如語音、影片）
6. 加入訊息編輯功能

## 部署注意事項
1. 確保 Firebase 設定正確
2. 檢查 CORS 設定
3. 確認 CDN 資源可用性

## 開發指南
1. 克隆專案後，直接用瀏覽器開啟 index.html 即可開始開發
2. 更改 Firebase 配置時需要在 app.js 中更新
3. 樣式修改請在 style.css 中進行
