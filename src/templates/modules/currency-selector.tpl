{{if $modules.currencyselector.hook === 'header'}}
    <div id="currency-selector-wrapper" class="col col-auto header-btn-w">
        <div class="form-group header-btn-w header-cart-btn-w">
            <select class="form-select form-select-sm w-auto" name="js-currency" id="js-currency">
                {{foreach $currencies as $currency}}
                    <option value="{{$currency.id_currency}}">{{$currency.label}}</option>
                {{/foreach}}
            </select>
        </div>
    </div>
{{else if $modules.currencyselector.hook === 'footer'}}
    <div class="row align-content-center justify-content-center">
        <div id="currency-selector-wrapper" class="col col-auto py-2">
            <div class="form-group">
                <select class="form-select form-select-sm w-auto" name="js-currency" id="js-currency">
                    {{foreach $currencies as $currency}}
                        <option value="{{$currency.id_currency}}">{{$currency.label}}</option>
                    {{/foreach}}
                </select>
            </div>
        </div>
    </div>
{{/if}}