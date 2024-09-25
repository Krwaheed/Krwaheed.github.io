const addButtons = document.querySelectorAll('#meal-options button');
const selectedMeals = document.querySelector('#selected-meals');
const totalCost = document.querySelector('#total-cost');
let currentTotal = 0;
let mealPlan = {};

addButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const dish = event.target.parentElement.textContent.split('-')[0].trim();
        const price = parseInt(event.target.parentElement.textContent.split('$')[1]);

        if (mealPlan[dish]) {
            mealPlan[dish].quantity += 1;
            mealPlan[dish].totalPrice += price;
        } else {
            mealPlan[dish] = {
                price: price,
                quantity: 1,
                totalPrice: price
            };
        }
        updateMealList();
        updateTotalCost();
    });
});

function addMealToList(dish) {
    const li = document.createElement('li');
    li.dataset.dish = dish;

    const content = document.createElement('span');
    content.textContent = `${dish} - $${mealPlan[dish].totalPrice}`;

    const quantityControl = document.createElement('div');
    quantityControl.className = 'quantity-control';

    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.onclick = () => adjustQuantity(dish, -1);

    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = ` x${mealPlan[dish].quantity}`;

    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.onclick = () => adjustQuantity(dish, 1);

    quantityControl.appendChild(minusButton);
    quantityControl.appendChild(quantityDisplay);
    quantityControl.appendChild(plusButton);

    li.appendChild(content);
    li.appendChild(quantityControl);
    selectedMeals.appendChild(li);
}

function updateMealList() {
    selectedMeals.innerHTML = '';
    Object.keys(mealPlan).forEach(dish => {
        if (mealPlan[dish].quantity > 0) {
            addMealToList(dish);
        }
    });
}

function adjustQuantity(dish, change) {
    if (mealPlan[dish].quantity + change > 0) {
        mealPlan[dish].quantity += change;
        mealPlan[dish].totalPrice += change * mealPlan[dish].price;
    } else {
        delete mealPlan[dish];
    }
    updateMealList();
    updateTotalCost();
}

function updateTotalCost() {
    currentTotal = Object.values(mealPlan).reduce((acc, { totalPrice }) => acc + totalPrice, 0);
    totalCost.textContent = currentTotal;
}
