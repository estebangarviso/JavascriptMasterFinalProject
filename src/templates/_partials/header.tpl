<div class="header-top">
    <div id="desktop-header-container" class="container">
        <div class="row align-items-center">
            <div class="col col-header-left">
                <div class="header-custom-html">
                    {{$app.header_text}}
                </div>
            </div>
            <div class="col col-header-center text-center">
                <a href="#header-top">
                    <div id="desktop_logo">
                    </div>
                </a>
            </div>

            <div class="col col-header-right text-right">
                {{include file='src/templates/modules/currency-selector.tpl'}}
            </div>
        </div>
    </div>
</div>