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




@mixin mode-container {
    @each $mode in $modes {
        &--#{$mode} {
            border-top: 3px solid var(--#{$mode});

            &::before {
                border-left: 3px solid var(--#{$mode});
            }
        }
    }
}

@mixin mode-vote-color {
    @each $mode in $modes {
        &--#{$mode} {
            color: var(--#{$mode});
            background: linear-gradient(135deg,#222 0%, #222 20%, white 20%, white 22%, #222 22%, #222 24%, white 24%, white 26%, var(--#{$mode}) 26%, var(--#{$mode}) 28%, white 28%);
        }
    }
}

@mixin mode-selection-border {
    @each $mode in $modes {
        $i: index($modes, $mode);

        &--#{$mode} {
            &::before {
                border-bottom: 3px solid var(--#{$mode});
                // - icon size + border margin - icon margin
                width: calc(100% - 45px * #{$i} + 28px - 15px * #{$i - 1});
            }
        }

        &__mode {
            &--#{$mode} {
                background-image: url("../../CorsaceAssets/img/ayim-mca/#{$mode}.png");

                &::before {
                    border-bottom: 3px solid var(--#{$mode});
                }
            }

            &--#{$mode}-selected {
                background-color: var(--#{$mode});
            }
        }
    }
}

%spaced-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-around;
}

.mode-selection {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    @include mode-selection-border;

    &__mode {
        width: 45px;
        height: 45px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 100%;
        margin-left: 15px;
    }

    &::before {
        content: "";
        position: absolute;
        bottom: 50%;
        left: -28px;
        z-index: -1;
        border-bottom-left-radius: 25px;
        height: 100%;
    }

}

.mode-container {
    @include mode-container;

    border-top-left-radius: 25px;
    padding: 25px;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -3px;
        border-bottom-left-radius: 25px;
        border-top-left-radius: 25px;
        width: 100%;
        height: calc(100% - 45px);
        z-index: -1;
    }

    &__general {
        @extend %spaced-container;
        flex-wrap: wrap;

        @media (min-width: 1200px) {
            flex-wrap: nowrap;
        }
    }

    &__stats {
        margin-bottom: 20px;

        @media (min-width: 1200px) {
            flex-wrap: nowrap;
        }
    }
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