import {request} from 'umi'

const stuGet=()=>{
    return request('/classes/set',{method:'GET'})
  } 


export default stuGet;