    import { defineStore } from 'pinia';
    import { jwtDecode } from 'jwt-decode';
    export const useAuthStore = defineStore('auth', {
        state: () => ({
            token: null,
            profile: null,
            isLoggedIn: false,
        }),
        actions: {
            setToken(token) {
                this.token = token;
                this.isLoggedIn = true;
            },
            clearToken() {
                this.token = null;
                this.isLoggedIn = false;
            },
            setProfile(profile) {
                this.profile = profile;
            },
            clearProfile() {
                this.profile = null;
            },
            // Проверка токена (переписана)
            checkToken() {
                console.log("ckeck token started")
                if (!this.token) {
                    console.log("token is null")
                    this.clearProfile();
                    return false; // Токен отсутствует
                }

                try {
                    // Дополнительная логика проверки токена (например, с помощью JWT)
                    // ...

                    const decodedToken = jwtDecode(this.token);
                    const expirationTime = new Date(decodedToken.exp * 1000);
                    console.log("token", decodedToken);
                    console.log("expiration", expirationTime);
                    console.log("currentDate:", new Date());
                    if (expirationTime < new Date()) {
                        this.clearToken();
                        this.clearProfile();
                        console.log('Logged out');
                        return false; // Токен просрочен
                    }

                    // Токен действителен
                    return true;
                } catch (error) {
                    // Ошибка при проверке токена
                    console.error("Ошибка при проверке токена:", error);
                    return false;
                }
            },
        },
        getters: {
            // Геттер для isLoggedIn
            isLoggedIn: (state) => {
                // Вызываем checkToken() каждый раз, когда обращаются к isLoggedIn
                return state.checkToken();
            },
        },
        persist: true,
    });