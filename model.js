const axios = require('axios');
axios.defaults.withCredentials = true;

module.exports = {
    consumer: consumerModel()
}

function setEnv(reqEnv){
    switch(reqEnv){
        case 'local':
            EndPoint = "http://localhost:3000/engine"
            break
        case 'dev':
            EndPoint = "https://digital.dev.greatminds.dev/annotations/api"
            break
        default :
            EndPoint = "none"
    }
    return EndPoint
}

function consumerModel(){           
    // First set this values before to consume enpoints:             
    var cookie_bridge = "s%3AhjssdMgK6wYB5pITs_Ka6UFxe5hxsNSc.RC6HiuABCNTIAlWcLI189T77NRQeX9qu8bC5%2FPZRlZI"
    var cookie_user = "eyJraWQiOiJzREoxS1RyNzMrSUxoMmc1YnZuYWZVbnVyS0V1Z0QxRWZ4WW5DXC85WVlIbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjMGE2MjhjNi03MDRlLTQ4M2QtODNkNC05YWVkMGRjMmE0YWUiLCJjb2duaXRvOmdyb3VwcyI6WyJ0ZWFjaGVyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1hhd3N1UFNiNSIsImNsaWVudF9pZCI6IjM4cDVwbW12YjE4MmlsZ2R0c252b2VvZGRsIiwib3JpZ2luX2p0aSI6ImYzMWFjOWRkLTBkOGYtNDk4OC05YTZhLTc0M2JjMzJjY2FmOSIsImV2ZW50X2lkIjoiZTVlNmMzMGYtYzI2MS00N2UxLWFmMzUtNDc2OWI3OWEyMTM5IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3ODk4MTQ3MCwiZXhwIjoxNjc4OTg1MDY5LCJpYXQiOjE2Nzg5ODE0NzAsImp0aSI6IjUyN2I5OWE3LTIyY2QtNGE0Ny05MjMzLTY5MTE5ZmRlNjNiNiIsInVzZXJuYW1lIjoiYjgwZmU2YzUtMDUwYy00YjBhLTlhYTctNmVkZjdiYmRjOTAyIn0.C54Up9GBiaDeTOaJ7n7gSFrLafLBGnsOPpUR9nz3BB3p-UD8Xu7eBNQHkN8PTeKNehX0isxncgu1Rv9DiD3E7csqjRuujNHhZQfT9Z7kCoRBHV6YTfXvmazx_3GQ1jUl4n5DEveGyPA-pehkfKwXrhocqrE8LzZ_YIob5cy3hzsF_h9xIdaI74lt4jPrTisbpwbAFP1oZ6Ty6T6zNhuxVx-zF6GysLxMscIE4VNlc-KWkek3du_VNAldZPLT8KZG8h55dA2e5qXkYwRX7mFq8JE0Ru4u9klwtx-4JLgttU42Iq4yezkUGd085VaOdqoitEP9YVxIikxM3Cbo3XdT5Q"
    var enrollPeriod = "ade51b25-1279-4af5-90ff-9db25a0f84d8" // = This is Dev, for local use: 6bcd224b-ac93-4f43-beed-c4f346a808b9
    // **
    var Newpayload = `{
        "metadata": {
          "resolution": "1920x1080",
          "zoomLevel": 1.5,
          "device": "MacBook Pro",
          "timestamp": "2022-03-01T12:34:56Z",
          "version": "1.0"
        },
        "attrs": {
          "width": 1000,
          "height": 1000
        },
        "className": "Stage",
        "children": [
          {
            "attrs": {},
            "className": "Layer",
            "children": [
              {
                "attrs": {
                  "stroke": "#df4b26",
                  "strokeWidth": 5,
                  "lineCap": "round",
                  "lineJoin": "round",
                  "points": [
                    205,
                    194,
                    205,
                    194
                  ]
                },
                "className": "Line"
              }
            ]
          }
        ]
    }`
    return{tocken, health, annotableDoc, annotations, findannotable, findmultiannotable, findlistannotations, findannotabledoc}


    function health(req, cb){
        var EndPoint = setEnv(req.query.env)
        if(EndPoint === "none"){
            setImmediate(()=>{
                cb("Unsupported environment", null)
            })          
            return      
        }
        axios.get(`${EndPoint}/health`).then((result)=>{
            setImmediate(()=>{
                cb(null, result.status)
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb(err, null)
            })
        })
    }


    function tocken(req, cb){  //  ** I develop, not available yet.
        axios.post('https://ap3liyhe0i.execute-api.us-east-1.amazonaws.com/v1/auth/i/passwordless').then((result)=>{
            setImmediate(()=>{
                cb(null, result)
            })
        })    
    }


    function annotations(req, cb){
        var EndPoint = setEnv(req.query.env)
        if(EndPoint === "none"){
            setImmediate(()=>{
                cb("Unsupported environment", null)
            })          
            return      
        }
        axios.post(`${EndPoint}/annotations`,
        {
                "annotations": [
                  {
                    "annotationContent": `hi! This is the new payload: ${Newpayload} `,
                    "annotableDocumentId": "590e95d0-d8c8-4fc3-b24c-fc436505d278" // = Dev, In local "5f5e4d7a-df1f-4c3f-8509-470c7fa12983" //"fe2920fe-2033-458a-81a3-e7baa6439ca5"
                  }
                ]           
        }, {
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : enrollPeriod,  // Obtain from Fetch/XHR in browser
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }
        }).then((response)=>{
            console.log(response.data)
            setImmediate(()=>{
                cb(null, "Record Save.")
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb('Status ' + err + ' : ' + err.response.data.errors[0].details.message, null)
            })
        })
    }


    function annotableDoc(req, cb){
        var EndPoint = setEnv(req.query.env)
        if(EndPoint === "none"){
            setImmediate(()=>{
                cb("Unsupported environment", null)
            })
            return      
        }
        axios.post(`${EndPoint}/annotableDocuments.save`,  {
                "annotableDocuments":  [
                    {          
                        ownerId: "42279ea6-bd17-490c-86bd-a9910c3d48a8", // Postman Autho
                        contentId: `e4bc2d77-f748-4e85-844c-771ad7d4e85f`,
                        contextId: "4f84e32b-0d53-4903-811d-70d1bf3e31ca"  // Obtain contextId : "4f84e32b-0d53-4903-811d-70d1bf3e31ca"
                    }
                ]
            
        }, {
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : enrollPeriod,  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }
        }).then((data)=>{
            console.log(data.data)
            setImmediate(()=>{
                cb(null, data.statusText)
            })
        }).catch((err)=>{
            console.log(err)
            setImmediate(()=>{
                cb('Status ' + err + ' : ' + err.response.data.errors[0].details.message, null)
            })
        })
    }


    function findannotable(req, cb){
        axios.get('http://localhost:3000/engine/annotableDocuments/fe2920fe-2033-458a-81a3-e7baa6439ca5', {
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : "6bcd224b-ac93-4f43-beed-c4f346a808b9",  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }  // Request failed with status code 403 : Forbidden resource  
        }).then((data)=>{
            console.log(data)
            setImmediate(()=>{
                cb(null, data.statusText)
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb('Status ' + err + ' : ' + err.response.data.errors[0].details.message, null)
            })
        })
    }


    function findmultiannotable(req, cb){
        axios.get('http://localhost:3000/engine/annotableDocuments.findByIds', {
            params:{
                "documentIds": [
                    "fe2920fe-2033-458a-81a3-e7baa6439ca5"
                ]    
            },
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : "6bcd224b-ac93-4f43-beed-c4f346a808b9",  // from Fetch/XHR                                   
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }
        }).then((data)=>{
            console.log(data.data)
            setImmediate(()=>{
                cb(null, data.data)
            })
        }).catch((err)=>{

            console.log(err.response.data.errors)

            setImmediate(()=>{
                cb('Status ' + err , null)                   
            })
        })
    }


    function findlistannotations(req, cb){
        axios.get('http://localhost:3000/engine/annotations.findById', {
            params:{
                "documentIds": [
                    "62ee7f82-ac5d-4ecf-880c-b0ec9df6c131"
                ],
                "annotableDocumentId" : "fe2920fe-2033-458a-81a3-e7baa6439ca5"
            },
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : "6bcd224b-ac93-4f43-beed-c4f346a808b9",  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }  // Request failed with status code 403
        }).then((data)=>{
            console.log(data.data)
            setImmediate(()=>{
                cb(null, data.data)
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb('Status ' + err , null)                   
            })
        })
    }

    
    function findannotabledoc(req, cb){
        var EndPoint = setEnv(req.query.env)
        if(EndPoint === "none"){
            setImmediate(()=>{
                cb("Unsupported environment", null)
            })
            return      
        }
        axios.get(`${EndPoint}/annotations.findByAnnotableDocument`, {
            params:{
                "documentId": "5f5e4d7a-df1f-4c3f-8509-470c7fa12983"
            },
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : enrollPeriod,  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }  
        }).then((data)=>{
            console.log(data)
            setImmediate(()=>{
                cb(null, data.data)
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb('Status ' + err , null)                   
            })
        })
    }


}