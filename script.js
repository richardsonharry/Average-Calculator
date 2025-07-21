document.addEventListener('DOMContentLoaded', function() {
    // Get all input elements
    const price1Input = document.getElementById('price1');
    const quantity1Input = document.getElementById('quantity1');
    const price2Input = document.getElementById('price2');
    const quantity2Input = document.getElementById('quantity2');
    const calculateButton = document.getElementById('calculate-btn');
    
    // Get all result elements
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalCostElement = document.getElementById('total-cost');
    const averagePriceElement = document.getElementById('average-price');

    // Add event listener to calculate button
    calculateButton.addEventListener('click', function() {
        // Get and validate all inputs
        const price1 = parseFloat(price1Input.value);
        const quantity1 = parseInt(quantity1Input.value);
        const price2 = parseFloat(price2Input.value);
        const quantity2 = parseInt(quantity2Input.value);

        // Validate inputs
        if (isNaN(price1) {
            alert('Please enter a valid price for Item 1');
            price1Input.focus();
            return;
        }
        if (isNaN(quantity1) || quantity1 < 1) {
            alert('Please enter a valid quantity (≥1) for Item 1');
            quantity1Input.focus();
            return;
        }
        if (isNaN(price2)) {
            alert('Please enter a valid price for Item 2');
            price2Input.focus();
            return;
        }
        if (isNaN(quantity2) || quantity2 < 1) {
            alert('Please enter a valid quantity (≥1) for Item 2');
            quantity2Input.focus();
            return;
        }

        // Calculate totals
        const totalQuantity = quantity1 + quantity2;
        const totalCost = (price1 * quantity1) + (price2 * quantity2);
        const averagePrice = totalCost / totalQuantity;

        // Update the display
        totalQuantityElement.textContent = totalQuantity;
        totalCostElement.textContent = '$' + totalCost.toFixed(2);
        averagePriceElement.textContent = '$' + averagePrice.toFixed(2);
    });

    // Add Enter key functionality
    const inputs = [price1Input, quantity1Input, price2Input, quantity2Input];
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateButton.click();
            }
        });
    });

    // Focus first input on page load
    price1Input.focus();
});
