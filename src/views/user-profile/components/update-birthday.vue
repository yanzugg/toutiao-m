<template>
    <div class='update-birthday'>
     <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onComfirm"
      />
     
    </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
name:'UpdateBirthday',
   data() {
      return {
       minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
    async onComfirm(){
      this.$toast.loading({
         message:'修改中...',
         forbidClick:true,
         duration:0
      })
      try {
          const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        
        await updateUserProfile({
            birthday:currentDate
          })
          this.$emit('input',currentDate)
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

</style>
