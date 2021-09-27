/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/ts/components/authentication/index.ts":
/*!******************************************************!*\
  !*** ./assets/ts/components/authentication/index.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AuthenticationForm)
/* harmony export */ });
/* harmony import */ var _helpers_AbstractForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/AbstractForm */ "./assets/ts/helpers/AbstractForm.ts");
/* harmony import */ var _helpers_FormField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/FormField */ "./assets/ts/helpers/FormField.ts");
/* harmony import */ var _helpers_Validate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @helpers/Validate */ "./assets/ts/helpers/Validate.ts");



class AuthenticationForm extends _helpers_AbstractForm__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(data) {
        super();
        this._format = [];
        this._isLogged = false;
        this.data = data;
        this.customer = this.data.getCustomerByEmail('demo@demo.com');
    }
    get isLogged() {
        let customerPersist = JSON.parse(localStorage.getItem('isLogged'));
        if (customerPersist)
            this.isLogged = customerPersist;
        return this._isLogged;
    }
    set isLogged(isLogged) {
        this._isLogged = isLogged;
    }
    get format() {
        let format = [], email = new _helpers_FormField__WEBPACK_IMPORTED_MODULE_1__.default(), password = new _helpers_FormField__WEBPACK_IMPORTED_MODULE_1__.default();
        email.name = 'email';
        email.label = 'Correo';
        email.restrictions = ['isEmail'];
        email.required = true;
        email.maxLength = 255;
        format.push(email);
        password.name = 'password';
        password.type = 'password';
        password.label = 'Contraseña';
        password.restrictions = ['isPassword'];
        password.required = true;
        password.maxLength = 255;
        format.push(password);
        return this._format.length ? this._format : format;
    }
    set format(format) {
        this._format = format;
    }
    init() {
        this.customerPersist();
        this.render();
        this.refresh();
    }
    refresh() {
        const form = document.getElementById('authentication-form');
        if (form) {
            this.floatingLabels();
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const target = event.target;
                const isValid = this.validate(target);
                if (isValid) {
                    this.logIn(this.getValue('email'));
                }
            });
        }
        let addToCartBtns = document.querySelectorAll('.product-add-cart .add-to-cart');
        if (addToCartBtns && this.isLogged)
            addToCartBtns.forEach((btn) => btn.removeAttribute('disabled'));
        else
            addToCartBtns.forEach((btn) => btn.setAttribute('disabled', 'disabled'));
    }
    customerPersist() {
        let isLogged = localStorage.getItem('isLogged');
        if (isLogged) {
        }
        else {
            localStorage.setItem('isLogged', JSON.stringify(false));
            isLogged = localStorage.getItem('isLogged');
            if (isLogged) {
                this.isLogged = !!JSON.parse(isLogged);
            }
            else {
                this.isLogged = false;
            }
        }
    }
    customerExists(email) {
        if (!_helpers_Validate__WEBPACK_IMPORTED_MODULE_2__.default.isEmail(email)) {
            return false;
        }
        const result = this.data.getCustomerByEmail(email);
        return result && !!result.id_customer;
    }
    addValues(form) {
        let newFormat = [];
        if (form) {
            this.format.forEach((field) => {
                const input = form.querySelector(`[name=${field.name}]`);
                field.value = input.value;
                newFormat.push(field);
            });
            this.format = [];
            this.format = newFormat;
        }
    }
    validate(form) {
        for (let field of this.format) {
            field.errors = [];
        }
        this.addValues(form);
        const customerEmail = this.getValue('email');
        if (!this.customerExists(customerEmail)) {
            this.getField('email').addError('No esta registrado');
            return false;
        }
        else {
            this.getField('email').errors = [];
        }
        return super.validate(form);
    }
    logIn(email) {
        if (!this.isLogged) {
            localStorage.setItem('isLogged', JSON.stringify(true));
            this.isLogged = true;
            this.customer = this.data.getCustomerByEmail(email);
            this.render();
        }
    }
    logOut() {
        if (this.isLogged) {
            localStorage.setItem('isLogged', JSON.stringify(false));
            this.isLogged = false;
            this.render();
        }
    }
    render() {
        document.getElementById('js-authentication').innerHTML = !this.isLogged
            ? `${this.renderAuthentication}`
            : `${this.renderWelcome}`;
        this.addValues(document.getElementById('authentication-form'));
        const logout = document.getElementById('logout');
        if (logout)
            logout.addEventListener('click', () => this.logOut());
        if (!this.isLogged)
            document.getElementById('shopping-cart-wrapper').classList.add('d-none');
        else
            document
                .getElementById('shopping-cart-wrapper')
                .classList.remove('d-none');
        this.refresh();
    }
    get renderWelcome() {
        if (this.customer && this.isLogged)
            return `
        <h6 class="text-center">
          Bienvenido ${this.customer.firstname} ${this.customer.lastname}!
        </h6>
        <button class="btn btn-secondary" id="logout" type="button">
          Cerrar sesión
        </button>
      `;
        else
            return '';
    }
    get renderAuthentication() {
        return `
      <h2 class="text-center">Iniciar Sesión</h2>
      <form id="authentication-form" novalidate>
        ${this.format
            .map((field) => `<div class="control-group">
            <div class="col-md-12 form-group floating-label-form-group mb-0 pb-2">${field.render()}</div>
            </div>`)
            .join('')}

        <br />
        <div class="form-group">
          <button
            class="btn btn-primary w-100"
            id="submitAuthentication"
            name="submitAuthentication"
            type="submit"
          >
            Ingresar
          </button>
        </div>
      </form>
      <div id="dev-info" class="py-2">
        <h6 class="text-center">DATOS DE DESARROLLO</h6>
        <p>
          <span class="label label-info">Usuario: demo@demo.com</span><br />
          <span class="label label-info">Contraseña: demodemo</span>
        </p>
      </div>
    `;
    }
    getField(fieldName) {
        let field = this.format.filter((field) => field.name === fieldName)[0];
        if (field)
            return field;
        else
            return null;
    }
    getValue(fieldName) {
        let field = this.getField(fieldName);
        if (field) {
            return field.value;
        }
        return null;
    }
    floatingLabels() {
        const labels = document.querySelectorAll('.floating-label-form-group');
        if (labels.length) {
            for (let label of Array.from(labels)) {
                label.addEventListener('input', function (event) {
                    let target = event.target;
                    label.classList.toggle('floating-label-form-group-with-value', !!target.value);
                });
                label.addEventListener('change', function (event) {
                    let target = event.target;
                    label.classList.toggle('floating-label-form-group-with-value', !!target.value);
                });
                label.addEventListener('focus', function (event) {
                    label.classList.add('floating-label-form-group-with-focus');
                });
                label.addEventListener('blur', function (event) {
                    label.classList.remove('floating-label-form-group-with-focus');
                });
            }
        }
    }
}


/***/ }),

/***/ "./assets/ts/components/catalog/ProductMiniature.ts":
/*!**********************************************************!*\
  !*** ./assets/ts/components/catalog/ProductMiniature.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductMiniature)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");

class ProductMiniature extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(product) {
        super();
        this.id_product = product.id_product;
        this.sku = product.sku;
        this.brand = product.brand;
        this.name = product.name;
        this.price = product.price;
        this.discount_amount = product.discount_amount;
        this.img = product.img;
        this.stock = product.stock;
        if (this.stock <= 0) {
            this.availability = 'unavailable';
            this.availability_message = 'Agotado';
        }
        else if (this.stock <= 2) {
            this.availability = 'last_remaining_items';
            this.availability_message = 'Últimos productos';
        }
        else if (this.stock > 2) {
            this.availability = 'available';
            this.availability_message = 'Disponible para pedido';
        }
        else {
            this.availability = 'unavailable';
            this.availability_message = 'Agotado';
        }
    }
    init() {
        throw new Error('Method not implemented.');
    }
    render() {
        return `<div
      class="js-product-miniature-wrapper col-12 col-md-4 col-lg-4 col-xl-4"
    >
      <article
        class="product-miniature product-miniature-default product-miniature-grid js-product-miniature"
        data-id-product="${this.id_product}"
      >
        <div class="thumbnail-container">
          <div class="thumbnail product-thumbnail">
            <img
              data-src="${this.img}"
              src="${this.img}"
              alt="${this.truncateString(this.name, 30)}"
              width="236"
              height="305"
              class="img-fluid product-thumbnail-first"
            />
          </div>
          <div class="product-availability d-block">
            <span
              class="badge ${this.stock <= 0
            ? 'bg-danger product-unavailable'
            : 'bg-success product-available'} ${this.stock > 0 &&
            this.availability === 'last_remaining_items'
            ? 'bg-warning product-last-items'
            : ''} mt-2"
            >
              ${this.availability === 'available'
            ? `<i class="fas fa-check rtl-no-flip" aria-hidden="true"></i> ${this.availability_message}`
            : this.availability === 'last_remaining_items'
                ? `<i class="fas fa-exclamation" aria-hidden="true"></i> ${this.availability_message}`
                : `<i class="fas fa-ban" aria-hidden="true"></i> ${this.availability_message}`}
            </span>
          </div>
        </div>
        <div class="product-description">
          <div class="row extra-small-gutters justify-content-end">
            <div class="col">
              <div class="product-brand text-muted">${this.brand}</div>
              <h4 class="h4 product-title">${this.name}</h4>
              <div class="product-reference text-muted">
                <strong>SKU</strong>: ${this.sku}
              </div>
              <div class="product-price-and-shipping">
                <p class="product-stock text-muted">
                  ${this.stock ? `${this.stock} unidades en stock` : ''}
                </p>
                <span class="product-price" content="${this.price}"></span>
              </div>
              <div class="product-add-cart">
                <div class="input-group-add-cart">
                  <input
                    type="number"
                    class="input-qty"
                    name="qty"
                    value="1"
                    min="1"
                  />
                </div>
                <button
                  class="btn btn-secondary btn-product-list add-to-cart"
                  data-button-action="add-to-cart"
                  type="submit"
                  disabled
                >
                  <i class="fas fa-shopping-cart fa-fw" aria-hidden="true"></i>
                  Añadir al carro
                </button>
              </div>
            </div>
          </div>
        </div>
        <span
          itemprop="isRelatedTo"
          itemscope
          itemtype="https://schema.org/Product"
        >
          <meta itemprop="image" content="${this.img}" />
          <meta itemprop="name" content="${this.name}" />
          <span itemprop="offers" itemscope itemtype="https://schema.org/Offer">
            <meta itemprop="price" content="${this.price}" />
          </span>
        </span>
      </article>
    </div>`;
    }
}


/***/ }),

/***/ "./assets/ts/components/catalog/index.ts":
/*!***********************************************!*\
  !*** ./assets/ts/components/catalog/index.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Catalog)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");
/* harmony import */ var _components_catalog_ProductMiniature__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/catalog/ProductMiniature */ "./assets/ts/components/catalog/ProductMiniature.ts");


class Catalog extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(products) {
        super();
        this.products = products.map((product) => new _components_catalog_ProductMiniature__WEBPACK_IMPORTED_MODULE_1__.default(product));
    }
    init() {
        this.render();
    }
    render() {
        const component = document.getElementById('js-products');
        component.innerHTML = this.renderProductList;
    }
    sort(type, way) {
        let products = this.products;
        switch (type) {
            case 'price':
                break;
            case 'stock':
                break;
            case 'name':
                break;
            default:
                throw new Error(`Wrong sort product list. Tried to sort by ${type} and type ${way}`);
        }
    }
    get renderProductList() {
        return `<div class="products row products-grid">
      ${this.products
            .map((product) => {
            return product.render();
        })
            .join('')}
    </div>`;
    }
}


/***/ }),

/***/ "./assets/ts/components/common/carrier.ts":
/*!************************************************!*\
  !*** ./assets/ts/components/common/carrier.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Carrier)
/* harmony export */ });
class Carrier {
    constructor(carrier) {
        this.id_carrier = carrier.id_carrier;
        this.fixed_price = carrier.fixed_price;
        this.per_package = carrier.per_package;
    }
}


/***/ }),

/***/ "./assets/ts/components/common/currency.ts":
/*!*************************************************!*\
  !*** ./assets/ts/components/common/currency.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Currency)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");

class Currency extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(data) {
        super();
        const currency = data.getCurrency();
        this.data = data;
        this.id_currency = currency.id_currency;
        this.iso_lang = currency.iso_lang;
        this.label = currency.label;
        this.symbol = currency.symbol;
        this.position = currency.position;
        this.decimals = currency.decimals;
        this.value = currency.value;
    }
    set currency(params) {
        this.id_currency = params.id_currency;
        this.iso_lang = params.iso_lang;
        this.label = params.label;
        this.symbol = params.symbol;
        this.position = params.position;
        this.decimals = params.decimals;
        this.value = params.value;
    }
    format(amount) {
        let result;
        amount = +amount.toFixed(this.decimals);
        let parts = (amount + '').split('.'), integer = parts[0], decimal = parts[1], iso_code = this.iso_lang, position = this.position;
        if (iso_code.substring(0, 2) === 'es') {
            result = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        else {
            result = `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${decimal ? `<sup>${decimal}</sup>` : ''}`;
        }
        result = result || (+amount).toLocaleString(iso_code);
        if (position === 'left')
            return `<span class="price-symbol">${this.symbol}</span>${result}`;
        else if (position === 'right')
            return `${result}<span class="price-symbol">${this.symbol}</span>`;
        return result;
    }
    refresh() {
        const prices = document.querySelectorAll('.product-price, .regular-price');
        prices.forEach((price) => {
            let amount = price.getAttribute('content');
            if (amount) {
                price.innerHTML = this.format(+amount * this.value);
            }
        });
    }
    render() {
        throw new Error('Method is not implemented');
    }
    init() {
        const element = document.getElementById('js-currency');
        this.updateById(this.id_currency);
        if (element) {
            const currency = JSON.parse(localStorage.getItem('currency'));
            if (currency)
                element.value = currency.id_currency + '';
            element.addEventListener('change', (event) => {
                this.updateById(+event.target.value);
            });
        }
    }
    updateById(id_currency) {
        const element = document.getElementById('js-currency');
        const currency = this.data.getCurrencyById(id_currency);
        if (currency && element) {
            localStorage.setItem('currency', JSON.stringify(currency));
            this.currency = currency;
            this.refresh();
        }
    }
}


/***/ }),

/***/ "./assets/ts/components/common/preloader.ts":
/*!**************************************************!*\
  !*** ./assets/ts/components/common/preloader.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fadeOut": () => (/* binding */ fadeOut)
/* harmony export */ });
function fadeOut(element, duration, callback) {
    element.style.opacity = '1';
    let last = +new Date().getTime();
    let id;
    let tick = function () {
        element.style.opacity = String(+element.style.opacity - (+new Date().getTime() - last) / duration);
        last = +new Date();
        if (+element.style.opacity <= 1) {
            id = setTimeout(tick, 16);
        }
        if (id && +element.style.opacity <= 0) {
            if (typeof callback === 'function')
                callback();
            clearTimeout(id);
        }
    };
    tick();
}


/***/ }),

/***/ "./assets/ts/components/common/touchspin.ts":
/*!**************************************************!*\
  !*** ./assets/ts/components/common/touchspin.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Touchspin)
/* harmony export */ });
class Touchspin {
    constructor(self, childInputClassName, decreaseHTML, increaseHTML) {
        this.input = document.createElement('input');
        this.decreaseHTML = '-';
        this.increaseHTML = '+';
        let input = undefined;
        if (childInputClassName) {
            input = self.querySelector(childInputClassName);
        }
        else {
            this.input.value = '1';
            this.input.type = this.input.type || 'number';
            this.input.name = this.input.name || 'qty';
            this.input.min = this.input.min || '1';
        }
        this.decreaseHTML = decreaseHTML || this.decreaseHTML;
        this.increaseHTML = increaseHTML || this.increaseHTML;
        function Button(HTML, className) {
            const button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = HTML;
            className = className.trim();
            let _className = className.split(' ');
            button.classList.add(..._className);
            return button;
        }
        this.down = Button(this.decreaseHTML, 'btn btn-touchspin js-touchspin bootstrap-touchspin-down');
        this.up = Button(this.increaseHTML, 'btn btn-touchspin js-touchspin bootstrap-touchspin-up');
        if (input) {
            this.down.addEventListener('click', () => this.change_quantity(-1, input));
            this.up.addEventListener('click', () => this.change_quantity(1, input));
            self.insertBefore(this.down, self.childNodes[0]);
            self.appendChild(this.up);
        }
        else {
            this.down.addEventListener('click', () => this.change_quantity(-1));
            this.up.addEventListener('click', () => this.change_quantity(1));
            self.appendChild(this.down);
            self.appendChild(this.input);
            self.appendChild(this.up);
        }
    }
    change_quantity(change, input) {
        let quantity;
        if (!input)
            quantity = Number(this.input.value);
        else
            quantity = Number(input.value);
        if (isNaN(quantity))
            quantity = 1;
        quantity += change;
        quantity = Math.max(quantity, 1);
        if (!input)
            this.input.value = quantity + '';
        else
            input.value = quantity + '';
    }
    init() {
        let touchspins = document.querySelectorAll('.input-group-add-cart');
        touchspins.forEach((touchspin) => new Touchspin(touchspin, 'input-qty', '<i class="fas fa-minus touchspin-down"></i>', '<i class="fas fa-plus touchspin-up"></i>'));
    }
}


/***/ }),

/***/ "./assets/ts/components/shoppingcart/ShoppingcartProduct.ts":
/*!******************************************************************!*\
  !*** ./assets/ts/components/shoppingcart/ShoppingcartProduct.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShoppingcartProduct)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");

class ShoppingcartProduct extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(currency, product, cart_quantity) {
        super();
        this.cart_quantity = 0;
        this.currency = currency;
        this.id_product = product.id_product;
        this.name = product.name;
        this.sku = product.sku;
        this.brand = product.brand;
        this.img = product.img;
        this.cart_quantity = cart_quantity;
        this.price_amount = product.price;
        this.price = (() => {
            return this.currency.format(this.price_amount);
        })();
        this.total = (() => {
            return this.currency.format(this.price_amount * this.cart_quantity);
        })();
    }
    init() {
        throw new Error('Method not implemented.');
    }
    get increase() {
        ++this.cart_quantity;
        return this;
    }
    get decrease() {
        --this.cart_quantity;
        return this;
    }
    set add(quantity) {
        this.cart_quantity += quantity;
    }
    set fix(quantity) {
        this.cart_quantity = quantity;
    }
    refresh() { }
    render() {
        return `<div class="row no-gutters align-items-center">
      <div class="col-3">
        <span class="product-image media-middle">
          <img src="${this.img}" alt="${this.name}" class="img-fluid" />
        </span>
      </div>
      <div class="col col-info">
        <div class="pb-1"></div>
        <div class="product-attributes text-muted pb-1">
          <div class="product-line-info">
            <span class="label font-weight-bold">SKU:</span>
            <span class="value">${this.sku}</span>
          </div>
        </div>
        <div class="product-attributes text-muted pb-1">
          <div class="product-line-info">
            <span class="label font-weight-bold">Marca:</span>
            <span class="value">${this.brand}</span>
          </div>
        </div>

        <div class="row align-items-center mt-2 no-gutters">
          <div class="col mr-2">
            <input
              class="cart-product-quantity form-control js-cart-line-product-quantity"
              data-product-id="${this.id_product}"
              type="number"
              value="${this.cart_quantity}"
              name="product-quantity-spin"
              min="1"
            />
          </div>
          <div class="col">
            <span class="text-muted">x</span>
            <span class="product-price" content="${this.price_amount}"
              >${this.price}</span
            >
          </div>

          <div class="col col-auto">
            <a
              class="remove-from-cart"
              rel="nofollow"
              href="javascript:void(0)"
              data-id-product="${this.id_product}"
              title="Eliminar del carro"
            >
              <i class="fas fa-trash" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
    }
}


/***/ }),

/***/ "./assets/ts/components/shoppingcart/index.ts":
/*!****************************************************!*\
  !*** ./assets/ts/components/shoppingcart/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shoppingcart)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");
/* harmony import */ var _ShoppingcartProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ShoppingcartProduct */ "./assets/ts/components/shoppingcart/ShoppingcartProduct.ts");
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @helpers/Data */ "./assets/ts/helpers/Data.ts");



class Shoppingcart extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(data) {
        super();
        this._products = [];
        this._products_quantity = 0;
        this.data = data.data;
        this.currency = data.currency;
        this.carrier = data.carrier;
    }
    set products(cart_products) {
        this._products = cart_products;
        this.refresh();
    }
    get products() {
        return this._products;
    }
    set products_quantity(quantity) {
        this._products_quantity = quantity;
    }
    get products_quantity() {
        return this._products_quantity;
    }
    set subtotals(args) {
        this._subtotals = args;
    }
    get subtotals() {
        return this._subtotals;
    }
    set total(args) {
        this._total = args;
    }
    get total() {
        return this._total;
    }
    actions() {
        const addToCartBtns = document.querySelectorAll('.product-add-cart .add-to-cart');
        if (addToCartBtns)
            addToCartBtns.forEach((btn) => btn.addEventListener('click', (event) => {
                const target = event.target;
                const product = target.closest('.js-product-miniature');
                const id_product = product.getAttribute('data-id-product');
                const qty = product.querySelector('.input-qty').value;
                console.log(target);
                this.addProduct(Number(id_product), Number(qty));
            }, false));
        const removeAll = document.getElementById('shopping-cart-restore-btn');
        if (removeAll)
            removeAll.addEventListener('click', (event) => {
                this.products = [];
                this.refresh();
            });
    }
    build() {
        let cart_products = _helpers_Data__WEBPACK_IMPORTED_MODULE_2__.default.getCartProducts();
        if (cart_products.length) {
            let products = cart_products.map((product) => {
                let _product = this.data.getProductById(product.id_product);
                let cart_product = new _ShoppingcartProduct__WEBPACK_IMPORTED_MODULE_1__.default(this.currency, _product, product.cart_quantity);
                return cart_product;
            });
            this.products = products;
            this.setQuantities();
            this.setSubtotals();
        }
    }
    setQuantities() {
        if (this.products && this.products.length > 0) {
            this.products_quantity = this.products.reduce((accumulator, product) => product.cart_quantity + accumulator, 0);
        }
    }
    setSubtotals() {
        let products, shipping;
        if (this.products && this.products.length > 0) {
            let carrier = this.carrier;
            products = (() => {
                let amount = this.products.reduce((accumulator, product) => product.price_amount !== undefined
                    ? product.price_amount * product.cart_quantity + accumulator
                    : 0, 0), label = 'Productos', value = this.currency.format(amount);
                return { amount, label, value };
            })();
            shipping = (() => {
                let amount = carrier.fixed_price +
                    this.products.reduce((accumulator, product) => {
                        return product.cart_quantity * carrier.per_package + accumulator;
                    }, 0), label = 'Envío', value = this.currency.format(amount);
                return { amount: amount, label: label, value: value };
            })();
            this.subtotals = { products, shipping };
            if (this.subtotals.products && this.subtotals.shipping) {
                let amount = this.subtotals.products.amount + this.subtotals.shipping.amount, label = 'Total', value = this.currency.format(amount);
                this.total = { amount, label, value };
            }
        }
    }
    refresh() {
        localStorage.setItem('cart_products', JSON.stringify(this.products.map((product) => {
            return {
                id_product: product.id_product,
                cart_quantity: product.cart_quantity,
            };
        })));
        this.setQuantities();
        this.setSubtotals();
        this.render();
        this.actions();
    }
    addProduct(id_product, quantity) {
        let _product = this.data.getProductById(id_product);
        let product = new _ShoppingcartProduct__WEBPACK_IMPORTED_MODULE_1__.default(this.currency, _product, quantity);
        if (this.products && this.products.length) {
            let cart_product = this.products.filter((product) => product.id_product === id_product)[0];
            console.log({
                cart_product: cart_product,
                qty: quantity,
            });
            if (cart_product)
                cart_product.fix = cart_product.cart_quantity + quantity;
            let rest_products = this.products.filter((product) => product.id_product !== id_product);
            if (cart_product)
                this.products = [...rest_products, cart_product];
            else
                this.products = [...rest_products, product];
        }
        else {
            this.products.push(product);
        }
        this.refresh();
    }
    increaseProduct(id_product) {
        for (let product of this.products) {
            if (product.id_product === id_product) {
                product.increase;
                continue;
            }
        }
        this.refresh();
    }
    decreaseProduct(id_product) {
        for (let product of this.products) {
            if (product.id_product === id_product) {
                product.decrease;
                continue;
            }
        }
        this.refresh();
    }
    removeProduct(id_product) {
        this.products.filter((product) => product.id_product !== id_product);
        this.refresh();
    }
    removeAll() {
        this.products = [];
        localStorage.removeItem('cart_products');
        this.refresh();
    }
    init() {
        this.build();
        this.render();
        this.actions();
    }
    render() {
        document.getElementById('js-shopping-cart').innerHTML = `${this.renderProducts}${this.renderEmpty}`;
    }
    get hasProducts() {
        let isValid = true;
        if (this.products.length === 0)
            isValid = false;
        return isValid;
    }
    get renderProducts() {
        if (this.hasProducts) {
            return `<ul class="cart-products">
          ${this.products
                .map((product) => `<li>${product.render()}</li>`)
                .join('')}
        </ul>
        <div class="row">
          <div class="col col-12">
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">
                ${this.subtotals.products.label}
              </div>
              <span
                class="col col-6 h3 product-price"
                content="${this.subtotals.products.amount}"
                >${this.subtotals.products.value}</span
              >
            </div>
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">
                ${this.subtotals.shipping.label}
              </div>
              <div
                class="col col-6 h3 product-price"
                content="${this.subtotals.shipping.amount}"
              >
                ${this.subtotals.shipping.value}
              </div>
            </div>
            <div class="row col-12">
              <div class="col col-6 h3 fw-bold">${this.total.label}</div>
              <div
                class="col col-6 h3 product-price"
                content="${this.total.amount}"
              >
                ${this.total.value}
              </div>
            </div>
          </div>
        </div>
        <div class="shopping-cart-buttons text-center text-uppercase">
          <a
            href="javascript:void(0)"
            id="shopping-cart-confirm-btn"
            class="btn btn-primary w-100 btn-lg mb-2"
          >
            Realizar compra</a
          >
          <a
            href="javascript:void(0)"
            id="shopping-cart-restore-btn"
            class="btn btn-secondary w-100 btn-lg"
          >
            Restaurar productos</a
          >
        </div>`;
        }
        else
            return '';
    }
    get renderEmpty() {
        if (!this.hasProducts)
            return `<p class="h6">No hay productos en su carro</p>`;
        else
            return '';
    }
}


/***/ }),

/***/ "./assets/ts/helpers/AbstractForm.ts":
/*!*******************************************!*\
  !*** ./assets/ts/helpers/AbstractForm.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AbstractForm)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");
/* harmony import */ var _helpers_Validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @helpers/Validate */ "./assets/ts/helpers/Validate.ts");
/* harmony import */ var _helpers_ValidateRestriction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @helpers/ValidateRestriction */ "./assets/ts/helpers/ValidateRestriction.ts");



class AbstractForm extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super(...arguments);
        this._errors = [];
    }
    get errors() {
        this._errors = [];
        this.format.forEach((field) => {
            this._errors.push({ name: field.name, error: field.errors });
        });
        return this._errors;
    }
    hasErrors() {
        let hasErrors = false;
        this.errors.forEach((field) => {
            if (field.error.length) {
                hasErrors = true;
            }
        });
        return hasErrors;
    }
    validate(form) {
        for (let field of this.format) {
            if (field.required && !field.value) {
                field.addError(_helpers_ValidateRestriction__WEBPACK_IMPORTED_MODULE_2__.default.message('required'));
                continue;
            }
            else if (!field.required && !field.value) {
                continue;
            }
            for (let restriction of field.restrictions) {
                if (typeof restriction !== 'number') {
                    if (!_helpers_Validate__WEBPACK_IMPORTED_MODULE_1__.default[restriction](field.value)) {
                        field.addError(_helpers_ValidateRestriction__WEBPACK_IMPORTED_MODULE_2__.default.message(restriction));
                    }
                    else {
                        field.errors = [];
                    }
                }
            }
        }
        return !this.hasErrors();
    }
    submit(event) {
        throw new Error('Method not implemented.');
    }
    init() { }
}


/***/ }),

/***/ "./assets/ts/helpers/Component.ts":
/*!****************************************!*\
  !*** ./assets/ts/helpers/Component.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
/* harmony import */ var _Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Data */ "./assets/ts/helpers/Data.ts");

class Component {
    constructor() {
        this.element = null;
        this.truncateString = _Data__WEBPACK_IMPORTED_MODULE_0__.default.truncateString;
    }
    set component(component) {
        if (this.element)
            this.element = component;
        else
            throw new Error("Component can't be set");
    }
    get component() {
        if (this.element)
            return this.element;
        else
            throw new Error('Component is not defined');
    }
}


/***/ }),

/***/ "./assets/ts/helpers/Data.ts":
/*!***********************************!*\
  !*** ./assets/ts/helpers/Data.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Data)
/* harmony export */ });
/* harmony import */ var app_config_defaults_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/config.defaults.json */ "./app/config.defaults.json");

class Data {
    constructor(params) {
        this.defaults = {
            id_currency: app_config_defaults_json__WEBPACK_IMPORTED_MODULE_0__.id_currency,
            id_customer: app_config_defaults_json__WEBPACK_IMPORTED_MODULE_0__.id_customer,
            id_carrier: app_config_defaults_json__WEBPACK_IMPORTED_MODULE_0__.id_carrier,
        };
        this.products = params.products;
        this.currencies = params.currencies;
        this.customers = params.customers;
        this.carriers = params.carriers;
    }
    static getProductById(id_product) {
        throw new Error('Method not implemented.');
    }
    getProductById(id_product) {
        let response = this.products.filter(function (product) {
            return product.id_product == id_product;
        })[0];
        if (!response)
            throw new Error(`Product ID equal to ${id_product} not found`);
        return response;
    }
    getCurrencyById(id_currency) {
        let response = this.currencies.filter((currency) => {
            return currency.id_currency == id_currency;
        })[0];
        if (!response)
            throw new Error(`Currency ID equal to ${id_currency} not found`);
        return response;
    }
    getCustomerByEmail(email) {
        let response = this.customers.filter((customer) => {
            return customer.email === email;
        })[0];
        return response;
    }
    getCarrierById(id_carrier) {
        let response = this.carriers.filter((carrier) => {
            return (carrier.id_carrier === id_carrier || carrier.id_carrier === +id_carrier);
        })[0];
        if (!response)
            throw new Error(`Carrier ID equal to ${id_carrier} not found`);
        return response;
    }
    getCurrency() {
        const currency = localStorage.getItem('currency');
        if (currency === null)
            return this.currencies.filter((currency) => currency.id_currency === this.defaults.id_currency)[0];
        else
            return JSON.parse(currency);
    }
    getCarrier() {
        return this.carriers.filter((carrier) => carrier.id_carrier === this.defaults.id_carrier)[0];
    }
    static getCartProducts() {
        const cart_products = localStorage.getItem('cart_products');
        if (cart_products === null)
            return [];
        else
            return JSON.parse(cart_products);
    }
    static truncateString(str, num) {
        if (str.length > num) {
            return str.slice(0, num) + '...';
        }
        else {
            return str;
        }
    }
}


/***/ }),

/***/ "./assets/ts/helpers/FormField.ts":
/*!****************************************!*\
  !*** ./assets/ts/helpers/FormField.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormField)
/* harmony export */ });
/* harmony import */ var _helpers_Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Component */ "./assets/ts/helpers/Component.ts");

class FormField extends _helpers_Component__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super(...arguments);
        this._col = '12';
        this._name = '';
        this._label = '';
        this._type = 'text';
        this._required = false;
        this._value = null;
        this._maxLength = null;
        this._errors = [];
        this._restrictions = [];
    }
    get col() {
        return this._col;
    }
    set col(columnSpace) {
        this._col = columnSpace;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get label() {
        return this._label;
    }
    set label(label) {
        this._label = label;
    }
    get type() {
        return this._type;
    }
    set type(name) {
        this._type = name;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value + '';
    }
    get required() {
        return this._required;
    }
    set required(required) {
        this._required = required;
    }
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(maxLength) {
        this._maxLength = maxLength;
    }
    get errors() {
        return this._errors;
    }
    set errors(errors) {
        this._errors = errors;
        this.refreshErrors();
    }
    addError(error) {
        this._errors.push(error);
        this.refreshErrors();
    }
    get restrictions() {
        return this._restrictions;
    }
    set restrictions(restrictions) {
        this._restrictions = restrictions;
    }
    addRestriction(restriction) {
        this._restrictions.push(restriction);
    }
    init() {
        this.render();
    }
    refreshErrors() {
        document
            .getElementById(this.name)
            .closest('.form-group')
            .querySelector('.help-block').innerHTML = this.renderError;
    }
    render() {
        return `<label>${this.label}</label
      ><input
        class="form-control form-control-sm"
        name="${this.name}"
        id="${this.name}"
        type="${this.type}"
        placeholder="${this.label}"
        ${this.required ? ' required="required" ' : ''}
        aria-invalid="false"
      />
      <p class="help-block text-danger">${this.renderError}</p>`;
    }
    get renderError() {
        if (this.errors.length) {
            return `<ul>
        ${this.errors.map((error) => `<li>${error}</li>`)}
      </ul>`;
        }
        else {
            return '';
        }
    }
}


/***/ }),

/***/ "./assets/ts/helpers/Promises.ts":
/*!***************************************!*\
  !*** ./assets/ts/helpers/Promises.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "products": () => (/* binding */ products),
/* harmony export */   "currencies": () => (/* binding */ currencies),
/* harmony export */   "carriers": () => (/* binding */ carriers),
/* harmony export */   "customers": () => (/* binding */ customers)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let products = fetchAsync('./json/products.json');
let currencies = fetchAsync('./json/currencies.json');
let carriers = fetchAsync('./json/carriers.json');
let customers = fetchAsync('./json/customers.json');

function fetchAsync(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = performance.now();
        let response;
        try {
            const init = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            const request = new Request(filename, init);
            response = yield fetch(request);
            let data = yield response.json();
            if (data) {
                const endTime = performance.now();
                return data;
            }
            else
                throw new Error(`Error trying to get JSON data from ${filename}`);
        }
        catch (error) {
            console.error(error);
            response = error;
        }
        throw new Error(JSON.stringify(response));
    });
}


/***/ }),

/***/ "./assets/ts/helpers/Validate.ts":
/*!***************************************!*\
  !*** ./assets/ts/helpers/Validate.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Validate)
/* harmony export */ });
class Validate {
    static isEmail(email) {
        return (email &&
            /^[a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]+[.a-z\p{L}0-9!#$%&'*+\/=?^`{}|~_-]*@[a-z\p{L}0-9]+(?:[.]?[_a-z\p{L}0-9-])*\.[a-z\p{L}0-9]+$/iu.test(email));
    }
    static isPassword(password, size = this.PASSWORD_LENGTH) {
        return password.length >= size;
    }
    static isEmpty(value) {
        return (!value ||
            !!(typeof value === 'object' && JSON.stringify(value) === '{}') ||
            !!(Array.isArray(value) && value.length));
    }
    static isHTMLElement(element) {
        return element && element instanceof HTMLElement;
    }
    static isGenericName(name) {
        return name && /^[^<>={}]*$/u.test(name);
    }
}
Validate.PASSWORD_LENGTH = 8;


/***/ }),

/***/ "./assets/ts/helpers/ValidateRestriction.ts":
/*!**************************************************!*\
  !*** ./assets/ts/helpers/ValidateRestriction.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidationRestriction)
/* harmony export */ });
class ValidationRestriction {
    static message(restriction) {
        if (restriction === 'isEmail') {
            return 'Por favor incluya @ y dominio en su correo';
        }
        if (restriction === 'isPassword') {
            return `Por favor debe tener al menos 8 caracteres`;
        }
        if (restriction === 'required') {
            return 'Campo requerido, por favor ingrese un valor';
        }
        return 'Formato inválido';
    }
}


/***/ }),

/***/ "./app/config.defaults.json":
/*!**********************************!*\
  !*** ./app/config.defaults.json ***!
  \**********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"base_url":"http://localhost","iso_code":"es","lang":"es-CL","id_currency":1,"id_customer":1,"id_carrier":1,"site_name":"eCafe.cl","title":"Productos de cafetería de alta calidad","description":"Excelente productos de cafetería, envios a todo Chile","keywords":["cafe","cafe juan valdez","juan valdez cafe","cafe helado","como hacer color cafe","taza de cafe","cafe con piernas","color cafe","molinillo de cafe","maquina de cafe","maquinas de cafe","cafe racer","work cafe santander","cafe en grano","cafe moro","tipos de cafe","cafe tacuba","cafe tacvba","cafe verde","cafe starbucks","hentai cafe","moledor de cafe","cafe caribe","cafe con leche","beneficios del cafe","work cafe","cafe haiti","lavazza cafe","cafe cortado","cafe colonia","cafe americano","cafe palermo","capsulas de cafe","cafe gold","cafe de trigo","cafe nescafe","coco cafe","cafe dolce gusto","hard sub cafe","i miss my cafe","wonderland cafe","eres cafe tacuba","cafe capuchino","mokaccino","damas de cafe","cafe nespresso","cafe png","cafe literario","cafe harry potter","cafe chocolate"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./assets/ts/body.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers/Promises */ "./assets/ts/helpers/Promises.ts");
/* harmony import */ var _components_shoppingcart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/shoppingcart */ "./assets/ts/components/shoppingcart/index.ts");
/* harmony import */ var _components_authentication__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/authentication */ "./assets/ts/components/authentication/index.ts");
/* harmony import */ var _components_catalog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/catalog */ "./assets/ts/components/catalog/index.ts");
/* harmony import */ var _components_common_currency__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/common/currency */ "./assets/ts/components/common/currency.ts");
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers/Data */ "./assets/ts/helpers/Data.ts");
/* harmony import */ var _components_common_preloader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @components/common/preloader */ "./assets/ts/components/common/preloader.ts");
/* harmony import */ var _components_common_touchspin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @components/common/touchspin */ "./assets/ts/components/common/touchspin.ts");
/* harmony import */ var _components_common_carrier__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @components/common/carrier */ "./assets/ts/components/common/carrier.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};









document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const DOMComponents = {
            preloader: document.getElementById('page-preloader'),
            catalog: document.getElementById('js-product'),
            cart: document.getElementById('js-shopping-cart'),
            cartWrapper: document.getElementById('shopping-cart-wrapper'),
        };
        (0,_components_common_preloader__WEBPACK_IMPORTED_MODULE_6__.fadeOut)(DOMComponents.preloader, 2000, function () {
            DOMComponents.preloader.remove();
        });
        const data = new _helpers_Data__WEBPACK_IMPORTED_MODULE_5__.default({
            products: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.products,
            currencies: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.currencies,
            customers: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.customers,
            carriers: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.carriers,
        });
        const currency = new _components_common_currency__WEBPACK_IMPORTED_MODULE_4__.default(data);
        const carrier = new _components_common_carrier__WEBPACK_IMPORTED_MODULE_8__.default(data.getCarrier());
        const catalog = new _components_catalog__WEBPACK_IMPORTED_MODULE_3__.default(data.products);
        const cart = new _components_shoppingcart__WEBPACK_IMPORTED_MODULE_1__.default({ data, currency, carrier });
        const authentication = new _components_authentication__WEBPACK_IMPORTED_MODULE_2__.default(data);
        catalog.init();
        let productMiniatures = document.querySelectorAll('.product-miniature');
        cart.init();
        currency.init();
        authentication.init();
        productMiniatures.forEach((product) => new _components_common_touchspin__WEBPACK_IMPORTED_MODULE_7__.default(product.querySelector('.input-group-add-cart'), '.input-qty', '<i class="fas fa-minus touchspin-down"></i>', '<i class="fas fa-plus touchspin-up"></i>'));
        const isLogged = JSON.parse(localStorage.getItem('isLogged'));
        if (!isLogged)
            DOMComponents.cartWrapper.classList.add('d-none');
        const addToCartBtns = document.querySelectorAll('.product-add-cart .add-to-cart');
        if (addToCartBtns && isLogged)
            addToCartBtns.forEach((btn) => btn.removeAttribute('disabled'));
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFDM0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBQUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2F1dGhlbnRpY2F0aW9uL2luZGV4LnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NhdGFsb2cvUHJvZHVjdE1pbmlhdHVyZS50cyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvY29tcG9uZW50cy9jYXRhbG9nL2luZGV4LnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NvbW1vbi9jYXJyaWVyLnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NvbW1vbi9jdXJyZW5jeS50cyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvY29tcG9uZW50cy9jb21tb24vcHJlbG9hZGVyLnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NvbW1vbi90b3VjaHNwaW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2NvbXBvbmVudHMvc2hvcHBpbmdjYXJ0L1Nob3BwaW5nY2FydFByb2R1Y3QudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2NvbXBvbmVudHMvc2hvcHBpbmdjYXJ0L2luZGV4LnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9oZWxwZXJzL0Fic3RyYWN0Rm9ybS50cyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvaGVscGVycy9Db21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvRGF0YS50cyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvaGVscGVycy9Gb3JtRmllbGQudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvUHJvbWlzZXMudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvVmFsaWRhdGUudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvVmFsaWRhdGVSZXN0cmljdGlvbi50cyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9hc3NldHMvdHMvYm9keS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWJzdHJhY3RGb3JtIGZyb20gJ0BoZWxwZXJzL0Fic3RyYWN0Rm9ybSdcbmltcG9ydCBEYXRhIGZyb20gJ0BoZWxwZXJzL0RhdGEnXG5pbXBvcnQgRm9ybUZpZWxkIGZyb20gJ0BoZWxwZXJzL0Zvcm1GaWVsZCdcbmltcG9ydCBWYWxpZGF0ZSBmcm9tICdAaGVscGVycy9WYWxpZGF0ZSdcbmltcG9ydCB7IEN1c3RvbWVySW50ZXJmYWNlIH0gZnJvbSAnQGludGVyZmFjZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dGhlbnRpY2F0aW9uRm9ybSBleHRlbmRzIEFic3RyYWN0Rm9ybSB7XG4gIHByaXZhdGUgX2Zvcm1hdDogRm9ybUZpZWxkW10gPSBbXVxuICBwcml2YXRlIGRhdGE6IERhdGFcbiAgcHJpdmF0ZSBfaXNMb2dnZWQ6IGJvb2xlYW4gPSBmYWxzZVxuXG4gIHB1YmxpYyBnZXQgaXNMb2dnZWQoKTogYm9vbGVhbiB7XG4gICAgbGV0IGN1c3RvbWVyUGVyc2lzdCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lzTG9nZ2VkJykpXG4gICAgaWYgKGN1c3RvbWVyUGVyc2lzdCkgdGhpcy5pc0xvZ2dlZCA9IGN1c3RvbWVyUGVyc2lzdFxuICAgIHJldHVybiB0aGlzLl9pc0xvZ2dlZFxuICB9XG4gIHByaXZhdGUgc2V0IGlzTG9nZ2VkKGlzTG9nZ2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNMb2dnZWQgPSBpc0xvZ2dlZFxuICB9XG4gIC8vIERlbW8gQ3VzdG9tZXJcbiAgcHJpdmF0ZSBjdXN0b21lcj86IEN1c3RvbWVySW50ZXJmYWNlXG5cbiAgLyoqXG4gICAqIEZpZWxkcyBmb3JtYXRcbiAgICogQHJldHVybiB7Rm9ybUZpZWxkW119XG4gICAqL1xuICBwdWJsaWMgZ2V0IGZvcm1hdCgpOiBGb3JtRmllbGRbXSB7XG4gICAgbGV0IGZvcm1hdCA9IFtdLFxuICAgICAgZW1haWwgPSBuZXcgRm9ybUZpZWxkKCksXG4gICAgICBwYXNzd29yZCA9IG5ldyBGb3JtRmllbGQoKVxuXG4gICAgZW1haWwubmFtZSA9ICdlbWFpbCdcbiAgICBlbWFpbC5sYWJlbCA9ICdDb3JyZW8nXG4gICAgZW1haWwucmVzdHJpY3Rpb25zID0gWydpc0VtYWlsJ11cbiAgICBlbWFpbC5yZXF1aXJlZCA9IHRydWVcbiAgICBlbWFpbC5tYXhMZW5ndGggPSAyNTVcblxuICAgIGZvcm1hdC5wdXNoKGVtYWlsKVxuXG4gICAgcGFzc3dvcmQubmFtZSA9ICdwYXNzd29yZCdcbiAgICBwYXNzd29yZC50eXBlID0gJ3Bhc3N3b3JkJ1xuICAgIHBhc3N3b3JkLmxhYmVsID0gJ0NvbnRyYXNlw7FhJ1xuICAgIHBhc3N3b3JkLnJlc3RyaWN0aW9ucyA9IFsnaXNQYXNzd29yZCddXG4gICAgcGFzc3dvcmQucmVxdWlyZWQgPSB0cnVlXG4gICAgcGFzc3dvcmQubWF4TGVuZ3RoID0gMjU1XG5cbiAgICBmb3JtYXQucHVzaChwYXNzd29yZClcblxuICAgIHJldHVybiB0aGlzLl9mb3JtYXQubGVuZ3RoID8gdGhpcy5fZm9ybWF0IDogZm9ybWF0XG4gIH1cblxuICBwcml2YXRlIHNldCBmb3JtYXQoZm9ybWF0OiBGb3JtRmllbGRbXSkge1xuICAgIHRoaXMuX2Zvcm1hdCA9IGZvcm1hdFxuICB9XG5cbiAgY29uc3RydWN0b3IoZGF0YTogRGF0YSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgdGhpcy5jdXN0b21lciA9IHRoaXMuZGF0YS5nZXRDdXN0b21lckJ5RW1haWwoJ2RlbW9AZGVtby5jb20nKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmN1c3RvbWVyUGVyc2lzdCgpXG4gICAgdGhpcy5yZW5kZXIoKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRoZW50aWNhdGlvbi1mb3JtJylcbiAgICBpZiAoZm9ybSkge1xuICAgICAgdGhpcy5mbG9hdGluZ0xhYmVscygpXG4gICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEZvcm1FbGVtZW50XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLnZhbGlkYXRlKHRhcmdldClcbiAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICB0aGlzLmxvZ0luKHRoaXMuZ2V0VmFsdWUoJ2VtYWlsJykpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIEVuYWJsZSBhZGQgdG8gY2FydCBidXR0b25zIGlmIGN1c3RvbWVyIGlzIGxvZ2dlZFxuICAgIGxldCBhZGRUb0NhcnRCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICcucHJvZHVjdC1hZGQtY2FydCAuYWRkLXRvLWNhcnQnXG4gICAgKVxuICAgIGlmIChhZGRUb0NhcnRCdG5zICYmIHRoaXMuaXNMb2dnZWQpXG4gICAgICBhZGRUb0NhcnRCdG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKSlcbiAgICBlbHNlXG4gICAgICBhZGRUb0NhcnRCdG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKSlcbiAgfVxuICAvKipcbiAgICogVE9ETyBTZXNzaW9uIENoZWNrIE1ldGhvZFxuICAgKiBUaGlzIG1ldGhvZCBzaG91bGQgY2hlY2sgdmFsaWQgdG9rZW4gZnJvbSBzZXJ2ZXIgc2lkZVxuICAgKiBCdXQgZm9yIHRoaXMgcHJvamVjdCwgYmFja2VuZCB0ZWNoIGlzIG5vdCBhbGxvd2VkIHNvIGZvciBzaW1pbGF0aW9uXG4gICAqIHB1cnBvc2VzIGl0J3MgZ29pbmcgdG8gY2hlY2sgaWYgdmFyaWFibGUgaXNMb2dnZWQgaXMgdHJ1ZSBmcm9tXG4gICAqIGxvY2FsU3RvcmFnZVxuICAgKiAqL1xuICBwcml2YXRlIGN1c3RvbWVyUGVyc2lzdCgpIHtcbiAgICBsZXQgaXNMb2dnZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWQnKVxuICAgIGlmIChpc0xvZ2dlZCkge1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWQnLCBKU09OLnN0cmluZ2lmeShmYWxzZSkpXG4gICAgICBpc0xvZ2dlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc0xvZ2dlZCcpXG4gICAgICBpZiAoaXNMb2dnZWQpIHtcbiAgICAgICAgdGhpcy5pc0xvZ2dlZCA9ICEhSlNPTi5wYXJzZShpc0xvZ2dlZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNMb2dnZWQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjdXN0b21lckV4aXN0cyhlbWFpbDogc3RyaW5nKSB7XG4gICAgaWYgKCFWYWxpZGF0ZS5pc0VtYWlsKGVtYWlsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5kYXRhLmdldEN1c3RvbWVyQnlFbWFpbChlbWFpbClcblxuICAgIHJldHVybiByZXN1bHQgJiYgISFyZXN1bHQuaWRfY3VzdG9tZXJcbiAgfVxuXG4gIHByaXZhdGUgYWRkVmFsdWVzKGZvcm0/OiBIVE1MRm9ybUVsZW1lbnQpIHtcbiAgICBsZXQgbmV3Rm9ybWF0OiBGb3JtRmllbGRbXSA9IFtdXG4gICAgaWYgKGZvcm0pIHtcbiAgICAgIHRoaXMuZm9ybWF0LmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbbmFtZT0ke2ZpZWxkLm5hbWV9XWBcbiAgICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgIGZpZWxkLnZhbHVlID0gaW5wdXQudmFsdWVcbiAgICAgICAgbmV3Rm9ybWF0LnB1c2goZmllbGQpXG4gICAgICB9KVxuICAgICAgdGhpcy5mb3JtYXQgPSBbXVxuICAgICAgdGhpcy5mb3JtYXQgPSBuZXdGb3JtYXRcbiAgICB9XG4gIH1cbiAgcHVibGljIHZhbGlkYXRlKGZvcm06IEhUTUxGb3JtRWxlbWVudCkge1xuICAgIGZvciAobGV0IGZpZWxkIG9mIHRoaXMuZm9ybWF0KSB7XG4gICAgICBmaWVsZC5lcnJvcnMgPSBbXVxuICAgIH1cbiAgICAvLyBBZGQgdmFsdWVzIHRvIGZvcm1hdFxuICAgIHRoaXMuYWRkVmFsdWVzKGZvcm0pXG4gICAgLy8gUHJvY2VlZCB3aXRoIHZhbGlkYXRpb25zXG4gICAgY29uc3QgY3VzdG9tZXJFbWFpbCA9IHRoaXMuZ2V0VmFsdWUoJ2VtYWlsJylcbiAgICBpZiAoIXRoaXMuY3VzdG9tZXJFeGlzdHMoY3VzdG9tZXJFbWFpbCkpIHtcbiAgICAgIHRoaXMuZ2V0RmllbGQoJ2VtYWlsJykuYWRkRXJyb3IoJ05vIGVzdGEgcmVnaXN0cmFkbycpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXRGaWVsZCgnZW1haWwnKS5lcnJvcnMgPSBbXVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci52YWxpZGF0ZShmb3JtKVxuICB9XG5cbiAgcHJpdmF0ZSBsb2dJbihlbWFpbDogc3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmlzTG9nZ2VkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWQnLCBKU09OLnN0cmluZ2lmeSh0cnVlKSlcbiAgICAgIHRoaXMuaXNMb2dnZWQgPSB0cnVlXG4gICAgICB0aGlzLmN1c3RvbWVyID0gdGhpcy5kYXRhLmdldEN1c3RvbWVyQnlFbWFpbChlbWFpbClcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbG9nT3V0KCkge1xuICAgIGlmICh0aGlzLmlzTG9nZ2VkKSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNMb2dnZWQnLCBKU09OLnN0cmluZ2lmeShmYWxzZSkpXG4gICAgICB0aGlzLmlzTG9nZ2VkID0gZmFsc2VcbiAgICAgIHRoaXMucmVuZGVyKClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1hdXRoZW50aWNhdGlvbicpLmlubmVySFRNTCA9ICF0aGlzLmlzTG9nZ2VkXG4gICAgICA/IGAke3RoaXMucmVuZGVyQXV0aGVudGljYXRpb259YFxuICAgICAgOiBgJHt0aGlzLnJlbmRlcldlbGNvbWV9YFxuICAgIHRoaXMuYWRkVmFsdWVzKFxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dGhlbnRpY2F0aW9uLWZvcm0nKSBhcyBIVE1MRm9ybUVsZW1lbnRcbiAgICApXG4gICAgY29uc3QgbG9nb3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ291dCcpXG4gICAgaWYgKGxvZ291dCkgbG9nb3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5sb2dPdXQoKSlcbiAgICBpZiAoIXRoaXMuaXNMb2dnZWQpXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvcHBpbmctY2FydC13cmFwcGVyJykuY2xhc3NMaXN0LmFkZCgnZC1ub25lJylcbiAgICBlbHNlXG4gICAgICBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoJ3Nob3BwaW5nLWNhcnQtd3JhcHBlcicpXG4gICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICBwcml2YXRlIGdldCByZW5kZXJXZWxjb21lKCkge1xuICAgIGlmICh0aGlzLmN1c3RvbWVyICYmIHRoaXMuaXNMb2dnZWQpXG4gICAgICByZXR1cm4gLyogSFRNTCAqLyBgXG4gICAgICAgIDxoNiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgQmllbnZlbmlkbyAke3RoaXMuY3VzdG9tZXIuZmlyc3RuYW1lfSAke3RoaXMuY3VzdG9tZXIubGFzdG5hbWV9IVxuICAgICAgICA8L2g2PlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiBpZD1cImxvZ291dFwiIHR5cGU9XCJidXR0b25cIj5cbiAgICAgICAgICBDZXJyYXIgc2VzacOzblxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIGBcbiAgICBlbHNlIHJldHVybiAnJ1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgcmVuZGVyQXV0aGVudGljYXRpb24oKSB7XG4gICAgcmV0dXJuIC8qIEhUTUwgKi8gYFxuICAgICAgPGgyIGNsYXNzPVwidGV4dC1jZW50ZXJcIj5JbmljaWFyIFNlc2nDs248L2gyPlxuICAgICAgPGZvcm0gaWQ9XCJhdXRoZW50aWNhdGlvbi1mb3JtXCIgbm92YWxpZGF0ZT5cbiAgICAgICAgJHt0aGlzLmZvcm1hdFxuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAoZmllbGQpID0+IGA8ZGl2IGNsYXNzPVwiY29udHJvbC1ncm91cFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC0xMiBmb3JtLWdyb3VwIGZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAgbWItMCBwYi0yXCI+JHtmaWVsZC5yZW5kZXIoKX08L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICApXG4gICAgICAgICAgLmpvaW4oJycpfVxuXG4gICAgICAgIDxiciAvPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHctMTAwXCJcbiAgICAgICAgICAgIGlkPVwic3VibWl0QXV0aGVudGljYXRpb25cIlxuICAgICAgICAgICAgbmFtZT1cInN1Ym1pdEF1dGhlbnRpY2F0aW9uXCJcbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEluZ3Jlc2FyXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgICAgPGRpdiBpZD1cImRldi1pbmZvXCIgY2xhc3M9XCJweS0yXCI+XG4gICAgICAgIDxoNiBjbGFzcz1cInRleHQtY2VudGVyXCI+REFUT1MgREUgREVTQVJST0xMTzwvaDY+XG4gICAgICAgIDxwPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgbGFiZWwtaW5mb1wiPlVzdWFyaW86IGRlbW9AZGVtby5jb208L3NwYW4+PGJyIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbCBsYWJlbC1pbmZvXCI+Q29udHJhc2XDsWE6IGRlbW9kZW1vPC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gIH1cblxuICBwdWJsaWMgZ2V0RmllbGQoZmllbGROYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgZmllbGQgPSB0aGlzLmZvcm1hdC5maWx0ZXIoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09PSBmaWVsZE5hbWUpWzBdXG5cbiAgICBpZiAoZmllbGQpIHJldHVybiBmaWVsZFxuICAgIGVsc2UgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHB1YmxpYyBnZXRWYWx1ZShmaWVsZE5hbWU6IHN0cmluZykge1xuICAgIGxldCBmaWVsZCA9IHRoaXMuZ2V0RmllbGQoZmllbGROYW1lKVxuICAgIGlmIChmaWVsZCkge1xuICAgICAgcmV0dXJuIGZpZWxkLnZhbHVlXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHByaXZhdGUgZmxvYXRpbmdMYWJlbHMoKSB7XG4gICAgY29uc3QgbGFiZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAnKVxuICAgIGlmIChsYWJlbHMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBsYWJlbCBvZiBBcnJheS5mcm9tKGxhYmVscykpIHtcbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XG4gICAgICAgICAgbGFiZWwuY2xhc3NMaXN0LnRvZ2dsZShcbiAgICAgICAgICAgICdmbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwLXdpdGgtdmFsdWUnLFxuICAgICAgICAgICAgISF0YXJnZXQudmFsdWVcbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIGxhYmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcbiAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICAgICAgJ2Zsb2F0aW5nLWxhYmVsLWZvcm0tZ3JvdXAtd2l0aC12YWx1ZScsXG4gICAgICAgICAgICAhIXRhcmdldC52YWx1ZVxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbiAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZCgnZmxvYXRpbmctbGFiZWwtZm9ybS1ncm91cC13aXRoLWZvY3VzJylcbiAgICAgICAgfSlcbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uIChldmVudDogRXZlbnQpIHtcbiAgICAgICAgICBsYWJlbC5jbGFzc0xpc3QucmVtb3ZlKCdmbG9hdGluZy1sYWJlbC1mb3JtLWdyb3VwLXdpdGgtZm9jdXMnKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdAaGVscGVycy9Db21wb25lbnQnXG5pbXBvcnQgeyBQcm9kdWN0SW50ZXJmYWNlIH0gZnJvbSAnQGludGVyZmFjZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RNaW5pYXR1cmVcbiAgZXh0ZW5kcyBDb21wb25lbnRcbiAgaW1wbGVtZW50cyBQcm9kdWN0SW50ZXJmYWNlXG57XG4gIGlkX3Byb2R1Y3Q6IG51bWJlclxuICBza3U6IHN0cmluZ1xuICBicmFuZDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBwcmljZTogbnVtYmVyXG4gIGRpc2NvdW50X2Ftb3VudD86IG51bWJlclxuICBpbWc6IHN0cmluZ1xuICBzdG9jazogbnVtYmVyXG4gIGF2YWlsYWJpbGl0eTogc3RyaW5nXG4gIGF2YWlsYWJpbGl0eV9tZXNzYWdlOiBzdHJpbmdcbiAgY29uc3RydWN0b3IocHJvZHVjdDogUHJvZHVjdEludGVyZmFjZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmlkX3Byb2R1Y3QgPSBwcm9kdWN0LmlkX3Byb2R1Y3RcbiAgICB0aGlzLnNrdSA9IHByb2R1Y3Quc2t1XG4gICAgdGhpcy5icmFuZCA9IHByb2R1Y3QuYnJhbmRcbiAgICB0aGlzLm5hbWUgPSBwcm9kdWN0Lm5hbWVcbiAgICB0aGlzLnByaWNlID0gcHJvZHVjdC5wcmljZVxuICAgIHRoaXMuZGlzY291bnRfYW1vdW50ID0gcHJvZHVjdC5kaXNjb3VudF9hbW91bnRcbiAgICB0aGlzLmltZyA9IHByb2R1Y3QuaW1nXG4gICAgdGhpcy5zdG9jayA9IHByb2R1Y3Quc3RvY2tcbiAgICBpZiAodGhpcy5zdG9jayA8PSAwKSB7XG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eSA9ICd1bmF2YWlsYWJsZSdcbiAgICAgIHRoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2UgPSAnQWdvdGFkbydcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RvY2sgPD0gMikge1xuICAgICAgdGhpcy5hdmFpbGFiaWxpdHkgPSAnbGFzdF9yZW1haW5pbmdfaXRlbXMnXG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eV9tZXNzYWdlID0gJ8OabHRpbW9zIHByb2R1Y3RvcydcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RvY2sgPiAyKSB7XG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eSA9ICdhdmFpbGFibGUnXG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eV9tZXNzYWdlID0gJ0Rpc3BvbmlibGUgcGFyYSBwZWRpZG8nXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXZhaWxhYmlsaXR5ID0gJ3VuYXZhaWxhYmxlJ1xuICAgICAgdGhpcy5hdmFpbGFiaWxpdHlfbWVzc2FnZSA9ICdBZ290YWRvJ1xuICAgIH1cbiAgfVxuICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAvKiBIVE1MICovIGA8ZGl2XG4gICAgICBjbGFzcz1cImpzLXByb2R1Y3QtbWluaWF0dXJlLXdyYXBwZXIgY29sLTEyIGNvbC1tZC00IGNvbC1sZy00IGNvbC14bC00XCJcbiAgICA+XG4gICAgICA8YXJ0aWNsZVxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtbWluaWF0dXJlIHByb2R1Y3QtbWluaWF0dXJlLWRlZmF1bHQgcHJvZHVjdC1taW5pYXR1cmUtZ3JpZCBqcy1wcm9kdWN0LW1pbmlhdHVyZVwiXG4gICAgICAgIGRhdGEtaWQtcHJvZHVjdD1cIiR7dGhpcy5pZF9wcm9kdWN0fVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRodW1ibmFpbCBwcm9kdWN0LXRodW1ibmFpbFwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBkYXRhLXNyYz1cIiR7dGhpcy5pbWd9XCJcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmltZ31cIlxuICAgICAgICAgICAgICBhbHQ9XCIke3RoaXMudHJ1bmNhdGVTdHJpbmcodGhpcy5uYW1lLCAzMCl9XCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIyMzZcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMDVcIlxuICAgICAgICAgICAgICBjbGFzcz1cImltZy1mbHVpZCBwcm9kdWN0LXRodW1ibmFpbC1maXJzdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWF2YWlsYWJpbGl0eSBkLWJsb2NrXCI+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzcz1cImJhZGdlICR7dGhpcy5zdG9jayA8PSAwXG4gICAgICAgICAgICAgICAgPyAnYmctZGFuZ2VyIHByb2R1Y3QtdW5hdmFpbGFibGUnXG4gICAgICAgICAgICAgICAgOiAnYmctc3VjY2VzcyBwcm9kdWN0LWF2YWlsYWJsZSd9ICR7dGhpcy5zdG9jayA+IDAgJiZcbiAgICAgICAgICAgICAgdGhpcy5hdmFpbGFiaWxpdHkgPT09ICdsYXN0X3JlbWFpbmluZ19pdGVtcydcbiAgICAgICAgICAgICAgICA/ICdiZy13YXJuaW5nIHByb2R1Y3QtbGFzdC1pdGVtcydcbiAgICAgICAgICAgICAgICA6ICcnfSBtdC0yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgJHt0aGlzLmF2YWlsYWJpbGl0eSA9PT0gJ2F2YWlsYWJsZSdcbiAgICAgICAgICAgICAgICA/IGA8aSBjbGFzcz1cImZhcyBmYS1jaGVjayBydGwtbm8tZmxpcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gJHt0aGlzLmF2YWlsYWJpbGl0eV9tZXNzYWdlfWBcbiAgICAgICAgICAgICAgICA6IHRoaXMuYXZhaWxhYmlsaXR5ID09PSAnbGFzdF9yZW1haW5pbmdfaXRlbXMnXG4gICAgICAgICAgICAgICAgPyBgPGkgY2xhc3M9XCJmYXMgZmEtZXhjbGFtYXRpb25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+ICR7dGhpcy5hdmFpbGFiaWxpdHlfbWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYXMgZmEtYmFuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiAke3RoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2V9YH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBleHRyYS1zbWFsbC1ndXR0ZXJzIGp1c3RpZnktY29udGVudC1lbmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtYnJhbmQgdGV4dC1tdXRlZFwiPiR7dGhpcy5icmFuZH08L2Rpdj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzPVwiaDQgcHJvZHVjdC10aXRsZVwiPiR7dGhpcy5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LXJlZmVyZW5jZSB0ZXh0LW11dGVkXCI+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz5TS1U8L3N0cm9uZz46ICR7dGhpcy5za3V9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1wcmljZS1hbmQtc2hpcHBpbmdcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2R1Y3Qtc3RvY2sgdGV4dC1tdXRlZFwiPlxuICAgICAgICAgICAgICAgICAgJHt0aGlzLnN0b2NrID8gYCR7dGhpcy5zdG9ja30gdW5pZGFkZXMgZW4gc3RvY2tgIDogJyd9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1wcmljZVwiIGNvbnRlbnQ9XCIke3RoaXMucHJpY2V9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtYWRkLWNhcnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtYWRkLWNhcnRcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1xdHlcIlxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwicXR5XCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9XCIxXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXByb2R1Y3QtbGlzdCBhZGQtdG8tY2FydFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWJ1dHRvbi1hY3Rpb249XCJhZGQtdG8tY2FydFwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2hvcHBpbmctY2FydCBmYS1md1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIEHDsWFkaXIgYWwgY2Fycm9cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgaXRlbXByb3A9XCJpc1JlbGF0ZWRUb1wiXG4gICAgICAgICAgaXRlbXNjb3BlXG4gICAgICAgICAgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUHJvZHVjdFwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWV0YSBpdGVtcHJvcD1cImltYWdlXCIgY29udGVudD1cIiR7dGhpcy5pbWd9XCIgLz5cbiAgICAgICAgICA8bWV0YSBpdGVtcHJvcD1cIm5hbWVcIiBjb250ZW50PVwiJHt0aGlzLm5hbWV9XCIgLz5cbiAgICAgICAgICA8c3BhbiBpdGVtcHJvcD1cIm9mZmVyc1wiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9PZmZlclwiPlxuICAgICAgICAgICAgPG1ldGEgaXRlbXByb3A9XCJwcmljZVwiIGNvbnRlbnQ9XCIke3RoaXMucHJpY2V9XCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICA8L2Rpdj5gXG4gIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnQGhlbHBlcnMvQ29tcG9uZW50J1xuaW1wb3J0IFByb2R1Y3RNaW5pYXR1cmUgZnJvbSAnQGNvbXBvbmVudHMvY2F0YWxvZy9Qcm9kdWN0TWluaWF0dXJlJ1xuaW1wb3J0IHsgUHJvZHVjdEludGVyZmFjZSB9IGZyb20gJ0BpbnRlcmZhY2VzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcHVibGljIHByb2R1Y3RzOiBQcm9kdWN0TWluaWF0dXJlW11cblxuICBjb25zdHJ1Y3Rvcihwcm9kdWN0czogUHJvZHVjdEludGVyZmFjZVtdKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMucHJvZHVjdHMgPSBwcm9kdWN0cy5tYXAoKHByb2R1Y3QpID0+IG5ldyBQcm9kdWN0TWluaWF0dXJlKHByb2R1Y3QpKVxuICB9XG4gIHB1YmxpYyBpbml0KCkge1xuICAgIHRoaXMucmVuZGVyKClcbiAgfVxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1wcm9kdWN0cycpXG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IHRoaXMucmVuZGVyUHJvZHVjdExpc3RcbiAgfVxuICBwdWJsaWMgc29ydCh0eXBlOiBzdHJpbmcsIHdheTogJ2FzYycgfCAnZGVzJykge1xuICAgIGxldCBwcm9kdWN0cyA9IHRoaXMucHJvZHVjdHNcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3ByaWNlJzpcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3N0b2NrJzpcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ25hbWUnOlxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBXcm9uZyBzb3J0IHByb2R1Y3QgbGlzdC4gVHJpZWQgdG8gc29ydCBieSAke3R5cGV9IGFuZCB0eXBlICR7d2F5fWBcbiAgICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJlbmRlclByb2R1Y3RMaXN0KCkge1xuICAgIHJldHVybiAvKiBIVE1MICovIGA8ZGl2IGNsYXNzPVwicHJvZHVjdHMgcm93IHByb2R1Y3RzLWdyaWRcIj5cbiAgICAgICR7dGhpcy5wcm9kdWN0c1xuICAgICAgICAubWFwKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHByb2R1Y3QucmVuZGVyKClcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJycpfVxuICAgIDwvZGl2PmBcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2FycmllckludGVyZmFjZSB9IGZyb20gJ0BpbnRlcmZhY2VzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJyaWVyIHtcbiAgaWRfY2FycmllcjogbnVtYmVyXG4gIGZpeGVkX3ByaWNlOiBudW1iZXJcbiAgcGVyX3BhY2thZ2U6IG51bWJlclxuICBjb25zdHJ1Y3RvcihjYXJyaWVyOiBDYXJyaWVySW50ZXJmYWNlKSB7XG4gICAgdGhpcy5pZF9jYXJyaWVyID0gY2Fycmllci5pZF9jYXJyaWVyXG4gICAgdGhpcy5maXhlZF9wcmljZSA9IGNhcnJpZXIuZml4ZWRfcHJpY2VcbiAgICB0aGlzLnBlcl9wYWNrYWdlID0gY2Fycmllci5wZXJfcGFja2FnZVxuICB9XG59XG4iLCJpbXBvcnQgeyBDdXJyZW5jeUludGVyZmFjZSB9IGZyb20gJ0BpbnRlcmZhY2VzJ1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICdAaGVscGVycy9Db21wb25lbnQnXG5pbXBvcnQgRGF0YSBmcm9tICdAaGVscGVycy9EYXRhJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXJyZW5jeSBleHRlbmRzIENvbXBvbmVudCBpbXBsZW1lbnRzIEN1cnJlbmN5SW50ZXJmYWNlIHtcbiAgcHVibGljIGlkX2N1cnJlbmN5OiBudW1iZXJcbiAgcHVibGljIGlzb19sYW5nOiBzdHJpbmdcbiAgcHVibGljIGxhYmVsOiBzdHJpbmdcbiAgcHVibGljIHN5bWJvbDogc3RyaW5nXG4gIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nXG4gIHB1YmxpYyBkZWNpbWFsczogbnVtYmVyXG4gIHB1YmxpYyB2YWx1ZTogbnVtYmVyXG4gIHByaXZhdGUgZGF0YTogRGF0YVxuXG4gIGNvbnN0cnVjdG9yKGRhdGE6IERhdGEpIHtcbiAgICBzdXBlcigpXG4gICAgY29uc3QgY3VycmVuY3kgPSBkYXRhLmdldEN1cnJlbmN5KClcbiAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgdGhpcy5pZF9jdXJyZW5jeSA9IGN1cnJlbmN5LmlkX2N1cnJlbmN5XG4gICAgdGhpcy5pc29fbGFuZyA9IGN1cnJlbmN5Lmlzb19sYW5nXG4gICAgdGhpcy5sYWJlbCA9IGN1cnJlbmN5LmxhYmVsXG4gICAgdGhpcy5zeW1ib2wgPSBjdXJyZW5jeS5zeW1ib2xcbiAgICB0aGlzLnBvc2l0aW9uID0gY3VycmVuY3kucG9zaXRpb25cbiAgICB0aGlzLmRlY2ltYWxzID0gY3VycmVuY3kuZGVjaW1hbHNcbiAgICB0aGlzLnZhbHVlID0gY3VycmVuY3kudmFsdWVcbiAgfVxuXG4gIHByaXZhdGUgc2V0IGN1cnJlbmN5KHBhcmFtczogQ3VycmVuY3lJbnRlcmZhY2UpIHtcbiAgICB0aGlzLmlkX2N1cnJlbmN5ID0gcGFyYW1zLmlkX2N1cnJlbmN5XG4gICAgdGhpcy5pc29fbGFuZyA9IHBhcmFtcy5pc29fbGFuZ1xuICAgIHRoaXMubGFiZWwgPSBwYXJhbXMubGFiZWxcbiAgICB0aGlzLnN5bWJvbCA9IHBhcmFtcy5zeW1ib2xcbiAgICB0aGlzLnBvc2l0aW9uID0gcGFyYW1zLnBvc2l0aW9uXG4gICAgdGhpcy5kZWNpbWFscyA9IHBhcmFtcy5kZWNpbWFsc1xuICAgIHRoaXMudmFsdWUgPSBwYXJhbXMudmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JtYXQgYW1vdW50IHRvIGN1cnJlbmN5LlxuICAgKiBUaG91c2FuZCBzZXBhcmF0b3IgZXF1YWxzIHRvIGRvdCBmb3IgYWxsIHNwYW5pc2ggbGFuZ3VhZ2VzLCBvdGhlcnMgd2l0aCBjb21tYS5cbiAgICogRGVjaW1hbCBzZXBhcmF0b3IgZXF1YWxzIHRvIGNvbW1hIGZvciBhbGwgc3BhbmlzaCBsYW5ndWFnZXMsIG90aGVycyB3aXRoIGRvdFxuICAgKiBAcGFyYW0ge251bWJlcn0gYW1vdW50IC0gQW1vdW50IG9mIHByaWNlXG4gICAqIEByZXR1cm4ge3N0cmluZ30gaWYgcmVzdWx0IGlzIHVuZGVmaW5lZCwgbnVsbCwgTmFOIG9yIGZhbHNlLCByZXNvbHZlIHdpdGggdG9Mb2NhbGVTdHJpbmdcbiAgICovXG4gIHB1YmxpYyBmb3JtYXQoYW1vdW50OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHRcbiAgICBhbW91bnQgPSArYW1vdW50LnRvRml4ZWQodGhpcy5kZWNpbWFscylcbiAgICBsZXQgcGFydHMgPSAoYW1vdW50ICsgJycpLnNwbGl0KCcuJyksXG4gICAgICBpbnRlZ2VyID0gcGFydHNbMF0sXG4gICAgICBkZWNpbWFsID0gcGFydHNbMV0sXG4gICAgICBpc29fY29kZSA9IHRoaXMuaXNvX2xhbmcsXG4gICAgICBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb25cbiAgICBpZiAoaXNvX2NvZGUuc3Vic3RyaW5nKDAsIDIpID09PSAnZXMnKSB7XG4gICAgICByZXN1bHQgPSBpbnRlZ2VyLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcuJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gYCR7aW50ZWdlci5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnLCcpfSR7XG4gICAgICAgIGRlY2ltYWwgPyBgPHN1cD4ke2RlY2ltYWx9PC9zdXA+YCA6ICcnXG4gICAgICB9YFxuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQgfHwgKCthbW91bnQpLnRvTG9jYWxlU3RyaW5nKGlzb19jb2RlKVxuICAgIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnKVxuICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInByaWNlLXN5bWJvbFwiPiR7dGhpcy5zeW1ib2x9PC9zcGFuPiR7cmVzdWx0fWBcbiAgICBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JylcbiAgICAgIHJldHVybiBgJHtyZXN1bHR9PHNwYW4gY2xhc3M9XCJwcmljZS1zeW1ib2xcIj4ke3RoaXMuc3ltYm9sfTwvc3Bhbj5gXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgY29uc3QgcHJpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtcHJpY2UsIC5yZWd1bGFyLXByaWNlJylcbiAgICBwcmljZXMuZm9yRWFjaCgocHJpY2UpID0+IHtcbiAgICAgIGxldCBhbW91bnQgPSBwcmljZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgaWYgKGFtb3VudCkge1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdCgrYW1vdW50ICogdGhpcy52YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHJlbmRlcigpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBpcyBub3QgaW1wbGVtZW50ZWQnKVxuICB9XG5cbiAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jdXJyZW5jeScpXG4gICAgdGhpcy51cGRhdGVCeUlkKHRoaXMuaWRfY3VycmVuY3kpXG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGN1cnJlbmN5OiBDdXJyZW5jeUludGVyZmFjZSA9IEpTT04ucGFyc2UoXG4gICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjdXJyZW5jeScpXG4gICAgICApXG4gICAgICBpZiAoY3VycmVuY3kpXG4gICAgICAgIChlbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gY3VycmVuY3kuaWRfY3VycmVuY3kgKyAnJ1xuXG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnVwZGF0ZUJ5SWQoKyhldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICAvKipcbiAgICogQGRlc2MgVXBkYXRlIGN1cnJlbmN5IGJ5IElEXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZF9jdXJyZW5jeSAtIEN1cnJlbmN5IElEXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQnlJZChpZF9jdXJyZW5jeTogbnVtYmVyKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1jdXJyZW5jeScpXG4gICAgY29uc3QgY3VycmVuY3kgPSB0aGlzLmRhdGEuZ2V0Q3VycmVuY3lCeUlkKGlkX2N1cnJlbmN5KVxuICAgIGlmIChjdXJyZW5jeSAmJiBlbGVtZW50KSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY3VycmVuY3knLCBKU09OLnN0cmluZ2lmeShjdXJyZW5jeSkpXG4gICAgICB0aGlzLmN1cnJlbmN5ID0gY3VycmVuY3lcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEZhZGUgb3V0IGVmZmVjdCB3aXRoIHNldFRpbWVvdXQgYW5kIGNsZWFyVGltZW91dFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUYXJnZXQgZWxlbWVudCB0byBhcHBseSBlZmZlY3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBJdCBpcyB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIHdoZXJlIDEwMDAgZXF1YWxzIDEgc2Vjb25kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIHJldHVybnMgYSBmdW5jdGlvbiBvbmNlIHRoZSBleGVjdXRpb24gaXMgZmluaXNoZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhZGVPdXQoXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICBkdXJhdGlvbjogbnVtYmVyLFxuICBjYWxsYmFjazogRnVuY3Rpb25cbikge1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgbGV0IGxhc3QgPSArbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgbGV0IGlkOiBOb2RlSlMuVGltZW91dFxuXG4gIGxldCB0aWNrID0gZnVuY3Rpb24gKCkge1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IFN0cmluZyhcbiAgICAgICtlbGVtZW50LnN0eWxlLm9wYWNpdHkgLSAoK25ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbGFzdCkgLyBkdXJhdGlvblxuICAgIClcblxuICAgIGxhc3QgPSArbmV3IERhdGUoKVxuICAgIGlmICgrZWxlbWVudC5zdHlsZS5vcGFjaXR5IDw9IDEpIHtcbiAgICAgIGlkID0gc2V0VGltZW91dCh0aWNrLCAxNilcbiAgICB9XG5cbiAgICBpZiAoaWQgJiYgK2VsZW1lbnQuc3R5bGUub3BhY2l0eSA8PSAwKSB7XG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpXG4gICAgICBjbGVhclRpbWVvdXQoaWQpXG4gICAgfVxuICB9XG4gIHRpY2soKVxufVxuIiwiLyoqXG4gKiAgQGNsYXNzXG4gKiAgQGZ1bmN0aW9uIFRvdWNoc3BpblxuICogIEBwYXJhbSB7RE9Nb2JqZWN0fSBlbGVtZW50IHRvIGNyZWF0ZSBhIHF1YW50aXR5IHdyYXBwZXIgYXJvdW5kXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvdWNoc3BpbiB7XG4gIC8vIENyZWF0ZSBpbnB1dFxuICBwdWJsaWMgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG5cbiAgLy8gRGVmdWFsdCB0ZXh0IGZvciBidXR0b25zXG4gIHB1YmxpYyBkZWNyZWFzZUhUTUwgPSAnLSdcbiAgcHVibGljIGluY3JlYXNlSFRNTCA9ICcrJ1xuICAvLyBCdXR0b25zXG4gIHB1YmxpYyBkb3duXG4gIHB1YmxpYyB1cFxuICBjb25zdHJ1Y3RvcihcbiAgICBzZWxmOiBFbGVtZW50LFxuICAgIGNoaWxkSW5wdXRDbGFzc05hbWU6IHN0cmluZyxcbiAgICBkZWNyZWFzZUhUTUw6IHN0cmluZyxcbiAgICBpbmNyZWFzZUhUTUw6IHN0cmluZ1xuICApIHtcbiAgICBsZXQgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgICBpZiAoY2hpbGRJbnB1dENsYXNzTmFtZSkge1xuICAgICAgaW5wdXQgPSBzZWxmLnF1ZXJ5U2VsZWN0b3IoY2hpbGRJbnB1dENsYXNzTmFtZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcxJ1xuICAgICAgdGhpcy5pbnB1dC50eXBlID0gdGhpcy5pbnB1dC50eXBlIHx8ICdudW1iZXInXG4gICAgICB0aGlzLmlucHV0Lm5hbWUgPSB0aGlzLmlucHV0Lm5hbWUgfHwgJ3F0eSdcbiAgICAgIHRoaXMuaW5wdXQubWluID0gdGhpcy5pbnB1dC5taW4gfHwgJzEnXG4gICAgfVxuXG4gICAgLy8gR2V0IHRleHQgZm9yIGJ1dHRvbnNcbiAgICB0aGlzLmRlY3JlYXNlSFRNTCA9IGRlY3JlYXNlSFRNTCB8fCB0aGlzLmRlY3JlYXNlSFRNTFxuICAgIHRoaXMuaW5jcmVhc2VIVE1MID0gaW5jcmVhc2VIVE1MIHx8IHRoaXMuaW5jcmVhc2VIVE1MXG4gICAgLy8gQnV0dG9uIGNvbnN0cnVjdG9yXG4gICAgZnVuY3Rpb24gQnV0dG9uKEhUTUw6IHN0cmluZywgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgICBidXR0b24udHlwZSA9ICdidXR0b24nXG4gICAgICBidXR0b24uaW5uZXJIVE1MID0gSFRNTFxuICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKVxuICAgICAgbGV0IF9jbGFzc05hbWUgPSBjbGFzc05hbWUuc3BsaXQoJyAnKVxuICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoLi4uX2NsYXNzTmFtZSlcblxuICAgICAgcmV0dXJuIGJ1dHRvblxuICAgIH1cbiAgICAvLyBDcmVhdGUgYnV0dG9uc1xuICAgIHRoaXMuZG93biA9IEJ1dHRvbihcbiAgICAgIHRoaXMuZGVjcmVhc2VIVE1MLFxuICAgICAgJ2J0biBidG4tdG91Y2hzcGluIGpzLXRvdWNoc3BpbiBib290c3RyYXAtdG91Y2hzcGluLWRvd24nXG4gICAgKVxuICAgIHRoaXMudXAgPSBCdXR0b24oXG4gICAgICB0aGlzLmluY3JlYXNlSFRNTCxcbiAgICAgICdidG4gYnRuLXRvdWNoc3BpbiBqcy10b3VjaHNwaW4gYm9vdHN0cmFwLXRvdWNoc3Bpbi11cCdcbiAgICApXG4gICAgaWYgKGlucHV0KSB7XG4gICAgICAvLyBBZGQgZnVuY3Rpb25hbGl0eSB0byBidXR0b25zXG4gICAgICB0aGlzLmRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNoYW5nZV9xdWFudGl0eSgtMSwgaW5wdXQpKVxuICAgICAgdGhpcy51cC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2hhbmdlX3F1YW50aXR5KDEsIGlucHV0KSlcblxuICAgICAgLy8gQWRkIGlucHV0IGFuZCBidXR0b25zIHRvIHdyYXBwZXJcbiAgICAgIHNlbGYuaW5zZXJ0QmVmb3JlKHRoaXMuZG93biwgc2VsZi5jaGlsZE5vZGVzWzBdKVxuICAgICAgc2VsZi5hcHBlbmRDaGlsZCh0aGlzLnVwKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBBZGQgZnVuY3Rpb25hbGl0eSB0byBidXR0b25zXG4gICAgICB0aGlzLmRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNoYW5nZV9xdWFudGl0eSgtMSkpXG4gICAgICB0aGlzLnVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jaGFuZ2VfcXVhbnRpdHkoMSkpXG5cbiAgICAgIC8vIEFkZCBpbnB1dCBhbmQgYnV0dG9ucyB0byB3cmFwcGVyXG4gICAgICBzZWxmLmFwcGVuZENoaWxkKHRoaXMuZG93bilcbiAgICAgIHNlbGYuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dClcbiAgICAgIHNlbGYuYXBwZW5kQ2hpbGQodGhpcy51cClcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlX3F1YW50aXR5KGNoYW5nZTogbnVtYmVyLCBpbnB1dD86IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAvLyBHZXQgY3VycmVudCB2YWx1ZVxuICAgIGxldCBxdWFudGl0eTogbnVtYmVyXG4gICAgaWYgKCFpbnB1dCkgcXVhbnRpdHkgPSBOdW1iZXIodGhpcy5pbnB1dC52YWx1ZSlcbiAgICBlbHNlIHF1YW50aXR5ID0gTnVtYmVyKGlucHV0LnZhbHVlKVxuXG4gICAgLy8gRW5zdXJlIHF1YW50aXR5IGlzIGEgdmFsaWQgbnVtYmVyXG4gICAgaWYgKGlzTmFOKHF1YW50aXR5KSkgcXVhbnRpdHkgPSAxXG5cbiAgICAvLyBDaGFuZ2UgcXVhbnRpdHlcbiAgICBxdWFudGl0eSArPSBjaGFuZ2VcblxuICAgIC8vIEVuc3VyZSBxdWFudGl0eSBpcyBhbHdheXMgYSBudW1iZXJcbiAgICBxdWFudGl0eSA9IE1hdGgubWF4KHF1YW50aXR5LCAxKVxuXG4gICAgLy8gT3V0cHV0IG51bWJlclxuICAgIGlmICghaW5wdXQpIHRoaXMuaW5wdXQudmFsdWUgPSBxdWFudGl0eSArICcnXG4gICAgZWxzZSBpbnB1dC52YWx1ZSA9IHF1YW50aXR5ICsgJydcbiAgfVxuXG4gIHB1YmxpYyBpbml0KCkge1xuICAgIGxldCB0b3VjaHNwaW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmlucHV0LWdyb3VwLWFkZC1jYXJ0JylcbiAgICB0b3VjaHNwaW5zLmZvckVhY2goXG4gICAgICAodG91Y2hzcGluKSA9PlxuICAgICAgICBuZXcgVG91Y2hzcGluKFxuICAgICAgICAgIHRvdWNoc3BpbixcbiAgICAgICAgICAnaW5wdXQtcXR5JyxcbiAgICAgICAgICAnPGkgY2xhc3M9XCJmYXMgZmEtbWludXMgdG91Y2hzcGluLWRvd25cIj48L2k+JyxcbiAgICAgICAgICAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1cyB0b3VjaHNwaW4tdXBcIj48L2k+J1xuICAgICAgICApXG4gICAgKVxuICB9XG59XG4iLCJpbXBvcnQgQ3VycmVuY3kgZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL2N1cnJlbmN5J1xuaW1wb3J0IENvbXBvbmVudCBmcm9tICdAaGVscGVycy9Db21wb25lbnQnXG5pbXBvcnQgRGF0YSBmcm9tICdAaGVscGVycy9EYXRhJ1xuaW1wb3J0IHsgUHJvZHVjdEludGVyZmFjZSwgU2hvcHBpbmdjYXJ0UHJvZHVjdEludGVyZmFjZSB9IGZyb20gJ0BpbnRlcmZhY2VzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wcGluZ2NhcnRQcm9kdWN0XG4gIGV4dGVuZHMgQ29tcG9uZW50XG4gIGltcGxlbWVudHMgU2hvcHBpbmdjYXJ0UHJvZHVjdEludGVyZmFjZVxue1xuICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxuICBwdWJsaWMgaWRfcHJvZHVjdD86IG51bWJlclxuICBwdWJsaWMgbmFtZT86IHN0cmluZ1xuICBwdWJsaWMgc2t1Pzogc3RyaW5nXG4gIHB1YmxpYyBicmFuZD86IHN0cmluZ1xuICBwdWJsaWMgaW1nPzogc3RyaW5nXG4gIHB1YmxpYyBwcmljZV9hbW91bnQ/OiBudW1iZXJcbiAgcHVibGljIHByaWNlPzogc3RyaW5nXG4gIHB1YmxpYyB0b3RhbD86IHN0cmluZ1xuICBwdWJsaWMgY2FydF9xdWFudGl0eTogbnVtYmVyID0gMFxuICBwcml2YXRlIGN1cnJlbmN5OiBDdXJyZW5jeVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGN1cnJlbmN5OiBDdXJyZW5jeSxcbiAgICBwcm9kdWN0OiBQcm9kdWN0SW50ZXJmYWNlLFxuICAgIGNhcnRfcXVhbnRpdHk6IG51bWJlclxuICApIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5jdXJyZW5jeSA9IGN1cnJlbmN5XG4gICAgdGhpcy5pZF9wcm9kdWN0ID0gcHJvZHVjdC5pZF9wcm9kdWN0XG4gICAgdGhpcy5uYW1lID0gcHJvZHVjdC5uYW1lXG4gICAgdGhpcy5za3UgPSBwcm9kdWN0LnNrdVxuICAgIHRoaXMuYnJhbmQgPSBwcm9kdWN0LmJyYW5kXG4gICAgdGhpcy5pbWcgPSBwcm9kdWN0LmltZ1xuICAgIHRoaXMuY2FydF9xdWFudGl0eSA9IGNhcnRfcXVhbnRpdHlcbiAgICB0aGlzLnByaWNlX2Ftb3VudCA9IHByb2R1Y3QucHJpY2VcbiAgICB0aGlzLnByaWNlID0gKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbmN5LmZvcm1hdCh0aGlzLnByaWNlX2Ftb3VudClcbiAgICB9KSgpXG4gICAgdGhpcy50b3RhbCA9ICgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW5jeS5mb3JtYXQodGhpcy5wcmljZV9hbW91bnQgKiB0aGlzLmNhcnRfcXVhbnRpdHkpXG4gICAgfSkoKVxuICB9XG5cbiAgcHVibGljIGdldCBpbmNyZWFzZSgpIHtcbiAgICArK3RoaXMuY2FydF9xdWFudGl0eVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwdWJsaWMgZ2V0IGRlY3JlYXNlKCkge1xuICAgIC0tdGhpcy5jYXJ0X3F1YW50aXR5XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYWRkKHF1YW50aXR5OiBudW1iZXIpIHtcbiAgICB0aGlzLmNhcnRfcXVhbnRpdHkgKz0gcXVhbnRpdHlcbiAgfVxuICBwdWJsaWMgc2V0IGZpeChxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgdGhpcy5jYXJ0X3F1YW50aXR5ID0gcXVhbnRpdHlcbiAgfVxuICBwdWJsaWMgcmVmcmVzaCgpIHt9XG5cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICByZXR1cm4gLyogSFRNTCAqLyBgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1pbWFnZSBtZWRpYS1taWRkbGVcIj5cbiAgICAgICAgICA8aW1nIHNyYz1cIiR7dGhpcy5pbWd9XCIgYWx0PVwiJHt0aGlzLm5hbWV9XCIgY2xhc3M9XCJpbWctZmx1aWRcIiAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgY29sLWluZm9cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInBiLTFcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2R1Y3QtYXR0cmlidXRlcyB0ZXh0LW11dGVkIHBiLTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1saW5lLWluZm9cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWwgZm9udC13ZWlnaHQtYm9sZFwiPlNLVTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZhbHVlXCI+JHt0aGlzLnNrdX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZHVjdC1hdHRyaWJ1dGVzIHRleHQtbXV0ZWQgcGItMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWxpbmUtaW5mb1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYWJlbCBmb250LXdlaWdodC1ib2xkXCI+TWFyY2E6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPiR7dGhpcy5icmFuZH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgYWxpZ24taXRlbXMtY2VudGVyIG10LTIgbm8tZ3V0dGVyc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgbXItMlwiPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzPVwiY2FydC1wcm9kdWN0LXF1YW50aXR5IGZvcm0tY29udHJvbCBqcy1jYXJ0LWxpbmUtcHJvZHVjdC1xdWFudGl0eVwiXG4gICAgICAgICAgICAgIGRhdGEtcHJvZHVjdC1pZD1cIiR7dGhpcy5pZF9wcm9kdWN0fVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICB2YWx1ZT1cIiR7dGhpcy5jYXJ0X3F1YW50aXR5fVwiXG4gICAgICAgICAgICAgIG5hbWU9XCJwcm9kdWN0LXF1YW50aXR5LXNwaW5cIlxuICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkXCI+eDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZHVjdC1wcmljZVwiIGNvbnRlbnQ9XCIke3RoaXMucHJpY2VfYW1vdW50fVwiXG4gICAgICAgICAgICAgID4ke3RoaXMucHJpY2V9PC9zcGFuXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIGNvbC1hdXRvXCI+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBjbGFzcz1cInJlbW92ZS1mcm9tLWNhcnRcIlxuICAgICAgICAgICAgICByZWw9XCJub2ZvbGxvd1wiXG4gICAgICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgICAgICAgICBkYXRhLWlkLXByb2R1Y3Q9XCIke3RoaXMuaWRfcHJvZHVjdH1cIlxuICAgICAgICAgICAgICB0aXRsZT1cIkVsaW1pbmFyIGRlbCBjYXJyb1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRyYXNoXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PmBcbiAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdAaGVscGVycy9Db21wb25lbnQnXG5pbXBvcnQgU2hvcHBpbmdjYXJ0UHJvZHVjdCBmcm9tICcuL1Nob3BwaW5nY2FydFByb2R1Y3QnXG5pbXBvcnQgeyBDYXJ0U3VidG90YWxzVHlwZSwgQ2FydFRvdGFsVHlwZSB9IGZyb20gJ0B0eXBlcydcbmltcG9ydCBEYXRhIGZyb20gJ0BoZWxwZXJzL0RhdGEnXG5pbXBvcnQgQ3VycmVuY3kgZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL2N1cnJlbmN5J1xuaW1wb3J0IENhcnJpZXIgZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL2NhcnJpZXInXG5pbXBvcnQgeyBQcm9kdWN0SW50ZXJmYWNlIH0gZnJvbSAnQGludGVyZmFjZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nY2FydCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHByaXZhdGUgY3VycmVuY3k6IEN1cnJlbmN5XG4gIHByaXZhdGUgY2FycmllcjogQ2FycmllclxuICBwcml2YXRlIGRhdGE6IERhdGFcbiAgcHJpdmF0ZSBfcHJvZHVjdHM6IFNob3BwaW5nY2FydFByb2R1Y3RbXSA9IFtdXG4gIHByaXZhdGUgc2V0IHByb2R1Y3RzKGNhcnRfcHJvZHVjdHM6IFNob3BwaW5nY2FydFByb2R1Y3RbXSkge1xuICAgIHRoaXMuX3Byb2R1Y3RzID0gY2FydF9wcm9kdWN0c1xuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cbiAgcHVibGljIGdldCBwcm9kdWN0cygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZHVjdHNcbiAgfVxuICBwcml2YXRlIF9wcm9kdWN0c19xdWFudGl0eTogbnVtYmVyID0gMFxuICBwcml2YXRlIHNldCBwcm9kdWN0c19xdWFudGl0eShxdWFudGl0eTogbnVtYmVyKSB7XG4gICAgdGhpcy5fcHJvZHVjdHNfcXVhbnRpdHkgPSBxdWFudGl0eVxuICB9XG4gIHB1YmxpYyBnZXQgcHJvZHVjdHNfcXVhbnRpdHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvZHVjdHNfcXVhbnRpdHlcbiAgfVxuXG4gIHByaXZhdGUgX3N1YnRvdGFscz86IENhcnRTdWJ0b3RhbHNUeXBlXG4gIHByaXZhdGUgc2V0IHN1YnRvdGFscyhhcmdzOiBDYXJ0U3VidG90YWxzVHlwZSkge1xuICAgIHRoaXMuX3N1YnRvdGFscyA9IGFyZ3NcbiAgfVxuICBwdWJsaWMgZ2V0IHN1YnRvdGFscygpIHtcbiAgICByZXR1cm4gdGhpcy5fc3VidG90YWxzXG4gIH1cblxuICBwcml2YXRlIF90b3RhbD86IENhcnRUb3RhbFR5cGVcbiAgcHJpdmF0ZSBzZXQgdG90YWwoYXJnczogQ2FydFRvdGFsVHlwZSkge1xuICAgIHRoaXMuX3RvdGFsID0gYXJnc1xuICB9XG4gIHB1YmxpYyBnZXQgdG90YWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsXG4gIH1cblxuICBjb25zdHJ1Y3RvcihkYXRhOiB7IGRhdGE6IERhdGE7IGN1cnJlbmN5OiBDdXJyZW5jeTsgY2FycmllcjogQ2FycmllciB9KSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuZGF0YSA9IGRhdGEuZGF0YVxuICAgIHRoaXMuY3VycmVuY3kgPSBkYXRhLmN1cnJlbmN5XG4gICAgdGhpcy5jYXJyaWVyID0gZGF0YS5jYXJyaWVyXG4gIH1cbiAgcHVibGljIGFjdGlvbnMoKSB7XG4gICAgLy8gRW5hYmxlIGFkZCB0byBjYXJ0IGJ1dHRvbnMgaWYgY3VzdG9tZXIgaXMgbG9nZ2VkXG4gICAgY29uc3QgYWRkVG9DYXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAnLnByb2R1Y3QtYWRkLWNhcnQgLmFkZC10by1jYXJ0J1xuICAgIClcbiAgICBpZiAoYWRkVG9DYXJ0QnRucylcbiAgICAgIGFkZFRvQ2FydEJ0bnMuZm9yRWFjaCgoYnRuKSA9PlxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50XG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ID0gdGFyZ2V0LmNsb3Nlc3QoJy5qcy1wcm9kdWN0LW1pbmlhdHVyZScpXG4gICAgICAgICAgICBjb25zdCBpZF9wcm9kdWN0ID0gcHJvZHVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQtcHJvZHVjdCcpXG4gICAgICAgICAgICBjb25zdCBxdHkgPSAoXG4gICAgICAgICAgICAgIHByb2R1Y3QucXVlcnlTZWxlY3RvcignLmlucHV0LXF0eScpIGFzIEhUTUxJbnB1dEVsZW1lbnRcbiAgICAgICAgICAgICkudmFsdWVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldClcbiAgICAgICAgICAgIHRoaXMuYWRkUHJvZHVjdChOdW1iZXIoaWRfcHJvZHVjdCksIE51bWJlcihxdHkpKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKVxuICAgICAgKVxuICAgIC8vIFJlbW92ZSBhbGwgcHJvZHVjdHMgYnV0dG9uXG4gICAgY29uc3QgcmVtb3ZlQWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nob3BwaW5nLWNhcnQtcmVzdG9yZS1idG4nKVxuICAgIGlmIChyZW1vdmVBbGwpXG4gICAgICByZW1vdmVBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBbXVxuICAgICAgICB0aGlzLnJlZnJlc2goKVxuICAgICAgfSlcbiAgfVxuICBwdWJsaWMgYnVpbGQoKSB7XG4gICAgbGV0IGNhcnRfcHJvZHVjdHMgPSBEYXRhLmdldENhcnRQcm9kdWN0cygpXG4gICAgaWYgKGNhcnRfcHJvZHVjdHMubGVuZ3RoKSB7XG4gICAgICBsZXQgcHJvZHVjdHMgPSBjYXJ0X3Byb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4ge1xuICAgICAgICBsZXQgX3Byb2R1Y3Q6IFByb2R1Y3RJbnRlcmZhY2UgPSB0aGlzLmRhdGEuZ2V0UHJvZHVjdEJ5SWQoXG4gICAgICAgICAgcHJvZHVjdC5pZF9wcm9kdWN0XG4gICAgICAgIClcbiAgICAgICAgbGV0IGNhcnRfcHJvZHVjdCA9IG5ldyBTaG9wcGluZ2NhcnRQcm9kdWN0KFxuICAgICAgICAgIHRoaXMuY3VycmVuY3ksXG4gICAgICAgICAgX3Byb2R1Y3QsXG4gICAgICAgICAgcHJvZHVjdC5jYXJ0X3F1YW50aXR5XG4gICAgICAgIClcblxuICAgICAgICByZXR1cm4gY2FydF9wcm9kdWN0XG4gICAgICB9KVxuICAgICAgdGhpcy5wcm9kdWN0cyA9IHByb2R1Y3RzXG4gICAgICB0aGlzLnNldFF1YW50aXRpZXMoKVxuICAgICAgdGhpcy5zZXRTdWJ0b3RhbHMoKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UXVhbnRpdGllcygpIHtcbiAgICBpZiAodGhpcy5wcm9kdWN0cyAmJiB0aGlzLnByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucHJvZHVjdHNfcXVhbnRpdHkgPSB0aGlzLnByb2R1Y3RzLnJlZHVjZShcbiAgICAgICAgKGFjY3VtdWxhdG9yLCBwcm9kdWN0KSA9PiBwcm9kdWN0LmNhcnRfcXVhbnRpdHkgKyBhY2N1bXVsYXRvcixcbiAgICAgICAgMFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0U3VidG90YWxzKCkge1xuICAgIGxldCBwcm9kdWN0cywgc2hpcHBpbmdcbiAgICBpZiAodGhpcy5wcm9kdWN0cyAmJiB0aGlzLnByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjYXJyaWVyID0gdGhpcy5jYXJyaWVyXG4gICAgICBwcm9kdWN0cyA9ICgoKSA9PiB7XG4gICAgICAgIGxldCBhbW91bnQgPSB0aGlzLnByb2R1Y3RzLnJlZHVjZShcbiAgICAgICAgICAgIChhY2N1bXVsYXRvciwgcHJvZHVjdCkgPT5cbiAgICAgICAgICAgICAgcHJvZHVjdC5wcmljZV9hbW91bnQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgID8gcHJvZHVjdC5wcmljZV9hbW91bnQgKiBwcm9kdWN0LmNhcnRfcXVhbnRpdHkgKyBhY2N1bXVsYXRvclxuICAgICAgICAgICAgICAgIDogMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgICApLFxuICAgICAgICAgIGxhYmVsID0gJ1Byb2R1Y3RvcycsXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLmN1cnJlbmN5LmZvcm1hdChhbW91bnQpXG4gICAgICAgIHJldHVybiB7IGFtb3VudCwgbGFiZWwsIHZhbHVlIH1cbiAgICAgIH0pKClcbiAgICAgIHNoaXBwaW5nID0gKCgpID0+IHtcbiAgICAgICAgbGV0IGFtb3VudCA9XG4gICAgICAgICAgICBjYXJyaWVyLmZpeGVkX3ByaWNlICtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdHMucmVkdWNlKChhY2N1bXVsYXRvciwgcHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdC5jYXJ0X3F1YW50aXR5ICogY2Fycmllci5wZXJfcGFja2FnZSArIGFjY3VtdWxhdG9yXG4gICAgICAgICAgICB9LCAwKSxcbiAgICAgICAgICBsYWJlbCA9ICdFbnbDrW8nLFxuICAgICAgICAgIHZhbHVlID0gdGhpcy5jdXJyZW5jeS5mb3JtYXQoYW1vdW50KVxuICAgICAgICByZXR1cm4geyBhbW91bnQ6IGFtb3VudCwgbGFiZWw6IGxhYmVsLCB2YWx1ZTogdmFsdWUgfVxuICAgICAgfSkoKVxuICAgICAgdGhpcy5zdWJ0b3RhbHMgPSB7IHByb2R1Y3RzLCBzaGlwcGluZyB9XG5cbiAgICAgIGlmICh0aGlzLnN1YnRvdGFscy5wcm9kdWN0cyAmJiB0aGlzLnN1YnRvdGFscy5zaGlwcGluZykge1xuICAgICAgICBsZXQgYW1vdW50ID1cbiAgICAgICAgICAgIHRoaXMuc3VidG90YWxzLnByb2R1Y3RzLmFtb3VudCArIHRoaXMuc3VidG90YWxzLnNoaXBwaW5nLmFtb3VudCxcbiAgICAgICAgICBsYWJlbCA9ICdUb3RhbCcsXG4gICAgICAgICAgdmFsdWUgPSB0aGlzLmN1cnJlbmN5LmZvcm1hdChhbW91bnQpXG4gICAgICAgIHRoaXMudG90YWwgPSB7IGFtb3VudCwgbGFiZWwsIHZhbHVlIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaCgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICdjYXJ0X3Byb2R1Y3RzJyxcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICB0aGlzLnByb2R1Y3RzLm1hcCgocHJvZHVjdCkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZF9wcm9kdWN0OiBwcm9kdWN0LmlkX3Byb2R1Y3QsXG4gICAgICAgICAgICBjYXJ0X3F1YW50aXR5OiBwcm9kdWN0LmNhcnRfcXVhbnRpdHksXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgIClcbiAgICB0aGlzLnNldFF1YW50aXRpZXMoKVxuICAgIHRoaXMuc2V0U3VidG90YWxzKClcbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy5hY3Rpb25zKClcbiAgfVxuXG4gIHB1YmxpYyBhZGRQcm9kdWN0KGlkX3Byb2R1Y3Q6IG51bWJlciwgcXVhbnRpdHk6IG51bWJlcikge1xuICAgIGxldCBfcHJvZHVjdCA9IHRoaXMuZGF0YS5nZXRQcm9kdWN0QnlJZChpZF9wcm9kdWN0KVxuICAgIGxldCBwcm9kdWN0ID0gbmV3IFNob3BwaW5nY2FydFByb2R1Y3QodGhpcy5jdXJyZW5jeSwgX3Byb2R1Y3QsIHF1YW50aXR5KVxuICAgIGlmICh0aGlzLnByb2R1Y3RzICYmIHRoaXMucHJvZHVjdHMubGVuZ3RoKSB7XG4gICAgICBsZXQgY2FydF9wcm9kdWN0ID0gdGhpcy5wcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkX3Byb2R1Y3QgPT09IGlkX3Byb2R1Y3RcbiAgICAgIClbMF1cbiAgICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgY2FydF9wcm9kdWN0OiBjYXJ0X3Byb2R1Y3QsXG4gICAgICAgIHF0eTogcXVhbnRpdHksXG4gICAgICB9KVxuICAgICAgaWYgKGNhcnRfcHJvZHVjdCkgY2FydF9wcm9kdWN0LmZpeCA9IGNhcnRfcHJvZHVjdC5jYXJ0X3F1YW50aXR5ICsgcXVhbnRpdHlcblxuICAgICAgbGV0IHJlc3RfcHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzLmZpbHRlcihcbiAgICAgICAgKHByb2R1Y3QpID0+IHByb2R1Y3QuaWRfcHJvZHVjdCAhPT0gaWRfcHJvZHVjdFxuICAgICAgKVxuICAgICAgaWYgKGNhcnRfcHJvZHVjdCkgdGhpcy5wcm9kdWN0cyA9IFsuLi5yZXN0X3Byb2R1Y3RzLCBjYXJ0X3Byb2R1Y3RdXG4gICAgICBlbHNlIHRoaXMucHJvZHVjdHMgPSBbLi4ucmVzdF9wcm9kdWN0cywgcHJvZHVjdF1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9kdWN0cy5wdXNoKHByb2R1Y3QpXG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIHB1YmxpYyBpbmNyZWFzZVByb2R1Y3QoaWRfcHJvZHVjdDogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgcHJvZHVjdCBvZiB0aGlzLnByb2R1Y3RzKSB7XG4gICAgICBpZiAocHJvZHVjdC5pZF9wcm9kdWN0ID09PSBpZF9wcm9kdWN0KSB7XG4gICAgICAgIHByb2R1Y3QuaW5jcmVhc2VcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIHB1YmxpYyBkZWNyZWFzZVByb2R1Y3QoaWRfcHJvZHVjdDogbnVtYmVyKSB7XG4gICAgZm9yIChsZXQgcHJvZHVjdCBvZiB0aGlzLnByb2R1Y3RzKSB7XG4gICAgICBpZiAocHJvZHVjdC5pZF9wcm9kdWN0ID09PSBpZF9wcm9kdWN0KSB7XG4gICAgICAgIHByb2R1Y3QuZGVjcmVhc2VcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVQcm9kdWN0KGlkX3Byb2R1Y3Q6IG51bWJlcikge1xuICAgIHRoaXMucHJvZHVjdHMuZmlsdGVyKChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkX3Byb2R1Y3QgIT09IGlkX3Byb2R1Y3QpXG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBbGwoKSB7XG4gICAgdGhpcy5wcm9kdWN0cyA9IFtdXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NhcnRfcHJvZHVjdHMnKVxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICB0aGlzLmJ1aWxkKClcbiAgICB0aGlzLnJlbmRlcigpXG4gICAgdGhpcy5hY3Rpb25zKClcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAnanMtc2hvcHBpbmctY2FydCdcbiAgICApLmlubmVySFRNTCA9IGAke3RoaXMucmVuZGVyUHJvZHVjdHN9JHt0aGlzLnJlbmRlckVtcHR5fWBcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGhhc1Byb2R1Y3RzKCk6IGJvb2xlYW4ge1xuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZVxuICAgIGlmICh0aGlzLnByb2R1Y3RzLmxlbmd0aCA9PT0gMCkgaXNWYWxpZCA9IGZhbHNlXG4gICAgcmV0dXJuIGlzVmFsaWRcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHJlbmRlclByb2R1Y3RzKCkge1xuICAgIGlmICh0aGlzLmhhc1Byb2R1Y3RzKSB7XG4gICAgICByZXR1cm4gLyogSFRNTCAqLyBgPHVsIGNsYXNzPVwiY2FydC1wcm9kdWN0c1wiPlxuICAgICAgICAgICR7dGhpcy5wcm9kdWN0c1xuICAgICAgICAgICAgLm1hcCgocHJvZHVjdCkgPT4gYDxsaT4ke3Byb2R1Y3QucmVuZGVyKCl9PC9saT5gKVxuICAgICAgICAgICAgLmpvaW4oJycpfVxuICAgICAgICA8L3VsPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCBjb2wtMTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgY29sLTEyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgY29sLTYgaDMgZnctYm9sZFwiPlxuICAgICAgICAgICAgICAgICR7dGhpcy5zdWJ0b3RhbHMucHJvZHVjdHMubGFiZWx9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzPVwiY29sIGNvbC02IGgzIHByb2R1Y3QtcHJpY2VcIlxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9XCIke3RoaXMuc3VidG90YWxzLnByb2R1Y3RzLmFtb3VudH1cIlxuICAgICAgICAgICAgICAgID4ke3RoaXMuc3VidG90YWxzLnByb2R1Y3RzLnZhbHVlfTwvc3BhblxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgY29sLTEyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgY29sLTYgaDMgZnctYm9sZFwiPlxuICAgICAgICAgICAgICAgICR7dGhpcy5zdWJ0b3RhbHMuc2hpcHBpbmcubGFiZWx9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjb2wgY29sLTYgaDMgcHJvZHVjdC1wcmljZVwiXG4gICAgICAgICAgICAgICAgY29udGVudD1cIiR7dGhpcy5zdWJ0b3RhbHMuc2hpcHBpbmcuYW1vdW50fVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAke3RoaXMuc3VidG90YWxzLnNoaXBwaW5nLnZhbHVlfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBjb2wtMTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCBjb2wtNiBoMyBmdy1ib2xkXCI+JHt0aGlzLnRvdGFsLmxhYmVsfTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjb2wgY29sLTYgaDMgcHJvZHVjdC1wcmljZVwiXG4gICAgICAgICAgICAgICAgY29udGVudD1cIiR7dGhpcy50b3RhbC5hbW91bnR9XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICR7dGhpcy50b3RhbC52YWx1ZX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzaG9wcGluZy1jYXJ0LWJ1dHRvbnMgdGV4dC1jZW50ZXIgdGV4dC11cHBlcmNhc2VcIj5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgICBpZD1cInNob3BwaW5nLWNhcnQtY29uZmlybS1idG5cIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdy0xMDAgYnRuLWxnIG1iLTJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJlYWxpemFyIGNvbXByYTwvYVxuICAgICAgICAgID5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiXG4gICAgICAgICAgICBpZD1cInNob3BwaW5nLWNhcnQtcmVzdG9yZS1idG5cIlxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSB3LTEwMCBidG4tbGdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFJlc3RhdXJhciBwcm9kdWN0b3M8L2FcbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PmBcbiAgICB9IGVsc2UgcmV0dXJuICcnXG4gIH1cblxuICBwcml2YXRlIGdldCByZW5kZXJFbXB0eSgpIHtcbiAgICBpZiAoIXRoaXMuaGFzUHJvZHVjdHMpXG4gICAgICByZXR1cm4gLyogSFRNTCAqLyBgPHAgY2xhc3M9XCJoNlwiPk5vIGhheSBwcm9kdWN0b3MgZW4gc3UgY2Fycm88L3A+YFxuICAgIGVsc2UgcmV0dXJuICcnXG4gIH1cbn1cbiIsImltcG9ydCB7IEZvcm1JbnRlcmZhY2UgfSBmcm9tICdAaW50ZXJmYWNlcydcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnQGhlbHBlcnMvQ29tcG9uZW50J1xuaW1wb3J0IEZvcm1GaWVsZCBmcm9tICdAaGVscGVycy9Gb3JtRmllbGQnXG5pbXBvcnQgVmFsaWRhdGUgZnJvbSAnQGhlbHBlcnMvVmFsaWRhdGUnXG5pbXBvcnQgVmFsaWRhdGVSZXN0cmljdGlvbiBmcm9tICdAaGVscGVycy9WYWxpZGF0ZVJlc3RyaWN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZvcm1cbiAgZXh0ZW5kcyBDb21wb25lbnRcbiAgaW1wbGVtZW50cyBGb3JtSW50ZXJmYWNlXG57XG4gIHByb3RlY3RlZCBfZXJyb3JzOiB7IG5hbWU6IHN0cmluZzsgZXJyb3I6IHN0cmluZ1tdIH1bXSA9IFtdXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXQgZm9ybWF0KCk6IEZvcm1GaWVsZFtdXG5cbiAgcHVibGljIGdldCBlcnJvcnMoKSB7XG4gICAgdGhpcy5fZXJyb3JzID0gW11cbiAgICB0aGlzLmZvcm1hdC5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgICAgdGhpcy5fZXJyb3JzLnB1c2goeyBuYW1lOiBmaWVsZC5uYW1lLCBlcnJvcjogZmllbGQuZXJyb3JzIH0pXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzXG4gIH1cblxuICBwdWJsaWMgaGFzRXJyb3JzKCkge1xuICAgIGxldCBoYXNFcnJvcnMgPSBmYWxzZVxuICAgIHRoaXMuZXJyb3JzLmZvckVhY2goKGZpZWxkKSA9PiB7XG4gICAgICBpZiAoZmllbGQuZXJyb3IubGVuZ3RoKSB7XG4gICAgICAgIGhhc0Vycm9ycyA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGhhc0Vycm9yc1xuICB9XG5cbiAgcHVibGljIHZhbGlkYXRlKGZvcm06IEhUTUxGb3JtRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IGZpZWxkIG9mIHRoaXMuZm9ybWF0KSB7XG4gICAgICBpZiAoZmllbGQucmVxdWlyZWQgJiYgIWZpZWxkLnZhbHVlKSB7XG4gICAgICAgIGZpZWxkLmFkZEVycm9yKFZhbGlkYXRlUmVzdHJpY3Rpb24ubWVzc2FnZSgncmVxdWlyZWQnKSlcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIGlmICghZmllbGQucmVxdWlyZWQgJiYgIWZpZWxkLnZhbHVlKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHJlc3RyaWN0aW9uIG9mIGZpZWxkLnJlc3RyaWN0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3RyaWN0aW9uICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGlmICghVmFsaWRhdGVbcmVzdHJpY3Rpb25dKGZpZWxkLnZhbHVlKSkge1xuICAgICAgICAgICAgZmllbGQuYWRkRXJyb3IoVmFsaWRhdGVSZXN0cmljdGlvbi5tZXNzYWdlKHJlc3RyaWN0aW9uKSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQuZXJyb3JzID0gW11cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gIXRoaXMuaGFzRXJyb3JzKClcbiAgfVxuXG4gIHN1Ym1pdChldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAvLyBzdWJtaXQgbGlzdGVuIGluIGluaXQoKSBDaGlsZCBjbGFzc1xuICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKVxuICB9XG4gIHB1YmxpYyBpbml0KCk6IHZvaWQge31cblxuICBwdWJsaWMgYWJzdHJhY3QgcmVuZGVyKCk6IHZvaWRcbn1cbiIsImltcG9ydCBDb21wb25lbnRJbnRlcmZhY2UgZnJvbSAnQGludGVyZmFjZXMnXG5pbXBvcnQgRGF0YSBmcm9tICcuL0RhdGEnXG5cbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudCBpbXBsZW1lbnRzIENvbXBvbmVudEludGVyZmFjZSB7XG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbFxuICBwcm90ZWN0ZWQgdHJ1bmNhdGVTdHJpbmcgPSBEYXRhLnRydW5jYXRlU3RyaW5nXG5cbiAgcHVibGljIHNldCBjb21wb25lbnQoY29tcG9uZW50OiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB0aGlzLmVsZW1lbnQgPSBjb21wb25lbnRcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCBjYW4ndCBiZSBzZXRcIilcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcG9uZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSByZXR1cm4gdGhpcy5lbGVtZW50XG4gICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudCBpcyBub3QgZGVmaW5lZCcpXG4gIH1cbiAgcHVibGljIGFic3RyYWN0IGluaXQoKTogdm9pZFxuXG4gIHB1YmxpYyBhYnN0cmFjdCByZW5kZXIoKTogdm9pZFxufVxuIiwiaW1wb3J0IHtcbiAgQ2FycmllckludGVyZmFjZSxcbiAgQ3VycmVuY3lJbnRlcmZhY2UsXG4gIEN1c3RvbWVySW50ZXJmYWNlLFxuICBQcm9kdWN0SW50ZXJmYWNlLFxufSBmcm9tICdAaW50ZXJmYWNlcydcbmltcG9ydCBjb25maWcgZnJvbSAnYXBwL2NvbmZpZy5kZWZhdWx0cy5qc29uJ1xuLyoqXG4gKiBAY2xhc3NcbiAqIFVzZSB0byBtYW5hZ2UgYWxsIEphdmFzY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEge1xuICBzdGF0aWMgZ2V0UHJvZHVjdEJ5SWQoaWRfcHJvZHVjdDogbnVtYmVyKTogUHJvZHVjdEludGVyZmFjZSB8IHVuZGVmaW5lZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpXG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0cyA9IHtcbiAgICBpZF9jdXJyZW5jeTogY29uZmlnLmlkX2N1cnJlbmN5LFxuICAgIGlkX2N1c3RvbWVyOiBjb25maWcuaWRfY3VzdG9tZXIsXG4gICAgaWRfY2FycmllcjogY29uZmlnLmlkX2NhcnJpZXIsXG4gIH1cbiAgcHJvZHVjdHM6IFByb2R1Y3RJbnRlcmZhY2VbXVxuICBjdXJyZW5jaWVzOiBDdXJyZW5jeUludGVyZmFjZVtdXG4gIGN1c3RvbWVyczogQ3VzdG9tZXJJbnRlcmZhY2VbXVxuICBjYXJyaWVyczogQ2FycmllckludGVyZmFjZVtdXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgcHJvZHVjdHM6IFByb2R1Y3RJbnRlcmZhY2VbXVxuICAgIGN1cnJlbmNpZXM6IEN1cnJlbmN5SW50ZXJmYWNlW11cbiAgICBjdXN0b21lcnM6IEN1c3RvbWVySW50ZXJmYWNlW11cbiAgICBjYXJyaWVyczogQ2FycmllckludGVyZmFjZVtdXG4gIH0pIHtcbiAgICB0aGlzLnByb2R1Y3RzID0gcGFyYW1zLnByb2R1Y3RzXG4gICAgdGhpcy5jdXJyZW5jaWVzID0gcGFyYW1zLmN1cnJlbmNpZXNcbiAgICB0aGlzLmN1c3RvbWVycyA9IHBhcmFtcy5jdXN0b21lcnNcbiAgICB0aGlzLmNhcnJpZXJzID0gcGFyYW1zLmNhcnJpZXJzXG4gIH1cbiAgLyoqXG4gICAqIEluaXQgZGF0YSBvbiBsb2NhbFN0b3JhZ2VcbiAgICovXG4gIC8vIGFzeW5jIGluaXQoKSB7XG4gIC8vICAgY29uc3QgY3VycmVuY3kgPSBhd2FpdCBEYXRhLmdldEN1cnJlbmN5KClcbiAgLy8gICBjb25zdCBjYXJ0X3Byb2R1Y3RzID0gRGF0YS5nZXRDYXJ0UHJvZHVjdHMoKVxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW5jeScsIGN1cnJlbmN5KVxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0X3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoY2FydF9wcm9kdWN0cykpXG4gIC8vIH1cblxuICAvKipcbiAgICogU2VsZWN0IGEgcHJvZHVjdFxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfcHJvZHVjdCAtIFByb2R1Y3QgSURcbiAgICovXG4gIHB1YmxpYyBnZXRQcm9kdWN0QnlJZChpZF9wcm9kdWN0OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbiAocHJvZHVjdCkge1xuICAgICAgcmV0dXJuIHByb2R1Y3QuaWRfcHJvZHVjdCA9PSBpZF9wcm9kdWN0XG4gICAgfSlbMF1cbiAgICBpZiAoIXJlc3BvbnNlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9kdWN0IElEIGVxdWFsIHRvICR7aWRfcHJvZHVjdH0gbm90IGZvdW5kYClcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYSBjdXJyZW5jeVxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfY3VycmVuY3kgLSBDdXJyZW5jeSBJRFxuICAgKi9cbiAgcHVibGljIGdldEN1cnJlbmN5QnlJZChpZF9jdXJyZW5jeTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5jdXJyZW5jaWVzLmZpbHRlcihcbiAgICAgIChjdXJyZW5jeTogeyBpZF9jdXJyZW5jeTogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbmN5LmlkX2N1cnJlbmN5ID09IGlkX2N1cnJlbmN5XG4gICAgICB9XG4gICAgKVswXVxuXG4gICAgaWYgKCFyZXNwb25zZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ3VycmVuY3kgSUQgZXF1YWwgdG8gJHtpZF9jdXJyZW5jeX0gbm90IGZvdW5kYClcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYSBjdXN0b21lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWwgLSBDdXN0b21lciBlbWFpbFxuICAgKi9cbiAgcHVibGljIGdldEN1c3RvbWVyQnlFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5jdXN0b21lcnMuZmlsdGVyKChjdXN0b21lcikgPT4ge1xuICAgICAgcmV0dXJuIGN1c3RvbWVyLmVtYWlsID09PSBlbWFpbFxuICAgIH0pWzBdXG5cbiAgICAvLyBpZiAoIXJlc3BvbnNlKSB0aHJvdyBuZXcgRXJyb3IoYEN1c3RvbWVyIGVtYWlsIGVxdWFsIHRvICR7ZW1haWx9IG5vdCBmb3VuZGApXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IG9uZSBjYXJyaWVyIGluc2lkZSBKU09OIHRvIE9iamVjdCBieSBJRFxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfY2FycmllciAtIENhcnJpZXIgSURcbiAgICovXG4gIHB1YmxpYyBnZXRDYXJyaWVyQnlJZChpZF9jYXJyaWVyOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmNhcnJpZXJzLmZpbHRlcigoY2FycmllcikgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgY2Fycmllci5pZF9jYXJyaWVyID09PSBpZF9jYXJyaWVyIHx8IGNhcnJpZXIuaWRfY2FycmllciA9PT0gK2lkX2NhcnJpZXJcbiAgICAgIClcbiAgICB9KVswXVxuICAgIGlmICghcmVzcG9uc2UpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhcnJpZXIgSUQgZXF1YWwgdG8gJHtpZF9jYXJyaWVyfSBub3QgZm91bmRgKVxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGN1cnJlbmN5IG9yIGRlZmF1bHQgY3VycmVuY3lcbiAgICovXG4gIHB1YmxpYyBnZXRDdXJyZW5jeSgpOiBDdXJyZW5jeUludGVyZmFjZSB7XG4gICAgY29uc3QgY3VycmVuY3kgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVuY3knKVxuICAgIGlmIChjdXJyZW5jeSA9PT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbmNpZXMuZmlsdGVyKFxuICAgICAgICAoY3VycmVuY3kpID0+IGN1cnJlbmN5LmlkX2N1cnJlbmN5ID09PSB0aGlzLmRlZmF1bHRzLmlkX2N1cnJlbmN5XG4gICAgICApWzBdXG4gICAgZWxzZSByZXR1cm4gSlNPTi5wYXJzZShjdXJyZW5jeSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2FycmllciBkZWZhdWx0IGNhcnJpZXJcbiAgICovXG4gIHB1YmxpYyBnZXRDYXJyaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmNhcnJpZXJzLmZpbHRlcihcbiAgICAgIChjYXJyaWVyKSA9PiBjYXJyaWVyLmlkX2NhcnJpZXIgPT09IHRoaXMuZGVmYXVsdHMuaWRfY2FycmllclxuICAgIClbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBwcm9kdWN0cyBpbnNpZGUgY2FydCBvciBlbXB0eSBhcnJheVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRDYXJ0UHJvZHVjdHMoKTpcbiAgICB8IHsgaWRfcHJvZHVjdDogbnVtYmVyOyBjYXJ0X3F1YW50aXR5OiBudW1iZXIgfVtdXG4gICAgfCBbXSB7XG4gICAgY29uc3QgY2FydF9wcm9kdWN0czogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0X3Byb2R1Y3RzJylcblxuICAgIGlmIChjYXJ0X3Byb2R1Y3RzID09PSBudWxsKSByZXR1cm4gW11cbiAgICBlbHNlIHJldHVybiBKU09OLnBhcnNlKGNhcnRfcHJvZHVjdHMpXG4gIH1cblxuICAvKipcbiAgICogVHJ1bmNhdGUgc3RyaW5nIGFuZCBhZGQgLi4uIGF0IHRoZSBlbmQgaWYgZXhjZWVkIG51bSBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIHN0cmluZyB0byB0cnVuY2F0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gY2hlY2tcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdHJ1bmNhdGVTdHJpbmcoc3RyOiBzdHJpbmcsIG51bTogbnVtYmVyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPiBudW0pIHtcbiAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgbnVtKSArICcuLi4nXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdHJcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEJvb3RzdHJhcENvbHVtblNwYWNlc1R5cGUsIFJlc3RyaWN0aW9uVHlwZSB9IGZyb20gJ0B0eXBlcydcbmltcG9ydCBDb21wb25lbnQgZnJvbSAnQGhlbHBlcnMvQ29tcG9uZW50J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtRmllbGQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAvL2Jvb3RzdHJhcCBjb2x1bW5zIHNwYWNlcyBpbiBhIGZvcm0gcm93XG4gIHByaXZhdGUgX2NvbDogQm9vdHN0cmFwQ29sdW1uU3BhY2VzVHlwZSA9ICcxMidcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nID0gJydcbiAgcHJpdmF0ZSBfbGFiZWw6IHN0cmluZyA9ICcnXG4gIHByaXZhdGUgX3R5cGU6IHN0cmluZyA9ICd0ZXh0J1xuICBwcml2YXRlIF9yZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlXG4gIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmcgfCBudWxsID0gbnVsbFxuICBwcml2YXRlIF9tYXhMZW5ndGg6IG51bWJlciB8IG51bGwgPSBudWxsXG4gIHByaXZhdGUgX2Vycm9yczogc3RyaW5nW10gPSBbXVxuICBwcml2YXRlIF9yZXN0cmljdGlvbnM6IFJlc3RyaWN0aW9uVHlwZVtdID0gW11cblxuICBwdWJsaWMgZ2V0IGNvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29sXG4gIH1cblxuICBwdWJsaWMgc2V0IGNvbChjb2x1bW5TcGFjZSkge1xuICAgIHRoaXMuX2NvbCA9IGNvbHVtblNwYWNlXG4gIH1cblxuICBwdWJsaWMgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVcbiAgfVxuXG4gIHB1YmxpYyBzZXQgbmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZVxuICB9XG5cbiAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGFiZWxcbiAgfVxuICBwdWJsaWMgc2V0IGxhYmVsKGxhYmVsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9sYWJlbCA9IGxhYmVsXG4gIH1cblxuICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdHlwZVxuICB9XG4gIHB1YmxpYyBzZXQgdHlwZShuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90eXBlID0gbmFtZVxuICB9XG5cbiAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZVxuICB9XG5cbiAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZSArICcnXG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXF1aXJlZFxuICB9XG4gIHB1YmxpYyBzZXQgcmVxdWlyZWQocmVxdWlyZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IHJlcXVpcmVkXG4gIH1cblxuICBwdWJsaWMgZ2V0IG1heExlbmd0aCgpOiBudW1iZXIgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4TGVuZ3RoXG4gIH1cbiAgcHVibGljIHNldCBtYXhMZW5ndGgobWF4TGVuZ3RoOiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4TGVuZ3RoID0gbWF4TGVuZ3RoXG4gIH1cblxuICBwdWJsaWMgZ2V0IGVycm9ycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yc1xuICB9XG4gIHB1YmxpYyBzZXQgZXJyb3JzKGVycm9yczogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9lcnJvcnMgPSBlcnJvcnNcbiAgICB0aGlzLnJlZnJlc2hFcnJvcnMoKVxuICB9XG4gIHB1YmxpYyBhZGRFcnJvcihlcnJvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZXJyb3JzLnB1c2goZXJyb3IpXG4gICAgdGhpcy5yZWZyZXNoRXJyb3JzKClcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVzdHJpY3Rpb25zKCk6IFJlc3RyaWN0aW9uVHlwZVtdIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdHJpY3Rpb25zXG4gIH1cbiAgcHVibGljIHNldCByZXN0cmljdGlvbnMocmVzdHJpY3Rpb25zOiBSZXN0cmljdGlvblR5cGVbXSkge1xuICAgIHRoaXMuX3Jlc3RyaWN0aW9ucyA9IHJlc3RyaWN0aW9uc1xuICB9XG4gIHB1YmxpYyBhZGRSZXN0cmljdGlvbihyZXN0cmljdGlvbjogUmVzdHJpY3Rpb25UeXBlKSB7XG4gICAgdGhpcy5fcmVzdHJpY3Rpb25zLnB1c2gocmVzdHJpY3Rpb24pXG4gIH1cblxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaEVycm9ycygpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKHRoaXMubmFtZSlcbiAgICAgIC5jbG9zZXN0KCcuZm9ybS1ncm91cCcpXG4gICAgICAucXVlcnlTZWxlY3RvcignLmhlbHAtYmxvY2snKS5pbm5lckhUTUwgPSB0aGlzLnJlbmRlckVycm9yXG4gIH1cblxuICBwdWJsaWMgcmVuZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIC8qIEhUTUwgKi8gYDxsYWJlbD4ke3RoaXMubGFiZWx9PC9sYWJlbFxuICAgICAgPjxpbnB1dFxuICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCBmb3JtLWNvbnRyb2wtc21cIlxuICAgICAgICBuYW1lPVwiJHt0aGlzLm5hbWV9XCJcbiAgICAgICAgaWQ9XCIke3RoaXMubmFtZX1cIlxuICAgICAgICB0eXBlPVwiJHt0aGlzLnR5cGV9XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCIke3RoaXMubGFiZWx9XCJcbiAgICAgICAgJHt0aGlzLnJlcXVpcmVkID8gJyByZXF1aXJlZD1cInJlcXVpcmVkXCIgJyA6ICcnfVxuICAgICAgICBhcmlhLWludmFsaWQ9XCJmYWxzZVwiXG4gICAgICAvPlxuICAgICAgPHAgY2xhc3M9XCJoZWxwLWJsb2NrIHRleHQtZGFuZ2VyXCI+JHt0aGlzLnJlbmRlckVycm9yfTwvcD5gXG4gIH1cblxuICBwcml2YXRlIGdldCByZW5kZXJFcnJvcigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAvKiBIVE1MICovIGA8dWw+XG4gICAgICAgICR7dGhpcy5lcnJvcnMubWFwKChlcnJvcikgPT4gYDxsaT4ke2Vycm9yfTwvbGk+YCl9XG4gICAgICA8L3VsPmBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICcnXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBQcm9kdWN0SW50ZXJmYWNlLFxuICBDdXJyZW5jeUludGVyZmFjZSxcbiAgQ2FycmllckludGVyZmFjZSxcbiAgQ3VzdG9tZXJJbnRlcmZhY2UsXG59IGZyb20gJ0BpbnRlcmZhY2VzJ1xuaW1wb3J0IHsgQXN5bmNGZXRjaFR5cGUgfSBmcm9tICdAdHlwZXMnXG5cbmxldCBwcm9kdWN0cyA9IGZldGNoQXN5bmM8UHJvZHVjdEludGVyZmFjZVtdPignLi9qc29uL3Byb2R1Y3RzLmpzb24nKVxubGV0IGN1cnJlbmNpZXMgPSBmZXRjaEFzeW5jPEN1cnJlbmN5SW50ZXJmYWNlW10+KCcuL2pzb24vY3VycmVuY2llcy5qc29uJylcbmxldCBjYXJyaWVycyA9IGZldGNoQXN5bmM8Q2FycmllckludGVyZmFjZVtdPignLi9qc29uL2NhcnJpZXJzLmpzb24nKVxubGV0IGN1c3RvbWVycyA9IGZldGNoQXN5bmM8Q3VzdG9tZXJJbnRlcmZhY2VbXT4oJy4vanNvbi9jdXN0b21lcnMuanNvbicpXG5cbmV4cG9ydCB7IHByb2R1Y3RzLCBjdXJyZW5jaWVzLCBjYXJyaWVycywgY3VzdG9tZXJzIH1cblxuLyoqXG4gKiBVc2luZyBGZXRjaFxuICoge0BsaW5rIDxodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lcy9kb2NzL1dlYi9BUEkvRmV0Y2hfQVBJL1VzaW5nX0ZldGNoPn1cbiAqIEBjb250cmlidWl0b3IgbXNtZnNkXG4gKiB7QGxpbmsgPGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21zbWZzZC9mY2E1MGFiMDk1Yjc5NWViMzk3MzllOGM0MzU3YTgwOD59XG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWUgLSBKU09OIGZpbGVuYW1lXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQXN5bmM8VCA9IEFzeW5jRmV0Y2hUeXBlPihmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gIC8vY29uc29sZS5sb2coYEZldGNoaW5nOiAke2ZpbGVuYW1lfSAtIHN0YXJ0YClcbiAgbGV0IHJlc3BvbnNlXG4gIHRyeSB7XG4gICAgLy8gZGVmYXVsdCBpbml0IGNhbGxiYWNrIGZvciByZXF1ZXN0XG4gICAgY29uc3QgaW5pdCA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICB9XG4gICAgLy8gZmV0Y2ggcmVxdWVzdCBpbnN0YW5jZVxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChmaWxlbmFtZSwgaW5pdClcbiAgICAvLyBhd2FpdCByZXNwb25zZSBvZiBmZXRjaCBjYWxsXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KVxuICAgIC8vIG9ubHkgcHJvY2VlZCBvbmNlIHByb21pc2UgaXMgcmVzb2x2ZWRcbiAgICBsZXQgZGF0YTogVCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIC8vIG9ubHkgcHJvY2VlZCBvbmNlIHNlY29uZCBwcm9taXNlIGlzIHJlc29sdmVkXG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIGNvbnN0IGVuZFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgLy9jb25zb2xlLmxvZyhgRmlsZSAke2ZpbGVuYW1lfSB0b29rcyAke2VuZFRpbWUgLSBzdGFydFRpbWV9bXNgKVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9IGVsc2UgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB0cnlpbmcgdG8gZ2V0IEpTT04gZGF0YSBmcm9tICR7ZmlsZW5hbWV9YClcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgIHJlc3BvbnNlID0gZXJyb3JcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGUge1xuICBwcml2YXRlIHN0YXRpYyBQQVNTV09SRF9MRU5HVEg6IG51bWJlciA9IDhcbiAgLyoqXG4gICAqIENoZWNrIGZvciBlLW1haWwgdmFsaWRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBlbWFpbCAtIGUtbWFpbCBhZGRyZXNzIHRvIHZhbGlkYXRlXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGlzRW1haWwoZW1haWw6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBlbWFpbCAmJlxuICAgICAgL15bYS16XFxwe0x9MC05ISMkJSYnKitcXC89P15ge318fl8tXStbLmEtelxccHtMfTAtOSEjJCUmJyorXFwvPT9eYHt9fH5fLV0qQFthLXpcXHB7TH0wLTldKyg/OlsuXT9bX2EtelxccHtMfTAtOS1dKSpcXC5bYS16XFxwe0x9MC05XSskL2l1LnRlc3QoXG4gICAgICAgIGVtYWlsXG4gICAgICApXG4gICAgKVxuICB9XG4gIC8qKlxuICAgKiBDaGVjayBmb3IgcGFzc3dvcmQgdmFsaWRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCAtIFBhc3N3b3JkIHRvIHZhbGlkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzaXplXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGlzUGFzc3dvcmQoXG4gICAgcGFzc3dvcmQ6IGFueSxcbiAgICBzaXplOiBudW1iZXIgPSB0aGlzLlBBU1NXT1JEX0xFTkdUSFxuICApOiBib29sZWFuIHtcbiAgICByZXR1cm4gcGFzc3dvcmQubGVuZ3RoID49IHNpemVcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgdmFsdWUgaXMgZW1wdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIFZhbHVlIHRvIHZhbGlkYXRlXG4gICAqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGlzRW1wdHkodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhdmFsdWUgfHxcbiAgICAgICEhKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgSlNPTi5zdHJpbmdpZnkodmFsdWUpID09PSAne30nKSB8fFxuICAgICAgISEoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoKVxuICAgIClcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgaWYgSFRNTCBFbGVtZW50IGV4aXN0IGluIExvYWRlZCBET01cbiAgICpcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIEhUTUwgZWxlbWVudCBvbiBET00gdG8gdmFsaWRhdGVcbiAgICpcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgaXNIVE1MRWxlbWVudChlbGVtZW50OiBhbnkpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnRcbiAgfVxuICAvKipcbiAgICogQ2hlY2sgZm9yIHN0YW5kYXJkIG5hbWUgdmFsaWRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gTmFtZSB0byB2YWxpZGF0ZVxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc0dlbmVyaWNOYW1lKG5hbWU6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBuYW1lICYmIC9eW148Pj17fV0qJC91LnRlc3QobmFtZSlcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGlvblJlc3RyaWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyBtZXNzYWdlKHJlc3RyaWN0aW9uOiBzdHJpbmcpIHtcbiAgICBpZiAocmVzdHJpY3Rpb24gPT09ICdpc0VtYWlsJykge1xuICAgICAgcmV0dXJuICdQb3IgZmF2b3IgaW5jbHV5YSBAIHkgZG9taW5pbyBlbiBzdSBjb3JyZW8nXG4gICAgfVxuICAgIGlmIChyZXN0cmljdGlvbiA9PT0gJ2lzUGFzc3dvcmQnKSB7XG4gICAgICByZXR1cm4gYFBvciBmYXZvciBkZWJlIHRlbmVyIGFsIG1lbm9zIDggY2FyYWN0ZXJlc2BcbiAgICB9XG4gICAgaWYgKHJlc3RyaWN0aW9uID09PSAncmVxdWlyZWQnKSB7XG4gICAgICByZXR1cm4gJ0NhbXBvIHJlcXVlcmlkbywgcG9yIGZhdm9yIGluZ3Jlc2UgdW4gdmFsb3InXG4gICAgfVxuICAgIHJldHVybiAnRm9ybWF0byBpbnbDoWxpZG8nXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcHJvZHVjdHMsIGN1cnJlbmNpZXMsIGNhcnJpZXJzLCBjdXN0b21lcnMgfSBmcm9tICdAaGVscGVycy9Qcm9taXNlcydcbmltcG9ydCBTaG9wcGluZ2NhcnQgZnJvbSAnQGNvbXBvbmVudHMvc2hvcHBpbmdjYXJ0J1xuaW1wb3J0IEF1dGhlbnRpY2F0aW9uRm9ybSBmcm9tICdAY29tcG9uZW50cy9hdXRoZW50aWNhdGlvbidcbi8vIGltcG9ydCBOb3RpZmljYXRpb25zIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi9ub3RpZmljYXRpb25zJ1xuaW1wb3J0IENhdGFsb2cgZnJvbSAnQGNvbXBvbmVudHMvY2F0YWxvZydcbmltcG9ydCBDdXJyZW5jeSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vY3VycmVuY3knXG5pbXBvcnQgRGF0YSBmcm9tICdAaGVscGVycy9EYXRhJ1xuaW1wb3J0IHsgZmFkZU91dCB9IGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi9wcmVsb2FkZXInXG5pbXBvcnQgVG91Y2hzcGluIGZyb20gJ0Bjb21wb25lbnRzL2NvbW1vbi90b3VjaHNwaW4nXG5pbXBvcnQgQ2FycmllciBmcm9tICdAY29tcG9uZW50cy9jb21tb24vY2FycmllcidcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gRGVjbGFyaW5nIGNvbXBvbmVudHMgaW4gRE9NXG4gIGNvbnN0IERPTUNvbXBvbmVudHMgPSB7XG4gICAgcHJlbG9hZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFnZS1wcmVsb2FkZXInKSxcbiAgICBjYXRhbG9nOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtcHJvZHVjdCcpLFxuICAgIGNhcnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1zaG9wcGluZy1jYXJ0JyksXG4gICAgY2FydFdyYXBwZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG9wcGluZy1jYXJ0LXdyYXBwZXInKSxcbiAgfVxuXG4gIC8vIFByZWxvYWRlclxuICBmYWRlT3V0KERPTUNvbXBvbmVudHMucHJlbG9hZGVyLCAyMDAwLCBmdW5jdGlvbiAoKSB7XG4gICAgRE9NQ29tcG9uZW50cy5wcmVsb2FkZXIucmVtb3ZlKClcbiAgfSlcblxuICAvLyBMb2FkIERhdGFcbiAgY29uc3QgZGF0YSA9IG5ldyBEYXRhKHtcbiAgICBwcm9kdWN0czogYXdhaXQgcHJvZHVjdHMsXG4gICAgY3VycmVuY2llczogYXdhaXQgY3VycmVuY2llcyxcbiAgICBjdXN0b21lcnM6IGF3YWl0IGN1c3RvbWVycyxcbiAgICBjYXJyaWVyczogYXdhaXQgY2FycmllcnMsXG4gIH0pXG5cbiAgLy8gRGVjbGFyaW5nIGNvbXBvbmVudHNcbiAgY29uc3QgY3VycmVuY3kgPSBuZXcgQ3VycmVuY3koZGF0YSlcbiAgY29uc3QgY2FycmllciA9IG5ldyBDYXJyaWVyKGRhdGEuZ2V0Q2FycmllcigpKSAvKiBUaGVyZSdzIGp1c3Qgb25lIGNhcnJpZXIgKi9cbiAgY29uc3QgY2F0YWxvZyA9IG5ldyBDYXRhbG9nKGRhdGEucHJvZHVjdHMpXG4gIGNvbnN0IGNhcnQgPSBuZXcgU2hvcHBpbmdjYXJ0KHsgZGF0YSwgY3VycmVuY3ksIGNhcnJpZXIgfSlcbiAgY29uc3QgYXV0aGVudGljYXRpb24gPSBuZXcgQXV0aGVudGljYXRpb25Gb3JtKGRhdGEpXG5cbiAgLy8gSW5pdGlhbGl6aW5nIGNvbXBvbmVudHNcbiAgLy8gQ2F0YWxvZ1xuICBjYXRhbG9nLmluaXQoKVxuICBsZXQgcHJvZHVjdE1pbmlhdHVyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1taW5pYXR1cmUnKVxuICAvLyBTaG9wcGluZ2NhcnRcbiAgY2FydC5pbml0KClcbiAgLy8gQ3VycmVuY3lcbiAgY3VycmVuY3kuaW5pdCgpXG4gIC8vIEF1dGhlbnRpY2F0aW9uIEZvcm1cbiAgYXV0aGVudGljYXRpb24uaW5pdCgpXG5cbiAgLy8gQWRkIFNwaW5uZXIgdG8gcHJvZHVjdHMgaW5wdXRbdHlwZT1udW1iZXJdXG4gIHByb2R1Y3RNaW5pYXR1cmVzLmZvckVhY2goXG4gICAgKHByb2R1Y3QpID0+XG4gICAgICBuZXcgVG91Y2hzcGluKFxuICAgICAgICBwcm9kdWN0LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1ncm91cC1hZGQtY2FydCcpLFxuICAgICAgICAnLmlucHV0LXF0eScsXG4gICAgICAgICc8aSBjbGFzcz1cImZhcyBmYS1taW51cyB0b3VjaHNwaW4tZG93blwiPjwvaT4nLFxuICAgICAgICAnPGkgY2xhc3M9XCJmYXMgZmEtcGx1cyB0b3VjaHNwaW4tdXBcIj48L2k+J1xuICAgICAgKVxuICApXG4gIC8vIEFkZGluZyBmdW5jdGlvbmF0aXRpZXNcbiAgLy8gQ2hlY2sgaWYgY3VzdG9tZXIgaXMgbG9nZ2VkXG4gIGNvbnN0IGlzTG9nZ2VkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaXNMb2dnZWQnKSlcbiAgLy8gSGlkZSBjYXJ0IGlmIGN1c3RvbWVyIGlzIG5vdCBsb2dnZWRcbiAgaWYgKCFpc0xvZ2dlZCkgRE9NQ29tcG9uZW50cy5jYXJ0V3JhcHBlci5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKVxuICAvLyBFbmFibGUgYWRkIHRvIGNhcnQgYnV0dG9ucyBpZiBjdXN0b21lciBpcyBsb2dnZWRcbiAgY29uc3QgYWRkVG9DYXJ0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJy5wcm9kdWN0LWFkZC1jYXJ0IC5hZGQtdG8tY2FydCdcbiAgKVxuICBpZiAoYWRkVG9DYXJ0QnRucyAmJiBpc0xvZ2dlZClcbiAgICBhZGRUb0NhcnRCdG5zLmZvckVhY2goKGJ0bikgPT4gYnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKSlcbn0pXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=