<div id="currency-selector-wrapper" class="col col-auto header-btn-w">
    <div class="form-group header-btn-w header-cart-btn-w">
        <select class="form-select form-select-sm w-auto" name="js-currency" id="js-currency">
            {{foreach $currencies as $currency}}
                <option value="{{$currency.id_currency}}">{{$currency.label}}</option>
            {{/foreach}}
        </select>
    </div>
</div>