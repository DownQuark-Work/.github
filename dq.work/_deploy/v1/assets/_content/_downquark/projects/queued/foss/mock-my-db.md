«««
METADATA: document metadata
Title: Mock My Db
Author: @mlnck
created: 1701160633796
edited: 1701160633796
category: FOSS
reference: https://mqttx.app/features [pubsub]
- https://www.emqx.com/en/blog/the-ultimate-guide-to-mqtt-broker-comparison
- https://www.emqx.com/en/blog/mqtt-5-introduction-to-publish-subscribe-model
»»»
<hgroup>
  <h1>mock my db</h1>
  <h2>the missing db dev step</h2>
</hgroup>

This product (hopefully) removes some tedium the next time you are crating database schemas.


## Queued Status
 Ongoing concepting can be found on our [forum](https://devigner.downquark.work/d/11-mock-my-db).

 The forum should be reated as the <mark>Source of Truth</mark> for this project.

### Project Causation
<p><small>excerpt paraphrased from forum:</small></p>
<blockquote><smaller>I am tasked with creating the schema design for 2 RDBMS databases, as well as 1 graphDB. CQRS is involved, with the RDMS storage types acting as the _Write_ and _Read_ database. The graph database is the middle step, and the non-existent pub-sub/mq applies queries and transforms to the data before storing the mutated values into the aggregate RDBMS _Read_ database.

It is stored As a developer, after I design the database schema(s) I currently have to manually populate the persisted content. This becomes more difficult when the content is required to be in all three databases before I can access what is needed to prove or disprove the schema design. Sometimes even involving the creation of the query and insert scripts to ensure the values changed from one database to another map correctly during the final step.</smaller></blockquote>

### The Queued Solution
<small>subject to change at any time</small>
<mark>Mock My DB</mark> fast tracks development.

Mock My DB automates the steps required to fill all databases with content that is correctly linked and/or transformed based on rules defined by the user and/or database. This allows the developer to advance from schema design to querying data which mirrors the shape of content in its final from.

As an added incentive, users of Mock My DB have the ability to add weights and restrictions to the data being inserted during the automatic population step.

---

We always attempt to update the status of projects as they proceed through our development process. But we make no guarantees. In this instance please refer to the form link above for the most accurate information.

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-foss ]" />
<hr/><hr/>

<footer>
  <h6>mock 'n roll</h6>
</footer>