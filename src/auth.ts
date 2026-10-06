import { ref, computed } from "vue";

const TOKEN_KEY = "token";

const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));

export const isLoggedIn = computed(() => !!token.value);

export const getToken = () => token.value;

export const setToken = (value: string) => {
    token.value = value;
    localStorage.setItem(TOKEN_KEY, value);
};

export const clearToken = () => {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
};