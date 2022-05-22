<template>
  <div>
    <iframe style=" marginheight:400px; height: 500px;width: 100%"  :src="externalUrl"
            longdesc="w3s.txt">
    </iframe>
  </div>
</template>

<script >
import {onMounted, ref} from "vue";

export default {
  name: 'ExternalPage',
  props: {
    codeStr: {
      type: String,
    },
  },
  setup(props, context){
    const  externalUrl=ref();

    onMounted(()=>{
      externalUrl.value='https://finance.sina.com.cn/realstock/company/'+props.codeStr+'/nc.shtml';
    })
    return{
      externalUrl,
    }
  }

}

</script>
