const axios = require('axios');
axios.defaults.withCredentials = true;

module.exports = {
    consumer: consumerModel()
}

function consumerModel(){                        
    var cookie_bridge = "s%3Awr5fJibG7QCkWPlT2ke1jUv2OyCnY0oF.vOXMi0v05nGdvdr09R3igPtoFg%2B7QRnSPsNYs8NsQlA"
    var cookie_user = "eyJraWQiOiIycmg1bDVvdUs2SGw4YmlWK1lPeUtDVkRIdm5wSVA1ZmRvajIwazBNMDRNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyMWEwZWZmMS1lN2UzLTRmY2QtODlmZi04ZWQxNTNhZGRmZDciLCJjb2duaXRvOmdyb3VwcyI6WyJ0ZWFjaGVyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1hkNGlLaEp5diIsImNsaWVudF9pZCI6IjUxcDhkdmRtdW5rNjhoNTdiazFmYTlnMWdtIiwib3JpZ2luX2p0aSI6ImExZGFhN2IwLTFhYWEtNGJiMS05Nzg1LWY2MmFjYzJmNGYxYyIsImV2ZW50X2lkIjoiZjQ5ZWQ5ZTItYTc1Zi00ZjBmLTkwODEtNTJjZmY3ZmE0OGE1IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY3ODgyMzEwNCwiZXhwIjoxNjc4OTAxMDg1LCJpYXQiOjE2Nzg4OTc0ODUsImp0aSI6IjkxNTU4ODIwLWY4MmItNDYwZi1iMTg1LWNlNGI4NDg3Njk2YiIsInVzZXJuYW1lIjoiNTM5NTdiNDctNDNmZC00YWVhLWJkMTMtZmI0YWViY2FmODI1In0.N7Ux4SiLqSuRdzufHqEaiWDY6nVomum6A1fYJtSsrYLdY9ScrfnD7wora7IMSI8xhkSb7Cs9QYst9K4YlASS_OjpXnLKq7rz8OKn-Zc3ZQPnglqYB5UGfvFUUbka2LFNlyjhg_YieUVv3KhTc0y7xjgMKD01hrG4c8SSvza1sRX09dHR8GuCgzlfLm3YG7Yh88mAq8S6LitUF7dX9MSbWbVyri4WURQ9UDvHPNVhntT978TQOegVCk6GiCcMJIxfLqWRC0YMIvWpc8XQeHSqZWt-AvyjxHNEgkQFFnhOFIwL6CpkwiqvfboHarIQBn3WBELfivfshLWrpuVrfLnSDA"
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
    return{tocken, health, annotableDoc, annotations, findannotable, findmultiannotable, findlistannotations}


    function health(req, cb){
        console.log(Newpayload)
        axios.get(`http://localhost:3000/engine/health`).then((result)=>{
            setImmediate(()=>{
                cb(null, result.status)
            })
        }).catch((err)=>{
            setImmediate(()=>{
                cb(err, null)
            })
        })
    }


    function tocken(req, cb){
        axios.post('https://ap3liyhe0i.execute-api.us-east-1.amazonaws.com/v1/auth/i/passwordless').then((result)=>{
            setImmediate(()=>{
                cb(null, result)
            })
        })    
    }


    function annotations(req, cb){
        axios.post('http://localhost:3000/engine/annotations',
        {
            
                "annotations": [
                  {
                    "annotationContent": `hi! This is the new payload: ${Newpayload} `,
                    "annotableDocumentId": "fe2920fe-2033-458a-81a3-e7baa6439ca5"
                  }
                ]           
        }, {
            headers : {
                "gm-platform" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJpZCI6ImRpZ2l0YWwifX0.qjL312eo8te1ZTx0ADkpryf0QQU_k8kdcBpjI2vsc6c",
                "enrollment-period" : "6bcd224b-ac93-4f43-beed-c4f346a808b9",  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }
        }).then((response)=>{
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
        axios.post('http://localhost:3000/engine/annotableDocuments.save',  {
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
                "enrollment-period" : "6bcd224b-ac93-4f43-beed-c4f346a808b9",  // from Fetch/XHR
                Cookie : `greatminds.lti-bridge=${cookie_bridge}; active_role=teacher; user=${cookie_user};`
            }
        }).then((data)=>{
            setImmediate(()=>{
                cb(null, data.statusText)
            })
        }).catch((err)=>{
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



}