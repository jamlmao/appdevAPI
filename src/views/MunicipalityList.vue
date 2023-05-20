<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/regions"></ion-back-button>
                </ion-buttons>
                <ion-title style="text-align:center;">
                    {{ selectedProvince ? selectedProvince.name : '' }} Municipalities
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item v-for="municipality in filteredMunicipalities" :key="municipality.code"
                    @click="handleSelectMunicipality(municipality)" button>
                    <ion-label>
                        <h3>{{ municipality.name }}</h3>
                        <p>{{ municipality.description }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { forMunicipalities, forProvinces } from "@/api";

export default {
    components: {
        IonBackButton,
        IonButtons,
        IonContent,
        IonHeader,
        IonItem,
        IonLabel,
        IonList,
        IonPage,
        IonTitle,
        IonToolbar,
    },
    setup() {
        const selectedProvince = ref(null);
        const municipalities = ref([]);
        const provinces = ref([]);
        const router = useRouter();

        const fetchMunicipalities = async (provinceCode) => {
            municipalities.value = await forMunicipalities(provinceCode);
        };

        onMounted(async () => {
            const provinceCode = router.currentRoute.value.params.provinceCode;
            provinces.value = await forProvinces();
            selectedProvince.value = findProvinceByCode(provinceCode);
            fetchMunicipalities(provinceCode);
        });

        const findProvinceByCode = (provinceCode) => {
            if (Array.isArray(provinces.value)) {
                return provinces.value.find((province) => province.code === provinceCode);
            }
            return null;
        };

        const filteredMunicipalities = computed(() => {
            if (selectedProvince.value) {
                return municipalities.value.filter(
                    (municipality) => municipality.provinceCode === selectedProvince.value.code
                );
            }
            return [];
        });

        const handleSelectMunicipality = (municipality) => {
            router.push(
                `/provinces/${selectedProvince.value.code}/municipalities/${municipality.code}/barangays`
            );
        };

        return {
            selectedProvince,
            filteredMunicipalities,
            handleSelectMunicipality,
        };
    },
};
</script>