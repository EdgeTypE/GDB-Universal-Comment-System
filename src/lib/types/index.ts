export interface Comment {
  comment_id: number;
  username: string;
  text: string;
  timestamp: string;
  answer_comment_id: number | null;
  replies?: Comment[];
}

export interface CommentPost {
  comment_url: string;
  username: string;
  text: string;
  answer_comment_id?: number | null;
}

export interface ApiError {
  error: string;
  status?: number;
}

export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export interface ApiHeaders {
  'X-RateLimit-Limit': string;
  'X-RateLimit-Remaining': string;
  'X-RateLimit-Reset': string;
}