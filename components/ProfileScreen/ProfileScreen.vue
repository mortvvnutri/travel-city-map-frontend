<template>
  <div class="screen">
    <div class="global-content-screen">
      <close-screen color="rgb(230,230,230)" @click="closeprofile" />
    <div class="profile-screen-bg">
        <div class="topgrad"></div>
    </div>
    <div v-if="!userdata.logged_in" class="pf-login">
        <div class="pf-content-wrap">
            <div v-if="display_login_vs_register" class="pf-form">
                <span class="pf-form-title ns">Вход</span>
                <input id="login_email" type="email" name="email" v-model="userdata.email" placeholder="Email">
                <input id="login_password" type="password" name="password" v-model="userdata.password" placeholder="Password">
                <div class="pf-form-submit ns" @click="form_action('login')">
                    <span v-if="is_loading" class="loader"></span>
                    <span v-else>Вход</span>
                </div>
                <span class="pf-login-toggle ns" @click="display_login_vs_register = !display_login_vs_register">У меня нет аккаунта</span>
            </div>
            <div v-else class="pf-form">
                <span class="pf-form-title">Регистрация</span>
                <input id="register_name" type="text" name="name" v-model="userdata.display_name" placeholder="Ваше имя">
                <input id="register_email" type="email" name="email" v-model="userdata.email" placeholder="Email">
                <input id="register_password" type="password" name="password" v-model="userdata.password" placeholder="Password">
                <input id="register_password2" type="password" name="password2" v-model="userdata.password2" placeholder="Repeat Password">
                <span class="pf-form-comment pwdbad" v-if="userdata.password?.length>0 && userdata.password2?.length>0 && userdata.password!==userdata.password2">Passwords do not match!</span>
                <span class="pf-form-comment pwdgood" v-if="userdata.password?.length>0 && userdata.password2?.length>0 && userdata.password===userdata.password2">Passwords match!</span>
                <div class="pf-form-submit ns" @click="form_action('register')">
                    <span v-if="is_loading" class="loader"></span>
                    <span v-else>Регистрация</span>
                </div>
                <span class="pf-login-toggle ns" @click="display_login_vs_register = !display_login_vs_register">У меня уже есть аккаунт</span>
            </div>
        </div>
    </div>
    <div v-if="userdata.logged_in" class="pf-photoblock">
        <div class='pf-edit-photo' @click="change_photo">
            <img src="~/assets/images/edit.svg" alt="Change your photo">
        </div>
        <input type="file" name="pf-pic" id="pf-pic" hidden value="" @change='photo_change_done' accept=".jpg,.jpeg,.png">
        <div class="pf-photowrap">
            <img :src="userdata.pic" @error='photo_loading_error' alt="Your Profile Picture">
        </div>
        <div class="pf-nameplate">
            <input id="pf_name" @keydown="name_width_recalc" @change="update_name" v-model="userdata.display_name"/>
        </div>
    </div>
    <div v-if="userdata.logged_in" class="pf-content-wrap ns">
        <div class="pf-content">
            <div class="pf-menu" v-for="section in profile_menu_def" :key="section.section_name">
                <div class="pf-section-title">{{section.section_name}}</div>
                <div class="pf-section-items">
                    <div class="pf-item-button" @click="screen_continue(item)" v-for="item in section.items" :key="item.name">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
  import CloseScreen from '~/components/ui/CloseScreen.vue'
  import { ref } from 'vue'
  import DEFAULT_PIC_FALLBACK from '~/assets/images/profile.svg'

  import { useUserStore } from '~/stores/userdata'

  export default {
    components: {CloseScreen},
    setup(props, ctx) {
        const ud = useUserStore()
        const userdata = ref({
            name: "",
            pic: DEFAULT_PIC_FALLBACK
        })

        const is_loading = ref(false)

        const display_login_vs_register = ref(true)

        const profile_menu_def = [
            {
                section_name: "Быстрые действия",
                items:[
                    {
                        name: "Заказать такси",
                        screen: "taxi-order"
                    },
                    {
                        name: "Отели рядом",
                        screen: "hotels"
                    },
                ]
            },
            {
                section_name: "Моя активность",
                items:[
                    {
                        name: "Мои маршруты",
                        screen: "profile-routes"
                    },
                    {
                        name: "Мои места",
                        screen: "profile-custom-places"
                    },
                    {
                        name: "Мои отзывы и оценки",
                        screen: "profile-reviews"
                    },
                    {
                        name: "История",
                        screen: "profile-history"
                    },
                ]
            },
            {
                section_name: "Аккаунт",
                items:[
                    {
                        name: "Настройки",
                        screen: "profile-settings"
                    },
                    {
                        name: "Пригласить друга",
                        screen: "profile-invite"
                    },
                    {
                        name: "Выход",
                        screen: "profile-logout",
                        click: ()=>{
                            userdata.value = {
                                name: "",
                                pic: DEFAULT_PIC_FALLBACK
                            }
                        }
                    },
                ]
            },
            
        ]

        const closeprofile = () => {
            console.log('hook for closing a profile')
            ctx.emit('screen-close')
        }

        const name_width_recalc = () => {
            let len = document.getElementById("pf_name").value.length + 1
            document.getElementById("pf_name").style.width = `calc(0.8em * ${len})`
        }

        const change_photo = async () => {
            let f_dom = document.getElementById("pf-pic")
            if(!f_dom){
                return
            }
            f_dom.click()
        }

        const photo_change_done = async () => {

        }

        const update_name = async () => {
            console.log('name update request')
        }

        const screen_continue = (menu_item) => {
            if(typeof menu_item.click === 'function'){
                menu_item.click()
                return
            }
            // Default behaivor
            const from = "profile"
            ctx.emit('screen-close')
            ctx.emit('set-screen-type', menu_item.screen)
        }

        const form_action = async (action) => {
            if(is_loading.value){
                return
            }
            console.log('handler for form action:', action)
            userdata.value.display_name = (userdata.value.display_name || "").trim()
            userdata.value.email = (userdata.value.email || "").trim()
            
            let ret_early = false;
            switch (action) {
                case 'register':
                    if(!userdata.value.password || !userdata.value.password2 || userdata.value.password!==userdata.value.password2){
                        // shake password fields
                        document.getElementById(`${action}_password`).classList.add('shakered')
                        document.getElementById(`${action}_password2`).classList.add('shakered')
                        setTimeout(() => {
                            if(!document.getElementById(`${action}_password2`)){
                                // screen switch safeguard
                                return
                            }
                            document.getElementById(`${action}_password`).classList.remove('shakered')
                            document.getElementById(`${action}_password2`).classList.remove('shakered')  
                        }, 1000);
                        ret_early = true
                    }
                    if(userdata.value.email.length<5){
                        // shake email field
                        document.getElementById(`${action}_email`).classList.add('shakered')
                        setTimeout(() => {
                            if(!document.getElementById(`${action}_password2`)){
                                // screen switch safeguard
                                return
                            }
                            document.getElementById(`${action}_email`).classList.remove('shakered')
                        }, 1000);
                        ret_early = true
                    }
                    if(userdata.value.display_name.length<2){
                        // shake name field
                        document.getElementById(`${action}_name`).classList.add('shakered')
                        setTimeout(() => {
                            if(!document.getElementById(`${action}_password2`)){
                                // screen switch safeguard
                                return
                            }
                            document.getElementById(`${action}_name`).classList.remove('shakered')
                        }, 1000);
                        ret_early = true
                    }
                    userdata.value.preferred_cats = ud.firstscreen_cats
                    break;
                case 'login':
                    if(!userdata.value.password || (userdata.value.password?.length || 0)<8){
                        // shake password field
                        document.getElementById(`${action}_password`).classList.add('shakered')
                        setTimeout(() => {
                            if(!document.getElementById(`${action}_password`)){
                                // screen switch safeguard
                                return
                            }
                            document.getElementById(`${action}_password`).classList.remove('shakered')
                        }, 1000);
                        ret_early = true
                    }
                    if(!userdata.value.email || (userdata.value.email.length || 0)<5){
                        // shake email field
                        document.getElementById(`${action}_email`).classList.add('shakered')
                        setTimeout(() => {
                            if(!document.getElementById(`${action}_password`)){
                                // screen switch safeguard
                                return
                            }
                            document.getElementById(`${action}_email`).classList.remove('shakered')
                        }, 1000);
                        ret_early = true
                    }
                    break;
                default:
                    break;
            }
            if(ret_early){
                return
            }

            // transform data to api format
            userdata.value.pwd = userdata.value.password

            is_loading.value = true

            let resp = await ud.wrapApi(`user/${action}`, true, {
                user_initiator:userdata.value
            })
            is_loading.value = false
            if(resp.error){
                // @TODO: display an error toast
                console.error(`${action} API error:`, resp.error)
            } else {
                // we are good
                userdata.value = resp.user
                userdata.value.logged_in = true
            }
        }

        return { 
            closeprofile,
            name_width_recalc,
            change_photo,
            update_name,
            userdata,
            profile_menu_def,
            screen_continue,
            display_login_vs_register,
            form_action,
            photo_change_done,
            is_loading
        }
    },
    mounted() {
        if(this.userdata.logged_in){
            let len = document.getElementById("pf_name").value.length + 1
            document.getElementById("pf_name").style.width = `calc(0.8em * ${len})`
        }
    },
    methods: {
        photo_loading_error(){
            console.log('photo_loading_error triggered')
            this.userdata.pic = DEFAULT_PIC_FALLBACK
        }
    },
  }
</script>

<style lang="scss">
 @mixin keyframes($name) {
    @keyframes #{$name} {
      @content;
    }
  }

  @mixin animate($animation, $duration, $method, $times) {
    animation: $animation $duration $method $times;
  }
  
.pf-login{
    position: relative;
    z-index: 5;
    margin-bottom: 10vh; // accomodate firefox-like rendering
}

.shakered{
     @include keyframes(shakered){
       0%{
        transform: translate(0em, 0em);
        }
        16%{
            transform: translate(0.3em, 0em);
        }
        33%{
            transform: translate(-0.6em, 0em);
        }
        50%{
            transform: translate(0.6em, 0em);
        }
        66%{
            transform: translate(-0.3em, 0em);
        }
        84%{
            transform: translate(0.3em, 0em);
        }
        100%{
            transform: translate(0em, 0em);
        }
    };
    @include animate(shakered, 0.5s, linear, 1);
    border-color: #b91313d3 !important;
    background-color: rgba(177, 1, 1, 0.527) !important;
}

.pf-form{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    input{
        text-align: center;
        border: solid white 3px;
        border-radius: 0.5rem;
        font-size: 1rem;
        background: white;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15);
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        padding: 0.1rem;
    }

    .input:focus, input:focus-visible{
        outline: solid rgba(0, 0, 0, 0.25) 3px;
    }

    .pf-form-submit{
        margin-top: 1rem;
        padding: 0.5rem;
        width: 100%;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        background-image: linear-gradient(39deg, #fcc879 0%, #fe8f7e 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-inline: auto;
        cursor: pointer;
        transition: filter 200ms cubic-bezier(.86,0,.07,1), transform 200ms cubic-bezier(.86,0,.07,1);
    }

    .pf-form-submit:hover{
        filter: hue-rotate(-50deg);
        transform: scale(1.03);
    }
    .pf-form-submit:active{
        filter: hue-rotate(-20deg);
        transform: scale(0.99);
    }

    .pf-login-toggle{
        margin-top: 1rem;
        cursor: pointer;
        font-size: 0.8rem;
    }

    .pf-login-toggle:hover{
        text-decoration: underline;
    }

    .pf-form-title{
        font-size: 30px;
        font-weight: 500;
        opacity: 0.8;
    }
}

.global-content-screen{
    position: relative;
    overflow: hidden;
    overflow-y: auto;
}

.profile-screen-bg{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    z-index: 0;
    .topgrad{
        position: relative;
        height: 20vh;
        background-image: linear-gradient(-135deg, #9e71f9, #8854f0);
        z-index: -1;
    }
}

.pf-menu{
    width: 100%;
    position: relative;
    z-index: 5;

    .pf-section-title{
        width: 100%;
        text-align: left;
        font-size: 25px;
        font-weight: 600;
        opacity: 0.6;
        border: 10px solid;
        border-image-slice: 1;
        border-width: 2px;
        border-image-source: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.21), transparent);
        border-left: 0;
        border-right: 0;
        border-top: 0;
    }

    .pf-section-items{
        margin-bottom: 16px;
    }

    .pf-item-button{
        cursor: pointer;
        margin-left: 0.5rem;
        background: white;
        width: 100%;
        padding: 0.4rem;
        padding-inline: 0.8rem;
        margin-bottom: 0.3rem;
        border-radius: 0.4rem;
        font-weight: 500;
        box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.15);
        transition:
            transform 100ms cubic-bezier(.86,0,.07,1),
            background 100ms cubic-bezier(.86,0,.07,1),
            font-weight 100ms cubic-bezier(.86,0,.07,1);
    }

    .pf-item-button:hover{
        transform: scale(1.02);
        font-weight: 600;
        background: #f1eaff;
    }
    .pf-item-button:active{
        transform: scale(0.995);
        font-weight: 600;
    }
}

.pf-content-wrap{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 290px;
    .pf-content{
        width: 90vw;
        max-width: 30rem;
        margin-bottom: 10vh; // accomodate firefox-like rendering
    }
}

  .screen {
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 5;

    &-close {
      position: absolute;
      top: 46px;
      right: 16px;
    }
    &-container {
      padding-block: 16px;
      z-index: 6;

      .content {
        margin-top: 20px;
        margin-bottom: 20px;
        height: calc(100vh - 100px);
        overflow-y: auto;
      }
    }
  }

  .pf-photoblock {
    position: absolute;
    z-index: 5;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: calc(20vh - 45px);
  }

  .pf-edit-photo{
    position: absolute;
    background: #F5F5F5;
    width: 25px;
    height: 25px;
    display: flex;
    top: 8px;
    left: calc(50% + 25px);
    align-items: center;
    justify-content:center;
    border-radius: 100%;
    cursor: pointer;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
    transition: transform 200ms cubic-bezier(.86,0,.07,1);
    img {
        width: 14px;
        margin-top: 1px;
        pointer-events: none;
    }
  }

  .pf-edit-photo:hover{
    transform: scale(1.1);
  }

  .pf-photowrap{
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
  }

  .pf-nameplate{
    margin-top: 6px;
    font-weight: 600;
    color: #272727;
    input{
        text-align: center;
        border: none;
        background: transparent;
        color: inherit;
        font-weight:inherit;
        border-radius: 0.3rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        min-width: 6em;
        max-width: 90vw;
        transition:
            outline 200ms cubic-bezier(.86,0,.07,1),
            background 100ms cubic-bezier(.86,0,.07,1);
    }
    input:focus{
        outline: solid #909090 2px;
        background: rgb(219, 219, 219);
    }
  }

  .divider {
    margin-top: 12px;
    padding-bottom: 12px;
    padding-top: 12px;
  }
  .divider:not(:last-child) {
    border-bottom: 1px solid rgba(120 120 120 / 15%);
  }
</style>
