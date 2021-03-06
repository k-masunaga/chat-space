# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|index: true, null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :groups through: :users_gruops
- has_many :messages
- has_many :users_gruops

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|

### Association
- has_many :users through: :users_groups
- has_many :messages
- has_many :users_gruops

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user