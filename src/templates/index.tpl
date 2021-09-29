<!DOCTYPE html>
<html lang="{{$iso_code}}">

<head>
    {{{block 'head'}}}
        {{include file='src/templates/_partials/head.tpl'}}
    {{{/block}}}
</head>

<body id="page-{{$page.page_name}}">
    <main id="main-page-content">
        <header id="header" class="desktop-header">
            {{{block 'header'}}}
                {{include file='src/templates/_partials/header.tpl'}}
            {{{/block}}}
        </header>
        <section id="wrapper">
            <div id="inner-wrapper" class="container">
                {{include file='src/templates/_partials/notifications.tpl'}}
                <div class="row">
                    {{{block 'content_wrapper'}}}
                        <div id="content-wrapper" class="col-12 col-md-8">
                            {{{block name='content'}}}
                                {{include file='src/templates/products.tpl'}}
                            {{{/block}}}
                        </div>
                    {{{/block}}}
                    {{{block 'right_column'}}}
                        <div id="right-column" class="col-12 col-md-4">
                            {{{block name='right_column_content'}}}
                                {{include file='src/templates/authentication.tpl'}}
                            {{{/block}}}
                        </div>
                    {{{/block}}}
                </div>
        </section>
    </main>
    {{$javascript.bottom}}

    <div id="page-preloader">
        <div class="loader-wrapper">
            <div class="loader"></div>
        </div>
    </div>

    <div id="modal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modal-title"></h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>