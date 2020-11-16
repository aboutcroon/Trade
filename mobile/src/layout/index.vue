<template>
    <div>
        <NavBar/>
        <Main v-show="!hideAll"/>
        <Footer/>
    </div>
</template>
<script>
import NavBar from './components/NavBar'
import Main from './components/AppMain'
import Footer from './components/Footer'
import {mapGetters, mapMutations} from 'vuex'

export default {
    components: {
        NavBar,
        Main,
        Footer
    },
    computed: {
        key() {
            return this.$route.path;
        },
        ...mapGetters([
            'hideAll'
        ])
    },
    methods: {
        ...mapMutations({
            setActivePage: 'set_ActivePage',
            setHideAll: 'set_HideAll'
        }),
    }
}
</script>
