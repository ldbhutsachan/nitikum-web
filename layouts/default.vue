<template>
    <v-app>
        <Header />
        <!-- <Drawer /> -->
        <v-main style="background-color: #EDF5F9;">
            <div class="page-container">
                <slot></slot>
            </div>
        </v-main>
        <Footer />
    </v-app>
</template>

<style>
.selectNav-active {
    background: #3c98ce;
    color: #ffffff;
    border-radius: 50px;
}
.iconNav-active {
    background: #ffffff;
}

.page-container {
    /* occupy full viewport width so content can be viewed fullscreen */
    width: 100vw;
    max-width: 100%;
    margin: 0;
    padding: 18px;
    box-sizing: border-box;
    min-height: calc(100vh - 120px);
}

@media (min-width: 1400px) {
    .page-container { width: 100vw; }
}

@media (max-width: 900px) {
    .page-container { padding: 12px; margin: 12px; width: 100vw; max-width: 100%; }
}
</style>