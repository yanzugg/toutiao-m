<template>
    <div class="update-photo">
      <img class="img" ref="img" :src="img"/>
     
     <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="confirm">完成</div>
     </div>
    </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
name:'UpdatePhoto',
   data() {
      return {
        cropper:null
      }
   },
   created(){
   },
   components:{
   },
   props:{
    img:{
      type:[String,Object],
      required:true
    }
   },
   watch:{
   },
   mounted(){
    const image = this.$refs.img
    this.cropper = new Cropper(image,{
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
   },
   computed:{
   },
   methods:{
    onConfrim(){
      this.cropper.getCroppedCanvas().toBlob(blob=>{
        
       this.updateUserPhoto(blob)
      })
    },
   async updateUserPhoto(blob){
     this.$toast.loading({
         message:'修改中...',
         forbidClick:true,
         duration:0
      })
      try {
         const fromData = new FormData()
         fromData.append('photo',blob)

        const {data} = await updateUserPhoto(formData)

        this.$emit('close')
        this.$emit('update-photo',data.data.photo)
        this.$toast.success('修改成功')
      } catch (err) {
          this.$toast.fail('修改失败')
      }
        
    }
   },
}
</script>
<style lang="less" scoped>
.update-photo{
  background-color: #000;
  height: 100%;
  .toolbar{
     position: fixed;
     left: 0;
     right:0;
     bottom:0;
     display: flex;
     justify-content: space-between;
     .cancel,.confirm{
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color:#fff;
     }
  }
}
.img{
  display: block;
  max-width: 100%;
}
</style>
