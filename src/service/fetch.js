import config  from '@/config'

function myFetch(option){
    let url = option.url;
    let  method = option.method ? option.method : 'POST';
    let data = option.data ? option.data : {};

    return new Promise((res,rej)=>{
        fetch(config.baseUrl + url,{
            method: method,
            mode: 'cors',
            
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data,
            
        }).then((response) => {
            
            if (response.ok) {  
                return response.json();  
            } else {  
                rej({status:response.status})  
            }  
          }).then(
            (myBlob)=>{
                console.log(myBlob);
                res(myBlob.msg.data)
            }
        ).catch(
            function(error){
                console.log(error)
                rej(error)
            }
        )
    })
}

export default myFetch