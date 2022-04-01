const keys  = document.querySelectorAll(".key");
const whites= document.querySelectorAll(".key.white");
const blacks= document.querySelectorAll(".key.black");
let playsound= (key) => {
    const notesound=document.getElementById(key.dataset.note);
    notesound.currentTime=0;
    console.log(notesound);
    notesound.play();
    key.classList.add("active")
    // notesound.addEventListener('ended', () => {
    //     key.classList.remove("active")
    // })
    setTimeout(()=>
    {
        key.classList.remove("active")
    },400)
    key.classList.remove("mouseon")
};
let colour= (key) => 
{
    key.classList.add("mouseon")
}
//     setTimeout(()=>
//     {
//         key.classList.remove("mouseon")
//     },100)
// }
let point= (key) => 
{
    // key.classList.add("mouseoutt");
    key.classList.remove("mouseon");
};
keys.forEach((key) => {
       key.addEventListener('mouseover', () => colour(key));
       key.addEventListener('mouseout',() => point(key));
       key.addEventListener('click', () => playsound(key));
});
