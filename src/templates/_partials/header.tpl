{{{block header_desktop}}}
    <div class="sticky-desktop-wrapper">
        <div id="desktop-header" class="desktop-header">
            <div class="header-top">
                <div id="desktop-header-container" class="container">
                    <div class="row align-items-center">
                        <div class="col col-header-left">
                            <div class="header-custom-html">
                                {{$app.header_text}}
                            </div>
                        </div>
                        <div class="col col-header-center text-center">
                            <a href="#header">
                                <div id="desktop_logo" class="logo img-fluid">
                                </div>
                            </a>
                        </div>

                        <div class="col col-header-right text-end">
                            <div class="row justify-content-end">
                                {{if $modules.currencyselector.hook === "header"}}
                                    {{include file='src/templates/modules/currency-selector.tpl'}}
                                {{/if}}
                                {{include file='src/templates/shoppingcart.tpl'}}
                            </div>
                        </div>
                        <div class="col col-12">
                            <div class="row"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{{{/block}}}
{{{block header_mobile}}}
    <div class="sticky-mobile-wrapper">
        <div id="mobile-header" class="mobile-header">
            <div id="mobile-header-sticky">
                <div class="container">
                    <div class="mobile-main-bar">
                        <div class="row align-items-center row-mobile-header">
                            <div class="col col-auto col-mobile-btn col-mobile-btn-menu col-mobile-menu">
                                <div class="m-nav-btn" data-toggle="dropdown" data-display="static"><i class="fas fa-bars"
                                        aria-hidden="true"></i>
                                </div>
                                <div id="mobile_menu_click_overlay"></div>
                                <div id="_mobile_menu-mobile" class="dropdown-menu-custom dropdown-menu"></div>
                            </div>
                            <div class="col col-mobile-logo text-center">
                                <a href="#mobile-header">
                                    <div id="mobile_logo" class="logo img-fluid"></div>
                                </a>
                            </div>
                            <div class="col col-auto col-mobile-btn col-mobile-btn-account">
                                <a href="#js-authentication">
                                    <div class="m-nav-btn"><i class="fas fa-user" aria-hidden="true"></i>
                                    </div>
                                </a>
                            </div>
                            <div class="col col-auto col-mobile-btn col-mobile-btn-cart js-shopping-cart side-cart">
                                <div id="mobile-cart-wrapper">
                                    <div id="mobile-cart-toogle" class="m-nav-btn" data-toggle="dropdown"
                                        data-display="static">
                                        <i class="fas fa-shopping-cart mobile-cart-icon" aria-hidden="true"><span
                                                id="mobile-cart-products-count"
                                                class="cart-products-count cart-products-count-btn">
                                            </span></i>
                                    </div>
                                    <div id="_mobile_blockcart-content" class="dropdown-menu-custom dropdown-menu"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{{{/block}}}