# Schema Information

## base_page
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
base_page_id| integer   | not null, foreign key (references base_page)

## todos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
todo_list_id| integer   | not null, foreign key (references todo_list)
assign_to_id| integer   | not null, foreign key (references users)
completion  | boolean   | not null, default: false


## schedule
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
base_page_id| integer   | not null, foreign key (references base_page)


## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
schedule_id | integer   | not null, foreign key (references schedule)
start       | date      | not null
end         | date      | not null

## message_board
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
base_page_id| integer   | not null, foreign key (references base_page)

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      | not null
msg_board_id| integer   | not null, foreign key (references message_board)
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
