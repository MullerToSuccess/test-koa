let prettyRes = new class{
    constructor(){
        this.response = {
            code: '',
            data: {},
            msg: ''
        },
        this.StatusCode = new Map()
        this.
    }
    registerStatusCode(code, description){
        this.StatusCode.set(code, description)
    }
    registerStatusCodes(arr){
        for(let [code, description] of arr){
            this.StatusCode.set(code, description)
        }
    }
    set(data, code = '0', msg){
        code = code.toString()
        if(this.StatusCode.has(code)){
            return {
                code,
                data,
                msg: this.StatusCode.get(code)
            }
        }else{
            return {
                code,
                data,
                msg:msg||"Unresolvable Status Code :"+code
            }
        }
    }
    error(code = '-1', msg){
        code = code.toString()
        if(this.StatusCode.has(code)){
            return {
                code,
                data,
                msg: this.StatusCode.get(code)
            }
        }else{
            return {
                code,
                data,
                msg:msg||"Unresolvable Status Code :"+code
            }
        }
    }
}()

prettyRes.registerStatusCode([
    ['404', 'NotFound'],
    ['200', 'success'],
    // ['1', '']
])

export default prettyRes