document.addEventListener ('DOMContentLoaded', () => {
    const moveApp = {}

    //make number function from a string
    moveApp.makeNumber = (string) => {
        return parseInt(string.replace(/\D/g,''))
    }

    //make number to display in "Add to Cart" button on product page 
    moveApp.productPriceTextEl = document.querySelector('.product-price')
    if (moveApp.productPriceTextEl !== null) {
        moveApp.productPriceText = moveApp.productPriceTextEl.innerHTML
        moveApp.productPrice = moveApp.makeNumber(moveApp.productPriceText)
    } 
    moveApp.buttonPriceEl = document.querySelector('.add-cart-button-price')


    //quantity fields 
    moveApp.quantityPicker = () => {
        const quantityButtonEls = document.querySelectorAll('button.quantity-button');
        
        // //create synthetic event to run every time button is click
        const changeQuantity = new Event('input');

        function changeCount () {
            const inputQuantityEl = this.parentElement.querySelector('.js-quantity-field')

            const minusButton = this.parentElement.querySelector('.minus')
            const plusButton = this.parentElement.querySelector('.plus')
            

            const quantityMax = inputQuantityEl.getAttribute('max') ? parseInt(inputQuantityEl.getAttribute('max')) : null; 

            const quantityMin = inputQuantityEl.getAttribute('min') ? parseInt(inputQuantityEl.getAttribute('min')) : null; 
            
            let value = parseInt(inputQuantityEl.value)

            if (this === plusButton) {
                if (quantityMax) {
                    if (value < quantityMax) {
                        value++
                        inputQuantityEl.value = value
                        inputQuantityEl.dispatchEvent(changeQuantity);
                    }
                }
            }
    
            if (this === minusButton) {
                if (value > quantityMin) {
                    value--
                    inputQuantityEl.value = value
                    console.log(value)
                    inputQuantityEl.dispatchEvent(changeQuantity);
                }
            }

            //change quantity number to match hidden input
            const quantityTextEl = this.parentElement.querySelector('.quantity-text')
            quantityTextEl.innerHTML = inputQuantityEl.value

            // disable minus button
            if (value === quantityMin) {
                minusButton.disabled = true
            } else if (value > quantityMin) {
                minusButton.disabled = false
            }

            // disable plus button
            if (value === quantityMax) {
                plusButton.disabled = true
            } else if (value < quantityMax) {
                plusButton.disabled = false
            }

            //add total price text to "Add to Cart" button
            if(moveApp.productPriceTextEl !== null) {
                const quantityPrice = value * moveApp.productPrice
                moveApp.buttonPriceEl.innerHTML = `$${quantityPrice}.00`
            }
            
        }

        quantityButtonEls.forEach(button => {
            button.addEventListener('click', changeCount)
        })
    }

    // cart line item
    moveApp.lineItem = () => {   

        const lineQuantitySelectorEl = document.querySelector('.js-line-quantity');
        
        function onLineQuantityChanged(e) {
            console.log(e)
            const quantity = this.value;
            const id = this.attr('id').replace('updates_', '');

            console.log({quantity, id})
            inputQuantityEl.dispatchEvent(changeQuantity);
        }

        lineQuantitySelectorEl.addEventListener('input', () => {

        })
    }

    moveApp.init = () => {
        moveApp.quantityPicker()
        moveApp.lineItem()
    }

    moveApp.init()
})
