document.addEventListener ('DOMContentLoaded', () => {

    const moveApp = {}

    //make number function from a string
    moveApp.makeNumber = (string) => {
        return parseInt(string.replace(/\D/g,''))
    }

    //make number to display in "Add to Cart" button on product page 
    moveApp.productPriceTextEl = document.querySelector('.product-price')
    console.log(moveApp.productPriceTextEl)
    if (moveApp.productPriceTextEl !== null) {
        moveApp.productPriceText = moveApp.productPriceTextEl.innerHTML
        moveApp.productPrice = moveApp.makeNumber(moveApp.productPriceText)
    } 
    moveApp.buttonPriceEl = document.querySelector('.add-cart-button-price')

    //quantity fields 



    moveApp.quantityPicker = () => {
        const minusButtonEls = document.querySelectorAll('button.minus');
        const plusButtonEls = document.querySelectorAll('button.plus')
        
        //create synthetic event to run every time button is click
        const changeQuantity = new Event('input');

        function increaseCount (e) {
            const inputQuantityEl = this.parentElement.querySelector('.js-quantity-field')

            const quantityMax = inputQuantityEl.getAttribute('max') ? parseInt(inputQuantityEl.getAttribute('max')) : null; 
            // console.log(e.target)
            let value = parseInt(inputQuantityEl.value)
            if (quantityMax) {
                if (value < quantityMax) {
                    value++
                    inputQuantityEl.value = value
                    inputQuantityEl.dispatchEvent(changeQuantity);
                }
            }

            const quantityTextEl = this.parentElement.querySelector('.quantity-text')
            quantityTextEl.innerHTML = inputQuantityEl.value

            //add total price text to "Add to Cart" button
            if(moveApp.productPriceTextEl !== null) {
                const quantityPrice = value * moveApp.productPrice
                moveApp.buttonPriceEl.innerHTML = `$${quantityPrice}.00`
            }
        }

        function decreaseCount () {
            const inputQuantityEl = this.parentElement.querySelector('.js-quantity-field')
    
            const quantityMax = inputQuantityEl.getAttribute('max') ? parseInt(inputQuantityEl.getAttribute('max')) : null; 

            let value = parseInt(inputQuantityEl.value)

            if (value > 1) {
                value--
                inputQuantityEl.value = value

                inputQuantityEl.dispatchEvent(changeQuantity);
            }

            const quantityTextEl = this.parentElement.querySelector('.quantity-text')
            quantityTextEl.innerHTML = inputQuantityEl.value

            //add total price text to "Add to Cart" button
            if(moveApp.productPriceTextEl !== null) {
                const quantityPrice = value * moveApp.productPrice
                moveApp.buttonPriceEl.innerHTML = `$${quantityPrice}.00`
            }
        } 

        minusButtonEls.forEach(button => {
            button.addEventListener('click', decreaseCount)
        })

        plusButtonEls.forEach(button => {
            button.addEventListener('click', increaseCount)
        })
    }

    moveApp.init = () => {
        moveApp.quantityPicker()
    }

    moveApp.init()

})
