<template>
    <div class="home">
        <div class="left-side"></div>
        <div class="right-side">
           
            <modeSwitcher 
                :page="'index'"
            />
         </div>
    </div>
</template>

<script>
import axios from "axios";

import modeSwitcher from "../components/mode/modeSwitcher";

export default {
    components: {
        "modeSwitcher": modeSwitcher,
    },
    data () {
        return {
            user: null,
            value: "0%",
            eligible: false,
            selectedMode: "",
            modes: ["standard", "taiko", "fruits", "mania", "storyboard"],
        };
    },
    mounted: async function() {
        this.selectedMode = this.$route.params.mode || "standard";

        try {
            const data = (await axios.get(`/api/user`)).data;
            
            if (!data.error) {
                this.user = data.user;
            } else {
                console.log(data.error);
            }
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        async run () {
            console.log((await axios.post(`/api/user/guestDifficulty/2019/osu`)).data);
        },
    },
};
</script>

<style lang="scss">
$modes: "storyboard", "mania" , "fruits", "taiko", "standard";

.home {
    width: 100%;
    padding-bottom: 9vh;
   
    display: flex;
    flex-grow: 1;
        
    @media (min-width: 1200px) {
        margin-bottom: 0px;
    }

    background-image: url("../../CorsaceAssets/img/ayim-mca/site/ayim bg.png");
    background-size: auto 80%;
    background-repeat: no-repeat;


}

.right-side {
    display: flex;
    height: 100%;
    align-items: flex-end;
}

@media (min-width: 992px) {    
    .left-side {
        flex: 0 0 40%;
        max-width: 40%;
    }
    .right-side {
        flex: 0 0 60%;
        max-width: 60%;
    }
}

</style>