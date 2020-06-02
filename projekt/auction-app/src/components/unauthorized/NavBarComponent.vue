<template>
    <div class="top_bar">
        <h2 class="hello" v-if="this.$store.state.user !== null">Hey, {{this.$store.state.user.username}}</h2>
        <div id="nav">
            <router-link to="/">HOME</router-link>
            <template v-if="!this.$store.state.user">
                <router-link to="/login">LOGIN</router-link>
                <router-link to="/register">REGISTER</router-link>
            </template>
            <template v-else>
                <router-link to="/auction_create">CREATE AUCTION</router-link>
                <router-link to="/my_auctions">MY AUCTIONS</router-link>
                <router-link to="/current_auctions">CURRENT AUCTIONS</router-link>
                <router-link to="/won_auctions">WON AUCTIONS</router-link>
                <router-link to="/messages">MESSAGES</router-link>
                <a v-on:click="logout()">LOGOUT</a>
            </template>
        </div>
    </div>
    
</template>

<script>
    import AuthService from "../../service/AuthService";
    export default {
        name: "NavBarComponent",
        methods: {
            logout() {
                AuthService.logout();
                this.$store.commit("logout");
                this.$router.push("/login");
            },
        }
    }

</script>

<style lang="scss">
    .top_bar {
        margin-top: 30px;
        #nav {
            display: flex;
            justify-content: center;
            a, span {
                white-space: nowrap;
                text-align: left;
                display: inline-block;
                text-decoration: none;
                font-size: 20px;
                font-weight: bold;
                color: #492540;
                padding: 0 10px;
                outline: 0;
            }
            a.router-link-exact-active {
                color: #c03546;
            }

        }

        @media (max-width:1100px) {
            .hello {
                margin-left: 30px;
                text-align: left;
            }
            #nav {
                flex-direction: column;
                justify-content: center;
                margin-left: 20px;
            }
        }
    }

</style>