<template>
    <v-app>
        <Header />
        <!-- <Drawer /> -->
        <v-main style="background-color: #EDF5F9;">
            <div class="pa-10">
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
</style>