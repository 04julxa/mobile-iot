export interface Comment {
    id: string;
    nickname: string;
    username: string;
    icon: string | null;
    comment: string;
    likes: number;
    time: string;
    replyTo?: string;
  }
  
  export interface Post {
    id: string;
    nickname: string;
    username: string;
    icon: string | null;
    content: string;
    image: string | null;
    comments: Comment[];
  }
  
  export interface UserProfile {
    id: string;
    nickname: string;
    username: string;
    email: string;
    icon?: string | null;
    headerImage?: string | null;
    bio?: string;
    posts?: Post[];
    followers? : number;
    following? : number;
  }