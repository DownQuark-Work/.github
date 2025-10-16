# DownQuark Doqumentation

> ☝ Front End Navigation is enabled in the header

```kroki-blockdiag no-transparency=false
blockdiag {
  blockdiag -> generates -> "block-diagrams";
  blockdiag -> is -> "very easy!";

  blockdiag [color = "greenyellow"];
  "block-diagrams" [color = "pink"];
  "very easy!" [color = "orange"];
}
```

```kroki-nomnoml
[<start>start] -> [<state>plunder] -> [<choice>more loot] -> [start]
[more loot] no ->[<end>e]

[Pirate|
  [beard]--[parrot]
  [beard]-:>[foul mouth]
]

[<table>mischief| bawl | sing || yell | drink ]

[<abstract>Marauder]<:--[Pirate]
[Pirate] - 0..7[mischief]
[<actor id=sailor>Jolly;Sailor]
[sailor]->[Pirate]
[sailor]->[rum]
[Pirate]-> *[rum|tastiness: Int|swig()]
```

```kroki-mermaid
---
config:
  theme: forest
---
graph LR
A[Start] --> B[Process]
B --> C[End]
C --> D[Repeat]
D --> A
E[Repeat] --> B
```

```kroki-mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->John: Hello John, how are you?
    loop Healthcheck
        John->John: Fight against hypochondria
    end
    Note right of John: Rational thoughts prevail...
    John-->Alice: Great!
    John->Bob: How about you?
    Bob-->John: Jolly good!
```

```kroki-seqdiag
{
  browser  -> webserver [label = "GET /index.html"];
  browser <-- webserver;
  browser  -> webserver [label = "POST /blog/comment"];
  webserver  -> database [label = "INSERT comment"];
  webserver <-- database;
  browser <-- webserver;
}
```

```bash
____________________________________________________
/                                                    \
|    _____________________________________________     |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |                                             |    |
|   |_____________________________________________|    |
|                                                      |
\_____________________________________________________/
      \_______________________________________/
   _______________________________________________
_-'    .-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.  --- `-_
_-'.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.--.  .-.-.`-_
_-'.-.-.-. .---.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-`__`. .-.-.-.`-_
_-'.-.-.-.-. .-----.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-----. .-.-.-.-.`-_
_-'.-.-.-.-.-. .---.-. .-----------------------------. .-.---. .---.-.-.-.`-_
:-----------------------------------------------------------------------------:
`---._.-----------------------------------------------------------------._.---'

```
