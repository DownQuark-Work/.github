https://dev.to/devteam/best-practices-for-writing-on-dev-creating-a-series-2bgj
https://dev.to/codepo8/the-ongoing-defence-of-frontend-as-a-full-time-job-3dp2

https://shoelace.style/
https://csslayout.io/
https://cssstats.com/

https://democoding.in/post/css-neumorphism-code-examples

Qoncepts:
- astro
  - island pattern
  - https://astro.build/
  - https://docs.astro.build/en/getting-started/
- scss
- cube css
  - tokens
  - https://web.dev/learn/css/logical-properties/
  - start with a classless implementation
- haxagon
 - https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/
 - https://freefrontend.com/css-hexagons/

 - https://codepen.io/uiswarup/pen/ExjZrdQ << mix of
 - https://codepen.io/thebabydino/pen/PowXYpV << these three
 https://codepen.io/adamriguez/pen/eRaXeq << ?

- https://codepen.io/rayfranco/pen/vYOLBL << button
- https://codepen.io/alexerlandsson/pen/ZvXVbB << base to glassmorph?

- https://codepen.io/t_afif/pen/mdWBYqE << with fading/gradient anim

 - https://codepen.io/danwilson/pen/LWPavK

 - https://web.dev/speedy-css-tip-animated-gradient-text/
 
- asymetrical
  - generative css for color and placement?
  - find way to add hoverstate to groups of randomly placed items?
    e.g.
- try as glassmorphism / metal badges / etc
  - https://ui.glass/generator/
```
--active-hover-category: .hex:hover[data-category]
.hex[(--active-hover-category)]
/* I know that wouldn't work... but something? */
a::after {
  content: attr(href);
  content: attr(url);
}
```

Combine styles with the :is pseudo-class selector
```scss
header a:hover,
nav a:hover,
footer a:hover {
 text-decoration: underline;
}
```
We can combine them into a single one as following:
```scss
:is(header, nav, footer) a:hover {
    text-decoration: underline;
}
```

https://web.dev/6-css-snippets-every-front-end-developer-should-know-in-2023/

https://csslayout.io/
https://csslayout.io/timeline/
https://csslayout.io/zigzag-timeline/
https://csslayout.io/tree-diagram/
https://csslayout.io/folder-structure/

https://uiverse.io/challenges

hexagonal grid taking up main area, but also a timeline (subtle) line going up one of the sides with links to updates on the entranglement sites

https://garden.bradwoods.io/notes/css/blend-modes
https://moderncss.dev/container-query-units-and-fluid-typography/
https://www.robinrendle.com/notes/container-queries-and-typography/
https://layout.bradwoods.io/

https://redstapler.co/web-design-trends-2023/

dark and light mode
https://web.dev/building-a-color-scheme/
- https://codepen.io/argyleink/pen/vYxrrpd

https://web.dev/patterns/
https://web.dev/patterns/components/

https://shadows.brumm.af/
https://tobiasahlin.com/blog/how-to-animate-box-shadow/
https://advanced-box-shadow-css-generator.vercel.app/

`dialog`
```html
<dialog id="dialog">
  <form method="dialog">
    <p>Hi, I'm a dialog.</p>
    <button>OK</button>
  </form>
</dialog>

<button onclick="dialog.showModal()">Open Dialog</button>
<script>
dialog[modal-mode="mega"]::backdrop { backdrop-filter: blur(25px); }
/* hope that browsers will allow transitioning the backdrop element in the future */
dialog::backdrop { transition: backdrop-filter .5s ease; }
</script>
```
```html
<dialog id="MegaDialog" modal-mode="mega">
  <form method="dialog">
    <header>
      <h3>Dialog title</h3>
      <button onclick="this.closest('dialog').close('close')"></button>
    </header>
    <article>...</article>
    <footer>
      <menu>
        <button autofocus type="reset" onclick="this.closest('dialog').close('cancel')">Cancel</button>
        <button type="submit" value="confirm">Confirm</button>
      </menu>
    </footer>
  </form>
</dialog>
```
```html
<dialog id="MiniDialog" modal-mode="mini">
  <form method="dialog">
    <article>
      <p>Are you sure you want to remove this user?</p>
    </article>
    <footer>
      <menu>
        <button autofocus type="reset" onclick="this.closest('dialog').close('cancel')">Cancel</button>
        <button type="submit" value="confirm">Confirm</button>
      </menu>
    </footer>
  </form>
</dialog>
```


Focusing on DevX - building a product to help eliminate the gap between designers and developers. Transforming inputs to technical jargon in real time. (e.g: [developer writes] Does this need the letters scrunched together too? [designer receives] Should I apply the same amount of kerning previously used?)


https://github.com/milouse/centigram

https://github.com/lkhrs/astro-simple

https://iconoir.com/
https://github.com/iconoir-icons/iconoir

https://freefrontend.com/css-neumorphism-examples/

```scss
:root, ::backdrop, ::selection {
    --accent1: hsl(44,80%,57%); // gold
    --accent1a: hsl(33,86%,58%); // gold
    --accent2: hsl(240,9%,17%); // dark-dark-gray
    --tangerine: hsl(22,100%,60%)
    --midnight-express: hsl(255,27%,19%) // dark purple
    background: linear-gradient(45deg, var(--accent1) 0%, var(--accent2) 80%);
}
.nice {
/* taken from: https://chroma.szhao.dev/
#922765
#4F174D
#1C061B
#EB2364
---
#022B3A
#1F7A8C
#BFDBF7
#E1E5F2
---
Firefly|#0d1c2b|rgb(13, 28, 43)
Rhino|#2c4263|rgb(44, 66, 99)
Gumbo|#7d9ca6|rgb(125, 156, 166)
Green White|#e7e7da|rgb(231, 231, 218)
Sandy brown|#f4a462|rgb(244, 164, 98)
 */

--dark-blue: hsla(220, 20%, 20%, 1)
--deep-purple: hsla(280, 35%, 30%, 1)
--light-gray: hsla(0, 0%, 90%, 1)
--mid-green: hsla(140, 40%, 30%, 1)
--mid-orange: hsla(30, 50%, 40%, 1)
--light-blue: hsla(200, 50%, 70%, 1)
}
```

[platform] [60] [30] [10]
core 60% dark blue, 30% deep purple, 10% light grey.
blog - 60% green, 30% dark blue, 10% light grey.
forum- 60% orange, 30% deep purple, 10% light grey.
wiki- 60% light blue, 30% dark blue, 10% light grey.

Fonts:
HEADERS: https://fonts.google.com/specimen/Rokkitt
SUBHEAD: https://fonts.google.com/specimen/Jura
CONTENT: https://fonts.google.com/specimen/Roboto+Serif

```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Jura:wght@700&family=Roboto+Serif:opsz,wdth,wght,GRAD@8..144,150,255,55&family=Rokkitt:wght@800&display=swap');
</style>
```
_OR_ below for font embed
```html
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=corben:400|jura:700|rokkitt:700" rel="stylesheet" />
```
```html
// can also use this:
@import url(https://fonts.bunny.net/css?family=corben:400|jura:700|rokkitt:700);
font-family: 'Corben', display;
font-family: 'Jura', sans-serif;
font-family: 'Rokkitt', serif;
```
### Use _Bunny_ **not** gooogle
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jura:wght@700&family=Roboto+Serif:opsz,wdth,wght,GRAD@8..144,150,255,55&family=Rokkitt:wght@800&display=swap" rel="stylesheet">

font-family: 'Jura', sans-serif;
font-family: 'Roboto Serif', serif;
font-family: 'Rokkitt', serif;
/* find failovers: https://modernfontstacks.com/ */
```

Type scales: https://utopia.fyi/type/calculator/

Don't use the Simple fluid font sizes based on container width below (get all 3 mixins here: https://moderncss.dev/container-query-units-and-fluid-typography/)
```scss
.container { container-type: inline-size; }
.fluid-type { font-size: clamp(1rem, 4cqi, 3rem); }
```

define css var with @property when need more control than the defaul var allows
```scss
@property --my-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #c0ffee;
}
```
possible through js but experimental - do not do this yet
```scss
window.CSS.registerProperty({
  name: "--my-color",
  syntax: "<color>",
  inherits: false,
  initialValue: "#c0ffee",
});
```
consider var fallback if NOT using `@property`
```scss
:root {
  color: var(--paragraph-text-color, var(--paragraph-text-color-two, black));
  background-color: var(--my-color) /* using @property - default is already defined */
}
```

access and reset css vars in js
```ts
const root = document.querySelector(':root');
const rootStyle = getComputedStyle(root);
root.style.setProperty('--paragraph-text-color', 'blue');
```

Generative CSS
_mlnck_ -> https://codepen.io/mlnck/pen/MWPOWwq
FOUND!
https://medium.com/hypersphere-codes/randomness-in-css-b55a0845c8dd
- PRE-REQ: https://medium.com/hypersphere-codes/counting-in-css-unlock-magic-of-css-variables-8e610881097a

https://stackoverflow.com/questions/40164169/css-variables-custom-properties-in-pseudo-element-content-property/40179718#40179718



https://developer.chrome.com/blog/css-color-mix/
- https://developer.chrome.com/blog/css-color-mix/#intermediate-color-scheme
https://una.im/color-mix-opacity

https://danielcwilson.com/blog/2018/02/optical-fun-barrier-grid/
https://blog.logrocket.com/create-beautiful-stroked-text-css/


> Below are stil good for references for Generative CSS:
https://blog.logrocket.com/create-better-themes-with-css-variables/

- https://css-tricks.com/making-custom-properties-css-variables-dynamic/
- https://web.dev/at-property/
- https://blog.logrocket.com/how-to-create-randomly-generated-backgrounds-with-the-css-paint-api/

https://medium.com/@kaz_sanja/css-cities-generative-art-tutorial-1d0c5b13a027
https://codepen.io/Sanja_kaz/pen/JjRPREX
https://css-tricks.com/random-numbers-css/

https://css-tricks.com/creating-generative-patterns-with-the-css-paint-api/
https://css-doodle.com/
-- something to do with the below
https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static
https://developer.mozilla.org/en-US/docs/Web/API/CSS/supports_static
https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue
https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
https://bobrov.dev/blog/css-custom-properties-in-depth/s

I always thought that the math behind calculating the perfect nested border-radius would be complex somehow. But Paul Hebert has it figured out for us:
`outerRadius - gap = innerRadius`

---
`@decorator`
To define a decorator in TypeScript, you can also use the @ syntax followed by the decorator name. Decorators are functions that take either one or three arguments:

If the decorator is being applied to a class or method, it takes three arguments: the target object (which is the class prototype), the method or property name, and the property descriptor.
If the decorator is being applied to a parameter, it takes two arguments: the target object (which is the class prototype), and the method or property name.
---


Create an SVG sprite containing the symbols you want to reuse:
```html
<svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
  <symbol id="icon-circle" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" />
  </symbol>
  <symbol id="icon-square" viewBox="0 0 32 32">
    <rect x="0" y="0" width="32" height="32" />
  </symbol>
</svg>
```
Use the SVG symbols throughout your site:
```html
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <use href="#icon-circle" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <use href="#icon-square" />
</svg>
```

```html
<svg height="100%" width="100%">
  <defs>
    <pattern id="doodad" width="46.19" height="40" viewBox="0 0 34.64101615137755 30" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
      <rect width="100%" height="100%" fill="rgba(42, 67, 101,1)"/>
      <path d="M-20-20h200v200h-200M33.77 25.5L25.98 21L18.19 25.5L18.19 34.5L25.98 39L33.77 34.5zM16.45 25.5L8.66 21L0.87 25.5L0.87 34.5L8.66 39L16.45 34.5zM7.79 10.5L0 6L-7.79 10.5L-7.79 19.5L0 24L7.79 19.5zM16.45-4.5L8.66-9L0.87-4.5L0.87 4.5L8.66 9L16.45 4.5zM33.77-4.5L25.98-9L18.19-4.5L18.19 4.5L25.98 9L33.77 4.5zM42.43 10.5L34.64 6L26.85 10.5L26.85 19.5L34.64 24L42.43 19.5zM25.11 10.5L17.32 6L9.53 10.5L9.53 19.5L17.32 24L25.11 19.5z" fill="rgba(248, 250, 252,0)"/>
      <path d="M-20-20h200v200h-200M24.21 25.25L15.98 20.5L7.75 25.25L7.75 34.75L15.98 39.5L24.21 34.75zM6.89 25.25L-1.34 20.5L-9.57 25.25L-9.57 34.75L-1.34 39.5L6.89 34.75zM-1.77 10.25L-10 5.5L-18.23 10.25L-18.23 19.75L-10 24.5L-1.77 19.75zM6.89-4.75L-1.34-9.5L-9.57-4.75L-9.57 4.75L-1.34 9.5L6.89 4.75zM24.21-4.75L15.98-9.5L7.75-4.75L7.75 4.75L15.98 9.5L24.21 4.75zM32.87 10.25L24.64 5.5L16.41 10.25L16.41 19.75L24.64 24.5L32.87 19.75zM41.53 25.25L33.3 20.5L25.07 25.25L25.07 34.75L33.3 39.5L41.53 34.75zM15.55 40.25L7.32 35.5L-0.91 40.25L-0.91 49.75L7.32 54.5L15.55 49.75zM-10.43 25.25L-18.66 20.5L-26.89 25.25L-26.89 34.75L-18.66 39.5L-10.43 34.75zM-10.43-4.75L-18.66-9.5L-26.89-4.75L-26.89 4.75L-18.66 9.5L-10.43 4.75zM15.55-19.75L7.32-24.5L-0.91-19.75L-0.91-10.25L7.32-5.5L15.55-10.25zM41.53-4.75L33.3-9.5L25.07-4.75L25.07 4.75L33.3 9.5L41.53 4.75zM32.87 40.25L24.64 35.5L16.41 40.25L16.41 49.75L24.64 54.5L32.87 49.75zM-1.77 40.25L-10 35.5L-18.23 40.25L-18.23 49.75L-10 54.5L-1.77 49.75zM-19.09 10.25L-27.32 5.5L-35.55 10.25L-35.55 19.75L-27.32 24.5L-19.09 19.75zM-1.77-19.75L-10-24.5L-18.23-19.75L-18.23-10.25L-10-5.5L-1.77-10.25zM32.87-19.75L24.64-24.5L16.41-19.75L16.41-10.25L24.64-5.5L32.87-10.25zM50.19 10.25L41.96 5.5L33.73 10.25L33.73 19.75L41.96 24.5L50.19 19.75zM15.55 10.25L7.32 5.5L-0.91 10.25L-0.91 19.75L7.32 24.5L15.55 19.75z" fill="rgba(236, 201, 75,1)"/>
    </pattern>
  </defs>
  <rect fill="url(#doodad)" height="200%" width="200%"/>
</svg>

```

https://web.dev/constructable-stylesheets/

https://github.com/retrohacker/template/tree/main <<----!!

https://github.com/dypsilon/frontend-dev-bookmarks
https://github.com/dypsilon/frontend-dev-bookmarks/blob/master/TOTALLY-GIGANTIC-FILE.md

https://bradfrost.github.io/this-is-responsive/patterns.html
http://styleguides.io/

https://defensivecss.dev/
https://developer.chrome.com/blog/whats-new-css-ui-2023/

https://nownownow.com/


styleguide insp:
<ul>
    <li>---</li>
    <li>https://adele.uxpin.com/</li>
    <li>https://github.com/alexpate/awesome-design-systems</li>
    <li>https://designsystemsrepo.com/design-systems/</li>
    <li>Individual<ul>
      <li>https://manual.louderthanten.com/web-components/typography &lt;-- a different approach</li>
      <li>https://v2.grommet.io/components &lt;-- a different approach</li>
      <li>https://ux.mailchimp.com/patterns/color</li>
    <li>https://seek-oss.github.io/seek-style-guide/palette</li>
    <li>https://design-system.barnardos.org.uk/</li>
    <li>https://fishtank.bna.com/</li>
    <li></li>
    </ul></li>
  </ul>