const selectElement = document.querySelector("#selectCurrency");
const inputCurrency = document.getElementById("input_currency");
const outputCurrency = document.getElementById("output_currency");
const textOutput=  document.getElementById("textOutput")

function selectValue() {
    return selectElement.value; // Get the selected option value
}


selectElement.addEventListener("change", async function() {
    // When the user selects an option, update the API URL and fetch data
    const apiUrl = `https://v6.exchangerate-api.com/v6/b589eecc523deb31dda39fe9/latest/${selectValue()}`;

    await fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Your JSON object
            outputCurrency.addEventListener("change", ()=>{
                let selectedValue = outputCurrency.value;
                let results = data.conversion_rates[selectedValue] * inputCurrency.value
                textOutput.innerHTML=`
                <p> ${selectValue()}. ${inputCurrency.value}= ${selectedValue}. ${results}</p>
                `
            })
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});




