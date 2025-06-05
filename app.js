const { createApp, ref, onMounted, nextTick } = Vue;

// 初始化 GUN
const gun = Gun({
    peers: ['https://gun-manhattan.herokuapp.com/gun'], // 使用公共 relay peer
    localStorage: false // 使用 indexedDB 替代 localStorage
});

const app = createApp({
    setup() {
        const messages = ref([]);
        const newMessage = ref('');
        const currentUser = ref('訪客');
        const userAvatar = ref('');
        const messageContainer = ref(null);
        const avatarInput = ref(null);

        // 從 GUN 載入訊息和使用者設定
        onMounted(() => {
            const savedUsername = localStorage.getItem('username');
            const savedAvatar = localStorage.getItem('userAvatar');
            
            if (savedUsername) {
                currentUser.value = savedUsername;
            }
            if (savedAvatar) {
                userAvatar.value = savedAvatar;
            }

            // 監聽新訊息
            gun.get('chat').map().on((data, id) => {
                if (!data) return;
                // 確保訊息不會重複
                if (!messages.value.find(m => m.id === id)) {
                    messages.value.push({
                        id,
                        ...data,
                        time: new Date(data.timestamp).toLocaleString('zh-TW')
                    });
                    // 對訊息進行時間排序
                    messages.value.sort((a, b) => a.timestamp - b.timestamp);
                    scrollToBottom();
                }
            });
        });

        // 儲存使用者名稱
        const saveUsername = () => {
            localStorage.setItem('username', currentUser.value);
        };

        // 處理頭像變更
        const handleAvatarChange = (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            if (file.size > 1024 * 1024) {
                alert('圖片大小不能超過 1MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('請選擇圖片檔案');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                userAvatar.value = e.target.result;
                localStorage.setItem('userAvatar', e.target.result);
            };
            reader.readAsDataURL(file);
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
                timestamp: Date.now(),
                avatar: userAvatar.value
            };
            
            // 將訊息儲存到 GUN
            gun.get('chat').set(message);
            newMessage.value = '';
            scrollToBottom();
        };

        const triggerAvatarUpload = () => {
            avatarInput.value.click();
        };

        return {
            messages,
            newMessage,
            currentUser,
            userAvatar,
            messageContainer,
            avatarInput,
            sendMessage,
            saveUsername,
            handleAvatarChange,
            triggerAvatarUpload
        };
    }
});

app.mount('#app');
