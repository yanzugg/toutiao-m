<template>
    <div class='user-profile'>
      <van-nav-bar
      class="page-nav-bar"
         title="个人信息"
          left-arrow
         @click-left="$router.back()"
      />

      <input type="file" hidden ref="file" @change="onFileChange">

      <van-cell title="头像" is-link  @click="$refs.file.click()" >
         <van-image
         class="avatar"
         round
         fit="cover"
        :src="user.photo"
       
       />
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name"   @click="isUpdateNameShow=true"/>
      <van-cell title="性别" @click="isUpdateGenderShow=true" is-link :value="user.gender===1 ? '男' : '女'" />
      <van-cell title="生日" is-link :value="user.birthday" @click="isUpdateBirthdayShow=true"/>

      <van-popup v-model="isUpdateNameShow" style="height:100%;" position="bottom" round>
        <UpdateName v-if="isUpdateNameShow" @close="isUpdateNameShow=false" v-model="user.name"></UpdateName>
      </van-popup>

        <van-popup  v-model="isUpdateGenderShow"  position="bottom" round>
        <UpdateGender v-if="isUpdateGenderShow" @close="isUpdateGenderShow=false" v-model="user.gender"></UpdateGender>
      </van-popup>

      <van-popup  v-model="isUpdateBirthdayShow"  position="bottom" round>
        <UpdateBirthday v-if="isUpdateBirthdayShow" @close="isUpdateBirthdayShow=false" v-model="user.birthday"></UpdateBirthday>
      </van-popup>

      <van-popup  v-model="isUpdatePhotoShow" style="height:100%;"  position="bottom" round>
        <UpdatePhoto v-if="isUpdatePhotoShow" :img="img" @close="isUpdatePhotoShow=false" @update-photo="user.photo=$event"></UpdatePhoto>
      </van-popup>
    </div>
</template>
<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
name:'UserProfile',
   data() {
      return {
         user:{},
         isUpdateNameShow:false,
         isUpdateGenderShow:false,
         isUpdateBirthdayShow:false,
         isUpdatePhotoShow:false,
         img:null
      }
   },
   created(){
      this.loadUserProfile()
   },
   components:{
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
},
   props:{
   },
   watch:{
   },
   mounted(){
   },
   computed:{
   },
   methods:{
     async loadUserProfile(){
      try {
         const {data} = await getUserProfile()
         console.log(data)
         this.user = data.data
      } catch (err) {
          this.$toast('获取失败')
      }
     },
     onFileChange(){
      const file = this.$refs.file.files[0]

     this.img = window.URL.createObjectURL(file)
    
       this.isUpdatePhotoShow=true

       this.$refs.file.value = ''
     }
   },
}
</script>
<style lang="less" scoped>
 .user-profile{
   .avatar{
      width: 60px;
      height:60px;
   }
   .van-popup{
      background-color: #f5f7f9;
   }
 }
</style>
