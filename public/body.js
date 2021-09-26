/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
            ? `<i class="fas fa-check rtl-no-flip" aria-hidden="true"></i>${this.availability_message}`
            : this.availability === 'last_remaining_items'
                ? `<i class="fas fa-exclamation" aria-hidden="true"></i>${this.availability_message}`
                : `<i class="fas fa-ban" aria-hidden="true"></i>${this.availability_message}`}
            </span>
          </div>
        </div>
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
      ${this.products.map((product) => product.render()).join('')}
    </div>`;
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
        this.id_currency = 0;
        this.iso_lang = '';
        this.label = '';
        this.symbol = '';
        this.position = '';
        this.decimals = 0;
        this.value = 0;
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
    init() {
        throw new Error('Method not implemented.');
    }
    format(amount) {
        let result;
        let parts = (amount + '').split('.'), integer = parts[0], decimal = parts[1], iso_code = this.iso_lang, position = this.position;
        if (iso_code.substring(0, 2) === 'es') {
            result = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        else {
            result = `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}<sup>${decimal.substring(0, this.decimals)}</sup>`;
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
        this.refresh();
    }
    updateById(id_currency) {
        let currency = this.data.getCurrencyById(id_currency);
        if (currency) {
            localStorage.setItem('currency', JSON.stringify(currency));
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
/* harmony export */   "fadeOut": () => (/* binding */ fadeOut),
/* harmony export */   "fadeIn": () => (/* binding */ fadeIn)
/* harmony export */ });
function fadeOut(element, duration, callback) {
    element.style.opacity = '1';
    let last = +new Date().getTime();
    let tick = function () {
        element.style.opacity = String(+element.style.opacity - (new Date().getTime() - last) / duration);
        last = +new Date();
        if (+element.style.opacity < 1)
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        else if (callback || typeof callback === 'function')
            callback();
    };
    tick();
}
function fadeIn(element, duration, callback) {
    element.style.opacity = '0';
    let last = +new Date().getTime();
    let tick = function () {
        element.style.opacity = String(+element.style.opacity + (new Date().getTime() - last) / duration);
        last = +new Date();
        if (+element.style.opacity > 0)
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        else if (callback || typeof callback === 'function')
            callback();
    };
    tick();
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
        if (!response)
            throw new Error(`Customer email equal to ${email} not found`);
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

/***/ "./app/config.defaults.json":
/*!**********************************!*\
  !*** ./app/config.defaults.json ***!
  \**********************************/
/***/ ((module) => {

module.exports = JSON.parse('{"base_url":"http://localhost","iso_code":"es","lang":"es-CL","id_currency":1,"id_customer":1,"id_carrier":1,"site_name":"eCafe.cl","title":"Productos de cafeteria de alta calidad","description":"Excelente productos de cafetería, envios a todo Chile","keywords":["cafe","cafe juan valdez","juan valdez cafe","cafe helado","como hacer color cafe","taza de cafe","cafe con piernas","color cafe","molinillo de cafe","maquina de cafe","maquinas de cafe","cafe racer","work cafe santander","cafe en grano","cafe moro","tipos de cafe","cafe tacuba","cafe tacvba","cafe verde","cafe starbucks","hentai cafe","moledor de cafe","cafe caribe","cafe con leche","beneficios del cafe","work cafe","cafe haiti","lavazza cafe","cafe cortado","cafe colonia","cafe americano","cafe palermo","capsulas de cafe","cafe gold","cafe de trigo","cafe nescafe","coco cafe","cafe dolce gusto","hard sub cafe","i miss my cafe","wonderland cafe","eres cafe tacuba","cafe capuchino","mokaccino","damas de cafe","cafe nespresso","cafe png","cafe literario","cafe harry potter","cafe chocolate"]}');

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
/* harmony import */ var _components_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/catalog */ "./assets/ts/components/catalog/index.ts");
/* harmony import */ var _components_common_currency__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/common/currency */ "./assets/ts/components/common/currency.ts");
/* harmony import */ var _helpers_Data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @helpers/Data */ "./assets/ts/helpers/Data.ts");
/* harmony import */ var _components_common_preloader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @components/common/preloader */ "./assets/ts/components/common/preloader.ts");
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
        const preloader = document.getElementById('page-preloader');
        if (preloader)
            (0,_components_common_preloader__WEBPACK_IMPORTED_MODULE_4__.fadeOut)(preloader, 3000, function () {
                preloader.remove();
            });
        const data = new _helpers_Data__WEBPACK_IMPORTED_MODULE_3__.default({
            products: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.products,
            currencies: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.currencies,
            customers: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.customers,
            carriers: yield _helpers_Promises__WEBPACK_IMPORTED_MODULE_0__.carriers,
        });
        const currency = new _components_common_currency__WEBPACK_IMPORTED_MODULE_2__.default(data);
        const catalog = new _components_catalog__WEBPACK_IMPORTED_MODULE_1__.default(data.products);
        console.log(catalog);
        catalog.init();
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNONkU7QUFJcEM7QUFDUztBQUNsQjtBQUNzQjtBQVl0RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7O1FBRTVDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUM7UUFHM0QsSUFBSSxTQUFTO1lBQ1gscUVBQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO2dCQUN2QixTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3BCLENBQUMsQ0FBQztRQUdKLE1BQU0sSUFBSSxHQUFHLElBQUksa0RBQUksQ0FBQztZQUNwQixRQUFRLEVBQUUsTUFBTSx1REFBUTtZQUN4QixVQUFVLEVBQUUsTUFBTSx5REFBVTtZQUM1QixTQUFTLEVBQUUsTUFBTSx3REFBUztZQUMxQixRQUFRLEVBQUUsTUFBTSx1REFBUTtTQUN6QixDQUFDO1FBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxnRUFBUSxDQUFDLElBQUksQ0FBQztRQUNuQyxNQUFNLE9BQU8sR0FBRyxJQUFJLHdEQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUVwQixPQUFPLENBQUMsSUFBSSxFQUFFO0lBQ2hCLENBQUM7Q0FBQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2NvbXBvbmVudHMvY2F0YWxvZy9Qcm9kdWN0TWluaWF0dXJlLnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NhdGFsb2cvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2NvbXBvbmVudHMvY29tbW9uL2N1cnJlbmN5LnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9jb21wb25lbnRzL2NvbW1vbi9wcmVsb2FkZXIudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvQ29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL2Fzc2V0cy90cy9oZWxwZXJzL0RhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2hlbHBlcnMvUHJvbWlzZXMudHMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3RzL2JvZHkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdAaGVscGVycy9Db21wb25lbnQnXG5pbXBvcnQgeyBQcm9kdWN0SW50ZXJmYWNlIH0gZnJvbSAnQGludGVyZmFjZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RNaW5pYXR1cmVcbiAgZXh0ZW5kcyBDb21wb25lbnRcbiAgaW1wbGVtZW50cyBQcm9kdWN0SW50ZXJmYWNlXG57XG4gIGlkX3Byb2R1Y3Q6IG51bWJlclxuICBza3U6IHN0cmluZ1xuICBicmFuZDogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICBwcmljZTogbnVtYmVyXG4gIGRpc2NvdW50X2Ftb3VudD86IG51bWJlclxuICBpbWc6IHN0cmluZ1xuICBzdG9jazogbnVtYmVyXG4gIGF2YWlsYWJpbGl0eTogc3RyaW5nXG4gIGF2YWlsYWJpbGl0eV9tZXNzYWdlOiBzdHJpbmdcbiAgY29uc3RydWN0b3IocHJvZHVjdDogUHJvZHVjdEludGVyZmFjZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLmlkX3Byb2R1Y3QgPSBwcm9kdWN0LmlkX3Byb2R1Y3RcbiAgICB0aGlzLnNrdSA9IHByb2R1Y3Quc2t1XG4gICAgdGhpcy5icmFuZCA9IHByb2R1Y3QuYnJhbmRcbiAgICB0aGlzLm5hbWUgPSBwcm9kdWN0Lm5hbWVcbiAgICB0aGlzLnByaWNlID0gcHJvZHVjdC5wcmljZVxuICAgIHRoaXMuZGlzY291bnRfYW1vdW50ID0gcHJvZHVjdC5kaXNjb3VudF9hbW91bnRcbiAgICB0aGlzLmltZyA9IHByb2R1Y3QuaW1nXG4gICAgdGhpcy5zdG9jayA9IHByb2R1Y3Quc3RvY2tcbiAgICBpZiAodGhpcy5zdG9jayA8PSAwKSB7XG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eSA9ICd1bmF2YWlsYWJsZSdcbiAgICAgIHRoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2UgPSAnQWdvdGFkbydcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RvY2sgPD0gMikge1xuICAgICAgdGhpcy5hdmFpbGFiaWxpdHkgPSAnbGFzdF9yZW1haW5pbmdfaXRlbXMnXG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eV9tZXNzYWdlID0gJ8OabHRpbW9zIHByb2R1Y3RvcydcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RvY2sgPiAyKSB7XG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eSA9ICdhdmFpbGFibGUnXG4gICAgICB0aGlzLmF2YWlsYWJpbGl0eV9tZXNzYWdlID0gJ0Rpc3BvbmlibGUgcGFyYSBwZWRpZG8nXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXZhaWxhYmlsaXR5ID0gJ3VuYXZhaWxhYmxlJ1xuICAgICAgdGhpcy5hdmFpbGFiaWxpdHlfbWVzc2FnZSA9ICdBZ290YWRvJ1xuICAgIH1cbiAgfVxuICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxuICBwdWJsaWMgcmVuZGVyKCkge1xuICAgIHJldHVybiAvKiBIVE1MICovIGA8ZGl2XG4gICAgICBjbGFzcz1cImpzLXByb2R1Y3QtbWluaWF0dXJlLXdyYXBwZXIgY29sLTEyIGNvbC1tZC00IGNvbC1sZy00IGNvbC14bC00XCJcbiAgICA+XG4gICAgICA8YXJ0aWNsZVxuICAgICAgICBjbGFzcz1cInByb2R1Y3QtbWluaWF0dXJlIHByb2R1Y3QtbWluaWF0dXJlLWRlZmF1bHQgcHJvZHVjdC1taW5pYXR1cmUtZ3JpZCBqcy1wcm9kdWN0LW1pbmlhdHVyZVwiXG4gICAgICAgIGRhdGEtaWQtcHJvZHVjdD1cIiR7dGhpcy5pZF9wcm9kdWN0fVwiXG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aHVtYm5haWwtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRodW1ibmFpbCBwcm9kdWN0LXRodW1ibmFpbFwiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBkYXRhLXNyYz1cIiR7dGhpcy5pbWd9XCJcbiAgICAgICAgICAgICAgc3JjPVwiJHt0aGlzLmltZ31cIlxuICAgICAgICAgICAgICBhbHQ9XCIke3RoaXMudHJ1bmNhdGVTdHJpbmcodGhpcy5uYW1lLCAzMCl9XCJcbiAgICAgICAgICAgICAgd2lkdGg9XCIyMzZcIlxuICAgICAgICAgICAgICBoZWlnaHQ9XCIzMDVcIlxuICAgICAgICAgICAgICBjbGFzcz1cImltZy1mbHVpZCBwcm9kdWN0LXRodW1ibmFpbC1maXJzdFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9kdWN0LWF2YWlsYWJpbGl0eSBkLWJsb2NrXCI+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzcz1cImJhZGdlICR7dGhpcy5zdG9jayA8PSAwXG4gICAgICAgICAgICAgICAgPyAnYmctZGFuZ2VyIHByb2R1Y3QtdW5hdmFpbGFibGUnXG4gICAgICAgICAgICAgICAgOiAnYmctc3VjY2VzcyBwcm9kdWN0LWF2YWlsYWJsZSd9ICR7dGhpcy5zdG9jayA+IDAgJiZcbiAgICAgICAgICAgICAgdGhpcy5hdmFpbGFiaWxpdHkgPT09ICdsYXN0X3JlbWFpbmluZ19pdGVtcydcbiAgICAgICAgICAgICAgICA/ICdiZy13YXJuaW5nIHByb2R1Y3QtbGFzdC1pdGVtcydcbiAgICAgICAgICAgICAgICA6ICcnfSBtdC0yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgJHt0aGlzLmF2YWlsYWJpbGl0eSA9PT0gJ2F2YWlsYWJsZSdcbiAgICAgICAgICAgICAgICA/IGA8aSBjbGFzcz1cImZhcyBmYS1jaGVjayBydGwtbm8tZmxpcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4ke3RoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIDogdGhpcy5hdmFpbGFiaWxpdHkgPT09ICdsYXN0X3JlbWFpbmluZ19pdGVtcydcbiAgICAgICAgICAgICAgICA/IGA8aSBjbGFzcz1cImZhcyBmYS1leGNsYW1hdGlvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4ke3RoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLWJhblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4ke3RoaXMuYXZhaWxhYmlsaXR5X21lc3NhZ2V9YH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2FydGljbGU+XG4gICAgPC9kaXY+YFxuICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ0BoZWxwZXJzL0NvbXBvbmVudCdcbmltcG9ydCBQcm9kdWN0TWluaWF0dXJlIGZyb20gJ0Bjb21wb25lbnRzL2NhdGFsb2cvUHJvZHVjdE1pbmlhdHVyZSdcbmltcG9ydCB7IFByb2R1Y3RJbnRlcmZhY2UgfSBmcm9tICdAaW50ZXJmYWNlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHB1YmxpYyBwcm9kdWN0czogUHJvZHVjdE1pbmlhdHVyZVtdXG5cbiAgY29uc3RydWN0b3IocHJvZHVjdHM6IFByb2R1Y3RJbnRlcmZhY2VbXSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnByb2R1Y3RzID0gcHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiBuZXcgUHJvZHVjdE1pbmlhdHVyZShwcm9kdWN0KSlcbiAgfVxuICBwdWJsaWMgaW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcigpXG4gIH1cbiAgcHVibGljIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtcHJvZHVjdHMnKVxuICAgIGNvbXBvbmVudC5pbm5lckhUTUwgPSB0aGlzLnJlbmRlclByb2R1Y3RMaXN0XG4gIH1cbiAgcHVibGljIHNvcnQodHlwZTogc3RyaW5nLCB3YXk6ICdhc2MnIHwgJ2RlcycpIHtcbiAgICBsZXQgcHJvZHVjdHMgPSB0aGlzLnByb2R1Y3RzXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdwcmljZSc6XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzdG9jayc6XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgV3Jvbmcgc29ydCBwcm9kdWN0IGxpc3QuIFRyaWVkIHRvIHNvcnQgYnkgJHt0eXBlfSBhbmQgdHlwZSAke3dheX1gXG4gICAgICAgIClcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCByZW5kZXJQcm9kdWN0TGlzdCgpIHtcbiAgICByZXR1cm4gLyogSFRNTCAqLyBgPGRpdiBjbGFzcz1cInByb2R1Y3RzIHJvdyBwcm9kdWN0cy1ncmlkXCI+XG4gICAgICAke3RoaXMucHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiBwcm9kdWN0LnJlbmRlcigpKS5qb2luKCcnKX1cbiAgICA8L2Rpdj5gXG4gIH1cbn1cbiIsImltcG9ydCB7IEN1cnJlbmN5SW50ZXJmYWNlIH0gZnJvbSAnQGludGVyZmFjZXMnXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ0BoZWxwZXJzL0NvbXBvbmVudCdcbmltcG9ydCBEYXRhIGZyb20gJ0BoZWxwZXJzL0RhdGEnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnJlbmN5IGV4dGVuZHMgQ29tcG9uZW50IGltcGxlbWVudHMgQ3VycmVuY3lJbnRlcmZhY2Uge1xuICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJylcbiAgfVxuICBwdWJsaWMgaWRfY3VycmVuY3k6IG51bWJlciA9IDBcbiAgcHVibGljIGlzb19sYW5nOiBzdHJpbmcgPSAnJ1xuICBwdWJsaWMgbGFiZWw6IHN0cmluZyA9ICcnXG4gIHB1YmxpYyBzeW1ib2w6IHN0cmluZyA9ICcnXG4gIHB1YmxpYyBwb3NpdGlvbjogc3RyaW5nID0gJydcbiAgcHVibGljIGRlY2ltYWxzOiBudW1iZXIgPSAwXG4gIHB1YmxpYyB2YWx1ZTogbnVtYmVyID0gMFxuICBwcml2YXRlIGRhdGE6IERhdGFcblxuICBjb25zdHJ1Y3RvcihkYXRhOiBEYXRhKSB7XG4gICAgc3VwZXIoKVxuICAgIGNvbnN0IGN1cnJlbmN5ID0gZGF0YS5nZXRDdXJyZW5jeSgpXG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICAgIHRoaXMuaWRfY3VycmVuY3kgPSBjdXJyZW5jeS5pZF9jdXJyZW5jeVxuICAgIHRoaXMuaXNvX2xhbmcgPSBjdXJyZW5jeS5pc29fbGFuZ1xuICAgIHRoaXMubGFiZWwgPSBjdXJyZW5jeS5sYWJlbFxuICAgIHRoaXMuc3ltYm9sID0gY3VycmVuY3kuc3ltYm9sXG4gICAgdGhpcy5wb3NpdGlvbiA9IGN1cnJlbmN5LnBvc2l0aW9uXG4gICAgdGhpcy5kZWNpbWFscyA9IGN1cnJlbmN5LmRlY2ltYWxzXG4gICAgdGhpcy52YWx1ZSA9IGN1cnJlbmN5LnZhbHVlXG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0IGFtb3VudCB0byBjdXJyZW5jeS5cbiAgICogVGhvdXNhbmQgc2VwYXJhdG9yIGVxdWFscyB0byBkb3QgZm9yIGFsbCBzcGFuaXNoIGxhbmd1YWdlcywgb3RoZXJzIHdpdGggY29tbWEuXG4gICAqIERlY2ltYWwgc2VwYXJhdG9yIGVxdWFscyB0byBjb21tYSBmb3IgYWxsIHNwYW5pc2ggbGFuZ3VhZ2VzLCBvdGhlcnMgd2l0aCBkb3RcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudCAtIEFtb3VudCBvZiBwcmljZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IGlmIHJlc3VsdCBpcyB1bmRlZmluZWQsIG51bGwsIE5hTiBvciBmYWxzZSwgcmVzb2x2ZSB3aXRoIHRvTG9jYWxlU3RyaW5nXG4gICAqL1xuICBwdWJsaWMgZm9ybWF0KGFtb3VudDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0XG4gICAgbGV0IHBhcnRzID0gKGFtb3VudCArICcnKS5zcGxpdCgnLicpLFxuICAgICAgaW50ZWdlciA9IHBhcnRzWzBdLFxuICAgICAgZGVjaW1hbCA9IHBhcnRzWzFdLFxuICAgICAgaXNvX2NvZGUgPSB0aGlzLmlzb19sYW5nLFxuICAgICAgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uXG4gICAgaWYgKGlzb19jb2RlLnN1YnN0cmluZygwLCAyKSA9PT0gJ2VzJykge1xuICAgICAgcmVzdWx0ID0gaW50ZWdlci5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCAnLicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGAke2ludGVnZXIucmVwbGFjZShcbiAgICAgICAgL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csXG4gICAgICAgICcsJ1xuICAgICAgKX08c3VwPiR7ZGVjaW1hbC5zdWJzdHJpbmcoMCwgdGhpcy5kZWNpbWFscyl9PC9zdXA+YFxuICAgIH1cbiAgICByZXN1bHQgPSByZXN1bHQgfHwgKCthbW91bnQpLnRvTG9jYWxlU3RyaW5nKGlzb19jb2RlKVxuICAgIGlmIChwb3NpdGlvbiA9PT0gJ2xlZnQnKVxuICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInByaWNlLXN5bWJvbFwiPiR7dGhpcy5zeW1ib2x9PC9zcGFuPiR7cmVzdWx0fWBcbiAgICBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ3JpZ2h0JylcbiAgICAgIHJldHVybiBgJHtyZXN1bHR9PHNwYW4gY2xhc3M9XCJwcmljZS1zeW1ib2xcIj4ke3RoaXMuc3ltYm9sfTwvc3Bhbj5gXG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBwcml2YXRlIHJlZnJlc2goKSB7XG4gICAgY29uc3QgcHJpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtcHJpY2UsIC5yZWd1bGFyLXByaWNlJylcbiAgICBwcmljZXMuZm9yRWFjaCgocHJpY2UpID0+IHtcbiAgICAgIGxldCBhbW91bnQgPSBwcmljZS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKVxuICAgICAgaWYgKGFtb3VudCkge1xuICAgICAgICBwcmljZS5pbm5lckhUTUwgPSB0aGlzLmZvcm1hdCgrYW1vdW50ICogdGhpcy52YWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHB1YmxpYyByZW5kZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoKClcbiAgfVxuICAvKipcbiAgICogQGRlc2MgVXBkYXRlIGN1cnJlbmN5IGJ5IElEXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpZF9jdXJyZW5jeSAtIEN1cnJlbmN5IElEXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlQnlJZChpZF9jdXJyZW5jeTogbnVtYmVyKSB7XG4gICAgbGV0IGN1cnJlbmN5ID0gdGhpcy5kYXRhLmdldEN1cnJlbmN5QnlJZChpZF9jdXJyZW5jeSlcbiAgICBpZiAoY3VycmVuY3kpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW5jeScsIEpTT04uc3RyaW5naWZ5KGN1cnJlbmN5KSlcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIEZhZGUgb3V0IGVmZmVjdFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUYXJnZXQgZWxlbWVudCB0byBhcHBseSBlZmZlY3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBJdCBpcyB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIHdoZXJlIDEwMDAgZXF1YWxzIDEgc2Vjb25kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIHJldHVybnMgYSBmdW5jdGlvbiBvbmNlIHRoZSBleGVjdXRpb24gaXMgZmluaXNoZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhZGVPdXQoXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICBkdXJhdGlvbjogbnVtYmVyLFxuICBjYWxsYmFjazogRnVuY3Rpb25cbikge1xuICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgbGV0IGxhc3QgPSArbmV3IERhdGUoKS5nZXRUaW1lKClcbiAgbGV0IHRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKFxuICAgICAgK2VsZW1lbnQuc3R5bGUub3BhY2l0eSAtIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxhc3QpIC8gZHVyYXRpb25cbiAgICApXG4gICAgbGFzdCA9ICtuZXcgRGF0ZSgpXG4gICAgaWYgKCtlbGVtZW50LnN0eWxlLm9wYWNpdHkgPCAxKVxuICAgICAgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spKSB8fFxuICAgICAgICBzZXRUaW1lb3V0KHRpY2ssIDE2KVxuICAgIGVsc2UgaWYgKGNhbGxiYWNrIHx8IHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soKVxuICB9XG4gIHRpY2soKVxufVxuXG4vKipcbiAqIEZhZGUgb3V0IGVmZmVjdFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUYXJnZXQgZWxlbWVudCB0byBhcHBseSBlZmZlY3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBkdXJhdGlvbiBJdCBpcyB0aGUgZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIHdoZXJlIDEwMDAgZXF1YWxzIDEgc2Vjb25kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAob3B0aW9uYWwpIHJldHVybnMgYSBmdW5jdGlvbiBvbmNlIHRoZSBleGVjdXRpb24gaXMgZmluaXNoZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZhZGVJbihcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQsXG4gIGR1cmF0aW9uOiBudW1iZXIsXG4gIGNhbGxiYWNrOiBGdW5jdGlvblxuKSB7XG4gIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcwJ1xuICBsZXQgbGFzdCA9ICtuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICBsZXQgdGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoXG4gICAgICArZWxlbWVudC5zdHlsZS5vcGFjaXR5ICsgKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbGFzdCkgLyBkdXJhdGlvblxuICAgIClcbiAgICBsYXN0ID0gK25ldyBEYXRlKClcbiAgICBpZiAoK2VsZW1lbnQuc3R5bGUub3BhY2l0eSA+IDApXG4gICAgICAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaykpIHx8XG4gICAgICAgIHNldFRpbWVvdXQodGljaywgMTYpXG4gICAgZWxzZSBpZiAoY2FsbGJhY2sgfHwgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSBjYWxsYmFjaygpXG4gIH1cbiAgdGljaygpXG59XG4iLCJpbXBvcnQgQ29tcG9uZW50SW50ZXJmYWNlIGZyb20gJ0BpbnRlcmZhY2VzJ1xuaW1wb3J0IERhdGEgZnJvbSAnLi9EYXRhJ1xuXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQgaW1wbGVtZW50cyBDb21wb25lbnRJbnRlcmZhY2Uge1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGxcbiAgcHJvdGVjdGVkIHRydW5jYXRlU3RyaW5nID0gRGF0YS50cnVuY2F0ZVN0cmluZ1xuICBcbiAgcHVibGljIHNldCBjb21wb25lbnQoY29tcG9uZW50OiBIVE1MRWxlbWVudCB8IG51bGwpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB0aGlzLmVsZW1lbnQgPSBjb21wb25lbnRcbiAgICBlbHNlIHRocm93IG5ldyBFcnJvcihcIkNvbXBvbmVudCBjYW4ndCBiZSBzZXRcIilcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY29tcG9uZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSByZXR1cm4gdGhpcy5lbGVtZW50XG4gICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0NvbXBvbmVudCBpcyBub3QgZGVmaW5lZCcpXG4gIH1cbiAgcHVibGljIGFic3RyYWN0IGluaXQoKTogdm9pZFxuXG4gIHB1YmxpYyBhYnN0cmFjdCByZW5kZXIoKTogdm9pZFxufVxuIiwiaW1wb3J0IHtcbiAgQ2FycmllckludGVyZmFjZSxcbiAgQ3VycmVuY3lJbnRlcmZhY2UsXG4gIEN1c3RvbWVySW50ZXJmYWNlLFxuICBQcm9kdWN0SW50ZXJmYWNlLFxufSBmcm9tICdAaW50ZXJmYWNlcydcbmltcG9ydCBjb25maWcgZnJvbSAnYXBwL2NvbmZpZy5kZWZhdWx0cy5qc29uJ1xuLyoqXG4gKiBAY2xhc3NcbiAqIFVzZSB0byBtYW5hZ2UgYWxsIEphdmFzY3JpcHQgT2JqZWN0IE5vdGF0aW9uIChKU09OKSBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGEge1xuICBzdGF0aWMgZ2V0UHJvZHVjdEJ5SWQoaWRfcHJvZHVjdDogbnVtYmVyKTogUHJvZHVjdEludGVyZmFjZSB8IHVuZGVmaW5lZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdNZXRob2Qgbm90IGltcGxlbWVudGVkLicpXG4gIH1cbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0cyA9IHtcbiAgICBpZF9jdXJyZW5jeTogY29uZmlnLmlkX2N1cnJlbmN5LFxuICAgIGlkX2N1c3RvbWVyOiBjb25maWcuaWRfY3VzdG9tZXIsXG4gICAgaWRfY2FycmllcjogY29uZmlnLmlkX2NhcnJpZXIsXG4gIH1cbiAgcHJvZHVjdHM6IFByb2R1Y3RJbnRlcmZhY2VbXVxuICBjdXJyZW5jaWVzOiBDdXJyZW5jeUludGVyZmFjZVtdXG4gIGN1c3RvbWVyczogQ3VzdG9tZXJJbnRlcmZhY2VbXVxuICBjYXJyaWVyczogQ2FycmllckludGVyZmFjZVtdXG5cbiAgY29uc3RydWN0b3IocGFyYW1zOiB7XG4gICAgcHJvZHVjdHM6IFByb2R1Y3RJbnRlcmZhY2VbXVxuICAgIGN1cnJlbmNpZXM6IEN1cnJlbmN5SW50ZXJmYWNlW11cbiAgICBjdXN0b21lcnM6IEN1c3RvbWVySW50ZXJmYWNlW11cbiAgICBjYXJyaWVyczogQ2FycmllckludGVyZmFjZVtdXG4gIH0pIHtcbiAgICB0aGlzLnByb2R1Y3RzID0gcGFyYW1zLnByb2R1Y3RzXG4gICAgdGhpcy5jdXJyZW5jaWVzID0gcGFyYW1zLmN1cnJlbmNpZXNcbiAgICB0aGlzLmN1c3RvbWVycyA9IHBhcmFtcy5jdXN0b21lcnNcbiAgICB0aGlzLmNhcnJpZXJzID0gcGFyYW1zLmNhcnJpZXJzXG4gIH1cbiAgLyoqXG4gICAqIEluaXQgZGF0YSBvbiBsb2NhbFN0b3JhZ2VcbiAgICovXG4gIC8vIGFzeW5jIGluaXQoKSB7XG4gIC8vICAgY29uc3QgY3VycmVuY3kgPSBhd2FpdCBEYXRhLmdldEN1cnJlbmN5KClcbiAgLy8gICBjb25zdCBjYXJ0X3Byb2R1Y3RzID0gRGF0YS5nZXRDYXJ0UHJvZHVjdHMoKVxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjdXJyZW5jeScsIGN1cnJlbmN5KVxuICAvLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0X3Byb2R1Y3RzJywgSlNPTi5zdHJpbmdpZnkoY2FydF9wcm9kdWN0cykpXG4gIC8vIH1cblxuICAvKipcbiAgICogU2VsZWN0IGEgcHJvZHVjdFxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfcHJvZHVjdCAtIFByb2R1Y3QgSURcbiAgICovXG4gIHB1YmxpYyBnZXRQcm9kdWN0QnlJZChpZF9wcm9kdWN0OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnByb2R1Y3RzLmZpbHRlcihmdW5jdGlvbiAocHJvZHVjdCkge1xuICAgICAgcmV0dXJuIHByb2R1Y3QuaWRfcHJvZHVjdCA9PSBpZF9wcm9kdWN0XG4gICAgfSlbMF1cbiAgICBpZiAoIXJlc3BvbnNlKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBQcm9kdWN0IElEIGVxdWFsIHRvICR7aWRfcHJvZHVjdH0gbm90IGZvdW5kYClcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYSBjdXJyZW5jeVxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfY3VycmVuY3kgLSBDdXJyZW5jeSBJRFxuICAgKi9cbiAgcHVibGljIGdldEN1cnJlbmN5QnlJZChpZF9jdXJyZW5jeTogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5jdXJyZW5jaWVzLmZpbHRlcihcbiAgICAgIChjdXJyZW5jeTogeyBpZF9jdXJyZW5jeTogbnVtYmVyIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbmN5LmlkX2N1cnJlbmN5ID09IGlkX2N1cnJlbmN5XG4gICAgICB9XG4gICAgKVswXVxuXG4gICAgaWYgKCFyZXNwb25zZSlcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ3VycmVuY3kgSUQgZXF1YWwgdG8gJHtpZF9jdXJyZW5jeX0gbm90IGZvdW5kYClcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWxlY3QgYSBjdXN0b21lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZW1haWwgLSBDdXN0b21lciBlbWFpbFxuICAgKi9cbiAgcHVibGljIGdldEN1c3RvbWVyQnlFbWFpbChlbWFpbDogc3RyaW5nKSB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5jdXN0b21lcnMuZmlsdGVyKChjdXN0b21lcikgPT4ge1xuICAgICAgcmV0dXJuIGN1c3RvbWVyLmVtYWlsID09PSBlbWFpbFxuICAgIH0pWzBdXG5cbiAgICBpZiAoIXJlc3BvbnNlKSB0aHJvdyBuZXcgRXJyb3IoYEN1c3RvbWVyIGVtYWlsIGVxdWFsIHRvICR7ZW1haWx9IG5vdCBmb3VuZGApXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IG9uZSBjYXJyaWVyIGluc2lkZSBKU09OIHRvIE9iamVjdCBieSBJRFxuICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlcn0gaWRfY2FycmllciAtIENhcnJpZXIgSURcbiAgICovXG4gIHB1YmxpYyBnZXRDYXJyaWVyQnlJZChpZF9jYXJyaWVyOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmNhcnJpZXJzLmZpbHRlcigoY2FycmllcikgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgY2Fycmllci5pZF9jYXJyaWVyID09PSBpZF9jYXJyaWVyIHx8IGNhcnJpZXIuaWRfY2FycmllciA9PT0gK2lkX2NhcnJpZXJcbiAgICAgIClcbiAgICB9KVswXVxuICAgIGlmICghcmVzcG9uc2UpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENhcnJpZXIgSUQgZXF1YWwgdG8gJHtpZF9jYXJyaWVyfSBub3QgZm91bmRgKVxuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBjdXJyZW50IGN1cnJlbmN5IG9yIGRlZmF1bHQgY3VycmVuY3lcbiAgICovXG4gIHB1YmxpYyBnZXRDdXJyZW5jeSgpOiBDdXJyZW5jeUludGVyZmFjZSB7XG4gICAgY29uc3QgY3VycmVuY3kgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVuY3knKVxuICAgIGlmIChjdXJyZW5jeSA9PT0gbnVsbClcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbmNpZXMuZmlsdGVyKFxuICAgICAgICAoY3VycmVuY3kpID0+IGN1cnJlbmN5LmlkX2N1cnJlbmN5ID09PSB0aGlzLmRlZmF1bHRzLmlkX2N1cnJlbmN5XG4gICAgICApWzBdXG4gICAgZWxzZSByZXR1cm4gSlNPTi5wYXJzZShjdXJyZW5jeSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY2FycmllciBkZWZhdWx0IGNhcnJpZXJcbiAgICovXG4gIHB1YmxpYyBnZXRDYXJyaWVyKCkge1xuICAgIHJldHVybiB0aGlzLmNhcnJpZXJzLmZpbHRlcihcbiAgICAgIChjYXJyaWVyKSA9PiBjYXJyaWVyLmlkX2NhcnJpZXIgPT09IHRoaXMuZGVmYXVsdHMuaWRfY2FycmllclxuICAgIClbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgY3VycmVudCBwcm9kdWN0cyBpbnNpZGUgY2FydCBvciBlbXB0eSBhcnJheVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRDYXJ0UHJvZHVjdHMoKTpcbiAgICB8IHsgaWRfcHJvZHVjdDogbnVtYmVyOyBjYXJ0X3F1YW50aXR5OiBudW1iZXIgfVtdXG4gICAgfCBbXSB7XG4gICAgY29uc3QgY2FydF9wcm9kdWN0czogc3RyaW5nIHwgbnVsbCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0X3Byb2R1Y3RzJylcblxuICAgIGlmIChjYXJ0X3Byb2R1Y3RzID09PSBudWxsKSByZXR1cm4gW11cbiAgICBlbHNlIHJldHVybiBKU09OLnBhcnNlKGNhcnRfcHJvZHVjdHMpXG4gIH1cblxuICAvKipcbiAgICogVHJ1bmNhdGUgc3RyaW5nIGFuZCBhZGQgLi4uIGF0IHRoZSBlbmQgaWYgZXhjZWVkIG51bSBwYXJhbWV0ZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIHN0cmluZyB0byB0cnVuY2F0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gY2hlY2tcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdHJ1bmNhdGVTdHJpbmcoc3RyOiBzdHJpbmcsIG51bTogbnVtYmVyKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPiBudW0pIHtcbiAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgbnVtKSArICcuLi4nXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdHJcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFByb2R1Y3RJbnRlcmZhY2UsXG4gIEN1cnJlbmN5SW50ZXJmYWNlLFxuICBDYXJyaWVySW50ZXJmYWNlLFxuICBDdXN0b21lckludGVyZmFjZSxcbn0gZnJvbSAnQGludGVyZmFjZXMnXG5pbXBvcnQgeyBBc3luY0ZldGNoVHlwZSB9IGZyb20gJ0B0eXBlcydcblxubGV0IHByb2R1Y3RzID0gZmV0Y2hBc3luYzxQcm9kdWN0SW50ZXJmYWNlW10+KCcuL2pzb24vcHJvZHVjdHMuanNvbicpXG5sZXQgY3VycmVuY2llcyA9IGZldGNoQXN5bmM8Q3VycmVuY3lJbnRlcmZhY2VbXT4oJy4vanNvbi9jdXJyZW5jaWVzLmpzb24nKVxubGV0IGNhcnJpZXJzID0gZmV0Y2hBc3luYzxDYXJyaWVySW50ZXJmYWNlW10+KCcuL2pzb24vY2FycmllcnMuanNvbicpXG5sZXQgY3VzdG9tZXJzID0gZmV0Y2hBc3luYzxDdXN0b21lckludGVyZmFjZVtdPignLi9qc29uL2N1c3RvbWVycy5qc29uJylcblxuZXhwb3J0IHsgcHJvZHVjdHMsIGN1cnJlbmNpZXMsIGNhcnJpZXJzLCBjdXN0b21lcnMgfVxuXG4vKipcbiAqIFVzaW5nIEZldGNoXG4gKiB7QGxpbmsgPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VzL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2g+fVxuICogQGNvbnRyaWJ1aXRvciBtc21mc2RcbiAqIHtAbGluayA8aHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbXNtZnNkL2ZjYTUwYWIwOTViNzk1ZWIzOTczOWU4YzQzNTdhODA4Pn1cbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZSAtIEpTT04gZmlsZW5hbWVcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hBc3luYzxUID0gQXN5bmNGZXRjaFR5cGU+KGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPFQ+IHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KClcbiAgLy9jb25zb2xlLmxvZyhgRmV0Y2hpbmc6ICR7ZmlsZW5hbWV9IC0gc3RhcnRgKVxuICBsZXQgcmVzcG9uc2VcbiAgdHJ5IHtcbiAgICAvLyBkZWZhdWx0IGluaXQgY2FsbGJhY2sgZm9yIHJlcXVlc3RcbiAgICBjb25zdCBpbml0ID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgIH1cbiAgICAvLyBmZXRjaCByZXF1ZXN0IGluc3RhbmNlXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGZpbGVuYW1lLCBpbml0KVxuICAgIC8vIGF3YWl0IHJlc3BvbnNlIG9mIGZldGNoIGNhbGxcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpXG4gICAgLy8gb25seSBwcm9jZWVkIG9uY2UgcHJvbWlzZSBpcyByZXNvbHZlZFxuICAgIGxldCBkYXRhOiBUID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgLy8gb25seSBwcm9jZWVkIG9uY2Ugc2Vjb25kIHByb21pc2UgaXMgcmVzb2x2ZWRcbiAgICBpZiAoZGF0YSkge1xuICAgICAgY29uc3QgZW5kVGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAvL2NvbnNvbGUubG9nKGBGaWxlICR7ZmlsZW5hbWV9IHRvb2tzICR7ZW5kVGltZSAtIHN0YXJ0VGltZX1tc2ApXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH0gZWxzZSB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHRyeWluZyB0byBnZXQgSlNPTiBkYXRhIGZyb20gJHtmaWxlbmFtZX1gKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgcmVzcG9uc2UgPSBlcnJvclxuICB9XG4gIHRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHByb2R1Y3RzLCBjdXJyZW5jaWVzLCBjYXJyaWVycywgY3VzdG9tZXJzIH0gZnJvbSAnQGhlbHBlcnMvUHJvbWlzZXMnXG4vLyBpbXBvcnQgU2hvcHBpbmdjYXJ0IGZyb20gJ0Bjb21wb25lbnRzL3Nob3BwaW5nY2FydCdcbi8vIGltcG9ydCBBdXRoZW50aWNhdGlvbkZvcm0gZnJvbSAnQGNvbXBvbmVudHMvYXV0aGVudGljYXRpb24nXG4vLyBpbXBvcnQgTm90aWZpY2F0aW9ucyBmcm9tICdAY29tcG9uZW50cy9jb21tb24vbm90aWZpY2F0aW9ucydcbmltcG9ydCBDYXRhbG9nIGZyb20gJ0Bjb21wb25lbnRzL2NhdGFsb2cnXG5pbXBvcnQgQ3VycmVuY3kgZnJvbSAnQGNvbXBvbmVudHMvY29tbW9uL2N1cnJlbmN5J1xuaW1wb3J0IERhdGEgZnJvbSAnQGhlbHBlcnMvRGF0YSdcbmltcG9ydCB7IGZhZGVPdXQgfSBmcm9tICdAY29tcG9uZW50cy9jb21tb24vcHJlbG9hZGVyJ1xuXG4vKipcbiAqIEZldGNoIEN1cnJlbmN5IGFuZCBDYXJyaWVyIGJlZm9yZSBldmVyeXRoaW5nXG4gKi9cblxuLy8gICBjYXJyaWVyOiAoYXN5bmMgKCkgPT4gYXdhaXQgRGF0YS5nZXRDYXJyaWVyKCkpKCksXG4vLyAgIGNhcnQ6IG5ldyBTaG9wcGluZ2NhcnQoKSxcbi8vICAgY2F0YWxvZzogbmV3IENhdGFsb2coKSxcbi8vICAgYXV0aGVudGljYXRpb246IG5ldyBBdXRoZW50aWNhdGlvbkZvcm0oKSxcbi8vICAgbm90aWZpY2F0aW9uczogbmV3IE5vdGlmaWNhdGlvbnMoKSxcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgLy8gRGVjbGFyaW5nIGNvbXBvbmVudHMgaW4gRE9NXG4gIGNvbnN0IHByZWxvYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWdlLXByZWxvYWRlcicpXG5cbiAgLy8gUHJlbG9hZGVyXG4gIGlmIChwcmVsb2FkZXIpXG4gICAgZmFkZU91dChwcmVsb2FkZXIsIDMwMDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHByZWxvYWRlci5yZW1vdmUoKVxuICAgIH0pXG5cbiAgLy8gTG9hZCBEYXRhXG4gIGNvbnN0IGRhdGEgPSBuZXcgRGF0YSh7XG4gICAgcHJvZHVjdHM6IGF3YWl0IHByb2R1Y3RzLFxuICAgIGN1cnJlbmNpZXM6IGF3YWl0IGN1cnJlbmNpZXMsXG4gICAgY3VzdG9tZXJzOiBhd2FpdCBjdXN0b21lcnMsXG4gICAgY2FycmllcnM6IGF3YWl0IGNhcnJpZXJzLFxuICB9KVxuXG4gIGNvbnN0IGN1cnJlbmN5ID0gbmV3IEN1cnJlbmN5KGRhdGEpXG4gIGNvbnN0IGNhdGFsb2cgPSBuZXcgQ2F0YWxvZyhkYXRhLnByb2R1Y3RzKVxuICBjb25zb2xlLmxvZyhjYXRhbG9nKVxuXG4gIGNhdGFsb2cuaW5pdCgpXG59KVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9