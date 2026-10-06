<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "../api";
import { setToken } from "../auth";

interface Errors {
    name?: string[];
    email?: string[];
    password?: string[];
}

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const errors = ref<Errors>({});
const errorMessage = ref("");
const loading = ref(false);

const router = useRouter();

const register = async () => {
    errors.value = {};
    errorMessage.value = "";
    loading.value = true;

    try {
        const response = await Api.post("/api/auth/register", {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        });

        // AuthController@register mengembalikan data.token.access_token
        const token = response.data?.data?.token?.access_token;

        if (token) {
            setToken(token);
            router.push("/products");
        } else {
            router.push("/login");
        }
    } catch (error: any) {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors || {};
        } else if (error.response) {
            errorMessage.value = error.response.data?.message || "Register gagal.";
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
                        <h4 class="fw-bold mb-4 text-center">Register</h4>

                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Nama</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Nama" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">{{ errors.name[0] }}</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Email</label>
                                <input type="email" v-model="email" class="form-control" placeholder="Email" />
                                <div v-if="errors.email" class="alert alert-danger mt-2">{{ errors.email[0] }}</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Password</label>
                                <input type="password" v-model="password" class="form-control"
                                    placeholder="Minimal 6 karakter" />
                                <div v-if="errors.password" class="alert alert-danger mt-2">
                                    {{ errors.password[0] }}
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Konfirmasi Password</label>
                                <input type="password" v-model="passwordConfirmation" class="form-control"
                                    placeholder="Ulangi password" />
                            </div>

                            <button type="submit" :disabled="loading"
                                class="btn btn-primary rounded-5 shadow border-0 w-100">
                                {{ loading ? "Loading..." : "Register" }}
                            </button>
                        </form>

                        <p class="text-center mt-3 mb-0">
                            Sudah punya akun? <router-link to="/login">Login</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>