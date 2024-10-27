import { defineStore } from 'pinia';

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
    },
    persist: true,
});