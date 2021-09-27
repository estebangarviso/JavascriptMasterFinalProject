<!DOCTYPE html>
<html lang="{{$iso_code}}">

<head>
    {{{block 'head'}}}
        {{include file='src/templates/_partials/head.tpl'}}
    {{{/block}}}
</head>

<body id="page-{{$page.page_name}}">
    <main id="main-page-content">
        <section id="wrapper">
            <div id="inner-wrapper" class="container">
                {{include file='src/templates/_partials/notifications.tpl'}}
                <header id="header" class="desktop-header">
                    {{{block 'header'}}}
                        {{include file='src/templates/_partials/header.tpl'}}
                    {{{/block}}}
                </header>
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
                                {{include file='src/templates/shoppingcart.tpl'}}
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
</body>

</html>