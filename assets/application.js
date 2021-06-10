document.addEventListener('DOMContentLoaded', () => {

    const moveApp = {}

    moveApp.makeNumber = (string) => {
        return parseInt(string.replace(/\D/g,''))
    }
    moveApp.productPriceText = document.querySelector('.product-price').innerHTML;
    moveApp.productPrice = moveApp.makeNumber(moveApp.productPriceText)

    moveApp.buttonPriceEl = document.querySelector('.add-cart-button-price')
    console.log(moveApp.buttonPriceEl)


    //quantity button functionality
    moveApp.minusButtonEl = document.querySelector('button.minus');
    moveApp.plusButtonEl = document.querySelector('button.plus')
    moveApp.inputQuantityEl = document.querySelector('.js-quantity-field')

    moveApp.quantityMax = quantity.getAttribute('max') ? parseInt(quantity.getAttribute('max')) : null; 

    //create synthetic event to run every time button is click
    moveApp.changeQuantity = new Event('input');

    moveApp.increaseCount = () => {
        let value = parseInt(moveApp.inputQuantityEl.value)
        if (moveApp.quantityMax) {
            if (value < moveApp.quantityMax) {
                value++
                moveApp.inputQuantityEl.value = value
                moveApp.inputQuantityEl.dispatchEvent(moveApp.changeQuantity);
            }
        }
        const quantityPrice = value * moveApp.productPrice
        moveApp.buttonPriceEl.innerHTML = `$${quantityPrice}.00`
    }

    moveApp.decreaseCount = () => {
        let value = parseInt(moveApp.inputQuantityEl.value)
        if (value > 1) {
            value--
            moveApp.inputQuantityEl.value = value

            moveApp.inputQuantityEl.dispatchEvent(moveApp.changeQuantity);
        }

        const quantityPrice = value * moveApp.productPrice
        moveApp.buttonPriceEl.innerHTML = `$${quantityPrice}.00`
    } 

    moveApp.minusButtonEl.addEventListener('click', moveApp.decreaseCount)
    moveApp.plusButtonEl.addEventListener('click', moveApp.increaseCount)


    //listen for change on input and add to text-span 
    moveApp.inputQuantityEl.addEventListener('input', e => {
        const quantityTextEl = document.querySelector('.quantity-text')
        quantityTextEl.innerHTML = moveApp.inputQuantityEl.value
        
        //enable/disable minus button based on value
        moveApp.shouldDisableMinus = parseInt(moveApp.inputQuantityEl.value) === 1;
        if (moveApp.shouldDisableMinus) {
            moveApp.minusButtonEl.disabled = true
        } else if (moveApp.minusButtonEl.disabled = true) {
            moveApp.minusButtonEl.disabled = false
        }

        //enable/disable plus button based on value
        moveApp.shouldDisablePlus = parseInt(moveApp.inputQuantityEl.value) === moveApp.quantityMax

        if (moveApp.shouldDisablePlus) {
            moveApp.plusButtonEl.disabled = true
        } else if (moveApp.plusButtonEl.disabled = true) {
            moveApp.plusButtonEl.disabled = false
        }
    })
})
