# Back In Business!!
> `http://localhost:8000/_scratch/kroki-nomnoml.html`

```nomnoml
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
