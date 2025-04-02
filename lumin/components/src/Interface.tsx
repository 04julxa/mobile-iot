export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string; 
  }
  
  export interface Like {
    _id: string;
    user: User | string;
    post: Post | string;
    createdAt: string; 
  }
  
  export interface Comment {
    _id: string;
    content: string;
    author: User | string;
    post: Post | string;
    createdAt: string;
    updatedAt: string;
    likes?: string[]; 
  }
  
  export interface Post {
    _id: string;
    content: string;
    author: User;
    image?: string; 
    likes: Like[] | string[]; 
    comments: Comment[];
    createdAt: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
  }
  
  export interface FeedProps {
    posts: Post[];
    onRefresh?: () => void;
    refreshing?: boolean;
    onLikePress?: (postId: string) => void;
    onCommentPress?: (postId: string) => void;
    onSharePress?: (postId: string) => void;
  }

