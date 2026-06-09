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
    /* occupy ~90% of viewport width while capping at a reasonable max */
    width: 80vw;
    max-width: 1500px;
    margin: 8px auto 18px auto;
    padding: 12px 18px;
    box-sizing: border-box;
}

@media (min-width: 1400px) {
    .page-container { width: 80vw; }
}

@media (max-width: 900px) {
    .page-container { padding: 12px; margin: 12px; width: 94vw; max-width: 100%; }
}
</style>