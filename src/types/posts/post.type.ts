export interface IPost {
  id: number
  title: string
  content: string
  image: string
  like_count: number
  view_count: number
  created_at: string
  comments_count: number
  comments: IComment[]
}

export interface IComment {
  id: number
  content: string
  is_active: boolean
  created_at: string
  user: IUser
}

export interface IUser {
  first_name: string
  last_name: string
  username: string
  email: string
}


export interface HomeProps{
  posts: IPost[]
}


export interface CardProps{
  post: IPost
}