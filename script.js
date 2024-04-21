document.addEventListener("DOMContentLoaded", function() {
    var fromCurrencySelect = document.getElementById("fromCurrency");
    var toCurrencySelect = document.getElementById("toCurrency");

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            
                // Create a new Date object and pass the Unix timestamp multiplied by 1000 (to convert seconds to milliseconds)
                var date = new Date(data.time_last_updated * 1000);
            
                // Get the components of the date (year, month, day, hours, minutes, seconds)
                var year = date.getFullYear();
                var month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if month < 10
                var day = ('0' + date.getDate()).slice(-2); // Add leading zero if day < 10
                var hours = ('0' + date.getHours()).slice(-2); // Add leading zero if hours < 10
                var minutes = ('0' + date.getMinutes()).slice(-2); // Add leading zero if minutes < 10
                var seconds = ('0' + date.getSeconds()).slice(-2); // Add leading zero if seconds < 10
            
                // Construct the human-readable date and time string
                var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
                document.getElementById("result").innerText =formattedDate;
                var currencies = Object.keys(data.rates);
            
            // Populate "from" and "to" currency dropdowns with currency codes
                currencies.forEach(currency => {
                var option = document.createElement("option");
                option.value = currency;
                option.text = currency;
                fromCurrencySelect.appendChild(option);

                var optionCopy = option.cloneNode(true);
                toCurrencySelect.appendChild(optionCopy);
            });
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
        });

    document.getElementById("convertButton").addEventListener("click", function() {
        var fromCurrency = fromCurrencySelect.value;
        var toCurrency = toCurrencySelect.value;
        var amount = document.getElementById("amount").value;
        var timeInput=document.getElementById("time");
        timeInput.hidden=true;     
        fetch("https://api.exchangerate-api.com/v4/latest/"+fromCurrency)
            .then(response => response.json())
            .then(data => {
                var exchangeRate = data.rates[toCurrency];
                var convertedAmount = amount * exchangeRate;
                document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => {
                console.error('Error fetching exchange rates:', error);
            });
    });
});
