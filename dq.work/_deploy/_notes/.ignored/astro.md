https://bejamas.io/blog/practical-guide-to-astro-js-framework/

```md
---
import Header from ‘../components/Header.astro’;
---
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <title>About</title>
  </head>
  <body>
    <h1>About</h1>
    <p>Jamstack development agency.</p>
  </body>
</html>
```
then
```md
<body>
  <Header />
  <h1>About</h1>
</body>
```

using `glob`
```md
---
  const blogs = await Astro.glob('../pages/blog/*.md');
---
```

interactive
> You can make a framework component interactive (hydrated) by adding Astro [directives](https://docs.astro.build/en/reference/directives-reference/#client-directives). 



https://jasonformat.com/islands-architecture/