<script setup lang="ts">

//import ref dari vue
import { ref } from "vue";

//import useRouter dari vue-router
import { useRouter } from "vue-router";

//import Api dari folder api
import Api from "../../api";

// Interface Errors
interface Errors {

    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    id_kategori?: string[];
}

// State untuk form

const name = ref("");
const description = ref("");
const price = ref("");
const stock = ref("");
const id_kategori = ref("");
// State untuk error
const errors = ref<Errors>({});

// Router instance
const router = useRouter();

// Handle perubahan file
// const handleFileChange = (event: Event) => {
//     const target = event.target as HTMLInputElement;
//     if (target.files && target.files[0]) {
//         image.value = target.files[0];
//     }
// };

// Handle submit form
const storeProduct = async () => {

    //inisialisasi form data
    const formData = new FormData();

    //append data ke form data
    // if (image.value) formData.append("image", image.value);
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("id_kategori", id_kategori.value);

    try {

        //send data ke api
        await Api.post("/api/products", formData);

        //redirect ke halaman products
        router.push("/products");

    } catch (error: any) {

        //set error ke state
        errors.value = error.response.data;
    }
};
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded-3 shadow">
                    <div class="card-body">
                        <form @submit.prevent="storeProduct">
                            <!-- <div class="mb-3">
                                <label class="form-label fw-bold">Image</label>
                                <input type="file" @change="handleFileChange" class="form-control" />
                                <div v-if="errors.image" class="alert alert-danger mt-2">{{ errors.image[0] }}</div>
                            </div> -->

                            <div class="mb-3">
                                <label class="form-label fw-bold">Title</label>
                                <input type="text" v-model="name" class="form-control" placeholder="Title Product" />
                                <div v-if="errors.name" class="alert alert-danger mt-2">{{ errors.name[0] }}</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-bold">Description</label>
                                <textarea v-model="description" class="form-control" rows="5"
                                    placeholder="Description Product"></textarea>
                                <div v-if="errors.description" class="alert alert-danger mt-2">{{ errors.description[0]
                                    }}</div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Price</label>
                                        <input type="number" v-model="price" class="form-control"
                                            placeholder="Price Product" />
                                        <div v-if="errors.price" class="alert alert-danger mt-2">{{ errors.price[0] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label fw-bold">Stock</label>
                                        <input type="number" v-model="stock" class="form-control"
                                            placeholder="Stock Product" />
                                        <div v-if="errors.stock" class="alert alert-danger mt-2">{{ errors.stock[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <div class="col-md-6">
                            <div class="mb-3">
                                <label  class="form-label fw-bold">id_kategori</label>
                                <input type="number" v-model="id_kategori" class="form-control" placeholder="id_kategori">
                                <div v-if="errors.id_kategori" class="alert alert-danger mt-2">{{ errors.id_kategori[0]}}</div>
                            </div>
                           </div>
                        
                            <button type="submit" class="btn btn-md btn-primary rounded-5 shadow border-0">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
