let list = [];
let i = 0;
const input = document.getElementById("saveInput");
input.addEventListener("click", saveIn);

const save_Tab = document.getElementById("saveTab");
save_Tab.addEventListener("click", saveTab);

const clearLast = document.getElementById("clear");
clearLast.addEventListener("click", clear);

const ourdiv = document.getElementById("list");


const leadsInLocalStorage = localStorage.getItem('bookMark');

if (leadsInLocalStorage) {
    list = JSON.parse(localStorage.getItem('bookMark'));
    let lis = ``;
    for (let j = 0; j < list.length; j++) 
    {
        lis += `<li><a target="_blank" href="https://${list[j]}">${list[j]}</a></li>`;
    }
    ourdiv.innerHTML = lis;    
}


function saveIn()
{
    let x = document.getElementById("inputtext").value;
    list.push(x);
    localStorage.setItem('bookMark', JSON.stringify(list)) ; 
    let child = document.createElement("li");
    let anchor = document.createElement("a");
    document.createAttribute("href");
    document.createAttribute("target");
    let text= document.createTextNode(`${list[i]}`);
        anchor.setAttribute("target", "_blank")
        anchor.setAttribute("href", `https://${list[i]}`);
        anchor.appendChild(text);
        child.appendChild(anchor);
        ourdiv.appendChild(child);  
        document.getElementById("inputtext").value = "";  
        i++;    
}

function saveTab()
{   
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        list.push(tabs[0].url);
        localStorage.setItem("bookMark",JSON.stringify(list));
        let child = document.createElement("li");
        let anchor = document.createElement("a");
        document.createAttribute("href");
        document.createAttribute("target");
        let text= document.createTextNode(`${list[i]}`);
            anchor.setAttribute("target", "_blank")
            anchor.setAttribute("href", `${list[i]}`);
            anchor.appendChild(text);
            child.appendChild(anchor);
            ourdiv.appendChild(child);  
            i++;   
    })  
}

function clear()
{
    if(list.length == 0)
        alert("List is Empty");
    else
    {
        list.pop();
        ourdiv.removeChild(ourdiv.lastElementChild);
        localStorage.clear();
        localStorage.setItem('bookMark', JSON.stringify(list));     
        i--;
    }    
}
