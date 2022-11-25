# Esoterica

> (n.) esoteric or highly specialized subjects or publications.

Or a simple CMS that I created with SimpleCSS, SvelteJS, and Sqlite.

## Getting Started

- Run `db/create_tables.sql` to create the necessary tables within a Sqlite `.db` file
- Copy `.sample.env` to `.env`
- Change the content within `.env`:
  - `DB_FILE`: where the Sqlite file is located
  - `ADMIN_AUTH`: a pair of `username:password` to access the admin page at (`/admin`)
- Make sure that `yarn` is ready
- Install dependencies

```shell
yarn install
```

- Start developing

```shell
yarn dev
```

## Functionalities

- Display posts
- Pick random post
- Post submission
- Post management

## Why

To scratch my own itch on having a minimal CMS that allow submission from strangers.

## Screenshots

### Home

![](/docs/screenshots/home.png)

### Post

![](/docs/screenshots/post.png)

### Admin

![](/docs/screenshots/admin.png)

## TODO

- Improve `<title>`
- Improve `favicon`
