<template>
    <div class="mode-wrapper">
        <div class="mode-title">
            {{ selectedMode }} 
            <span v-if="page!=='index'"> | ayim</span>
        </div>

        <div
            class="mode-container"
            :class="`mode-container--${selectedMode}`"
        >
            <index 
                v-if="page==='index'"
                :selected-mode="selectedMode"
            />
            <stats 
                v-if="page==='stats'"
                :selected-mode="selectedMode"
            />
            <test 
                v-if="page==='test'"
                :selected-mode="selectedMode"
            />
        </div>
        <div
                class="mode-selection" 
                :class="`mode-selection--${selectedMode}`"
            >
                <div
                    v-for="mode in modes"
                    :key="mode"
                    class="mode-selection__mode"
                    :class="[`mode-selection__mode--${mode}`, (selectedMode == mode) ? `mode-selection__mode--${mode}-selected` : '']"
                    @click="setMode(mode)"
                />
            </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

import index from "./index.vue";
import stats from './stats.vue';
import test from './test.vue';

export default Vue.extend({
    components: {
        "index": index,
        "stats": stats,
        "test": test,
    },
    props: {
        page: {
            type: String,
            default: "index",
        },
    }, 
    data () {
        return {
            value: "0%",
            selectedMode: "standard",
            modes: ["standard", "taiko", "fruits", "mania", "storyboard"],
        };
    },
    mounted () {
        const localMode = localStorage.getItem("mode");
        if (localMode && /^(standard|taiko|fruits|mania|storyboard)$/.test(localMode))
            this.selectedMode = localMode;
        
        this.$emit("mode", this.selectedMode);
    },
    methods: {
        setMode(mode) {
            if (/^(standard|taiko|fruits|mania|storyboard)$/.test(mode)) {
                localStorage.setItem("mode", mode);
                this.selectedMode = mode;
            }
            this.$emit("mode", this.selectedMode);
        },
        async run () {
            const res = (await axios.post(`/api/user/guestDifficulty/2019`, {
                url: "https://osu.ppy.sh/beatmapsets/809748#osu/1699094",
            })).data;
            if (res.error) {
                this.value = res.error;
            } else {
                this.value = "Success!";
            }
        },
    },
});
</script>

<style lang="scss">
$modes: "storyboard", "mania" , "fruits", "taiko", "standard";

.mode-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow: hidden;
}

.mode-title {
    font-family: 'Lexend Peta';
    font-size: 2rem;
    text-shadow: 0 0 4px white;
    margin: 25px 25px 10px auto;
}

.mode-container {
    width: 100%;
    height: 100%;
    padding: 0 25px;
    overflow: hidden;
}

.mode-selection {
    display: flex;
    align-items: center;
    padding: 10px 25px;
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


.mode-container {
    @include mode-container;

    transition: all 0.25s ease-out;

    border-top-left-radius: 25px;
    &::before {
        content: "";
        display: block;
        position: absolute;
        left: 0px;
        top: 75px;
        width: 100%;
        //full height - mode-title height - mode-selection::before bottom position
        height: calc(100% - 75px - 31px);
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        z-index: -1;
    }

    &__general {
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
                 width: calc(100%);
            }
        }

        &__mode {
            &--#{$mode} {
                background-image: url("../../../CorsaceAssets/img/ayim-mca/#{$mode}.png");

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

.mode-selection {
    @include mode-selection-border;

    transition: all 0.25s ease-out;

    &__mode {
        cursor: pointer;
        width: 45px;
        height: 45px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 100%;
        margin-left: 15px;
        z-index: 0;

        transition: all 0.25s ease-out;
    }

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        right: 0px;
        bottom: 31px;
        border-bottom-left-radius: 25px;
        transition: all 0.25s ease-out;
    }

}
</style>