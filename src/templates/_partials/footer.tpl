<div id="footer-container-main" class="footer-container footer-style-1">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-auto d-grid gap-2 mx-auto w-100">
                <button class="btn btn-primary" id="restore-catalog-stock" type="button">Restaurar
                    Stock</button>

            </div>
        </div>
    </div>
</div>
{{{block name='footer_copyrights'}}}
    <div id="footer-copyrights" class="_footer-copyrights-1 dropup">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-sm-6 push-sm-6 copyright-img text-right">
                    <div class="payment-method"></div>
                </div>

                <div class="col-sm-6 pull-sm-6 copyright-txt">
                    <strong>Copyright <i class="fas fa-copyright"></i> 2021 <a
                            href="mailto:{{$app.copyrights.author.mail}}">{{$app.copyrights.author.name}}</a> Chile. Todos
                        los derechos reservados.</strong>

                </div>
            </div>
        </div>
    </div>
{{{/block}}}