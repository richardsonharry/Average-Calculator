document.addEventListener('DOMContentLoaded', function() {
    const priceInput = document.getElementById('price');
    const quantityInput = document.getElementById('quantity');
    const addButton = document.getElementById('add-btn');
    const resetButton = document.getElementById('reset-btn');
    const itemsContainer = document.getElementById('items-container');
    const totalQuantityElement = document.getElementById('total-quantity');
    const totalCostElement = document.getElementById('total-cost');
    const averagePriceElement = document.getElementById('average-price');
    
    let items = [];
    
    // Load items from localStorage if available
    if (localStorage.getItem('averagePriceItems')) {
        items = JSON.parse(localStorage.getItem('averagePriceItems'));
        renderItems();
        updateResults();
    }
    
    // Add item to the list
    addButton.addEventListener('click', function() {
        const price = parseFloat(priceInput.value);
        const quantity = parseInt(quantityInput.value) || 1;
        
        if (isNaN(price) || price <= 0) {
            alert('Please enter a valid price (greater than 0)');
            return;
        }
        
        if (isNaN(quantity) {
            alert('Please enter a valid quantity');
            return;
        }
        
        const item = {
            price: price,
            quantity: quantity,
            id: Date.now()
        };
        
        items.push(item);
        saveItems();
        renderItems();
        updateResults();
        
        // Clear and focus the price input for next entry
        priceInput.value = '';
        quantityInput.value = '1';
        priceInput.focus();
    });
    
    // Reset everything
    resetButton.addEventListener('click', function() {
        if (items.length === 0 || confirm('Are you sure you want to reset all items?')) {
            items = [];
            saveItems();
            renderItems();
            updateResults();
            priceInput.focus();
        }
    });
    
    // Allow adding items with Enter key
    priceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
    
    quantityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });
    
    // Render all items in the list
    function renderItems() {
        if (items.length === 0) {
            itemsContainer.innerHTML = '<p class="empty-message">No items added yet</p>';
            return;
        }
        
        itemsContainer.innerHTML = '';
        
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <span class="item-quantity">× ${item.quantity}</span>
                </div>
                <button class="delete-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            itemsContainer.appendChild(itemElement);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-item').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                items = items.filter(item => item.id !== id);
                saveItems();
                renderItems();
                updateResults();
                priceInput.focus();
            });
        });
    }
    
    // Update the results (total quantity, total cost, average price)
    function updateResults() {
        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalCost = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const averagePrice = totalQuantity > 0 ? totalCost / totalQuantity : 0;
        
        totalQuantityElement.textContent = totalQuantity;
        totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        averagePriceElement.textContent = `$${averagePrice.toFixed(2)}`;
    }
    
    // Save items to localStorage
    function saveItems() {
        localStorage.setItem('averagePriceItems', JSON.stringify(items));
    }
    
    // Focus the price input when page loads
    priceInput.focus();
});
