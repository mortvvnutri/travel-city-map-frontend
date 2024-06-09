<template>
    <div class="ro-card">
        <div class="ro-duration">{{dur}}</div>
        <div class="ro-point">
            <img :src="ro_icon" alt="Начальная точка">
            <div class="ro-point-name">{{first_point_name}}</div>
        </div>
        <div class="ro-transition">
            <img :src="ro_arrow" alt="Дистанция маршрута">
            <div class="ro-transition-distance">{{dist}}</div>
        </div>
        <div class="ro-point">
            <img :src="ro_icon" alt="Конечная точка">
            <div class="ro-point-name">{{last_point_name}}</div>
        </div>
    </div>
</template>
<script>

import ro_icon from '~/assets/images/marker_orange.svg'
import ro_arrow from '~/assets/images/route_arrow.svg'
import {ref, computed} from 'vue'

import { trim } from '~/services/misc/utils'

export default {
    props:['data', 'points'],
    components:{},
    setup(props, ctx) {
        const dist = computed(()=>{
            return props?.data?.distance?.text || "?? км"
        })

        const dur = computed(()=>{
            return props?.data?.durationInTraffic?.text || (props?.data?.duration?.text || "?? мин")
        })

        const first_point_name = computed(()=>{
            let ret = "Я"
            if(props?.points?.length>0){
                return props.points[0].name || "Я"
            }
            return trim(ret, 5)
        })
        const last_point_name = computed(()=>{
            let ret = "?"
            if(props?.points?.length>0){
                let l = props.points.length
                return props.points[l-1].name || "?"
            }
            return trim(ret, 5)
        })
        return {ro_icon, ro_arrow, dist, dur, first_point_name, last_point_name}
    },
    mounted() {
        
    },
}
</script>
<style lang="scss">
    .ro-card{
        background: rgba(255,255,255,0.3);
        backdrop-filter: blur(5px) saturate(0.8) brightness(1.2);
        border-radius: 0.3rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:center;
        align-items:center;
        padding-top: 1rem;
        padding-bottom: 1rem;

        .ro-duration{
            font-size: 0.8rem;
            color: rgba(0,0,0,0.8);
        }

        .ro-transition{
            margin-top: 1.2rem;
            margin-left: 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content:center;
            .ro-transition-distance{
                font-size: 0.8rem;
                color: rgba(0,0,0,0.8);
            }
        }

        .ro-point{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content:center;
            align-items:center;
            margin-left: 0.8rem;
            .ro-point-name{
                font-size: 0.8rem;
                margin-left: 0.4rem;
            }
        }
    }
</style>