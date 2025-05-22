const { createApp, ref, onMounted, nextTick } = Vue;

// Firebase 配置
const firebaseConfig = {
    databaseURL: "https://simple-chat-demo-2025-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const app = createApp({
    setup() {
        const messages = ref([]);
        const newMessage = ref('');
        const currentUser = ref('訪客');
        const messageContainer = ref(null);        // 從 Firebase 載入訊息和使用者名稱
        onMounted(() => {
            const savedUsername = localStorage.getItem('username');
            if (savedUsername) {
                currentUser.value = savedUsername;
            }            // 監聽新訊息
            const messagesRef = database.ref('messages');
            messagesRef.on('child_added', (snapshot) => {
                const message = snapshot.val();
                messages.value.push(message);
                scrollToBottom();
            });
        });        // 儲存使用者名稱
        const saveUsername = () => {
            localStorage.setItem('username', currentUser.value);
        };

        // 滾動到最新訊息
        const scrollToBottom = async () => {
            await nextTick();
            if (messageContainer.value) {
                messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
            }
        };

        // 發送訊息
        const sendMessage = () => {
            if (newMessage.value.trim() === '') return;

            const message = {
                sender: currentUser.value,
                text: newMessage.value,
                time: new Date().toLocaleString('zh-TW')
            };            if (newMessage.value.trim() === '') return;
            
            // 將訊息儲存到 Firebase
            const messagesRef = database.ref('messages');
            messagesRef.push(message);
            newMessage.value = '';
            
            // 本地立即顯示
            messages.value.push(message);
            scrollToBottom();
        };

        return {
            messages,
            newMessage,
            currentUser,
            messageContainer,
            sendMessage,
            saveUsername
        };
    }
});

app.mount('#app');
