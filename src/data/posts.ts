import Database from 'better-sqlite3'
import { DB_FILE } from '$env/static/private'
import knex from 'knex'

const db = new Database(DB_FILE ?? '')
const k = knex({
  client: 'better-sqlite3',
  connection: {
    filename: DB_FILE,
  },
})

export type PostRecord = {
  id: number
  title: string
  author: string
  content: string
}

export function findPostsV2(
  {
    searchInput,
    state,
    page,
    limit,
  }: {
    searchInput: string
    state: string
    page: number
    limit: number
  }
) {
  let query = k('posts')
  if (searchInput) {
    query.join(
      'posts_index',
      function () {
        this.on('posts.id', '=', 'posts_index.rowid')
      }
    )
    query.whereRaw('posts_index MATCH ?', searchInput)
  }
  if (state != '*') {
    query
    .where('posts.state', state)
  }
  query.offset(limit * (page - 1))
  query.limit(limit)
  query.orderBy('id')
  console.log(query.toQuery())
  return db.prepare(query.toQuery()).all()
}

export function countPosts({state}: { state: string }) {
  const statement = db.prepare(
    [
      'SELECT COUNT(*) FROM posts',
      'WHERE state = ?',
    ].join(' ')
  )
  const count = statement.pluck(true).get(state)
  return count
}

export function countPostsBySearchInput({input}: { input: string }): number {
  const statement = db.prepare(
    [
      'SELECT COUNT(*) FROM posts_index',
      'WHERE posts_index MATCH ?',
    ].join(' ')
  )
  const count = statement.pluck(true).get(input)
  return count
}

export function findPost({id}: { id: number }): PostRecord {
  const statement = db.prepare('SELECT * FROM posts WHERE id = ? LIMIT 1')
  const post = statement.get(id)
  return post
}

export function findRandomPostId(): number {
  const statement = db.prepare(
    [
      'SELECT id FROM posts',
      'WHERE state = ?',
      'ORDER BY RANDOM() LIMIT 1',
    ].join(' '),
  )
  const id = statement.pluck(true).get('accepted')
  return id
}

export function createNewPost(post: PostRecord) {
  const statement = db.prepare('INSERT INTO posts(title, author, content) VALUES (?, ?, ?)')
  if (post.title && post.content) {
    statement.run(post.title, post.author, post.content)
  }
}

export function updatePost(post: PostRecord) {
  db.prepare(
    k('posts')
    .where('id', post.id)
    .update(post)
    .toQuery()
  ).run()
}

export function deletePost(id: number) {
  const statement = db.prepare('DELETE FROM posts WHERE id = ?')
  statement.run(id)
}

export function syncPosts() {
  const statement = db.prepare(
    [
      'REPLACE INTO posts_index(rowid, title, author, content)',
      'SELECT id, title, author, content FROM posts',
    ].join(' '),
  )
  statement.run()
}
