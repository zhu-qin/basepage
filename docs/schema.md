# Schema Information

## projects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
manager_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |

## todos_list
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |
project_id  | integer   | not null, foreign key (references base_page)

## todos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
todo_list_id| integer   | not null, foreign key (references todo_list)
assign_to_id| integer   | not null, foreign key (references users)
completion  | boolean   | not null, default: false

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
project_id  | integer   | not null, foreign key (references schedule)
start       | date      | not null
finish      | date      | not null

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
project_id  | integer   | not null, foreign key (references message_board)
author_id   | integer   | not null
message_id  | integer   | foreign key (references another message as reply) can be null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
email           | string    | not null, indexed, unique
