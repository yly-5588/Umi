//配置中心接口逻辑mock接口
import mockjs from 'mockjs'

let datalist = mockjs.mock({
    code: 200,
    msg: '配置中心列表加载成功',
    'data|50': [
        {
            'key|+1': 1,
            code: '@integer',
            name: '@name',
            apply: '',
            time: '@date',
            create_user: '@name',
            update_time: '@date',
            update_user: '@name',
            operator: ''
        }
    ]

})

let datalist1 = mockjs.mock({
    code: 200,
    msg: '配置中心列表加载成功',
    'data|50': [
        {
            'key|+1': 1,
            field_name: '@integer',
            filed_alias: '@name',
            filed_type: '',
            input_method: '@date',
            allow_empty: '@name',
            default: '@date',
            operator: ''
        }
    ]

})
export default {
    'GET  /classes/set': datalist,
    'DELETE /classes/set': (req, res) => {
        console.log(req.query);
        let { id } = req.query

        for (let i = 0; i < datalist.data.length; i++) {
            // console.log('打印')
            // console.log(id)
            // console.log(datalist.data[i].key)
            if (datalist.data[i].key == id) {
                datalist.data.splice(i, 1)
                res.send({
                    code: 200,
                    msg: '删除成功'
                })
                return
            }
        }
        res.send({
            code: 201,
            msg: '删除失败'
        })
    }
}