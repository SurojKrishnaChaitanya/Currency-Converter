const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

const dropdownSelects = document.querySelectorAll(".drop-down select");
const exchangeBtn = document.querySelector("#exchangeButton");
const fromCurr = document.querySelector(".from-list select");
const toCurr = document.querySelector(".to-list select");
const  exInfo = document.querySelector(".curr-info");

for(let select of dropdownSelects) {
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

exchangeBtn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    const amntBox = document.querySelector("form input");
    let amntVal = amntBox.value;

    if(amntVal === ""  || amntVal < 1){
      amntVal = 1;
      console.log(amntVal);
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let dataNeed = data[fromCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmnt = amntVal*rate;
    exInfo.innerText = `${amntVal} ${fromCurr.value}  =  ${finalAmnt} ${toCurr.value}`;
    console.log(finalAmnt);
    
});