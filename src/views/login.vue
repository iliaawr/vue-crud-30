<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Api from "../api";
import { setToken } from "../auth";

const email = ref("");
const password = ref("");

const errorMessage = ref("");
const fieldErrors = ref<{ email?: string[]; password?: string[] }>({});
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const login = async () => {
    errorMessage.value = "";
    fieldErrors.value = {};
    loading.value = true;

    try {
        const response = await Api.post("/api/auth/login", {
            email: email.value,
            password: password.value,
        });

        const token =
            response.data?.data?.access_token ??
            response.data?.access_token ??
            response.data?.token;

        if (!token) {
            console.error("Respons login tidak berisi token:", response.data);
            errorMessage.value =
                "Respons server tidak valid. Pastikan output Laravel hanya berisi JSON.";
            return;
        }

        setToken(token);
        router.push((route.query.redirect as string) || "/products");
    } catch (error: any) {
        if (error.response?.status === 422) {
            fieldErrors.value = error.response.data.errors || {};
        } else if (error.response) {
            errorMessage.value = error.response.data?.message || "Email atau password salah.";
        } else {
            errorMessage.value =
                "Tidak bisa terhubung ke server. Pastikan php artisan serve berjalan.";
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <h4 class="fw-bold mb-4 text-center">Login</h4>

                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <input type="email" v-model="email" class="form-control" placeholder="Email" />
                                <div v-if="fieldErrors.email" class="alert alert-danger mt-2">
                                    {{ fieldErrors.email[0] }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Password</label>
                                <input type="password" v-model="password" class="form-control" placeholder="Password" />
                                <div v-if="fieldErrors.password" class="alert alert-danger mt-2">
                                    {{ fieldErrors.password[0] }}
                                </div>
                            </div>

                            <button type="submit" :disabled="loading"
                                class="btn btn-primary rounded-5 shadow border-0 w-100">
                                {{ loading ? "Loading..." : "Login" }}
                            </button>
                        </form>

                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>