<template>
    <div class='update-gender'>
    <van-picker
      show-toolbar
      title="设置性别"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfim"
      @change="onPickerChange"
    />
    </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
name:'UpdateGender',
   data() {
      return {
         columns: ['男', '女'],
         localGender:this.value
      }
   },
   created(){
   },
   components:{
   },
   props:{
    value:{
      type:Number,
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
    async onConfim(){
      this.$toast.loading({
         message:'修改中...',
         forbidClick:true,
         duration:0
      })
      try {
          const localGender = this.localGender  
        
        await updateUserProfile({
            gender:localGender
          })
          this.$emit('input',localGender)
          this.$emit('close')
           this.$toast.success('修改成功')

       } catch (err) {
           this.$toast.fail('更新失败')
       }
    },
     onPickerChange(picker, value, index){
        this.localGender = index
    },
   },
}
</script>
<style lang="less" scoped>

</style>
