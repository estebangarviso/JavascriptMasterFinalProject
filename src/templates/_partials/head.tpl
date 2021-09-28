{{{block 'head_charset'}}}
    <meta charset="UTF-8">
{{{/block}}}

{{{block 'head_ie_compatibility'}}}
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
{{{/block}}}

{{{block 'head_seo'}}}
    <title>{{$page.meta.title}}</title>
    <meta name="description" content="{{$page.meta.description}}">
    <meta name="keywords" content="{{$page.meta.keywords}}">
    {{{block 'head_hreflang'}}}
        <link rel="alternate" href="{{$page.url}}" hreflang="{{$lang}}">
        <link rel="alternate" href="{{$page.url}}" hreflang="x-default">
    {{{/block}}}
{{{/block}}}

{{{block 'head_og_tags'}}}
    <meta property="og:title" content="{{$page.meta.title}}" />
    <meta property="og:url" content="{{$page.url}}" />
    <meta property="og:site_name" content="{{$app.name}}" />
    <meta property="og:description" content="{{$page.meta.description}} ">
    <meta property="og:type" content="website">
    {{{block 'head_og_image'}}}
        <meta property="og:image" content="{{$app.logo}}" />
    {{{/block}}}
{{{/block}}}

{{{block 'head_viewport'}}}
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
{{{/block}}}

{{{block 'head_fonts'}}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family={{$app.fonts.default_typo}}:ital,wght@0,300;0,400;1,300&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family={{$app.fonts.highlight_typo}}:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet">
{{{/block}}}

{{* Modules Head Tags *}}
{{$headPlugins}}
{{* Webpack externals *}}

{{{block 'stylesheets'}}}
    {{$styles}}
{{{/block}}}

{{{block 'javascript_head'}}}
    {{$javascript.head}}
{{{/block}}}