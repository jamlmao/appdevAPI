<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/regions"></ion-back-button>
                </ion-buttons>
                <ion-title style="text-align:center;">{{ selectedRegion ? selectedRegion.regionName : '' }}
                    Provinces</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item v-for="province in filteredProvinces" :key="province.code"
                    @click="handleSelectProvince(province)">
                    <ion-label>
                        <h3>{{ province.name }}</h3>
                        <p>{{ province.description }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { forMunicipalities, forProvinces } from '@/api';

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
        const selectedRegion = ref(null);
        const provinces = ref([]);
        const router = useRouter();
        const municipalities = ref([]);

        const fetchProvinces = async (regionCode) => {
            provinces.value = await forProvinces(regionCode);
        };

        const fetchMunicipalitiesByProvince = async (provinceCode) => {
            municipalities.value = await forMunicipalities(provinceCode);
        };

        const handleSelectProvince = (province) => {
            selectedRegion.value = province;
            fetchMunicipalitiesByProvince(province.code);
            router.push(`/municipalities/${province.code}`);
        };

        onMounted(() => {
            selectedRegion.value = router.currentRoute.value.params.regionCode;
            fetchProvinces(selectedRegion.value);
        });

        const filteredProvinces = computed(() => {
            if (selectedRegion.value) {
                return provinces.value.filter((province) => province.regionCode === selectedRegion.value);
            }
            return [];
        });

        return {
            selectedRegion,
            provinces,
            filteredProvinces,
            handleSelectProvince,
        };
    },
};
</script>