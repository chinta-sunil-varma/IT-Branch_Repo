function increment(obj)
{
   const compo=document.querySelector('.timer')
   compo.style.color='red'
    compo.innerText=0
    const limit=599
    var start=0
   
    const inter=setInterval(()=>{
        if(limit>=start)
       {compo.innerText=Number(compo.innerText)+1
    
    start=start+1
    }
       else
       {
            clearInterval(this)
            compo.innerText='Done!'
       }
    },1000)
  
    console.log(compo);
}