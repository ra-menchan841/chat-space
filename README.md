### DB設計

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text| |
|image|string| |
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belobgs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :group_users
- has_many :users, through: :group_users


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|
|password confirmation|string|null: false|

### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|integer|null: false, foreign_key: true|
|group|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user