import axios from 'axios'
import { error } from 'console'
import { YANDEX_API_KEY } from "~/services/misc/constants"

export const trim=(s:string,n:number)=>s.length<=n?s:((n<=3)?s.slice(0,n):s.slice(0,n-3))+"..."

function getObjectKeyWithExpectedSet(i_obj:object, keys:string[]) {
    for (const e_k of keys) {
        if(Object.keys(i_obj).includes(e_k)){
            return e_k
        }
    }
    return
}

export async function GetRouteDetails(points: any, mode = 'driving') {
    // prep values
    let waypoints = undefined
    if (Array.isArray(points)) {
        // potential raw values
        
    }

    switch (true) {
        case Array.isArray(points):
            // potential raw values, expects [[lat1, long1], [lat2, long2]]
            let format1_valid = points.every(e => {
                if (Array.isArray(e)) {
                    return e.every(x => typeof x === 'number') && e.length === 2
                }
                return false
            })
            if(format1_valid){
                waypoints = points.map(e=>`${e[0]},${e[1]}`).join("|")
                break;
            }
            
            // potential array of objects
            if(points.every(e=>typeof e === 'object')){
                let k_lat
                let k_long
                let format2_valid = points.every(e=>{
                    k_lat = getObjectKeyWithExpectedSet(e, ['lat', 'Lat', 'Latitude', 'latitude'])
                    k_long = getObjectKeyWithExpectedSet(e, ['long', 'Long', 'Longitude', 'longitude'])
                    // if both keys exist
                    if(k_lat!==undefined && k_long !== undefined){
                        // check type of data in them
                        if([typeof e[k_lat], typeof e[k_long]].every(v=>v==='number')){
                            // data valid
                            return true
                        }
                    }
                    return false
                })

                if(format2_valid){
                    waypoints = points.map(e=>{
                        k_lat = getObjectKeyWithExpectedSet(e, ['lat', 'Lat', 'Latitude', 'latitude']) || "lat"
                        k_long = getObjectKeyWithExpectedSet(e, ['long', 'Long', 'Longitude', 'longitude']) || "long"
                        return `${e[k_lat]},${e[k_long]}`
                    }).join("|")
                    break;
                }
            } 
            // no break to fall through to default
        default:
            return {
                error:"Input data cannot be interpreted",
                error_obj: points
            }
            break;
    }

    try {
        let resp = await axios({
            method: 'get',
            url: `https://api.routing.yandex.net/v2/route?apikey=${YANDEX_API_KEY}&waypoints=${waypoints}&mode=${mode}`,
            headers: {
                accept: "application/json"
            }
        })
        if(resp.data){
            return resp.data
        } else {
            return {
                error: "Unable to retrieve data",
                error_obj: resp
            }
        }
    } catch (error) {
        return {
            error: "Could not get route details",
            error_obj: error,
        }
    }
}