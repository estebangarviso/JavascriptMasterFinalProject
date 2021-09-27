<div class="form-group d-flex justify-content-end">
    <select class="form-select form-select-sm w-auto" name="js-currency" id="js-currency">
        {{foreach $currencies as $currency}}
            <option value="{{$currency.id_currency}}">{{$currency.label}}</option>
        {{/foreach}}
    </select>
</div>