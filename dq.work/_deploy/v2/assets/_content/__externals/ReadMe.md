# All the content not stored here
> may only be useful until we have the database in place

## dq equivalent of an _RSS_ feed
`JSON` files split by timespan or quantity of items (TBD) with a shape similar to:
```json
[
  {
    "id":"uuid",
    "title":"string",
    "created":"timestamp",
    "author":"string",
    "path":"string", # to external source
    "blurb":"string",
    "categories":["string"],
    "tags":["string"]
  }
]
```
All subject to change


### Queries to run to get relevant data from _blogs_
```
// get required fields
const select = document.querySelectorAll('.u-url, .dt-published')
const blogs = [...select].map(a => [a.getAttribute('href'),a.text,a.dateTime])
```
paste into IDE, some simple manual deletetions will be needed
```
// original
[
    "/qore/an-unofficial-release",
    "An Unofficial Release",
    null
],
[
    null,
    null,
    "2023-07-18T06:22:31Z"
]
/* highlight and delete ALL instances of:
,
    null
],
[
    null,
    null,
*/
```
sort by creation with
```
// sort data
blogs.sort((a,b) => new Date(a[2]).getTime()<new Date(b[2]).getTime() ? 1 : -1)
```
convert to timeline data
```
const timeline = [];
sortedBlogs.forEach(blog => {
    const b = {
        id: crypto.randomUUID(),
        type: 'BLOG',
        title: blog[1],
        author: 'dq',
        created: {
            dateTime: blog[2],
            timestamp: new Date(blog[2]).getTime(),
        },
        url: {
            external: '//qrx.downquark.work/'+blog[0],
            slug: blog[0].split('/').pop(),
        },
        categories: [],
        tags:[],
        parent: null, // this is used when "stacking" the related tiles
    }
    timeline.push(b)
})
// timeline variable is populated
```
-make (readable) json: 
`copy(JSON.parse(JSON.stringify(timeline)))`
- copy & paste into the IDE
- for now you need to manually add tags and categories, but that is very close on the roadmap