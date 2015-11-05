import reqwest from 'reqwest-without-xhr2'

function ajax(options){
    return reqwest.compat(options)
}

export default ajax