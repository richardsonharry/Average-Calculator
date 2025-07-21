document.addEventListener('DOMContentLoaded', function() {
    const price1Input = document.getElementById('price1');
    const quantity1Input = document.getElementById('quantity1');
    const price2Input = document.getElementById('price2');
    const quantity2Input = document.getElementById('quantity2');
    const calculateButton = document.getElementById('calculate-btn');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalCostElement = document.getElementById('total-cost');
    const averagePriceElement = document.getElementById('average-price');

    // Focus first input on page load
    price1Input.focus();

    // Calculate when button is clicked
    calculateButton.addEventListener('click', calculateAverage);

    // Also calculate when pressing Enter in any field
    [price1Input, quantity1Input, price2Input, quantity2Input].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAverage();
            }
        });
    });

    function calculateAverage() {
        // Get and validate inputs
        const price1 = parseFloat(price1Input.value);
        const quantity1 = parseInt(quantity1Input.value) || 0;
        const price2 = parseFloat(price2Input.value);
        const quantity2 = parseInt(quantity2Input.value) || 0;

        // Simple validation
        if (isNaN(price1) {
            alert('Please enter a valid price for Item 1');
            price1Input.focus();
            return;
        }

        if (quantity1 <= 0) {
            alert('Please enter a valid quantity for Item 1 (at least 1)');
            quantity1Input.focus();
            return;
        }

        if (isNaN(price2)) {
            alert('Please enter a valid price for Item 2');
            price2Input.focus();
            return;
        }

        if (quantity2 <= 0) {
            alert('Please enter a valid quantity for Item 2 (at least 1)');
            quantity2Input.focus();
            return;
        }

        // Calculate totals
        const totalQuantity = quantity1 + quantity2;
        const totalCost = (price1 * quantity1) + (price2 * quantity2);
        const averagePrice = totalCost / totalQuantity;

        // Display results
        totalQuantityElement.textContent = totalQuantity;
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        averagePriceElement.textContent = `$${averagePrice.toFixed(2)}`;
    }
});
