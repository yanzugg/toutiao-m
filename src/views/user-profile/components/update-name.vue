<template>
    <div class='update-name'>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
     @click-left="$emit('close')"
     @click-right="onUpdate"
   />

    <div class="filed-wrap">
   <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
      />
    </div>
   
    </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
name:'UpdateName',
   data() {
      return {
         localName:this.value
      }
   },
   created(){
   },
   components:{
   },
   props:{
      value:{
         type:String,
         required:true
      }
   },
   watch:{
   },
   mounted(){
   },
   computed:{
   },
   methods:{
     async onUpdate(){
      this.$toast.loading({
         message:'修改中...',
         forbidClick:true,
         duration:0
      })
       try {
          const localName = this.localName
          if(!localName.length){
            this.$toast('昵称不能为空')
            return
          }
        await updateUserProfile({
            name:localName
          })
          this.$emit('input',localName)
          this.$emit('close')
           this.$toast.success('修改成功')

       } catch (err) {
           this.$toast.fail('更新失败')
       }
     }
   },
}
</script>
<style lang="less" scoped>
 .filed-wrap{
   padding:20px;
 }
</style>
